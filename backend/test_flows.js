require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Vendor = require('./models/Vendor');
const Booking = require('./models/Booking');
const Availability = require('./models/Availability');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Taqreeb';
const JWT_SECRET = process.env.JWT_SECRET || 'taqreeb_super_secret_jwt_key_2026_test_flows';

async function runTests() {
  console.log('--- RUNNING FLOW VERIFICATION TESTS ---');
  await mongoose.connect(MONGO_URI);

  // 1. Check counts
  const uCount = await User.countDocuments();
  const vCount = await Vendor.countDocuments();
  const bCount = await Booking.countDocuments();
  const aCount = await Availability.countDocuments();
  console.log(`[PASS] Counts: Users=${uCount}, Vendors=${vCount}, Bookings=${bCount}, Availabilities=${aCount}`);

  // 2. Check all 13 categories
  const categories = [
    'Venue', 'Decoration', 'Catering', 'Photography', 'Makeup',
    'Transport', 'Entertainment', 'Invitations', 'Rentals', 'Cakes',
    'Planning', 'Gifts', 'Clothing'
  ];
  for (const cat of categories) {
    const count = await Vendor.countDocuments({ category: cat, status: { $ne: 'inactive' } });
    if (count === 0) throw new Error(`Missing vendors in category: ${cat}`);
    console.log(`[PASS] Category '${cat}': ${count} vendors`);
  }

  // 3. Check User Authentication & Password Hashing
  const testUser = await User.findOne({ email: 'admin@taqreeb.pk' });
  if (!testUser) throw new Error('Admin user not found');
  const valid = await testUser.comparePassword('Password123!');
  if (!valid) throw new Error('Password compare failed for admin');
  console.log('[PASS] Admin login credentials verified');

  // 4. Check Vendor Ownership Link
  const pioneer = await Vendor.findOne({ name: 'The Pioneer Banquet' });
  const venueUser = await User.findOne({ email: 'vendor.venue@taqreeb.pk' });
  if (String(pioneer.ownerId) !== String(venueUser._id)) {
    throw new Error('Pioneer Banquet is not linked to vendor.venue user');
  }
  console.log('[PASS] Vendor ownership link verified');

  // 5. Check Bookings across statuses
  const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  for (const st of statuses) {
    const b = await Booking.findOne({ status: st });
    if (!b) throw new Error(`No booking found with status: ${st}`);
    console.log(`[PASS] Booking status '${st}' verified (Ref: ${b.reference})`);
  }

  // 6. Check Availability records
  const avails = await Availability.find({ vendorId: pioneer._id });
  if (avails.length === 0) throw new Error('No availability records found for Pioneer Banquet');
  console.log(`[PASS] Pioneer Banquet availability records: ${avails.length} dates`);

  // 7. Check Deals
  const deals = await Vendor.find({ deal: { $exists: true, $nin: ['', null] } });
  console.log(`[PASS] Active Deals count: ${deals.length}`);

  console.log('\n--- ALL FLOW TESTS PASSED SUCCESSFULLY! ---');
  process.exit(0);
}

runTests().catch(err => {
  console.error('[FAIL]', err);
  process.exit(1);
});
