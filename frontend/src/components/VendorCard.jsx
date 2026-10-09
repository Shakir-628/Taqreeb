import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Chip } from '@mui/material';
import { Star, Favorite, FavoriteBorder, Verified } from '@mui/icons-material';
import { WhatsApp } from '@mui/icons-material';
import { MapPin, Users, Tag } from 'lucide-react';
import BookingModal from './BookingModal';
import { API_BASE } from '../api';

function generateWhatsAppLink(vendor) {
  const number = (vendor.whatsapp || vendor.phone || '').replace(/[^0-9]/g, '');
  if (!number) return null;
  const msg = encodeURIComponent(
    `Assalam-o-Alaikum,\nI found your business on TAQREEB.\n\nI am interested in: *${vendor.name}*\n\nPlease share availability and pricing.`
  );
  return `https://wa.me/92${number.replace(/^0/, '')}?text=${msg}`;
}

function VendorImage({ vendor }) {
  const [imgError, setImgError] = useState(false);
  const src = vendor.images?.[0] || vendor.image;
  const apiBase = API_BASE.replace('/api', '');

  // Build proper URL for backend-served images
  const imgSrc = src
    ? src.startsWith('http')
      ? src
      : `${apiBase}/images/${src}`
    : null;

  if (!imgSrc || imgError) {
    // Tasteful gradient fallback by category
    const gradients = {
      Venue:         'linear-gradient(135deg, #6f3157 0%, #9b4d7a 100%)',
      Photography:   'linear-gradient(135deg, #2b2030 0%, #6f3157 100%)',
      Makeup:        'linear-gradient(135deg, #c36b85 0%, #c99b4b 100%)',
      Catering:      'linear-gradient(135deg, #c99b4b 0%, #e0be78 100%)',
      Decoration:    'linear-gradient(135deg, #9b4d7a 0%, #c36b85 100%)',
      Clothing:      'linear-gradient(135deg, #6f3157 0%, #c99b4b 100%)',
      default:       'linear-gradient(135deg, #9b4d7a 0%, #6f3157 100%)',
    };
    return (
      <Box sx={{ height: 220, background: gradients[vendor.category] || gradients.default, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: '2.5rem', opacity: 0.3, filter: 'grayscale(1)' }}>
          {vendor.category === 'Venue' ? '🏛' : vendor.category === 'Catering' ? '🍽' : vendor.category === 'Photography' ? '📷' : '✦'}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {vendor.category}
        </Typography>
      </Box>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={vendor.name}
      loading="lazy"
      onError={() => setImgError(true)}
      style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
    />
  );
}

export default function VendorCard({ vendor, saved: savedProp = false, onSave }) {
  const [saved, setSaved] = useState(savedProp);
  const [bookingOpen, setBookingOpen] = useState(false);
  const waLink = generateWhatsAppLink(vendor);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((s) => !s);
    onSave?.(vendor._id);
  };

  // Budget match (simple: how affordable relative to PKR 500k)
  const budgetMatchPct = vendor.price
    ? Math.min(100, Math.round((500000 / vendor.price) * 100))
    : null;

  return (
    <Box
      className="vendor-card"
      sx={{
        backgroundColor: 'white',
        borderRadius: 'var(--r-lg)',
        border: '1px solid var(--clr-border)',
        boxShadow: 'var(--sh-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* ── Image ── */}
      <Box sx={{ position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
        <VendorImage vendor={vendor} />

        {/* Overlay badges */}
        <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {vendor.verified && (
            <Box className="badge-verified">
              <Verified sx={{ fontSize: 11 }} />
              VERIFIED
            </Box>
          )}
          {vendor.deal && (
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, backgroundColor: 'var(--clr-gold)', color: 'white', borderRadius: '20px', px: 1, py: 0.25, fontSize: '0.68rem', fontWeight: 700 }}>
              <Tag size={10} />
              {vendor.deal.length > 22 ? vendor.deal.slice(0, 22) + '…' : vendor.deal}
            </Box>
          )}
        </Box>

        {/* Favorite button */}
        <IconButton
          size="small"
          onClick={handleSave}
          aria-label={saved ? 'Remove from saved' : 'Save vendor'}
          sx={{
            position: 'absolute', top: 10, right: 10,
            backgroundColor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(6px)',
            width: 34, height: 34,
            '&:hover': { backgroundColor: 'white' },
          }}
        >
          {saved
            ? <Favorite sx={{ fontSize: 18, color: 'var(--clr-primary)' }} />
            : <FavoriteBorder sx={{ fontSize: 18, color: 'var(--clr-muted)' }} />
          }
        </IconButton>
      </Box>

      {/* ── Content ── */}
      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {/* Category chip */}
        <Chip
          label={vendor.category}
          size="small"
          sx={{
            alignSelf: 'flex-start',
            fontSize: '0.7rem', fontWeight: 600,
            backgroundColor: 'rgba(155,77,122,0.08)',
            color: 'var(--clr-primary)',
            borderRadius: '6px',
            height: 22,
          }}
        />

        {/* Name */}
        <Typography
          component={Link}
          to={`/vendor/${vendor._id}`}
          sx={{
            fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
            fontWeight: 700, fontSize: '1rem',
            color: 'var(--clr-text)', lineHeight: 1.35,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
            textDecoration: 'none',
            '&:hover': { color: 'var(--clr-primary)' },
            transition: 'color 0.2s',
          }}
        >
          {vendor.name}
        </Typography>

        {/* Location + Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 0.75 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--clr-muted)' }}>
            <MapPin size={13} />
            <Typography sx={{ fontSize: '0.8rem' }}>{vendor.area}{vendor.city ? `, ${vendor.city}` : ''}</Typography>
          </Box>
          {vendor.rating > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ fontSize: 14, color: '#f4b900' }} />
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--clr-text)' }}>{vendor.rating}</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: 'var(--clr-muted)' }}>({vendor.reviews})</Typography>
            </Box>
          )}
        </Box>

        {/* Capacity */}
        {vendor.capacity && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--clr-muted)' }}>
            <Users size={13} />
            <Typography sx={{ fontSize: '0.8rem' }}>Up to {vendor.capacity.toLocaleString()} guests</Typography>
          </Box>
        )}

        {/* Price */}
        <Box sx={{ mt: 'auto', pt: 0.5 }}>
          <Typography sx={{ fontSize: '0.72rem', color: 'var(--clr-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Starting from
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
            <Typography sx={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--clr-primary)' }}>
              PKR {vendor.price?.toLocaleString()}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'var(--clr-muted)' }}>
              {vendor.price > 10000 ? '/ event' : '/ plate'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Actions ── */}
      <Box sx={{ px: 2.5, pb: 2.5, display: 'flex', gap: 1 }}>
        <Button
          component={Link}
          to={`/vendor/${vendor._id}`}
          variant="outlined"
          size="small"
          sx={{
            flex: 1, borderRadius: '8px', textTransform: 'none', fontWeight: 600,
            fontSize: '0.82rem', py: 1,
            borderColor: 'var(--clr-border)',
            color: 'var(--clr-text)',
            '&:hover': { borderColor: 'var(--clr-primary)', color: 'var(--clr-primary)', backgroundColor: 'rgba(155,77,122,0.04)' },
          }}
        >
          View
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => setBookingOpen(true)}
          sx={{
            flex: 1, borderRadius: '8px', textTransform: 'none', fontWeight: 600,
            fontSize: '0.82rem', py: 1,
            backgroundColor: 'var(--clr-primary)',
            '&:hover': { backgroundColor: 'var(--clr-primary-dk)' },
          }}
        >
          Book
        </Button>
        {waLink && (
          <IconButton
            component="a"
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            aria-label="Contact on WhatsApp"
            sx={{
              borderRadius: '8px', border: '1px solid var(--clr-border)',
              width: 36, height: 36,
              color: 'var(--clr-whatsapp)',
              '&:hover': { backgroundColor: 'rgba(37,211,102,0.08)', borderColor: 'var(--clr-whatsapp)' },
            }}
          >
            <WhatsApp sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} vendor={vendor} />
    </Box>
  );
}