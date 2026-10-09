const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true, index: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['available', 'pending', 'booked'], default: 'available' },
}, { timestamps: true });

availabilitySchema.index({ vendorId: 1, date: 1 }, { unique: true });
module.exports = mongoose.model('Availability', availabilitySchema);
