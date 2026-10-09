require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173').split(',').map((o) => o.trim());

// ── Security ─────────────────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: allowedOrigins }));

// ── Rate limiting (auth routes only) ─────────────────────────────────────────
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
});

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '2mb' }));

// ── Static assets: venue images ───────────────────────────────────────────────
const imagesDir = path.join(__dirname, '..', 'venuehunt_output', 'images');
app.use('/images', express.static(imagesDir, {
    maxAge: '7d',
    immutable: true,
}));

// ── Routes ────────────────────────────────────────────────────────────────────
const vendorRoutes = require('./routes/vendors');
const authRoutes = require('./routes/auth');
const marketplaceRoutes = require('./routes/marketplace');

app.use('/api/vendors', vendorRoutes);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api', marketplaceRoutes);

// ── Inline convenience endpoints ──────────────────────────────────────────────
const Vendor = require('./models/Vendor');

app.get('/api/categories', async (req, res, next) => {
    try {
        const categoryDefs = [
            { name: 'Venue',         icon: 'building-2' },
            { name: 'Decoration',    icon: 'sparkles' },
            { name: 'Catering',      icon: 'utensils' },
            { name: 'Photography',   icon: 'camera' },
            { name: 'Makeup',        icon: 'palette' },
            { name: 'Transport',     icon: 'car' },
            { name: 'Entertainment', icon: 'music' },
            { name: 'Invitations',   icon: 'mail' },
            { name: 'Rentals',       icon: 'armchair' },
            { name: 'Cakes',         icon: 'cake' },
            { name: 'Planning',      icon: 'clipboard-list' },
            { name: 'Gifts',         icon: 'gift' },
            { name: 'Clothing',      icon: 'shirt' },
        ];
        const counts = await Vendor.aggregate([
            { $match: { status: { $ne: 'inactive' } } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
        ]);
        const countMap = Object.fromEntries(counts.map((c) => [c._id, c.count]));
        const result = categoryDefs.map((cat) => ({ ...cat, count: countMap[cat.name] || 0 }));
        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
});

app.get('/api/event-types', (_req, res) => {
    res.json({
        success: true,
        data: [
            { name: 'Wedding',        slug: 'wedding',        description: 'Nikah, Barat & Walima' },
            { name: 'Mehndi',         slug: 'mehndi',         description: 'Traditional henna night' },
            { name: 'Engagement',     slug: 'engagement',     description: 'Ring ceremony & celebration' },
            { name: 'Birthday',       slug: 'birthday',       description: 'Kids & adult parties' },
            { name: 'Corporate',      slug: 'corporate',      description: 'Meetings & office events' },
            { name: 'Aqeeqah',        slug: 'aqeeqah',        description: 'Blessed celebration of new life' },
            { name: 'Anniversary',    slug: 'anniversary',    description: 'Milestone celebrations' },
            { name: 'Baby Shower',    slug: 'baby-shower',    description: 'Welcome the new arrival' },
            { name: 'Graduation',     slug: 'graduation',     description: 'Academic achievements' },
            { name: 'Private Party',  slug: 'private-party',  description: 'Intimate gatherings' },
            { name: 'Seminar',        slug: 'seminar',        description: 'Conferences & talks' },
            { name: 'Other',          slug: 'other',          description: 'Any other celebration' },
        ],
    });
});

app.get('/api/areas', async (req, res, next) => {
    try {
        const areas = await Vendor.aggregate([
            { $match: { area: { $exists: true, $ne: null } } },
            { $group: { _id: '$area', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        res.json({ success: true, data: areas.map(({ _id, count }) => ({ name: _id, count })) });
    } catch (err) {
        next(err);
    }
});

app.get('/api/health', (_req, res) =>
    res.json({
        success: true,
        data: {
            status: 'ok',
            database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
            timestamp: new Date().toISOString(),
        },
    })
);

// ── Centralized error handler ─────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    console.error('[ERROR]', err.message);
    const status = err.status || err.statusCode || 500;
    res.status(status).json({ success: false, message: err.message || 'Internal server error' });
});

// ── Database & server start ───────────────────────────────────────────────────
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Taqreeb')
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });
