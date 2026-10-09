const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const { requireAuth, requireRole } = require('../middleware/auth');

// ── GET /api/vendors ──────────────────────────────────────────────────────────
router.get('/', async (req, res, next) => {
    try {
        const {
            category, area, city,
            minPrice, maxPrice,
            guests, q, sort = 'recommended',
            rating: minRating, eventType,
            page = 1, limit = 12,
        } = req.query;

        const query = { status: { $ne: 'inactive' } };

        if (category) query.category = category;
        if (area) query.area = area;
        if (city) query.city = city;
        if (eventType) query.eventTypes = eventType;

        // Text search (sanitised)
        if (q) {
            const safe = String(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').slice(0, 80);
            query.$or = [
                { name: { $regex: safe, $options: 'i' } },
                { description: { $regex: safe, $options: 'i' } },
                { area: { $regex: safe, $options: 'i' } },
            ];
        }

        if (guests) query.capacity = { $gte: Number(guests) };
        if (minRating) query.rating = { $gte: Number(minRating) };

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice && Number.isFinite(Number(minPrice))) query.price.$gte = Math.max(0, Number(minPrice));
            if (maxPrice && Number.isFinite(Number(maxPrice))) query.price.$lte = Math.max(0, Number(maxPrice));
            if (query.price.$gte && query.price.$lte && query.price.$gte > query.price.$lte) {
                return res.status(400).json({ success: false, message: 'minPrice cannot exceed maxPrice' });
            }
        }

        const sortMap = {
            recommended: { verified: -1, rating: -1 },
            rating:      { rating: -1 },
            reviews:     { reviews: -1 },
            'price-low': { price: 1 },
            'price-high':{ price: -1 },
            newest:      { createdAt: -1 },
        };
        const sortQuery = sortMap[sort] || sortMap.recommended;

        const pageNum  = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
        const skip     = (pageNum - 1) * limitNum;

        const [vendors, total] = await Promise.all([
            Vendor.find(query).sort(sortQuery).skip(skip).limit(limitNum).lean(),
            Vendor.countDocuments(query),
        ]);

        res.json({
            success: true,
            data: vendors,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum),
            },
        });
    } catch (err) {
        next(err);
    }
});

// ── GET /api/vendors/:id ──────────────────────────────────────────────────────
router.get('/:id', async (req, res, next) => {
    try {
        const vendor = await Vendor.findById(req.params.id).lean();
        if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });
        res.json({ success: true, data: vendor });
    } catch (err) {
        next(err);
    }
});

// ── POST /api/vendors ─────────────────────────────────────────────────────────
router.post('/', requireAuth, requireRole('vendor', 'admin'), async (req, res, next) => {
    try {
        const allowed = [
            'name', 'category', 'subCategory', 'area', 'city', 'address',
            'price', 'priceUnit', 'minPrice', 'maxPrice',
            'capacity', 'deal', 'icon', 'images', 'description',
            'services', 'amenities', 'eventTypes', 'phone', 'whatsapp', 'email',
        ];
        const vendorData = Object.fromEntries(
            allowed.filter((f) => req.body[f] !== undefined).map((f) => [f, req.body[f]])
        );
        vendorData.ownerId  = req.user.id;
        vendorData.verified = false;
        vendorData.status   = 'pending';

        const newVendor = await Vendor.create(vendorData);
        res.status(201).json({ success: true, data: newVendor });
    } catch (err) {
        next(err);
    }
});

// ── PUT /api/vendors/:id ──────────────────────────────────────────────────────
router.put('/:id', requireAuth, requireRole('vendor', 'admin'), async (req, res, next) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

        // Vendors can only edit their own; admins can edit any
        if (req.user.role !== 'admin' && String(vendor.ownerId) !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Insufficient permissions' });
        }

        const allowed = [
            'name', 'category', 'subCategory', 'area', 'city', 'address',
            'price', 'priceUnit', 'minPrice', 'maxPrice',
            'capacity', 'deal', 'icon', 'images', 'description',
            'services', 'amenities', 'eventTypes', 'phone', 'whatsapp', 'email', 'status',
        ];
        allowed.forEach((f) => { if (req.body[f] !== undefined) vendor[f] = req.body[f]; });
        await vendor.save();
        res.json({ success: true, data: vendor });
    } catch (err) {
        next(err);
    }
});

// ── POST /api/vendors/:id/reviews ─────────────────────────────────────────────
router.post('/:id/reviews', async (req, res, next) => {
    try {
        const { customerName, rating, comment, eventType } = req.body;
        if (!customerName || !rating) {
            return res.status(400).json({ success: false, message: 'customerName and rating are required' });
        }
        const ratingNum = Number(rating);
        if (!Number.isFinite(ratingNum) || ratingNum < 1 || ratingNum > 5) {
            return res.status(400).json({ success: false, message: 'rating must be between 1 and 5' });
        }

        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

        vendor.reviewItems.push({ customerName, rating: ratingNum, comment, eventType });
        vendor.recalcRating();
        await vendor.save();

        res.status(201).json({ success: true, data: vendor.reviewItems[vendor.reviewItems.length - 1] });
    } catch (err) {
        next(err);
    }
});

// ── DELETE /api/vendors/:id ───────────────────────────────────────────────────
router.delete('/:id', requireAuth, requireRole('admin'), async (req, res, next) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });
        res.json({ success: true, message: 'Vendor deleted' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
