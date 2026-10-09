import React, { useState, useEffect } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { api } from '../api';
import { useSearch } from '../context/SearchContext';

const EVENT_IMAGES = {
  Wedding:        'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=75',
  Mehndi:         'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=75',
  Engagement:     'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=75',
  Birthday:       'https://images.unsplash.com/photo-1530103862676-de8892b07439?w=500&q=75',
  Corporate:      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=75',
  Aqeeqah:        'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=500&q=75',
  Anniversary:    'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&q=75',
  'Baby Shower':  'https://images.unsplash.com/photo-1515488042248-6e7a6c7e6e8a?w=500&q=75',
  Graduation:     'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=75',
  'Private Party':'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=75',
  Seminar:        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=75',
  Other:          'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=75',
};

const FALLBACK_EVENTS = Object.keys(EVENT_IMAGES).map((name) => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-'), description: '' }));

export default function EventTypes() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { filters, updateFilter } = useSearch();

  useEffect(() => {
    api.get('/event-types')
      .then((res) => {
        const data = res.data?.data || res.data;
        setEvents(Array.isArray(data) ? data : FALLBACK_EVENTS);
      })
      .catch(() => setEvents(FALLBACK_EVENTS))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (name) => {
    updateFilter('eventType', filters.eventType === name ? '' : name);
    setTimeout(() => document.getElementById('vendors')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  const displayEvents = events.length ? events : FALLBACK_EVENTS;

  return (
    <Box
      component="section"
      id="event-types"
      sx={{ py: { xs: 7, md: 11 }, backgroundColor: 'white', borderTop: '1px solid var(--clr-border)' }}
    >
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, md: 4 } }}>

        {/* Heading */}
        <Box sx={{ mb: 6, maxWidth: 600 }}>
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--clr-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1 }}>
            Events we cover
          </Typography>
          <Typography variant="h3" sx={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, color: 'var(--clr-text)', letterSpacing: '-0.02em', mb: 1.5 }}>
            What are you planning?
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
            From intimate Aqeeqahs to grand Barat nights — TAQREEB has vendors for every occasion.
          </Typography>
        </Box>

        {/* Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }, gap: 2 }}>
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <Box key={i} sx={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', aspectRatio: '3/4' }}>
                  <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%' }} />
                </Box>
              ))
            : displayEvents.map((evt) => {
                const isActive = filters.eventType === evt.name;
                const imgSrc = EVENT_IMAGES[evt.name] || EVENT_IMAGES.Other;
                return (
                  <Box
                    key={evt.name}
                    onClick={() => handleSelect(evt.name)}
                    sx={{
                      borderRadius: 'var(--r-lg)', overflow: 'hidden',
                      aspectRatio: '3/4', position: 'relative', cursor: 'pointer',
                      border: '3px solid',
                      borderColor: isActive ? 'var(--clr-primary)' : 'transparent',
                      transition: 'all 0.22s ease',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 'var(--sh-lg)' },
                      '&:hover .et-overlay': { opacity: 0.5 },
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={evt.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {/* Dark overlay */}
                    <Box
                      className="et-overlay"
                      sx={{
                        position: 'absolute', inset: 0,
                        background: isActive
                          ? 'linear-gradient(to top, rgba(155,77,122,0.85) 0%, rgba(111,49,87,0.4) 100%)'
                          : 'linear-gradient(to top, rgba(43,32,48,0.75) 0%, rgba(43,32,48,0.15) 55%, transparent 100%)',
                        transition: 'opacity 0.22s',
                        opacity: isActive ? 0.9 : 0.7,
                      }}
                    />
                    {/* Active checkmark */}
                    {isActive && (
                      <Box sx={{ position: 'absolute', top: 10, right: 10, width: 22, height: 22, borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: '0.7rem', color: 'var(--clr-primary)', fontWeight: 900 }}>✓</Typography>
                      </Box>
                    )}
                    {/* Label */}
                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 1.5 }}>
                      <Typography sx={{ color: 'white', fontWeight: 700, fontSize: { xs: '0.82rem', md: '0.88rem' }, lineHeight: 1.3 }}>
                        {evt.name}
                      </Typography>
                      {evt.description && (
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.68rem', mt: 0.25, lineHeight: 1.3 }}>
                          {evt.description}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                );
              })}
        </Box>
      </Box>
    </Box>
  );
}