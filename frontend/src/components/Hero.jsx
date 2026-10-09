import React, { useState } from 'react';
import { Box, Button, MenuItem, TextField, Typography, Chip } from '@mui/material';
import { Search, CalendarMonth, Group, AttachMoney, LocationOn } from '@mui/icons-material';
import { useSearch } from '../context/SearchContext';

const EVENT_TYPES = [
  { value: 'Wedding', label: 'Wedding' },
  { value: 'Mehndi', label: 'Mehndi' },
  { value: 'Barat', label: 'Barat' },
  { value: 'Walima', label: 'Walima' },
  { value: 'Engagement', label: 'Engagement' },
  { value: 'Birthday', label: 'Birthday' },
  { value: 'Corporate', label: 'Corporate' },
  { value: 'Aqeeqah', label: 'Aqeeqah' },
  { value: 'Anniversary', label: 'Anniversary' },
  { value: 'Other', label: 'Other' },
];

const AREAS = [
  { value: '', label: 'Any area' },
  { value: 'DHA', label: 'DHA' },
  { value: 'Clifton', label: 'Clifton' },
  { value: 'PECHS', label: 'PECHS' },
  { value: 'North Nazimabad', label: 'North Nazimabad' },
  { value: 'Gulshan-e-Iqbal', label: 'Gulshan-e-Iqbal' },
  { value: 'Gulistan-e-Johar', label: 'Gulistan-e-Johar' },
  { value: 'Saddar', label: 'Saddar' },
  { value: 'Bahadurabad', label: 'Bahadurabad' },
  { value: 'Korangi', label: 'Korangi' },
  { value: 'Malir', label: 'Malir' },
];

const GUEST_OPTIONS = [
  { value: '', label: 'Any size' },
  { value: '50', label: 'Up to 50' },
  { value: '100', label: 'Up to 100' },
  { value: '300', label: '100 – 300' },
  { value: '600', label: '300 – 600' },
  { value: '800', label: '600+' },
];

const BUDGET_OPTIONS = [
  { value: '', label: 'Any budget' },
  { value: '50000', label: 'Under PKR 50k' },
  { value: '100000', label: 'Under PKR 100k' },
  { value: '250000', label: 'Under PKR 250k' },
  { value: '500000', label: 'Under PKR 500k' },
  { value: '1000000', label: 'Under PKR 10 lakh' },
];

const STATS = [
  { value: '2,500+', label: 'Verified vendors' },
  { value: '4.8★', label: 'Average rating' },
  { value: 'PKR 25k', label: 'Starting from' },
  { value: '10 cities', label: 'Across Pakistan' },
];

function SearchField({ icon: Icon, label, children }) {
  return (
    <Box
      sx={{
        flex: 1, minWidth: 0,
        px: { xs: 2, md: 2.5 }, py: { xs: 1.5, md: 1.25 },
        textAlign: 'left',
        borderRight: { md: '1px solid var(--clr-border)' },
        '&:last-of-type': { borderRight: 'none' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'var(--clr-muted)', mb: 0.25 }}>
        <Icon sx={{ fontSize: 15 }} />
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

function InlineSelect({ value, onChange, options, placeholder }) {
  return (
    <TextField
      select
      variant="standard"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: { disableUnderline: true },
        select: { displayEmpty: true },
      }}
      sx={{
        '& .MuiInputBase-input': { py: 0, fontSize: '0.95rem', fontWeight: 500, color: value ? 'var(--clr-text)' : 'var(--clr-muted)' },
        '& .MuiSelect-icon': { color: 'var(--clr-muted)' },
      }}
    >
      {!options[0] || options[0].value !== '' ? (
        <MenuItem value="" disabled sx={{ display: 'none' }}>{placeholder}</MenuItem>
      ) : null}
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
      ))}
    </TextField>
  );
}

export default function Hero() {
  const { filters, updateFilter, updateFilters } = useSearch();
  const [eventDate, setEventDate] = useState('');

  const handleSearch = () => {
    document.getElementById('vendors')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        background: 'linear-gradient(160deg, #ffffff 0%, #fff7fb 55%, #f9edf5 100%)',
        pt: { xs: 8, md: 10 },
        pb: { xs: 6, md: 10 },
        borderBottom: '1px solid var(--clr-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative circles */}
      <Box sx={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,77,122,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,155,75,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, md: 4 }, position: 'relative' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: { xs: 5, md: 8 }, alignItems: 'center' }}>

          {/* ── Left: Copy + Search ── */}
          <Box>
            {/* Eyebrow label */}
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
              <Box sx={{ width: 24, height: 2, backgroundColor: 'var(--clr-gold)', borderRadius: 1 }} />
              <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--clr-gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Plan beautiful moments
              </Typography>
            </Box>

            {/* Headline */}
            <Typography
              component="h1"
              sx={{
                fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
                fontWeight: 800,
                fontSize: { xs: '2.4rem', sm: '3rem', md: '3.4rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--clr-text)',
                mb: 2.5,
              }}
            >
              Plan every event,{' '}
              <Box component="span" sx={{ color: 'var(--clr-primary)' }}>all in one place.</Box>
            </Typography>

            {/* Subtext */}
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, color: 'var(--clr-muted)', lineHeight: 1.7, maxWidth: 500, mb: 4 }}>
              Find trusted venues, decorators, caterers, photographers, clothing and more — compare prices and book with confidence.
            </Typography>

            {/* ── Search Panel ── */}
            <Box
              sx={{
                backgroundColor: 'white',
                border: '1px solid var(--clr-border)',
                borderRadius: { xs: 3, md: '16px' },
                boxShadow: 'var(--sh-xl)',
                overflow: 'hidden',
                mb: 4,
              }}
            >
              {/* Row 1: Event + Location + Guests */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, borderBottom: '1px solid var(--clr-border)' }}>
                <SearchField icon={CalendarMonth} label="Event">
                  <InlineSelect
                    value={filters.eventType}
                    onChange={(v) => updateFilter('eventType', v)}
                    options={[{ value: '', label: 'What are you planning?' }, ...EVENT_TYPES]}
                    placeholder="What are you planning?"
                  />
                </SearchField>

                <SearchField icon={LocationOn} label="Location">
                  <InlineSelect
                    value={filters.area}
                    onChange={(v) => updateFilter('area', v)}
                    options={AREAS}
                    placeholder="Any area"
                  />
                </SearchField>

                <SearchField icon={Group} label="Guests">
                  <InlineSelect
                    value={filters.guests}
                    onChange={(v) => updateFilter('guests', v)}
                    options={GUEST_OPTIONS}
                    placeholder="Any size"
                  />
                </SearchField>
              </Box>

              {/* Row 2: Date + Budget + Search Button */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' } }}>
                <SearchField icon={CalendarMonth} label="Date">
                  <TextField
                    type="date"
                    variant="standard"
                    fullWidth
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    slotProps={{ input: { disableUnderline: true } }}
                    sx={{ '& .MuiInputBase-input': { py: 0, fontSize: '0.95rem', fontWeight: 500 } }}
                  />
                </SearchField>

                <SearchField icon={AttachMoney} label="Budget">
                  <InlineSelect
                    value={filters.budget}
                    onChange={(v) => updateFilter('budget', v)}
                    options={BUDGET_OPTIONS}
                    placeholder="Any budget"
                  />
                </SearchField>

                <Box sx={{ px: { xs: 2, md: 2 }, py: { xs: 2, md: 1.5 }, flexShrink: 0 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSearch}
                    startIcon={<Search />}
                    aria-label="Search event vendors"
                    fullWidth
                    sx={{
                      backgroundColor: 'var(--clr-primary)',
                      color: 'white',
                      px: 3, py: 1.5,
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      whiteSpace: 'nowrap',
                      '&:hover': { backgroundColor: 'var(--clr-primary-dk)' },
                    }}
                  >
                    Find Vendors
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Quick event chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', color: 'var(--clr-muted)', alignSelf: 'center', mr: 0.5 }}>Popular:</Typography>
              {['Wedding', 'Birthday', 'Aqeeqah', 'Corporate', 'Mehndi'].map((et) => (
                <Chip
                  key={et}
                  label={et}
                  size="small"
                  onClick={() => { updateFilter('eventType', et); handleSearch(); }}
                  sx={{
                    fontSize: '0.78rem', fontWeight: 500, borderRadius: '20px',
                    border: '1px solid var(--clr-border)',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'rgba(155,77,122,0.07)', borderColor: 'var(--clr-primary)', color: 'var(--clr-primary)' },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* ── Right: Visual Composition ── */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'relative' }}>
            {/* Main image card */}
            <Box
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                aspectRatio: '4/5',
                background: 'linear-gradient(135deg, #6f3157 0%, #9b4d7a 40%, #c36b85 80%, #c99b4b 100%)',
                boxShadow: 'var(--sh-xl)',
                position: 'relative',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80"
                alt="Elegant wedding celebration"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                loading="lazy"
              />
              {/* Gradient overlay */}
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(43,32,48,0.5) 0%, transparent 60%)' }} />
              {/* Bottom label */}
              <Box sx={{ position: 'absolute', bottom: 20, left: 20, color: 'white' }}>
                <Typography sx={{ fontSize: '0.72rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.5 }}>Featured venue</Typography>
                <Typography fontWeight={700} sx={{ fontSize: '1.1rem' }}>Pearl Marquee, DHA</Typography>
              </Box>
            </Box>

            {/* Floating stat cards */}
            {STATS.map((stat, i) => (
              <Box
                key={stat.label}
                sx={{
                  position: 'absolute',
                  ...(i === 0 && { top: '12%', left: '-20%' }),
                  ...(i === 1 && { top: '38%', right: '-16%' }),
                  ...(i === 2 && { bottom: '28%', left: '-18%' }),
                  ...(i === 3 && { bottom: '8%', right: '-12%' }),
                  backgroundColor: 'white',
                  borderRadius: '14px',
                  p: '10px 16px',
                  boxShadow: 'var(--sh-lg)',
                  border: '1px solid var(--clr-border)',
                  textAlign: 'center',
                  minWidth: 110,
                  animation: `slideUp ${0.5 + i * 0.1}s ease-out both`,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                <Typography sx={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--clr-primary)', lineHeight: 1 }}>
                  {stat.value}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: 'var(--clr-muted)', mt: 0.25, lineHeight: 1.2 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
