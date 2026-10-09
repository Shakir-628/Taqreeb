import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Chip, MenuItem, TextField,
  Select, FormControl, InputLabel, Pagination, Stack, Alert,
} from '@mui/material';
import { FilterList, Sort, Clear } from '@mui/icons-material';
import { SlidersHorizontal } from 'lucide-react';
import VendorCard from './VendorCard';
import { useSearch } from '../context/SearchContext';

const CATEGORIES = [
  '', 'Venue', 'Decoration', 'Catering', 'Photography',
  'Clothing', 'Makeup', 'Transport', 'Entertainment',
  'Rentals', 'Cakes', 'Planning', 'Invitations', 'Gifts',
];

const AREAS = [
  '', 'DHA', 'Clifton', 'PECHS', 'North Nazimabad',
  'Gulshan-e-Iqbal', 'Gulistan-e-Johar', 'Saddar', 'Bahadurabad', 'Korangi', 'Malir',
];

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'rating',      label: 'Highest Rated' },
  { value: 'price-low',   label: 'Price: Low to High' },
  { value: 'price-high',  label: 'Price: High to Low' },
  { value: 'reviews',     label: 'Most Reviewed' },
  { value: 'newest',      label: 'Newest' },
];

function SkeletonCard() {
  return (
    <Box sx={{ borderRadius: 'var(--r-lg)', border: '1px solid var(--clr-border)', overflow: 'hidden', backgroundColor: 'white' }}>
      <Box className="skeleton" sx={{ height: 220 }} />
      <Box sx={{ p: 2.5 }}>
        <Box className="skeleton" sx={{ height: 18, width: '40%', mb: 1.5 }} />
        <Box className="skeleton" sx={{ height: 22, width: '80%', mb: 1 }} />
        <Box className="skeleton" sx={{ height: 16, width: '60%', mb: 1 }} />
        <Box className="skeleton" sx={{ height: 16, width: '50%', mb: 2 }} />
        <Box className="skeleton" sx={{ height: 26, width: '45%', mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box className="skeleton" sx={{ height: 36, flex: 1, borderRadius: 1 }} />
          <Box className="skeleton" sx={{ height: 36, flex: 1, borderRadius: 1 }} />
          <Box className="skeleton" sx={{ height: 36, width: 36, borderRadius: 1 }} />
        </Box>
      </Box>
    </Box>
  );
}

export default function VendorList({ vendors, pagination, loading, apiError, onPageChange }) {
  const { filters, updateFilter, updateFilters, clearFilters, hasActiveFilters } = useSearch();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Active filter chips
  const activeChips = [
    filters.category && { key: 'category', label: filters.category },
    filters.area     && { key: 'area',     label: filters.area },
    filters.budget   && { key: 'budget',   label: `Under PKR ${Number(filters.budget).toLocaleString()}` },
    filters.guests   && { key: 'guests',   label: `${filters.guests}+ guests` },
    filters.q        && { key: 'q',        label: `"${filters.q}"` },
    filters.eventType && { key: 'eventType', label: filters.eventType },
  ].filter(Boolean);

  return (
    <Box component="section" id="vendors" sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'var(--clr-bg)' }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, md: 4 } }}>

        {/* ── Section header ── */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--clr-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 0.75 }}>
              Browse vendors
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, color: 'var(--clr-text)', letterSpacing: '-0.02em' }}
            >
              {loading ? 'Finding vendors…' : pagination?.total > 0
                ? `${pagination.total.toLocaleString()} vendor${pagination.total !== 1 ? 's' : ''} found`
                : 'Vendors'}
            </Typography>
          </Box>
        </Box>

        {/* ── Filter toolbar ── */}
        <Box
          sx={{
            display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5,
            mb: 3, p: 2, backgroundColor: 'white',
            borderRadius: 'var(--r-lg)', border: '1px solid var(--clr-border)',
            boxShadow: 'var(--sh-sm)',
          }}
        >
          {/* Category select */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel sx={{ fontSize: '0.85rem' }}>Category</InputLabel>
            <Select
              value={filters.category}
              label="Category"
              onChange={(e) => updateFilter('category', e.target.value)}
              sx={{ fontSize: '0.85rem', borderRadius: '8px' }}
            >
              <MenuItem value=""><em>All Categories</em></MenuItem>
              {CATEGORIES.filter(Boolean).map((c) => <MenuItem key={c} value={c} sx={{ fontSize: '0.85rem' }}>{c}</MenuItem>)}
            </Select>
          </FormControl>

          {/* Area select */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel sx={{ fontSize: '0.85rem' }}>Area</InputLabel>
            <Select
              value={filters.area}
              label="Area"
              onChange={(e) => updateFilter('area', e.target.value)}
              sx={{ fontSize: '0.85rem', borderRadius: '8px' }}
            >
              <MenuItem value=""><em>All Areas</em></MenuItem>
              {AREAS.filter(Boolean).map((a) => <MenuItem key={a} value={a} sx={{ fontSize: '0.85rem' }}>{a}</MenuItem>)}
            </Select>
          </FormControl>

          {/* Search box */}
          <TextField
            size="small"
            placeholder="Search by name..."
            value={filters.q}
            onChange={(e) => updateFilter('q', e.target.value)}
            sx={{ minWidth: 180, '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.85rem' } }}
            slotProps={{ htmlInput: { maxLength: 80 } }}
          />

          {/* Sort */}
          <FormControl size="small" sx={{ minWidth: 170, ml: 'auto' }}>
            <InputLabel sx={{ fontSize: '0.85rem' }}>Sort by</InputLabel>
            <Select
              value={filters.sort}
              label="Sort by"
              onChange={(e) => updateFilter('sort', e.target.value)}
              sx={{ fontSize: '0.85rem', borderRadius: '8px' }}
            >
              {SORT_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value} sx={{ fontSize: '0.85rem' }}>{o.label}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>

        {/* ── Active filter chips ── */}
        {activeChips.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {activeChips.map((chip) => (
              <Chip
                key={chip.key}
                label={chip.label}
                onDelete={() => updateFilter(chip.key, '')}
                size="small"
                sx={{
                  backgroundColor: 'rgba(155,77,122,0.1)',
                  color: 'var(--clr-primary)',
                  fontWeight: 600, fontSize: '0.78rem',
                  '& .MuiChip-deleteIcon': { color: 'var(--clr-primary)' },
                  borderRadius: '20px',
                }}
              />
            ))}
            <Chip
              label="Clear all"
              onClick={clearFilters}
              size="small"
              icon={<Clear sx={{ fontSize: '14px !important' }} />}
              sx={{ fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', borderRadius: '20px' }}
            />
          </Box>
        )}

        {/* ── API warning banner ── */}
        {apiError && (
          <Alert
            severity="info"
            sx={{ mb: 3, borderRadius: 2, fontSize: '0.85rem', backgroundColor: 'rgba(201,155,75,0.08)', color: 'var(--clr-text)', border: '1px solid rgba(201,155,75,0.25)' }}
          >
            Showing sample vendors — connect to the backend to see live data.
          </Alert>
        )}

        {/* ── Vendor grid ── */}
        {loading ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </Box>
        ) : vendors.length === 0 ? (
          /* ── Empty state ── */
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ fontSize: '3rem', mb: 2, opacity: 0.3 }}>🔍</Typography>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>No vendors found</Typography>
            <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 360, mx: 'auto' }}>
              Try changing your location, budget or category to find more options.
            </Typography>
            <Button variant="outlined" onClick={clearFilters} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}>
              Clear Filters
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
            {vendors.map((vendor) => (
              <VendorCard key={vendor._id} vendor={vendor} />
            ))}
          </Box>
        )}

        {/* ── Pagination ── */}
        {!loading && pagination?.pages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={pagination.pages}
              page={pagination.page}
              onChange={(_, p) => onPageChange?.(p)}
              color="primary"
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': { borderRadius: '8px', fontWeight: 600 },
                '& .Mui-selected': { backgroundColor: 'var(--clr-primary) !important' },
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}