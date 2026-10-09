require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/User');
const Vendor = require('./models/Vendor');
const Booking = require('./models/Booking');
const Availability = require('./models/Availability');

const logFile = 'c:\\Users\\Shakir\\Desktop\\Taqreeb\\backend\\debug.log';
function log(msg) { fs.appendFileSync(logFile, msg + '\n', 'utf8'); }
fs.writeFileSync(logFile, 'Starting verify at ' + new Date().toISOString() + '\n', 'utf8');

async function verify() {
  log('Connecting to mongoose URI: ' + (process.env.MONGODB_URI || 'mongodb://localhost:27017/Taqreeb'));
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Taqreeb', { serverSelectionTimeoutMS: 5000 });
  log('Connected!');
  const uCount = await User.countDocuments();
  const vCount = await Vendor.countDocuments();
  const bCount = await Booking.countDocuments();
  const aCount = await Availability.countDocuments();
  const categories = await Vendor.distinct('category');
  const areas = await Vendor.distinct('area');
  const sampleUsers = await User.find({}, 'name email role phone').lean();
  const deals = await Vendor.find({ deal: { $exists: true, $nin: ['', null] } }, 'name category deal price').lean();
  const bookings = await Booking.find({}, 'customerName eventType status reference budget').lean();

  const report = {
    counts: {
      users: uCount,
      vendors: vCount,
      bookings: bCount,
      availabilities: aCount,
    },
    categoriesSeeded: categories,
    areasSeeded: areas,
    sampleUsers,
    sampleDeals: deals,
    sampleBookings: bookings,
  };

  fs.writeFileSync('verify.json', JSON.stringify(report, null, 2), 'utf8');
  log('Finished writing verify.json');
  process.exit(0);
}

verify().catch(err => {
  log('Error in verify: ' + err.message + '\n' + err.stack);
  fs.writeFileSync('verify.json', JSON.stringify({ error: err.message, stack: err.stack }), 'utf8');
  process.exit(1);
});
