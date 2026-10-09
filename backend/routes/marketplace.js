const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Availability = require('../models/Availability');
const Vendor = require('../models/Vendor');
const { requireAuth, requireRole } = require('../middleware/auth');

// ── POST /api/bookings ────────────────────────────────────────────────────────
router.post('/bookings', async (req, res, next) => {
    try {
        const { vendorId, customerName, phone, email, eventType, eventDate, guests, budget, notes } = req.body;
        if (!vendorId || !customerName || !phone) {
            return res.status(400).json({ success: false, message: 'vendorId, customerName and phone are required' });
        }
        const booking = await Booking.create({ vendorId, customerName, phone, email, eventType, eventDate, guests, budget, notes });
        res.status(201).json({ success: true, data: booking });
    } catch (err) {
        next(err);
    }
});

// ── GET /api/bookings ─────────────────────────────────────────────────────────
router.get('/bookings', requireAuth, requireRole('vendor', 'admin'), async (req, res, next) => {
    try {
        let query = {};
        if (req.user.role !== 'admin') {
            if (req.user.vendorId) {
                query = { vendorId: req.user.vendorId };
            } else {
                const ownedVendors = await Vendor.find({ ownerId: req.user.id }).select('_id').lean();
                const vendorIds = ownedVendors.map((v) => v._id);
                query = { vendorId: { $in: vendorIds } };
            }
        }
        const bookings = await Booking.find(query)
            .populate('vendorId', 'name category area')
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();
        res.json({ success: true, data: bookings });
    } catch (err) {
        next(err);
    }
});

// ── PUT /api/bookings/:id/status ──────────────────────────────────────────────
router.put('/bookings/:id/status', requireAuth, requireRole('vendor', 'admin'), async (req, res, next) => {
    try {
        const allowed = ['pending', 'confirmed', 'cancelled', 'completed'];
        if (!allowed.includes(req.body.status)) {
            return res.status(400).json({ success: false, message: 'Invalid booking status' });
        }
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        res.json({ success: true, data: booking });
    } catch (err) {
        next(err);
    }
});

// ── GET /api/availability/:vendorId ──────────────────────────────────────────
router.get('/availability/:vendorId', async (req, res, next) => {
    try {
        const dates = await Availability.find({ vendorId: req.params.vendorId }).sort({ date: 1 }).lean();
        res.json({ success: true, data: dates });
    } catch (err) {
        next(err);
    }
});

// ── POST /api/availability/:vendorId ─────────────────────────────────────────
router.post('/availability/:vendorId', requireAuth, requireRole('vendor', 'admin'), async (req, res, next) => {
    try {
        const { date, status = 'blocked' } = req.body;
        if (!date || !['available', 'pending', 'booked'].includes(status)) {
            return res.status(400).json({ success: false, message: 'date and a valid status (available/pending/booked) are required' });
        }
        const record = await Availability.findOneAndUpdate(
            { vendorId: req.params.vendorId, date: new Date(date) },
            { status },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.json({ success: true, data: record });
    } catch (err) {
        next(err);
    }
});

// ── GET /api/deals ────────────────────────────────────────────────────────────
router.get('/deals', async (req, res, next) => {
    try {
        const deals = await Vendor.find({
            deal: { $exists: true, $nin: ['', null] },
            status: { $ne: 'inactive' },
        }).sort({ rating: -1 }).limit(20).lean();
        res.json({ success: true, data: deals });
    } catch (err) {
        next(err);
    }
});

// ── POST /api/budget/plan ─────────────────────────────────────────────────────
router.post('/budget/plan', (req, res) => {
    const total = Number(req.body.total);
    if (!Number.isFinite(total) || total <= 0) {
        return res.status(400).json({ success: false, message: 'total must be a positive number' });
    }
    const allocation = {
        Venue: 0.30, Catering: 0.22, Clothing: 0.12, Decoration: 0.11,
        Photography: 0.07, Entertainment: 0.05, Makeup: 0.04, Planning: 0.02,
        Invitations: 0.02, Rentals: 0.03, Cakes: 0.01, Transport: 0.01,
    };
    const breakdown = Object.entries(allocation).map(([category, percentage]) => ({
        category,
        percentage: Math.round(percentage * 100),
        amount: Math.round(total * percentage),
    }));
    res.json({ success: true, data: breakdown });
});

module.exports = router;
