import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { api } from './api';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider, useSearch } from './context/SearchContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Categories from './components/Categories';
import EventTypes from './components/EventTypes';
import Areas from './components/Areas';
import VendorList from './components/VendorList';
import VendorDetails from './components/VendorDetails';
import LocationPage from './components/LocationPage';
import {
  WhyTaqreeb, VenueAndClothing, DealsAndPackages,
  Availability, PlannerAndTrust,
} from './components/MarketplaceSections';

// ── Fallback vendor dataset (shown when API is unreachable) ───────────────────
const FALLBACK_VENDORS = [
  { _id: 'f1', name: 'Shalimar Gardens & Marquee', category: 'Venue', area: 'DHA', city: 'Karachi', price: 250000, capacity: 800, rating: 4.8, reviews: 120, verified: true, deal: '10% off weekdays', description: 'A grand marquee in the heart of DHA with lush gardens and world-class hospitality.' },
  { _id: 'f2', name: 'The Royal Taj Banquet', category: 'Venue', area: 'North Nazimabad', city: 'Karachi', price: 150000, capacity: 500, rating: 4.5, reviews: 85, verified: true, description: 'Elegant banquet hall with full catering and decoration services.' },
  { _id: 'f3', name: 'Clifton Seaside Pavilion', category: 'Venue', area: 'Clifton', city: 'Karachi', price: 300000, capacity: 1000, rating: 4.9, reviews: 200, verified: true, deal: '15% off for weekdays', description: 'Stunning sea-view venue for grand celebrations.' },
  { _id: 'f4', name: 'Memories Studio', category: 'Photography', area: 'Clifton', city: 'Karachi', price: 45000, rating: 4.8, reviews: 210, verified: true, description: 'Award-winning photography studio specialising in weddings and events.' },
  { _id: 'f5', name: 'Glamour Lounge by Zara', category: 'Makeup', area: 'DHA', city: 'Karachi', price: 35000, rating: 4.9, reviews: 150, verified: true, description: 'Bridal and party makeup by certified artists.' },
  { _id: 'f6', name: 'Karachi Biryani & Caterers', category: 'Catering', area: 'Saddar', city: 'Karachi', price: 1200, capacity: 500, rating: 4.9, reviews: 300, verified: true, deal: 'Complimentary dessert', description: 'Authentic Pakistani cuisine catering service with 20+ years of experience.' },
  { _id: 'f7', name: 'Rose Petal Event Decorators', category: 'Decoration', area: 'PECHS', city: 'Karachi', price: 50000, rating: 4.6, reviews: 90, verified: true, description: 'Beautiful floral and themed decoration for all events.' },
  { _id: 'f8', name: 'Nomi Ansari Boutique', category: 'Clothing', area: 'Clifton', city: 'Karachi', price: 150000, rating: 4.9, reviews: 400, verified: true, description: 'Designer bridal and formal wear by award-winning fashion house.' },
];

// ── Home Page ─────────────────────────────────────────────────────────────────
function Home() {
  const { filters, updateFilter } = useSearch();
  const [vendors, setVendors] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1, limit: 12 });
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  const fetchVendors = useCallback(async (pageOverride) => {
    setLoading(true);
    setApiError(false);
    try {
      const params = {};
      if (filters.category)  params.category  = filters.category;
      if (filters.area)      params.area       = filters.area;
      if (filters.city)      params.city       = filters.city;
      if (filters.q)         params.q          = filters.q;
      if (filters.guests)    params.guests     = filters.guests;
      if (filters.budget)    params.maxPrice   = filters.budget;
      if (filters.eventType) params.eventType  = filters.eventType;
      if (filters.sort)      params.sort       = filters.sort;
      params.page  = pageOverride || pagination.page;
      params.limit = 12;

      const res = await api.get('/vendors', { params });
      const body = res.data;

      // Handle both { success, data, pagination } and legacy array responses
      if (Array.isArray(body)) {
        setVendors(body);
        setPagination({ page: 1, total: body.length, pages: 1, limit: 12 });
      } else {
        setVendors(body.data || []);
        setPagination(body.pagination || { page: 1, total: (body.data || []).length, pages: 1, limit: 12 });
      }
    } catch (err) {
      console.warn('API unavailable, using fallback dataset:', err.message);
      setApiError(true);

      // Apply client-side filters to fallback data
      let fallback = FALLBACK_VENDORS;
      if (filters.category) fallback = fallback.filter((v) => v.category === filters.category);
      if (filters.area)     fallback = fallback.filter((v) => v.area === filters.area);
      if (filters.q)        fallback = fallback.filter((v) => v.name.toLowerCase().includes(filters.q.toLowerCase()));
      setVendors(fallback);
      setPagination({ page: 1, total: fallback.length, pages: 1, limit: 12 });
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page]);

  // Re-fetch when filters change, reset to page 1
  useEffect(() => {
    fetchVendors(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category, filters.area, filters.city, filters.q, filters.guests, filters.budget, filters.eventType, filters.sort]);

  const handlePageChange = (newPage) => {
    setPagination((p) => ({ ...p, page: newPage }));
    fetchVendors(newPage);
    document.getElementById('vendors')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <WhyTaqreeb />
        <EventTypes />
        <Categories />
        <VenueAndClothing />
        <Areas />
        <VendorList
          vendors={vendors}
          pagination={pagination}
          loading={loading}
          apiError={apiError}
          onPageChange={handlePageChange}
        />
        <DealsAndPackages />
        <Availability />
        <PlannerAndTrust />
      </main>
      <Footer />
    </div>
  );
}

// ── App with Providers ────────────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/"                   element={<Home />} />
            <Route path="/vendor/:id"         element={<VendorDetails />} />
            <Route path="/locations/:areaName" element={<LocationPage />} />
          </Routes>
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
