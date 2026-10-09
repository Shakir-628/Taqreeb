require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Vendor = require('./models/Vendor');
const Booking = require('./models/Booking');
const Availability = require('./models/Availability');

const fs = require('fs');
const seedLogFile = 'c:\\Users\\Shakir\\Desktop\\Taqreeb\\backend\\seed.log';
function log(msg) {
  console.log(msg);
  fs.appendFileSync(seedLogFile, msg + '\n', 'utf8');
}
fs.writeFileSync(seedLogFile, '=== SEED EXECUTION ' + new Date().toISOString() + ' ===\n', 'utf8');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Taqreeb';

async function seedDB() {
  try {
    log('Connecting to MongoDB at: ' + MONGO_URI);
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    log('✅ Connected to MongoDB');

    // ── Clear existing collections ──────────────────────────────────────────
    console.log('Clearing old collections...');
    await Promise.all([
      User.deleteMany({}),
      Vendor.deleteMany({}),
      Booking.deleteMany({}),
      Availability.deleteMany({}),
    ]);
    console.log('✅ Cleared old data');

    // ── 1. Seed Users ────────────────────────────────────────────────────────
    console.log('Seeding users...');
    const usersToCreate = [
      {
        name: 'Taqreeb Admin',
        email: 'admin@taqreeb.pk',
        password: 'Password123!',
        role: 'admin',
        phone: '03001234567',
      },
      {
        name: 'Tariq Mehmood (Pioneer Banquet)',
        email: 'vendor.venue@taqreeb.pk',
        password: 'Password123!',
        role: 'vendor',
        phone: '03019876543',
      },
      {
        name: 'Haji Aslam (Karachi Caterers)',
        email: 'vendor.catering@taqreeb.pk',
        password: 'Password123!',
        role: 'vendor',
        phone: '03214567890',
      },
      {
        name: 'Kamran Siddiqui (Memories Studio)',
        email: 'vendor.photo@taqreeb.pk',
        password: 'Password123!',
        role: 'vendor',
        phone: '03337890123',
      },
      {
        name: 'Farah Naz (Rose Petal Decor)',
        email: 'vendor.decor@taqreeb.pk',
        password: 'Password123!',
        role: 'vendor',
        phone: '03123456789',
      },
      {
        name: 'Nomi Ansari Studio',
        email: 'vendor.clothing@taqreeb.pk',
        password: 'Password123!',
        role: 'vendor',
        phone: '03456789012',
      },
      {
        name: 'Ayesha Khan',
        email: 'ayesha@taqreeb.pk',
        password: 'Password123!',
        role: 'customer',
        phone: '03005551234',
      },
      {
        name: 'Bilal Ahmed',
        email: 'bilal@taqreeb.pk',
        password: 'Password123!',
        role: 'customer',
        phone: '03225555678',
      },
    ];

    const createdUsers = [];
    for (const u of usersToCreate) {
      const userDoc = new User(u);
      await userDoc.save();
      createdUsers.push(userDoc);
    }
    console.log(`✅ Seeded ${createdUsers.length} users`);

    const adminUser = createdUsers.find((u) => u.email === 'admin@taqreeb.pk');
    const venueVendorUser = createdUsers.find((u) => u.email === 'vendor.venue@taqreeb.pk');
    const cateringVendorUser = createdUsers.find((u) => u.email === 'vendor.catering@taqreeb.pk');
    const photoVendorUser = createdUsers.find((u) => u.email === 'vendor.photo@taqreeb.pk');
    const decorVendorUser = createdUsers.find((u) => u.email === 'vendor.decor@taqreeb.pk');
    const clothingVendorUser = createdUsers.find((u) => u.email === 'vendor.clothing@taqreeb.pk');

    // ── 2. Seed Vendors (All 13 Categories & Karachi Areas) ──────────────────
    console.log('Seeding vendors across all 13 categories...');

    const rawVendors = [
      // ── Category 1: Venue ───────────────────────────────────────────
      {
        name: 'The Pioneer Banquet',
        category: 'Venue',
        subCategory: 'Banquet Hall',
        eventTypes: ['wedding', 'mehndi', 'engagement', 'corporate', 'birthday'],
        city: 'Karachi',
        area: 'Korangi',
        address: 'Plot No 3, Gate 1, Near W22 Bus Stop, Coast Guard Korangi 2 1/2, Karachi',
        price: 50000,
        priceUnit: 'event',
        minPrice: 50000,
        maxPrice: 120000,
        capacity: 600,
        images: [
          'The_Pioneer_Banquet_1_eb632592.webp',
          'The_Pioneer_Banquet_2_50467fe5.webp',
          'The_Pioneer_Banquet_3_af0b2044.webp',
          'The_Pioneer_Banquet_4_6fe3cb39.webp',
          'The_Pioneer_Banquet_5_f6ca2c3f.webp',
        ],
        icon: 'building-2',
        description: 'The Pioneer Banquet offers a stylish and spacious venue perfect for weddings, receptions, and family occasions. Features grand chandeliers, comfortable bridal lounges, and complete backup generators.',
        services: ['Hall Rental', 'Stage Lighting', 'Air Conditioning', 'Bridal Suite', 'Parking Valet'],
        amenities: ['Air Conditioning', 'Bridal Room', 'Backup Generator', 'Drone Allowed', 'Valet Parking', 'Wheelchair Accessible'],
        phone: '03019876543',
        whatsapp: '03019876543',
        email: 'pioneerbanquet@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: '15% discount for weekday events',
        offers: { discountPercent: 15, label: 'Weekday Special', validUntil: new Date('2026-12-31') },
        ownerId: venueVendorUser._id,
        reviewItems: [
          { customerName: 'Zainab Tariq', rating: 5, comment: 'Hosted my brother\'s Barat here. Impeccable air conditioning and ample parking.', eventType: 'wedding', verifiedBooking: true },
          { customerName: 'Muhammad Salman', rating: 4, comment: 'Spacious hall with clean washrooms and cooperative management.', eventType: 'engagement', verifiedBooking: true },
        ],
      },
      {
        name: 'Al Mustafa Banquet',
        category: 'Venue',
        subCategory: 'Banquet Hall',
        eventTypes: ['wedding', 'mehndi', 'aqeeqah', 'birthday'],
        city: 'Karachi',
        area: 'Korangi',
        address: 'Sector 49, Korangi Main Road, Karachi',
        price: 80000,
        priceUnit: 'event',
        minPrice: 80000,
        maxPrice: 150000,
        capacity: 700,
        images: [
          'Al_Mustafa_Banquet_1_eb632592.webp',
          'Al_Mustafa_Banquet_2_c5b0c7af.webp',
          'Al_Mustafa_Banquet_3_2ef31869.webp',
          'Al_Mustafa_Banquet_4_b2f1a06c.webp',
        ],
        icon: 'building-2',
        description: 'Al Mustafa Banquet offers a well-decorated and spacious venue with warm lighting, dedicated bridal suites, and flexible catering options.',
        services: ['Hall Rental', 'Dance Floor', 'In-House Sound', 'VIP Stage'],
        amenities: ['Air Conditioning', 'Bridal Room', 'Dance Floor', 'Power Backup', 'Security Staff'],
        phone: '03219876540',
        whatsapp: '03219876540',
        email: 'almustafa@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Free dance floor setup on full bookings',
        reviewItems: [
          { customerName: 'Farhan Ali', rating: 5, comment: 'Excellent hospitality and beautiful hall lighting for our Mehndi.', eventType: 'mehndi', verifiedBooking: true },
        ],
      },
      {
        name: 'Casablanca Banquet Hall',
        category: 'Venue',
        subCategory: 'Banquet Hall',
        eventTypes: ['wedding', 'reception', 'corporate'],
        city: 'Karachi',
        area: 'Gulshan-e-Iqbal',
        address: 'Block 13-C, University Road, Gulshan-e-Iqbal, Karachi',
        price: 180000,
        priceUnit: 'event',
        minPrice: 180000,
        maxPrice: 300000,
        capacity: 900,
        images: [
          'Casablanca_Banquet_1_6216bd0e.webp',
          'Casablanca_Banquet_2_6238927a.webp',
          'Casablanca_Banquet_3_e1af6108.webp',
          'Casablanca_Banquet_4_1a918518.webp',
        ],
        icon: 'building-2',
        description: 'A prestigious banquet facility centrally situated in Gulshan-e-Iqbal. Ideal for large family weddings, receptions, and corporate galas with premium carpeted interiors.',
        services: ['Banquet Hall', 'Full Audio/Visual', 'Bridal Suite', 'Dedicated Supervisor'],
        amenities: ['Central AC', 'Valet Parking', 'Power Backup', 'Wi-Fi', 'Security Staff'],
        phone: '03332211445',
        whatsapp: '03332211445',
        email: 'casablanca@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: '10% off for weddings in upcoming month',
        reviewItems: [
          { customerName: 'Dr. Sameer Rizvi', rating: 5, comment: 'Prime location, grand stage setup and great cooling in peak summer.', eventType: 'wedding', verifiedBooking: true },
          { customerName: 'Nadia Qasim', rating: 4, comment: 'Staff was very helpful throughout the night.', eventType: 'corporate', verifiedBooking: true },
        ],
      },
      {
        name: 'De Hina Marquee',
        category: 'Venue',
        subCategory: 'Marquee',
        eventTypes: ['wedding', 'mehndi', 'walima', 'private-party'],
        city: 'Karachi',
        area: 'DHA',
        address: 'Phase 8, Off Creek Marina Road, DHA, Karachi',
        price: 260000,
        priceUnit: 'event',
        minPrice: 260000,
        maxPrice: 450000,
        capacity: 1000,
        images: [
          'De_Hina_Marquee_1_22590b87.webp',
          'De_Hina_Marquee_2_bb5e750c.webp',
          'De_Hina_Marquee_3_4bd71622.webp',
          'De_Hina_Marquee_4_146f9ddc.webp',
        ],
        icon: 'building-2',
        description: 'Premier air-conditioned marquee by the seaside in DHA Phase 8 with lush surrounding open lawns and contemporary architectural drape design.',
        services: ['Marquee Hall', 'Lawn Access', 'Bridal Lounges', 'Valet Service'],
        amenities: ['Central AC', 'Lawn Area', 'Bridal Suites', 'Generator Backup', 'CCTV Security'],
        phone: '03008889911',
        whatsapp: '03008889911',
        email: 'dehina@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Free outdoor lighting canopy for winter weddings',
        reviewItems: [
          { customerName: 'Omer Sheikh', rating: 5, comment: 'Dream wedding venue! The sunset views and marquee ambiance were magical.', eventType: 'wedding', verifiedBooking: true },
        ],
      },
      {
        name: 'Clock Towers Seaside Banquet',
        category: 'Venue',
        subCategory: 'Banquet Hall',
        eventTypes: ['wedding', 'engagement', 'corporate', 'anniversary'],
        city: 'Karachi',
        area: 'Clifton',
        address: 'Abdul Sattar Edhi Avenue, Sea View, Clifton, Karachi',
        price: 320000,
        priceUnit: 'event',
        minPrice: 320000,
        maxPrice: 500000,
        capacity: 850,
        images: [
          'Clock_Towers_Banquet_2_759383e0.webp',
          'Clock_Towers_Banquet_3_ebba28a4.webp',
          'Clock_Towers_Banquet_4_4e7083b8.webp',
        ],
        icon: 'building-2',
        description: 'Iconic oceanfront banquet hall located right on Sea View beach. Unmatched ambiance, panoramic ocean breeze, and top-tier guest amenities.',
        services: ['Seaside Hall', 'Buffet Setup', 'Sound System', 'VIP Waiting Lounge'],
        amenities: ['Oceanfront View', 'Full AC', 'Ample Parking', 'Wheelchair Access'],
        phone: '03112233445',
        whatsapp: '03112233445',
        email: 'clocktowers@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Complimentary welcome mocktails for guests',
        reviewItems: [
          { customerName: 'Faryal Karim', rating: 5, comment: 'The view of the Arabian Sea at night was breathtaking. Guests loved it.', eventType: 'wedding', verifiedBooking: true },
        ],
      },
      {
        name: 'Askari Stars Lawn & Hall',
        category: 'Venue',
        subCategory: 'Lawn / Garden',
        eventTypes: ['wedding', 'mehndi', 'birthday', 'family-gathering'],
        city: 'Karachi',
        area: 'Malir',
        address: 'Askari 5, Malir Cantt, Karachi',
        price: 110000,
        priceUnit: 'event',
        minPrice: 110000,
        maxPrice: 200000,
        capacity: 1200,
        images: [
          'Askari_Stars_Lawn_1_28291c1f.webp',
          'Askari_Stars_Lawn_2_70a77e0a.webp',
          'Askari_Stars_Lawn_3_1f1d2dee.webp',
        ],
        icon: 'building-2',
        description: 'Extensive open lawn with manicured greenery and an attached banquet structure in a secure Cantonment environment.',
        services: ['Open Lawn', 'Indoor Backup Hall', 'Fairy Lights', 'Bridal Dressing Room'],
        amenities: ['Secure Cantt Area', 'High Security', 'Spacious Parking', 'Generator Backup'],
        phone: '03223344556',
        whatsapp: '03223344556',
        email: 'askarilawn@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: null,
        reviewItems: [
          { customerName: 'Captain Bilal', rating: 4.8, comment: 'Very secure and serene location with plenty of lawn space.', eventType: 'mehndi', verifiedBooking: true },
        ],
      },
      {
        name: 'Banquet De Grande',
        category: 'Venue',
        subCategory: 'Banquet Hall',
        eventTypes: ['wedding', 'walima', 'corporate'],
        city: 'Karachi',
        area: 'North Nazimabad',
        address: 'Block H, Near Sakhi Hassan, North Nazimabad, Karachi',
        price: 140000,
        priceUnit: 'event',
        minPrice: 140000,
        maxPrice: 220000,
        capacity: 650,
        images: [
          'Banquet_De_Grande_1_5b6c36f6.webp',
          'Banquet_De_Grande_2_9032b5be.webp',
          'Banquet_De_Grande_3_b2b1619b.webp',
        ],
        icon: 'building-2',
        description: 'Popular elegant banquet in North Nazimabad boasting contemporary architecture, elegant lighting arrays, and royal stage layouts.',
        services: ['Banquet Hall', 'Stage Decor Options', 'Sound and DJ Setup'],
        amenities: ['Central Air Conditioning', 'Bridal Suite', 'Parking Support', 'Power Backup'],
        phone: '03345566778',
        whatsapp: '03345566778',
        email: 'degrande@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Special packages for Walima celebrations',
        reviewItems: [
          { customerName: 'Arsalan Baig', rating: 4.6, comment: 'Cozy and well managed hall in North Nazimabad.', eventType: 'walima', verifiedBooking: true },
        ],
      },

      // ── Category 2: Catering ─────────────────────────────────────────
      {
        name: 'Karachi Biryani & Caterers',
        category: 'Catering',
        subCategory: 'Pakistani & Continental',
        eventTypes: ['wedding', 'mehndi', 'walima', 'corporate', 'aqeeqah'],
        city: 'Karachi',
        area: 'Saddar',
        address: 'Burns Road & Regal Chowk, Saddar, Karachi',
        price: 1450,
        priceUnit: 'per_plate',
        minPrice: 1200,
        maxPrice: 2400,
        capacity: 1500,
        images: [
          'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
          'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
        ],
        icon: 'utensils',
        description: 'Over 30 years of authentic Karachi culinary tradition. Renowned for Zafrani Mutton Biryani, Beef Pulao, Reshmi Kababs, and live tandoor and dessert counters.',
        services: ['Full Buffet Service', 'Live BBQ Counters', 'Live Tandoor & Naan', 'Uniformed Waitstaff', 'Cutlery & Crockery'],
        amenities: ['Food Warmers', 'Chafing Dishes', 'Cold Drinks Service', 'Dedicated Food Supervisors'],
        phone: '03214567890',
        whatsapp: '03214567890',
        email: 'caterers@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Complimentary traditional Shahi Kheer for 300+ guests',
        offers: { discountPercent: 10, label: 'Free Dessert', validUntil: new Date('2026-11-30') },
        ownerId: cateringVendorUser._id,
        reviewItems: [
          { customerName: 'Asad Vohra', rating: 5, comment: 'The mutton biryani was the highlight of our event! Guests praised the taste.', eventType: 'walima', verifiedBooking: true },
          { customerName: 'Mariam Zubair', rating: 4.9, comment: 'Hot and fresh food served right on schedule. Polite staff.', eventType: 'wedding', verifiedBooking: true },
        ],
      },
      {
        name: 'Mughlai Dastarkhwan & Live BBQ',
        category: 'Catering',
        subCategory: 'Traditional & BBQ',
        eventTypes: ['wedding', 'mehndi', 'private-party'],
        city: 'Karachi',
        area: 'DHA',
        address: 'Bukhari Commercial Area, Phase 6, DHA, Karachi',
        price: 2100,
        priceUnit: 'per_plate',
        minPrice: 1800,
        maxPrice: 3200,
        capacity: 800,
        images: [
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
          'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
        ],
        icon: 'utensils',
        description: 'Gourmet live charcoal grilling, Sajji, handi delights, and royal dessert bars prepared by master chefs for discerning events.',
        services: ['Live Grill Stations', 'Gourmet Dessert Displays', 'Beverage Bar', 'VIP Table Service'],
        amenities: ['Fine Crockery', 'Live Chef Stations', 'Hygiene Certified'],
        phone: '03009988771',
        whatsapp: '03009988771',
        email: 'mughlai@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: '10% off for all weekday bookings',
        reviewItems: [
          { customerName: 'Taimoor Shah', rating: 4.8, comment: 'Best live BBQ setup in Karachi. The lamb chops were sensational.', eventType: 'private-party', verifiedBooking: true },
        ],
      },

      // ── Category 3: Decoration ───────────────────────────────────────
      {
        name: 'Rose Petal Event Decorators',
        category: 'Decoration',
        subCategory: 'Floral & Themed Decor',
        eventTypes: ['wedding', 'mehndi', 'engagement', 'anniversary'],
        city: 'Karachi',
        area: 'PECHS',
        address: 'Block 2, Tariq Road Commercial, PECHS, Karachi',
        price: 75000,
        priceUnit: 'event',
        minPrice: 50000,
        maxPrice: 250000,
        capacity: 1000,
        images: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
          'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
        ],
        icon: 'sparkles',
        description: 'Exquisite fresh floral stages, photobooth backdrops, mirror aisles, fairy light tunnels, and customized Mehndi themes.',
        services: ['Stage Decoration', 'Entrance Arc & Tunnel', 'Photobooth Setup', 'Table Centerpieces', 'Fairy Lighting'],
        amenities: ['Fresh Imported Flowers', 'Ambient Lighting', '3D Stage Concepts'],
        phone: '03123456789',
        whatsapp: '03123456789',
        email: 'rosepetal@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Free walkway fairy light canopy on wedding packages',
        ownerId: decorVendorUser._id,
        reviewItems: [
          { customerName: 'Sumbul Noor', rating: 5, comment: 'Farah and her team delivered exactly what we dreamed of for our Mehndi!', eventType: 'mehndi', verifiedBooking: true },
          { customerName: 'Rashid Minhas', rating: 4.7, comment: 'Stage was stunning with real imported roses. Highly recommended.', eventType: 'wedding', verifiedBooking: true },
        ],
      },
      {
        name: 'Zari & Gota Theme Designers',
        category: 'Decoration',
        subCategory: 'Traditional Mehndi Decor',
        eventTypes: ['mehndi', 'mayun', 'qawwali'],
        city: 'Karachi',
        area: 'Gulshan-e-Iqbal',
        address: 'Block 6, Gulshan-e-Iqbal, Karachi',
        price: 45000,
        priceUnit: 'event',
        minPrice: 35000,
        maxPrice: 110000,
        capacity: 500,
        images: [
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
        ],
        icon: 'sparkles',
        description: 'Specialists in vibrant Pakistani Mehndi and Mayun setups featuring traditional marigold flowers, yellow drapes, truck art cushions, and dholak corners.',
        services: ['Marigold Stage', 'Dholak Corner', 'Jhoola Decor', 'Custom Mehndi Props'],
        amenities: ['Traditional Props', 'Low Seating Mattresses', 'Handmade Craftwork'],
        phone: '03213344556',
        whatsapp: '03213344556',
        email: 'zarigota@taqreeb.pk',
        verified: false,
        status: 'active',
        deal: null,
        reviewItems: [
          { customerName: 'Hina Danish', rating: 4.5, comment: 'Very lively and colorful setup at an affordable price.', eventType: 'mehndi', verifiedBooking: false },
        ],
      },

      // ── Category 4: Photography ──────────────────────────────────────
      {
        name: 'Memories Studio PK',
        category: 'Photography',
        subCategory: 'Cinematography & Portraits',
        eventTypes: ['wedding', 'mehndi', 'walima', 'engagement', 'corporate'],
        city: 'Karachi',
        area: 'Clifton',
        address: 'Ocean Tower, Khayaban-e-Iqbal, Clifton, Karachi',
        price: 65000,
        priceUnit: 'event',
        minPrice: 45000,
        maxPrice: 200000,
        capacity: 1200,
        images: [
          'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80',
          'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
        ],
        icon: 'camera',
        description: 'Award-winning wedding cinematographers and candid portrait photographers. Delivering 4K highlight reels, drone coverage, and signature magazine albums.',
        services: ['4K Cinematic Film', 'Candid Photography', 'Drone Aerial Footage', 'Luxury Photo Albums', 'Live Streaming'],
        amenities: ['Dual Camera Crew', 'Female Photographers Available', 'Same Day Teaser Video'],
        phone: '03337890123',
        whatsapp: '03337890123',
        email: 'memories@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Free drone video coverage on 2-day wedding bookings',
        offers: { discountPercent: 12, label: 'Free Drone Coverage', validUntil: new Date('2026-12-31') },
        ownerId: photoVendorUser._id,
        reviewItems: [
          { customerName: 'Adeel & Rabia', rating: 5, comment: 'Kamran captured our emotions so beautifully! Our cinematic trailer made everyone cry tears of joy.', eventType: 'wedding', verifiedBooking: true },
          { customerName: 'Fahad Memon', rating: 4.8, comment: 'Prompt delivery of high resolution files and premium album binding.', eventType: 'walima', verifiedBooking: true },
        ],
      },
      {
        name: 'Candid Moments Studio',
        category: 'Photography',
        subCategory: 'Events & Family',
        eventTypes: ['birthday', 'engagement', 'aqeeqah', 'corporate'],
        city: 'Karachi',
        area: 'Tariq Road',
        address: 'Kurta Gali Commercial, Tariq Road, Karachi',
        price: 35000,
        priceUnit: 'event',
        minPrice: 25000,
        maxPrice: 70000,
        capacity: 500,
        images: [
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
        ],
        icon: 'camera',
        description: 'Reliable and friendly photo crew capturing spontaneous smiles and candid memories for birthdays, family parties, and engagements.',
        services: ['Digital Softcopies', 'Printed 100 Photos', 'Short Social Media Reel'],
        amenities: ['Professional Strobe Kit', 'Fast Delivery within 5 Days'],
        phone: '03451122334',
        whatsapp: '03451122334',
        email: 'candidmoments@taqreeb.pk',
        verified: false,
        status: 'active',
        deal: null,
        reviewItems: [
          { customerName: 'Mrs. Huma', rating: 4.4, comment: 'Great service for our baby\'s first birthday celebration.', eventType: 'birthday', verifiedBooking: true },
        ],
      },

      // ── Category 5: Makeup ───────────────────────────────────────────
      {
        name: 'Glamour Lounge by Zara',
        category: 'Makeup',
        subCategory: 'Bridal & Party Artistry',
        eventTypes: ['wedding', 'mehndi', 'walima', 'engagement', 'private-party'],
        city: 'Karachi',
        area: 'DHA',
        address: 'Bukhari Commercial Lane 4, Phase 6, DHA, Karachi',
        price: 45000,
        priceUnit: 'event',
        minPrice: 30000,
        maxPrice: 95000,
        capacity: 10,
        images: [
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
        ],
        icon: 'palette',
        description: 'UK-certified celebrity makeup artist specializing in flawless HD bridal looks, customized airbrush techniques, and bespoke hairstyling.',
        services: ['HD Bridal Makeup', 'Airbrush Makeup', 'Party Looks', 'Hair Extension Styling', 'Dupatta & Jewelry Setting'],
        amenities: ['Private VIP Bridal Suite', 'High-End International Brands (NARS, Charlotte Tilbury, Dior)'],
        phone: '03004455667',
        whatsapp: '03004455667',
        email: 'glamour@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Free complimentary party makeup with bridal booking',
        reviewItems: [
          { customerName: 'Mahnoor Khan', rating: 5, comment: 'Zara made me feel like royalty on my Barat! Look lasted 14 hours without budging.', eventType: 'wedding', verifiedBooking: true },
          { customerName: 'Saira Bano', rating: 4.9, comment: 'Very gentle, hygienic brushes, and exactly what I requested.', eventType: 'engagement', verifiedBooking: true },
        ],
      },
      {
        name: 'Bridal Glow Signature Salon',
        category: 'Makeup',
        subCategory: 'Salon & Spa',
        eventTypes: ['wedding', 'mehndi', 'birthday'],
        city: 'Karachi',
        area: 'Gulistan-e-Johar',
        address: 'Block 14, Main University Road, Gulistan-e-Johar, Karachi',
        price: 25000,
        priceUnit: 'event',
        minPrice: 18000,
        maxPrice: 50000,
        capacity: 15,
        images: [
          'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
        ],
        icon: 'palette',
        description: 'Comprehensive beauty studio offering bridal glow packages, hair transformations, and party makeover services at accessible prices.',
        services: ['Bridal Makeup', 'Pre-Bridal Facials', 'Nail Art', 'Hairstyling'],
        amenities: ['AC Salon', 'Sterilized Equipment', 'Friendly Staff'],
        phone: '03132244668',
        whatsapp: '03132244668',
        email: 'bridalglow@taqreeb.pk',
        verified: false,
        status: 'active',
        deal: '20% discount on group party makeup bookings',
        reviewItems: [
          { customerName: 'Anum Sheikh', rating: 4.4, comment: 'Affordable and good quality makeup for my sister\'s Mehndi.', eventType: 'mehndi', verifiedBooking: false },
        ],
      },

      // ── Category 6: Clothing ─────────────────────────────────────────
      {
        name: 'Nomi Ansari Couture & Bridal',
        category: 'Clothing',
        subCategory: 'Bridal & Formal Wear',
        eventTypes: ['wedding', 'mehndi', 'walima'],
        city: 'Karachi',
        area: 'Clifton',
        address: 'Block 4, Near Bilawal Chowrangi, Clifton, Karachi',
        price: 180000,
        priceUnit: 'event',
        minPrice: 120000,
        maxPrice: 650000,
        capacity: 50,
        images: [
          'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
          'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80',
        ],
        icon: 'shirt',
        description: 'Vibrant colors, intricate zardozi embroidery, and timeless bridal silhouettes crafted by celebrated Pakistani fashion designers.',
        services: ['Custom Bridal Lehengas', 'Ghararas & Shararas', 'Bespoke Measurements', 'Personal Styling Sessions'],
        amenities: ['Private Fitting Rooms', 'Design Consultant on Appointment'],
        phone: '03456789012',
        whatsapp: '03456789012',
        email: 'couture@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Free matching pouch and handmade khussa with every bespoke bridal order',
        ownerId: clothingVendorUser._id,
        reviewItems: [
          { customerName: 'Dua Malik', rating: 5, comment: 'The craftsmanship on my Barat lehenga was breathtaking. Worth every rupee!', eventType: 'wedding', verifiedBooking: true },
        ],
      },
      {
        name: 'Groom Sherwani Hub',
        category: 'Clothing',
        subCategory: 'Menswear & Sherwanis',
        eventTypes: ['wedding', 'walima', 'engagement'],
        city: 'Karachi',
        area: 'Tariq Road',
        address: 'Dolmen Mall Arcade, Tariq Road, Karachi',
        price: 32000,
        priceUnit: 'per_item',
        minPrice: 20000,
        maxPrice: 90000,
        capacity: 100,
        images: [
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
        ],
        icon: 'shirt',
        description: 'Royal velvet and jamawar sherwanis, prince coats, designer waistcoats, and matching turbans for the modern Pakistani groom.',
        services: ['Sherwani Tailoring', 'Kulla & Turban Tying', 'Shawl Styling', 'Custom Khussa Matching'],
        amenities: ['Rapid Alteration Service', 'Matching Accessories Included'],
        phone: '03002233441',
        whatsapp: '03002233441',
        email: 'groomsherwani@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Free matching turban & designer khussa with complete suit',
        reviewItems: [
          { customerName: 'Bilal Farooqui', rating: 4.8, comment: 'Perfect fit on first trial. Looked like a true royal groom on my wedding day.', eventType: 'wedding', verifiedBooking: true },
        ],
      },
      {
        name: 'Anarkali Attire Rentals',
        category: 'Clothing',
        subCategory: 'Rental Bridal & Formal Outfits',
        eventTypes: ['wedding', 'mehndi', 'walima', 'private-party'],
        city: 'Karachi',
        area: 'Saddar',
        address: 'Bohri Bazaar Commercial, Saddar, Karachi',
        price: 15000,
        priceUnit: 'event',
        minPrice: 8000,
        maxPrice: 35000,
        capacity: 200,
        images: [
          'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=800&q=80',
        ],
        icon: 'shirt',
        description: 'High-end designer replica bridal gowns, heavy lehengas, and maxi dresses available on flexible 3-day rental options with dry cleaning included.',
        services: ['3-Day Outfits Rental', 'Complimentary Alteration', 'Sanitized & Dry Cleaned'],
        amenities: ['Try-on Booths', 'Deposit Refund Guarantee'],
        phone: '03119988776',
        whatsapp: '03119988776',
        email: 'anarkalirentals@taqreeb.pk',
        verified: false,
        status: 'active',
        deal: null,
        reviewItems: [
          { customerName: 'Natasha Pervez', rating: 4.3, comment: 'Saved a fortune by renting for my cousin\'s wedding. Dress looked brand new.', eventType: 'wedding', verifiedBooking: true },
        ],
      },

      // ── Category 7: Transport ────────────────────────────────────────
      {
        name: 'Vintage & Classic Wedding Rides',
        category: 'Transport',
        subCategory: 'Vintage & Luxury Cars',
        eventTypes: ['wedding', 'barat', 'walima'],
        city: 'Karachi',
        area: 'PECHS',
        address: 'Shahrah-e-Faisal Service Road, PECHS, Karachi',
        price: 35000,
        priceUnit: 'per_day',
        minPrice: 25000,
        maxPrice: 75000,
        capacity: 4,
        images: [
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
        ],
        icon: 'car',
        description: 'Immaculately restored Rolls Royce, Cadillac, and Mercedes vintage classic cars for unforgettable bridal and groom grand arrivals.',
        services: ['Chauffeur in Uniform', 'Fresh Flower Decoration Included', 'Fuel & Tolls Included'],
        amenities: ['Air Conditioned Classics', 'Complimentary Mineral Water & Refreshment'],
        phone: '03001122339',
        whatsapp: '03001122339',
        email: 'vintagerides@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Free fresh floral car decoration with every rental booking',
        reviewItems: [
          { customerName: 'Zubair Baig', rating: 4.9, comment: 'The vintage convertible made our Barat arrival iconic. Chauffeur was courteous and punctual.', eventType: 'wedding', verifiedBooking: true },
        ],
      },
      {
        name: 'Royal Executive Fleet Services',
        category: 'Transport',
        subCategory: 'Executive & SUV Rentals',
        eventTypes: ['wedding', 'corporate', 'family-gathering'],
        city: 'Karachi',
        area: 'DHA',
        address: 'Khayaban-e-Shamsheer, Phase 5, DHA, Karachi',
        price: 22000,
        priceUnit: 'per_day',
        minPrice: 15000,
        maxPrice: 60000,
        capacity: 10,
        images: [
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
        ],
        icon: 'car',
        description: 'Latest models of Toyota Fortuner, Land Cruiser Prado, and Audi sedans with professional security chauffeurs.',
        services: ['Full Day Chauffeur Drive', 'Guest Airport Pickups', 'VIP Convoy Coordination'],
        amenities: ['GPS Tracking', 'Bottled Water', 'Toll Passes'],
        phone: '03224466880',
        whatsapp: '03224466880',
        email: 'royalexec@taqreeb.pk',
        verified: false,
        status: 'active',
        deal: null,
        reviewItems: [],
      },

      // ── Category 8: Entertainment ────────────────────────────────────
      {
        name: 'Sufi Qawwali & Instrumental Ensemble',
        category: 'Entertainment',
        subCategory: 'Traditional & Qawwali Band',
        eventTypes: ['qawwali', 'mehndi', 'private-party', 'corporate'],
        city: 'Karachi',
        area: 'Malir',
        address: 'Kala Board, Malir, Karachi',
        price: 60000,
        priceUnit: 'event',
        minPrice: 45000,
        maxPrice: 150000,
        capacity: 1000,
        images: [
          'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80',
        ],
        icon: 'music',
        description: 'Master qawwals and tabla instrumentalists delivering spiritually uplifting and classical Sufi tunes for wedding evenings and intimate nights.',
        services: ['Live Qawwali 3-Hour Performance', 'Harmonium & Tabla Artists', 'Sound Reinforcement Included'],
        amenities: ['Traditional Carpet Seating Setup', 'Dedicated Sound Tech'],
        phone: '03007788990',
        whatsapp: '03007788990',
        email: 'sufiqawwali@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Complimentary 30-min extended set on weekend bookings',
        reviewItems: [
          { customerName: 'Fawad Chaudhry', rating: 5, comment: 'They kept 400 guests spellbound until 2am! Superb vocals and energy.', eventType: 'qawwali', verifiedBooking: true },
        ],
      },
      {
        name: 'Karachi Beats DJ & Sound Lights',
        category: 'Entertainment',
        subCategory: 'DJ & Dance Lighting',
        eventTypes: ['mehndi', 'birthday', 'private-party'],
        city: 'Karachi',
        area: 'DHA',
        address: 'Badar Commercial, Phase 5, DHA, Karachi',
        price: 30000,
        priceUnit: 'event',
        minPrice: 20000,
        maxPrice: 70000,
        capacity: 500,
        images: [
          'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
        ],
        icon: 'music',
        description: 'Energetic wedding DJs with club-grade bass sound systems, haze machines, moving head lasers, and custom Pakistani Mehndi dance mashups.',
        services: ['Live DJ Console', 'JBL Sound Rig', 'Moving Head Lights', 'Haze/Smoke Machine'],
        amenities: ['Custom Playlist Consultation', 'Wireless Mics Included'],
        phone: '03332211998',
        whatsapp: '03332211998',
        email: 'karachibeats@taqreeb.pk',
        verified: false,
        status: 'active',
        deal: null,
        reviewItems: [
          { customerName: 'Daniyal Aziz', rating: 4.6, comment: 'Brought the house down during the dance performances! Fantastic beats.', eventType: 'mehndi', verifiedBooking: true },
        ],
      },

      // ── Category 9: Rentals ──────────────────────────────────────────
      {
        name: 'A-1 Royal Tent & Furniture Rentals',
        category: 'Rentals',
        subCategory: 'Tents, Chairs & Canopies',
        eventTypes: ['wedding', 'mehndi', 'aqeeqah', 'corporate'],
        city: 'Karachi',
        area: 'North Nazimabad',
        address: 'Block D, Near Five Star Chowrangi, North Nazimabad, Karachi',
        price: 25000,
        priceUnit: 'event',
        minPrice: 15000,
        maxPrice: 85000,
        capacity: 800,
        images: [
          'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
        ],
        icon: 'armchair',
        description: 'Complete party hire solutions: Chiavari chairs, sofa lounges, waterproof shamianas, round tables, stage carpets, and buffet counters.',
        services: ['Furniture Delivery & Setup', 'Shamiana & Canopy Installation', 'Next-Day Teardown'],
        amenities: ['Chiavari Chairs in Gold & White', 'Clean Table Linens'],
        phone: '03003322114',
        whatsapp: '03003322114',
        email: 'a1rentals@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: '15% discount for bookings exceeding 200 chairs',
        reviewItems: [
          { customerName: 'Junaid Jamshed Jr.', rating: 4.5, comment: 'Chairs were spotless and set up right on schedule.', eventType: 'family-gathering', verifiedBooking: true },
        ],
      },

      // ── Category 10: Cakes ───────────────────────────────────────────
      {
        name: 'The Artisan Cake Studio',
        category: 'Cakes',
        subCategory: 'Wedding & Custom Cakes',
        eventTypes: ['wedding', 'engagement', 'birthday', 'anniversary'],
        city: 'Karachi',
        area: 'Clifton',
        address: 'Zamzama Commercial Lane 3, Clifton, Karachi',
        price: 14000,
        priceUnit: 'per_item',
        minPrice: 8000,
        maxPrice: 45000,
        capacity: 50,
        images: [
          'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&q=80',
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
        ],
        icon: 'cake',
        description: 'Spectacular multi-tiered wedding cakes, edible sugar flowers, fondant sculptures, and rich chocolate fudge textures designed to impress.',
        services: ['Multi-Tiered Cakes', 'Cake Tasting Consultation', 'Temperature-Controlled Delivery & Setup'],
        amenities: ['100% Halal Ingredients', 'Custom Flavors (Red Velvet, Belgian Fudge, Salted Caramel)'],
        phone: '03218899001',
        whatsapp: '03218899001',
        email: 'artisancakes@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Free custom dessert table styling with 3-tier cakes',
        offers: { discountPercent: 10, label: 'Free Dessert Styling', validUntil: new Date('2026-12-31') },
        reviewItems: [
          { customerName: 'Aamna Rauf', rating: 5, comment: 'The 4-tier Red Velvet cake was both breathtaking to look at and insanely delicious!', eventType: 'wedding', verifiedBooking: true },
        ],
      },
      {
        name: 'Sweet Tier Wedding Confections',
        category: 'Cakes',
        subCategory: 'Pastries & Party Cakes',
        eventTypes: ['birthday', 'anniversary', 'baby-shower'],
        city: 'Karachi',
        area: 'Bahadurabad',
        address: 'Main Alamgir Road, Bahadurabad, Karachi',
        price: 8500,
        priceUnit: 'per_item',
        minPrice: 5000,
        maxPrice: 20000,
        capacity: 30,
        images: [
          'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
        ],
        icon: 'cake',
        description: 'Fresh cream and buttercream cakes, themed cupcakes, and dessert favors for birthdays and intimate milestones.',
        services: ['Custom Birthday Cakes', 'Cupcake Towers', 'Delivery Across Karachi'],
        amenities: ['Vegetarian Options', 'Custom Text Inscriptions'],
        phone: '03335544332',
        whatsapp: '03335544332',
        email: 'sweettier@taqreeb.pk',
        verified: false,
        status: 'active',
        deal: null,
        reviewItems: [],
      },

      // ── Category 11: Planning ────────────────────────────────────────
      {
        name: 'Elite Celebrations & Event Planners',
        category: 'Planning',
        subCategory: 'Full Service Wedding Planning',
        eventTypes: ['wedding', 'corporate', 'walima', 'private-party'],
        city: 'Karachi',
        area: 'DHA',
        address: 'Phase 7 Extension, DHA, Karachi',
        price: 150000,
        priceUnit: 'event',
        minPrice: 100000,
        maxPrice: 400000,
        capacity: 2000,
        images: [
          'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
        ],
        icon: 'clipboard-list',
        description: 'End-to-end luxury event coordination. We handle vendor negotiations, timelines, hospitality, floor plans, and stress-free execution.',
        services: ['Full Concept Design', 'Vendor Coordination', 'Day-Of On-Site Direction', 'Budget Management'],
        amenities: ['Dedicated Wedding Planner', '24/7 Client Support'],
        phone: '03008877665',
        whatsapp: '03008877665',
        email: 'eliteplanning@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Free digital guest management and RSVP portal',
        reviewItems: [
          { customerName: 'Shahid & Maira', rating: 5, comment: 'They took away all our stress! We actually got to enjoy our wedding as guests.', eventType: 'wedding', verifiedBooking: true },
        ],
      },

      // ── Category 12: Invitations ─────────────────────────────────────
      {
        name: 'Royal Calligraphy & Cards',
        category: 'Invitations',
        subCategory: 'Luxury Wedding Stationery',
        eventTypes: ['wedding', 'walima', 'corporate'],
        city: 'Karachi',
        area: 'Saddar',
        address: 'Pakistan Chowk Printing Market, Saddar, Karachi',
        price: 190,
        priceUnit: 'per_item',
        minPrice: 100,
        maxPrice: 850,
        capacity: 2000,
        images: [
          'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80',
        ],
        icon: 'mail',
        description: 'Laser cut cards, velvet hardcover boxes, metallic gold foil stamping, and traditional Urdu calligraphy wedding invites.',
        services: ['Custom Graphic Design', 'Laser Cutting & Foil Stamping', 'Box Packaging with Sweets Compartments'],
        amenities: ['Proof Sample Approval Before Print', 'Doorstep Delivery'],
        phone: '03213344112',
        whatsapp: '03213344112',
        email: 'royalcards@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: 'Free matching digital video invite for orders over 250 cards',
        reviewItems: [
          { customerName: 'Usman Ghani', rating: 4.7, comment: 'High quality paper and exquisite gold foil embossing on the envelopes.', eventType: 'wedding', verifiedBooking: true },
        ],
      },

      // ── Category 13: Gifts ───────────────────────────────────────────
      {
        name: 'Bismillah Favors & Souvenirs',
        category: 'Gifts',
        subCategory: 'Event Favors & Giveaways',
        eventTypes: ['wedding', 'mehndi', 'aqeeqah', 'baby-shower'],
        city: 'Karachi',
        area: 'Bahadurabad',
        address: 'Shop 12, Bahadurabad Arcade, Karachi',
        price: 350,
        priceUnit: 'per_item',
        minPrice: 150,
        maxPrice: 1200,
        capacity: 1500,
        images: [
          'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
        ],
        icon: 'gift',
        description: 'Curated favors: scented candles, mini Ittar bottles, dry fruit pouches, custom chocolates, and traditional potli bags for your guests.',
        services: ['Custom Packaging & Ribbons', 'Name Tag Printing', 'Bulk Packaging'],
        amenities: ['Custom Monogram Ribbons', 'Quality Tested Fragrances'],
        phone: '03341122335',
        whatsapp: '03341122335',
        email: 'favors@taqreeb.pk',
        verified: true,
        status: 'active',
        deal: '10% discount on orders exceeding 200 favor bags',
        offers: { discountPercent: 10, label: 'Bulk Favors Discount', validUntil: new Date('2026-12-31') },
        reviewItems: [
          { customerName: 'Zehra Kazmi', rating: 4.9, comment: 'The personalized ittar bottles with gold caps were loved by all Mehndi guests!', eventType: 'mehndi', verifiedBooking: true },
        ],
      },
    ];

    const createdVendors = [];
    for (const vData of rawVendors) {
      const vendorDoc = new Vendor(vData);
      vendorDoc.recalcRating();
      await vendorDoc.save();
      createdVendors.push(vendorDoc);
    }
    console.log(`✅ Seeded ${createdVendors.length} vendors covering all categories`);

    // ── 3. Seed Bookings ─────────────────────────────────────────────────────
    console.log('Seeding sample bookings across statuses...');

    const pioneer = createdVendors.find((v) => v.name === 'The Pioneer Banquet');
    const biryani = createdVendors.find((v) => v.name === 'Karachi Biryani & Caterers');
    const memories = createdVendors.find((v) => v.name === 'Memories Studio PK');
    const rosePetal = createdVendors.find((v) => v.name === 'Rose Petal Event Decorators');
    const casablanca = createdVendors.find((v) => v.name === 'Casablanca Banquet Hall');

    const sampleBookings = [
      {
        vendorId: pioneer._id,
        customerName: 'Ayesha Khan',
        phone: '03005551234',
        email: 'ayesha@taqreeb.pk',
        eventType: 'Wedding',
        eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // in 2 weeks
        guests: 450,
        budget: 150000,
        notes: 'Barat ceremony with stage decor and AC required from 8 PM to 12 AM.',
        status: 'pending',
      },
      {
        vendorId: pioneer._id,
        customerName: 'Bilal Ahmed',
        phone: '03225555678',
        email: 'bilal@taqreeb.pk',
        eventType: 'Walima',
        eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // in 1 month
        guests: 500,
        budget: 200000,
        notes: 'Deposit paid via bank transfer. Confirmed for Walima reception.',
        status: 'confirmed',
      },
      {
        vendorId: pioneer._id,
        customerName: 'Hamza Farooq',
        phone: '03334445555',
        email: 'hamza.f@gmail.com',
        eventType: 'Mehndi',
        eventDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // past event
        guests: 350,
        budget: 100000,
        notes: 'Mehndi night successfully completed.',
        status: 'completed',
      },
      {
        vendorId: pioneer._id,
        customerName: 'Tariq Mansoor',
        phone: '03451122334',
        email: 'tariq.m@yahoo.com',
        eventType: 'Birthday',
        eventDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        guests: 100,
        budget: 60000,
        notes: 'Cancelled due to date conflict with family.',
        status: 'cancelled',
      },
      {
        vendorId: biryani._id,
        customerName: 'Ayesha Khan',
        phone: '03005551234',
        email: 'ayesha@taqreeb.pk',
        eventType: 'Wedding',
        eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        guests: 450,
        budget: 650000,
        notes: 'Zafrani Mutton Biryani, Chicken Malai Boti, Seekh Kabab, and Shahi Tukray menu.',
        status: 'confirmed',
      },
      {
        vendorId: memories._id,
        customerName: 'Bilal Ahmed',
        phone: '03225555678',
        email: 'bilal@taqreeb.pk',
        eventType: 'Walima',
        eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        guests: 500,
        budget: 120000,
        notes: 'Drone coverage and cinematic trailer package with photobook.',
        status: 'confirmed',
      },
      {
        vendorId: rosePetal._id,
        customerName: 'Zainab Qazi',
        phone: '03017778899',
        email: 'zainab.qazi@gmail.com',
        eventType: 'Engagement',
        eventDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        guests: 200,
        budget: 85000,
        notes: 'Pastel peach & ivory floral backdrop with warm fairy lights.',
        status: 'pending',
      },
      {
        vendorId: casablanca._id,
        customerName: 'Dr. Sameer Rizvi',
        phone: '03129988776',
        email: 'sameer.rizvi@gmail.com',
        eventType: 'Corporate',
        eventDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        guests: 600,
        budget: 250000,
        notes: 'Annual corporate gala & awards night with projector stages.',
        status: 'pending',
      },
    ];

    const createdBookings = await Booking.create(sampleBookings);
    console.log(`✅ Seeded ${createdBookings.length} bookings`);

    // ── 4. Seed Availability Records ─────────────────────────────────────────
    console.log('Seeding vendor availability calendars...');
    const availabilityRecords = [];
    const vendorsToSchedule = [pioneer, casablanca, biryani];

    for (const v of vendorsToSchedule) {
      if (!v) continue;
      // Add dates for current month and next month
      for (let i = 1; i <= 28; i += 3) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        date.setHours(0, 0, 0, 0);

        let status = 'available';
        if (i % 6 === 0) status = 'booked';
        else if (i % 9 === 0) status = 'pending';

        availabilityRecords.push({
          vendorId: v._id,
          date,
          status,
        });
      }
    }

    const createdAvailabilities = await Availability.insertMany(availabilityRecords);
    console.log(`✅ Seeded ${createdAvailabilities.length} availability date records`);

    console.log('\n======================================================');
    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('======================================================');
    console.log('\n📋 TEST CREDENTIALS:');
    console.log('------------------------------------------------------');
    console.log('🛡️  Admin Account:');
    console.log('   Email:    admin@taqreeb.pk');
    console.log('   Password: Password123!');
    console.log('\n🏪 Vendor Accounts:');
    console.log('   1. Venue:    vendor.venue@taqreeb.pk    (Password123!) -> The Pioneer Banquet');
    console.log('   2. Catering: vendor.catering@taqreeb.pk (Password123!) -> Karachi Biryani & Caterers');
    console.log('   3. Photo:    vendor.photo@taqreeb.pk    (Password123!) -> Memories Studio PK');
    console.log('   4. Decor:    vendor.decor@taqreeb.pk    (Password123!) -> Rose Petal Event Decorators');
    console.log('   5. Clothing: vendor.clothing@taqreeb.pk (Password123!) -> Nomi Ansari Couture');
    console.log('\n👤 Customer Accounts:');
    console.log('   1. ayesha@taqreeb.pk (Password123!)');
    console.log('   2. bilal@taqreeb.pk  (Password123!)');
    console.log('======================================================\n');

    process.exit(0);
  } catch (err) {
    log('❌ Error during seeding: ' + err.message + '\n' + err.stack);
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
}

seedDB();
