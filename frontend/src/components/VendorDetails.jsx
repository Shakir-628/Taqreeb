import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Chip, Rating, IconButton, Divider,
  Stack, Avatar, Alert, Skeleton, Tabs, Tab,
} from '@mui/material';
import {
  ArrowBack, FavoriteBorder, Favorite, Share,
  LocationOn, People, Verified, Star, WhatsApp,
  CalendarToday, Check,
} from '@mui/icons-material';
import { Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { api, API_BASE } from '../api';
import Header from './Header';
import Footer from './Footer';
import BookingModal from './BookingModal';

// ── WhatsApp message builder ──────────────────────────────────────────────────
function buildWhatsAppLink(vendor) {
  const number = (vendor.whatsapp || vendor.phone || '').replace(/[^0-9]/g, '');
  if (!number) return null;
  const msg = encodeURIComponent(
    `Assalam-o-Alaikum,\nI found your business on TAQREEB.\n\nI am interested in: *${vendor.name}*\nCategory: ${vendor.category}\nLocation: ${vendor.area}\n\nPlease share your availability and final pricing. Thank you!`
  );
  return `https://wa.me/92${number.replace(/^0/, '')}?text=${msg}`;
}

// ── Image gallery ─────────────────────────────────────────────────────────────
function ImageGallery({ images, vendorName }) {
  const [current, setCurrent] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
  const apiBase = API_BASE.replace('/api', '');

  const resolveUrl = (src) => {
    if (!src) return null;
    if (src.startsWith('http')) return src;
    return `${apiBase}/images/${src}`;
  };

  const validImages = images.filter((_, i) => !imgErrors[i]);

  const prev = () => setCurrent((c) => (c - 1 + validImages.length) % validImages.length);
  const next = () => setCurrent((c) => (c + 1) % validImages.length);

  if (!images.length || validImages.length === 0) {
    return (
      <Box sx={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', aspectRatio: '16/9', background: 'linear-gradient(135deg, #6f3157, #9b4d7a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>No images available</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Main image */}
      <Box sx={{ position: 'relative', borderRadius: 'var(--r-xl)', overflow: 'hidden', aspectRatio: '16/9', mb: 1.5 }}>
        <img
          src={resolveUrl(images[current])}
          alt={`${vendorName} – image ${current + 1}`}
          onError={() => setImgErrors((e) => ({ ...e, [current]: true }))}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {images.length > 1 && (
          <>
            <IconButton onClick={prev} sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.9)', '&:hover': { backgroundColor: 'white' }, width: 36, height: 36 }}>
              <ChevronLeft size={18} />
            </IconButton>
            <IconButton onClick={next} sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.9)', '&:hover': { backgroundColor: 'white' }, width: 36, height: 36 }}>
              <ChevronRight size={18} />
            </IconButton>
            <Box sx={{ position: 'absolute', bottom: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', px: 1.25, py: 0.5, borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>
              {current + 1} / {images.length}
            </Box>
          </>
        )}
      </Box>
      {/* Thumbnails */}
      {images.length > 1 && (
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5 }}>
          {images.slice(0, 8).map((img, i) => (
            <Box
              key={i}
              onClick={() => setCurrent(i)}
              sx={{
                flexShrink: 0, width: 72, height: 52, borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                border: '2px solid', borderColor: current === i ? 'var(--clr-primary)' : 'transparent',
                opacity: imgErrors[i] ? 0 : 1, transition: 'all 0.18s',
              }}
            >
              <img
                src={(img.startsWith('http') ? img : `${apiBase}/images/${img}`)}
                alt={`Thumbnail ${i + 1}`}
                onError={() => setImgErrors((e) => ({ ...e, [i]: true }))}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

// ── Review card ───────────────────────────────────────────────────────────────
function ReviewCard({ review }) {
  return (
    <Box sx={{ p: 3, border: '1px solid var(--clr-border)', borderRadius: 'var(--r-lg)', backgroundColor: 'white' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 36, height: 36, backgroundColor: 'var(--clr-primary)', fontSize: '0.85rem', fontWeight: 700 }}>
            {review.customerName?.[0]?.toUpperCase() || 'A'}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={700}>{review.customerName}</Typography>
            {review.eventType && (
              <Typography variant="caption" color="text.secondary">{review.eventType}</Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Star sx={{ fontSize: 14, color: '#f4b900' }} />
          <Typography variant="body2" fontWeight={700}>{review.rating}</Typography>
        </Box>
      </Box>
      {review.comment && (
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          "{review.comment}"
        </Typography>
      )}
      {review.verifiedBooking && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1.5 }}>
          <Check sx={{ fontSize: 13, color: 'var(--clr-success)' }} />
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--clr-success)' }}>Verified Booking</Typography>
        </Box>
      )}
    </Box>
  );
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--clr-bg)' }}>
      <Skeleton variant="rectangular" height={72} />
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, md: 4 }, py: 5 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 380px' }, gap: 5 }}>
          <Box>
            <Skeleton variant="rectangular" height={420} sx={{ borderRadius: 3, mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="rectangular" width={72} height={52} sx={{ borderRadius: 1 }} />)}
            </Box>
          </Box>
          <Box>
            <Skeleton width="60%" height={20} sx={{ mb: 1 }} />
            <Skeleton width="80%" height={36} sx={{ mb: 1.5 }} />
            <Skeleton width="50%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton width="70%" height={16} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2, mb: 2 }} />
            <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 1.5, mb: 1.5 }} />
            <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 1.5 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setLoading(true);
    api.get(`/vendors/${id}`)
      .then((res) => {
        const data = res.data?.data || res.data;
        setVendor(data);
      })
      .catch((err) => setError(err.response?.status === 404 ? 'Vendor not found.' : 'Could not load this vendor. Please try again.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSkeleton />;

  if (error || !vendor) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--clr-bg)' }}>
        <Header />
        <Box sx={{ maxWidth: 600, mx: 'auto', px: 3, py: 12, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '3rem', mb: 2 }}>🔍</Typography>
          <Typography variant="h5" fontWeight={700} gutterBottom>{error || 'Vendor not found'}</Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>The vendor you're looking for may have moved or been removed.</Typography>
          <Button variant="contained" startIcon={<ArrowBack />} onClick={() => navigate('/')}>Back to Marketplace</Button>
        </Box>
        <Footer />
      </Box>
    );
  }

  const images = vendor.images?.length ? vendor.images : (vendor.image ? [vendor.image] : []);
  const waLink = buildWhatsAppLink(vendor);
  const reviews = vendor.reviewItems || [];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--clr-bg)' }}>
      <Header />

      <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>

        {/* ── Back button ── */}
        <Button
          startIcon={<ArrowBack sx={{ fontSize: 18 }} />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3, textTransform: 'none', color: 'var(--clr-muted)', fontWeight: 500, '&:hover': { color: 'var(--clr-primary)' } }}
        >
          Back to results
        </Button>

        {/* ── Two-column layout ── */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 360px' }, gap: { xs: 4, md: 5 }, alignItems: 'start' }}>

          {/* ── Left: Gallery + Details ── */}
          <Box>
            <ImageGallery images={images} vendorName={vendor.name} />

            {/* Tabs */}
            <Box sx={{ mt: 5 }}>
              <Tabs
                value={activeTab}
                onChange={(_, v) => setActiveTab(v)}
                sx={{ borderBottom: '1px solid var(--clr-border)', mb: 3, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.9rem' } }}
              >
                <Tab label="Overview" />
                <Tab label={`Reviews (${reviews.length})`} />
                {vendor.amenities?.length > 0 && <Tab label="Amenities" />}
              </Tabs>

              {/* Overview tab */}
              {activeTab === 0 && (
                <Stack spacing={3.5}>
                  {vendor.description && (
                    <Box>
                      <Typography variant="h6" fontWeight={700} gutterBottom>About</Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>{vendor.description}</Typography>
                    </Box>
                  )}

                  {vendor.services?.length > 0 && (
                    <Box>
                      <Typography variant="h6" fontWeight={700} gutterBottom>Services included</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {vendor.services.map((s) => (
                          <Chip key={s} label={s} size="small" icon={<Check sx={{ fontSize: '13px !important' }} />}
                            sx={{ backgroundColor: 'rgba(46,139,104,0.08)', color: 'var(--clr-success)', fontWeight: 600, fontSize: '0.8rem' }} />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {vendor.eventTypes?.length > 0 && (
                    <Box>
                      <Typography variant="h6" fontWeight={700} gutterBottom>Suitable for</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {vendor.eventTypes.map((et) => (
                          <Chip key={et} label={et} size="small" variant="outlined" sx={{ fontSize: '0.8rem' }} />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Stack>
              )}

              {/* Reviews tab */}
              {activeTab === 1 && (
                <Box>
                  {reviews.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <Typography sx={{ fontSize: '2.5rem', mb: 1.5, opacity: 0.3 }}>⭐</Typography>
                      <Typography fontWeight={700} gutterBottom>No reviews yet</Typography>
                      <Typography color="text.secondary">Be the first to leave a review after your event.</Typography>
                    </Box>
                  ) : (
                    <Stack spacing={2}>
                      {reviews.map((r, i) => <ReviewCard key={i} review={r} />)}
                    </Stack>
                  )}
                </Box>
              )}

              {/* Amenities tab */}
              {activeTab === 2 && vendor.amenities?.length > 0 && (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)' }, gap: 1.5 }}>
                  {vendor.amenities.map((a) => (
                    <Box key={a} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, border: '1px solid var(--clr-border)', borderRadius: 'var(--r-md)', backgroundColor: 'white' }}>
                      <Check sx={{ fontSize: 16, color: 'var(--clr-success)', flexShrink: 0 }} />
                      <Typography variant="body2" fontWeight={500}>{a}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          {/* ── Right: Sticky booking panel ── */}
          <Box
            sx={{
              position: { md: 'sticky' }, top: { md: 96 },
              backgroundColor: 'white', border: '1px solid var(--clr-border)',
              borderRadius: 'var(--r-xl)', boxShadow: 'var(--sh-lg)', p: 3,
            }}
          >
            {/* Vendor header */}
            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1, mb: 1 }}>
                <Box>
                  {vendor.verified && (
                    <Box className="badge-verified" sx={{ mb: 1 }}>
                      <Verified sx={{ fontSize: 11 }} />
                      VERIFIED VENDOR
                    </Box>
                  )}
                  <Typography
                    variant="h5"
                    sx={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, lineHeight: 1.3, letterSpacing: '-0.01em' }}
                  >
                    {vendor.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                  <IconButton size="small" onClick={() => setSaved((s) => !s)} aria-label={saved ? 'Unsave' : 'Save'}>
                    {saved ? <Favorite sx={{ color: 'var(--clr-primary)', fontSize: 20 }} /> : <FavoriteBorder sx={{ fontSize: 20 }} />}
                  </IconButton>
                  <IconButton size="small" aria-label="Share">
                    <Share sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </Box>

              {/* Category + Location */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
                <Chip label={vendor.category} size="small" sx={{ backgroundColor: 'rgba(155,77,122,0.08)', color: 'var(--clr-primary)', fontWeight: 600, fontSize: '0.75rem', borderRadius: '6px', height: 22 }} />
                {vendor.area && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, color: 'var(--clr-muted)' }}>
                    <LocationOn sx={{ fontSize: 14 }} />
                    <Typography variant="caption">{vendor.area}{vendor.city ? `, ${vendor.city}` : ''}</Typography>
                  </Box>
                )}
              </Box>

              {/* Rating */}
              {vendor.rating > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={vendor.rating} readOnly precision={0.5} size="small" />
                  <Typography variant="body2" fontWeight={700}>{vendor.rating}</Typography>
                  <Typography variant="body2" color="text.secondary">({vendor.reviews} reviews)</Typography>
                </Box>
              )}
            </Box>

            <Divider sx={{ mb: 2.5 }} />

            {/* Pricing */}
            <Box sx={{ mb: 2.5 }}>
              <Typography sx={{ fontSize: '0.72rem', color: 'var(--clr-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.5 }}>Starting from</Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography sx={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: 'var(--clr-primary)', lineHeight: 1 }}>
                  PKR {vendor.price?.toLocaleString()}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                  {vendor.priceUnit === 'per_plate' ? '/ plate' : vendor.priceUnit === 'per_hour' ? '/ hr' : '/ event'}
                </Typography>
              </Box>
            </Box>

            {/* Capacity */}
            {vendor.capacity && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5, p: 1.5, backgroundColor: 'var(--clr-bg)', borderRadius: 'var(--r-md)' }}>
                <People sx={{ fontSize: 18, color: 'var(--clr-muted)' }} />
                <Typography variant="body2">Up to <strong>{vendor.capacity.toLocaleString()}</strong> guests</Typography>
              </Box>
            )}

            {/* Deal badge */}
            {vendor.deal && (
              <Box sx={{ mb: 2.5, p: 1.5, backgroundColor: 'rgba(201,155,75,0.08)', border: '1px solid rgba(201,155,75,0.25)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: '0.72rem', color: 'var(--clr-gold)', fontWeight: 700 }}>🔥 {vendor.deal}</Typography>
              </Box>
            )}

            <Divider sx={{ mb: 2.5 }} />

            {/* CTAs */}
            <Stack spacing={1.5}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => setBookingOpen(true)}
                startIcon={<CalendarToday sx={{ fontSize: 18 }} />}
                sx={{ py: 1.5, borderRadius: '10px', fontWeight: 700, textTransform: 'none', fontSize: '0.95rem', backgroundColor: 'var(--clr-primary)', '&:hover': { backgroundColor: 'var(--clr-primary-dk)' } }}
              >
                Request Booking
              </Button>

              {waLink && (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  component="a"
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<WhatsApp sx={{ fontSize: 20 }} />}
                  sx={{ py: 1.5, borderRadius: '10px', fontWeight: 700, textTransform: 'none', fontSize: '0.95rem', backgroundColor: 'var(--clr-whatsapp)', color: 'white', '&:hover': { backgroundColor: '#1fb954' } }}
                >
                  Chat on WhatsApp
                </Button>
              )}

              {/* Contact info */}
              {(vendor.phone || vendor.email) && (
                <Box sx={{ pt: 1 }}>
                  {vendor.phone && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                      <Phone size={14} color="var(--clr-muted)" />
                      <Typography variant="body2" color="text.secondary">{vendor.phone}</Typography>
                    </Box>
                  )}
                  {vendor.email && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Mail size={14} color="var(--clr-muted)" />
                      <Typography variant="body2" color="text.secondary">{vendor.email}</Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Mobile sticky bottom bar */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
          backgroundColor: 'white', borderTop: '1px solid var(--clr-border)',
          p: 2, gap: 1.5,
        }}
      >
        {waLink && (
          <Button
            variant="contained"
            component="a"
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<WhatsApp />}
            sx={{ flex: 1, py: 1.5, borderRadius: '10px', fontWeight: 700, textTransform: 'none', backgroundColor: 'var(--clr-whatsapp)', color: 'white', '&:hover': { backgroundColor: '#1fb954' } }}
          >
            WhatsApp
          </Button>
        )}
        <Button
          variant="contained"
          onClick={() => setBookingOpen(true)}
          sx={{ flex: 1.5, py: 1.5, borderRadius: '10px', fontWeight: 700, textTransform: 'none', backgroundColor: 'var(--clr-primary)', '&:hover': { backgroundColor: 'var(--clr-primary-dk)' } }}
        >
          Book Now
        </Button>
      </Box>

      {/* Bottom padding for mobile sticky bar */}
      <Box sx={{ height: { xs: 80, md: 0 } }} />

      <Footer />

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} vendor={vendor} />
    </Box>
  );
}