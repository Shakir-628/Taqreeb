import React, { useState, useEffect } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import {
  Building2, Sparkles, Utensils, Camera, Palette,
  Car, Music, Mail, Armchair, Cake, ClipboardList, Gift, Shirt,
} from 'lucide-react';
import { api } from '../api';
import { useSearch } from '../context/SearchContext';

const ICON_MAP = {
  Venue:         Building2,
  Decoration:    Sparkles,
  Catering:      Utensils,
  Photography:   Camera,
  Makeup:        Palette,
  Transport:     Car,
  Entertainment: Music,
  Invitations:   Mail,
  Rentals:       Armchair,
  Cakes:         Cake,
  Planning:      ClipboardList,
  Gifts:         Gift,
  Clothing:      Shirt,
};

const SHORT_DESC = {
  Venue:         'Halls, marquees & lawns',
  Decoration:    'Floral & themed setups',
  Catering:      'Desi & continental menus',
  Photography:   'Capture every moment',
  Makeup:        'Bridal & party artists',
  Transport:     'Luxury & vintage rides',
  Entertainment: 'Qawwali, DJ & more',
  Invitations:   'Cards & digital invites',
  Rentals:       'Chairs, tents & tableware',
  Cakes:         'Custom & celebration cakes',
  Planning:      'Full event management',
  Gifts:         'Favours & hampers',
  Clothing:      'Bridal, groom & formal',
};

const FALLBACK_CATEGORIES = Object.keys(ICON_MAP).map((name) => ({ name, count: 0 }));

export default function Categories() {
  const { filters, updateFilter } = useSearch();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then((res) => {
        const data = res.data?.data || res.data;
        setCategories(Array.isArray(data) ? data : FALLBACK_CATEGORIES);
      })
      .catch(() => setCategories(FALLBACK_CATEGORIES))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (name) => {
    updateFilter('category', filters.category === name ? '' : name);
    setTimeout(() => document.getElementById('vendors')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  return (
    <Box
      component="section"
      id="categories"
      sx={{ py: { xs: 7, md: 11 }, backgroundColor: 'white', borderTop: '1px solid var(--clr-border)' }}
    >
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, md: 4 } }}>

        {/* Heading */}
        <Box sx={{ mb: 6, maxWidth: 600 }}>
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--clr-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1 }}>
            What do you need?
          </Typography>
          <Typography variant="h3" sx={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, color: 'var(--clr-text)', letterSpacing: '-0.02em', mb: 1.5 }}>
            Everything you need for your celebration
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
            Browse by service category and discover verified professionals ready to make your event perfect.
          </Typography>
        </Box>

        {/* Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 2 }}>
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <Box key={i} sx={{ borderRadius: 'var(--r-lg)', border: '1px solid var(--clr-border)', p: 2.5 }}>
                  <Skeleton variant="circular" width={44} height={44} sx={{ mb: 1.5 }} />
                  <Skeleton variant="text" width="70%" height={20} sx={{ mb: 0.5 }} />
                  <Skeleton variant="text" width="90%" height={14} sx={{ mb: 0.5 }} />
                  <Skeleton variant="text" width="40%" height={14} />
                </Box>
              ))
            : (categories.length ? categories : FALLBACK_CATEGORIES).map((cat) => {
                const Icon = ICON_MAP[cat.name] || Building2;
                const isActive = filters.category === cat.name;
                return (
                  <Box
                    key={cat.name}
                    onClick={() => handleSelect(cat.name)}
                    sx={{
                      borderRadius: 'var(--r-lg)',
                      border: '2px solid',
                      borderColor: isActive ? 'var(--clr-primary)' : 'var(--clr-border)',
                      p: 2.5,
                      cursor: 'pointer',
                      backgroundColor: isActive ? 'rgba(155,77,122,0.05)' : 'white',
                      transition: 'all 0.22s ease',
                      '&:hover': {
                        borderColor: 'var(--clr-primary)',
                        backgroundColor: 'rgba(155,77,122,0.04)',
                        transform: 'translateY(-3px)',
                        boxShadow: 'var(--sh-md)',
                      },
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 44, height: 44, borderRadius: '12px', mb: 1.75,
                        backgroundColor: isActive ? 'var(--clr-primary)' : 'rgba(155,77,122,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background-color 0.22s',
                      }}
                    >
                      <Icon size={20} color={isActive ? '#ffffff' : 'var(--clr-primary)'} strokeWidth={1.75} />
                    </Box>

                    <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: isActive ? 'var(--clr-primary)' : 'var(--clr-text)', mb: 0.4, lineHeight: 1.3 }}>
                      {cat.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: 'var(--clr-muted)', lineHeight: 1.4, mb: 0.75 }}>
                      {SHORT_DESC[cat.name] || ''}
                    </Typography>
                    {cat.count > 0 && (
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--clr-gold)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {cat.count} vendor{cat.count !== 1 ? 's' : ''}
                      </Typography>
                    )}
                  </Box>
                );
              })}
        </Box>
      </Box>
    </Box>
  );
}