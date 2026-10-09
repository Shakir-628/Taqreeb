const mongoose = require('mongoose');

function generateReference() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let ref = 'TQ-';
    for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)];
    return ref;
}

const bookingSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    eventType: { type: String, trim: true },
    eventDate: { type: Date },
    guests: { type: Number, min: 1 },
    budget: { type: Number, min: 0 },
    notes: { type: String, trim: true, maxlength: 1000 },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
    reference: { type: String, unique: true },
}, { timestamps: true });

bookingSchema.pre('save', function (next) {
    if (!this.reference) {
        this.reference = generateReference();
    }
    next();
});

bookingSchema.index({ vendorId: 1, eventDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
