import React, { useState, useEffect } from 'react';
import { Box, Typography, Skeleton, Button } from '@mui/material';
import { MapPin } from 'lucide-react';
import { api } from '../api';
import { useSearch } from '../context/SearchContext';

const AREA_IMAGES = {
  'DHA':               'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&q=75',
  'Clifton':           'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=75',
  'PECHS':             'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=75',
  'North Nazimabad':   'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&q=75',
  'Gulshan-e-Iqbal':   'https://images.unsplash.com/photo-1501183638710-841dd1904473?w=500&q=75',
  'Gulistan-e-Johar':  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=75',
  'Saddar':            'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&q=75',
  'Bahadurabad':       'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=75',
  'Korangi':           'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=75',
  'Malir':             'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=500&q=75',
};

export default function Areas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { filters, updateFilter } = useSearch();

  useEffect(() => {
    api.get('/areas')
      .then((res) => {
        const data = res.data?.data || res.data;
        setAreas(Array.isArray(data) ? data.slice(0, 10) : []);
      })
      .catch(() => setAreas([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (name) => {
    updateFilter('area', filters.area === name ? '' : name);
    setTimeout(() => document.getElementById('vendors')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  const displayAreas = areas.length
    ? areas
    : Object.keys(AREA_IMAGES).map((name) => ({ name, count: 0 }));

  return (
    <Box
      component="section"
      id="areas"
      sx={{ py: { xs: 7, md: 11 }, backgroundColor: 'var(--clr-bg)', borderTop: '1px solid var(--clr-border)' }}
    >
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, md: 4 } }}>

        {/* Heading */}
        <Box sx={{ mb: 6, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ maxWidth: 560 }}>
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--clr-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1 }}>
              Browse by location
            </Typography>
            <Typography variant="h3" sx={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, color: 'var(--clr-text)', letterSpacing: '-0.02em', mb: 1.5 }}>
              Popular areas in Karachi
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Discover trusted vendors right in your neighbourhood — from DHA to Gulshan, we've got Karachi covered.
            </Typography>
          </Box>
          {filters.area && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => updateFilter('area', '')}
              sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
            >
              Show all areas
            </Button>
          )}
        </Box>

        {/* Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 2 }}>
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <Box key={i} sx={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', aspectRatio: '4/3' }}>
                  <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%' }} />
                </Box>
              ))
            : displayAreas.map((area) => {
                const isActive = filters.area === area.name;
                const imgSrc = AREA_IMAGES[area.name] || AREA_IMAGES['DHA'];
                return (
                  <Box
                    key={area.name}
                    onClick={() => handleSelect(area.name)}
                    sx={{
                      borderRadius: 'var(--r-lg)', overflow: 'hidden',
                      aspectRatio: '4/3', position: 'relative', cursor: 'pointer',
                      border: '3px solid',
                      borderColor: isActive ? 'var(--clr-primary)' : 'transparent',
                      boxShadow: isActive ? '0 0 0 2px var(--clr-primary)' : 'none',
                      transition: 'all 0.22s ease',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 0 0 2px var(--clr-primary), var(--sh-lg)` },
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={`${area.name} area`}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: isActive ? 'brightness(0.85)' : 'brightness(0.92)' }}
                    />
                    <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(43,32,48,0.7) 0%, transparent 60%)' }} />

                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 1.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                          <MapPin size={12} color="rgba(255,255,255,0.8)" />
                          <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Karachi
                          </Typography>
                        </Box>
                        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.2 }}>
                          {area.name}
                        </Typography>
                        {area.count > 0 && (
                          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem', mt: 0.25 }}>
                            {area.count} vendor{area.count !== 1 ? 's' : ''}
                          </Typography>
                        )}
                      </Box>
                      {isActive && (
                        <Box sx={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography sx={{ color: 'white', fontSize: '0.7rem', fontWeight: 900 }}>✓</Typography>
                        </Box>
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