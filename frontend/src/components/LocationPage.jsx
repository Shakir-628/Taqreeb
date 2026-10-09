import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Button, Grid, Card, CardContent, 
  Chip, Skeleton, Stack, IconButton, Divider,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { ArrowBack, LocationOn, FilterList, Sort } from '@mui/icons-material';
import { Container, FlexBox, GridContainer, GridItem } from '../components/ui';
import { api } from '../api';
import VendorCard from './VendorCard';

const areaImages = {
  'DHA': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
  'Clifton': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  'PECHS': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  'North-Nazimabad': 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80',
  'Gulshan-e-Iqbal': 'https://images.unsplash.com/photo-1501183638710-841dd1904473?w=1200&q=80',
  'Gulistan-e-Johar': 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
  'Saddar': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80',
  'Bahadurabad': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
  'Korangi': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
  'Malir': 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=1200&q=80',
};

export default function LocationPage() {
  const { areaName } = useParams();
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Venue', label: 'Venues' },
    { value: 'Decoration', label: 'Decoration' },
    { value: 'Catering', label: 'Catering' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Makeup', label: 'Makeup' },
    { value: 'Transport', label: 'Transport' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Rentals', label: 'Rentals' },
    { value: 'Cakes', label: 'Cakes' },
    { value: 'Planning', label: 'Planning' },
    { value: 'Invitations', label: 'Invitations' },
    { value: 'Gifts', label: 'Gifts' },
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'reviews', label: 'Most Reviewed' },
  ];

  useEffect(() => {
    const decodedArea = decodeURIComponent(areaName || '').replace(/-/g, ' ');
    api.get('/vendors', { params: { area: decodedArea } })
      .then(res => res.data)
      .then(data => {
        const list = Array.isArray(data) ? data : (data?.data || []);
        setVendors(Array.isArray(list) ? list : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setVendors([]);
        setLoading(false);
      });
  }, [areaName]);

  const decodedArea = decodeURIComponent(areaName || '').replace(/-/g, ' ');
  const areaImage = areaImages[areaName] || areaImages['DHA'];

  const safeVendors = Array.isArray(vendors) ? vendors : [];
  const filteredVendors = safeVendors.filter(vendor => 
    !selectedCategory || vendor.category === selectedCategory
  );

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <>
        <Box
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            right: 16,
            maxWidth: 1200,
            mx: 'auto',
            zIndex: 1100,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              borderColor: 'rgba(0,0,0,0.1)',
            }}
          >
            Back to Home
          </Button>
        </Box>
        
        <Container maxWidth="xl" sx={{ pt: 10, pb: 6 }}>
          <Box
            sx={{
              borderRadius: 16,
              overflow: 'hidden',
              height: 300,
              position: 'relative',
              mb: 4,
            }}
          >
            <Box
              component="img"
              src={areaImage}
              alt={decodedArea}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(29,29,31,0.8) 0%, transparent 100%)',
              }}
            />
            <Container maxWidth="xl">
              <Box sx={{ position: 'absolute', bottom: 3, left: 3, right: 3, zIndex: 1 }}>
                <Skeleton variant="text" width="40%" height={40} />
                <Skeleton variant="text" width="60%" height={24} />
              </Box>
            </Container>
          </Box>

          <GridContainer spacing={3}>
            {Array.from({ length: 12 }).map((_, i) => (
              <GridItem key={i} xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rectangular" height={320} style={{ borderRadius: 16 }} />
              </GridItem>
            ))}
          </GridContainer>
        </Container>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          right: 16,
          maxWidth: 1200,
          mx: 'auto',
          zIndex: 1100,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            borderColor: 'rgba(0,0,0,0.1)',
          }}
        >
          Back to Home
        </Button>
      </Box>

      <Container maxWidth="xl" sx={{ pt: 10, pb: 6 }}>
        <Box
          sx={{
            borderRadius: 16,
            overflow: 'hidden',
            height: { xs: 250, md: 350 },
            position: 'relative',
            mb: 4,
          }}
        >
          <Box
            component="img"
            src={areaImage}
            alt={decodedArea}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(29,29,31,0.85) 0%, rgba(29,29,31,0.4) 50%, transparent 100%)',
            }}
          />
          <Container maxWidth="xl">
            <Box sx={{ position: 'absolute', bottom: 3, left: 3, right: 3, zIndex: 1 }}>
              <FlexBox align="center" gap={1} mb={1} flexWrap="wrap">
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                  }}
                >
                  <LocationOn fontSize="medium" color="white" />
                </Box>
                <Typography variant="h3" fontWeight={700} color="white">
                  {decodedArea}
                </Typography>
              </FlexBox>
              <Typography variant="h6" color="rgba(255,255,255,0.85)">
                {safeVendors.length} vendor{safeVendors.length !== 1 ? 's' : ''} available in this location
              </Typography>
            </Box>
          </Container>
        </Box>

        <Stack direction="column" gap={3} mb={4}>
          <FlexBox align="center" justify="space-between" wrap gap={2}>
            <Box>
              <Typography variant="h5" fontWeight={600} color="text.primary">
                Filter & Sort
              </Typography>
            </Box>
            <FlexBox align="center" gap={2}>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FlexBox>
          </FlexBox>
        </Stack>

        {sortedVendors.length > 0 ? (
          <>
            <GridContainer spacing={3}>
              {sortedVendors.map((vendor) => (
                <GridItem key={vendor._id} xs={12} sm={6} md={4} lg={3}>
                  <VendorCard vendor={vendor} />
                </GridItem>
              ))}
            </GridContainer>
          </>
        ) : (
          <Card variant="outlined" sx={{ textAlign: 'center', py: 8, px: 4 }}>
            <CardContent>
              <LocationOn fontSize="large" color="text.secondary" sx={{ mb: 2, display: 'block' }} />
              <Typography variant="h5" fontWeight={600} color="text.primary" mb={1}>
                No vendors found
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                {selectedCategory 
                  ? `No ${selectedCategory.toLowerCase()} vendors in ${decodedArea} yet.` 
                  : `No vendors found in ${decodedArea} with the current filters.`}
              </Typography>
              {selectedCategory && (
                <Button variant="outlined" onClick={() => setSelectedCategory('')}>
                  Show All Categories
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
}