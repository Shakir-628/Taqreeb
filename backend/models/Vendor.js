const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    customerName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true, maxlength: 1000 },
    eventType: { type: String, trim: true },
    verifiedBooking: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true, trim: true, lowercase: true },

    // Classification
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, trim: true },
    eventTypes: [{ type: String }],

    // Location
    city: { type: String, default: 'Karachi', trim: true },
    area: { type: String, required: true, trim: true },
    address: { type: String, trim: true },

    // Pricing
    price: { type: Number, required: true },
    priceUnit: { type: String, enum: ['event', 'per_plate', 'per_hour', 'per_day', 'per_item'], default: 'event' },
    minPrice: { type: Number },
    maxPrice: { type: Number },

    // Capacity
    capacity: { type: Number },

    // Media
    images: [{ type: String }],
    icon: { type: String }, // lucide icon name or emoji fallback

    // Details
    description: { type: String, trim: true, maxlength: 2000 },
    services: [{ type: String }],
    amenities: [{ type: String }],

    // Contact
    phone: { type: String, trim: true },
    whatsapp: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },

    // Marketplace metadata
    verified: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'pending', 'inactive'], default: 'active' },
    deal: { type: String, trim: true },
    offers: {
        discountPercent: { type: Number, min: 0, max: 100 },
        label: { type: String },
        validUntil: { type: Date },
    },

    // Reviews (embedded for MVP)
    reviewItems: [reviewSchema],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },

    // Ownership
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// ── Indexes ────────────────────────────────────────────────────────────────────
vendorSchema.index({ category: 1, area: 1 });
vendorSchema.index({ city: 1, category: 1 });
vendorSchema.index({ price: 1 });
vendorSchema.index({ minPrice: 1 });
vendorSchema.index({ rating: -1 });
vendorSchema.index({ verified: -1, rating: -1 }); // recommended sort
vendorSchema.index({ name: 'text', description: 'text' }); // full-text search

// ── Auto-slug from name ────────────────────────────────────────────────────────
vendorSchema.pre('save', function (next) {
    if (this.isModified('name') && !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            + '-' + this._id.toString().slice(-6);
    }
    next();
});

// ── Recalculate rating average when reviews change ────────────────────────────
vendorSchema.methods.recalcRating = function () {
    if (!this.reviewItems || this.reviewItems.length === 0) {
        this.rating = 0;
        this.reviews = 0;
    } else {
        const sum = this.reviewItems.reduce((acc, r) => acc + r.rating, 0);
        this.rating = Math.round((sum / this.reviewItems.length) * 10) / 10;
        this.reviews = this.reviewItems.length;
    }
};

module.exports = mongoose.model('Vendor', vendorSchema);
