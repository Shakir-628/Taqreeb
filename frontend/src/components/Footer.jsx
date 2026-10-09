import React from 'react';
import { 
  Box, Typography, Link as MuiLink, Divider, 
  IconButton, Container, Grid
} from '@mui/material';
import { 
  Facebook, Twitter, Instagram, LinkedIn, YouTube,
  Email, Phone, LocationOn
} from '@mui/icons-material';
import { FlexBox } from '../components/ui';

const footerLinks = {
  explore: [
    { label: 'Find Vendors', href: '#vendors' },
    { label: 'Deals & Offers', href: '#deals' },
    { label: 'Budget Planner', href: '#planner' },
    { label: 'Event Types', href: '#event-types' },
    { label: 'Categories', href: '#categories' },
  ],
  forVendors: [
    { label: 'Register as Vendor', href: '#footer' },
    { label: 'Vendor Login', href: '#footer' },
    { label: 'List Your Venue', href: '#footer' },
    { label: 'Vendor Dashboard', href: '#footer' },
    { label: 'Advertise With Us', href: '#footer' },
  ],
  popularAreas: [
    { label: 'DHA', href: '/locations/DHA' },
    { label: 'Clifton', href: '/locations/Clifton' },
    { label: 'PECHS', href: '/locations/PECHS' },
    { label: 'North Nazimabad', href: '/locations/North-Nazimabad' },
    { label: 'Gulshan-e-Iqbal', href: '/locations/Gulshan-e-Iqbal' },
    { label: 'All Areas', href: '#areas' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

const socialLinks = [
  { icon: <Facebook />, href: 'https://facebook.com/taqreeb', label: 'Facebook' },
  { icon: <Instagram />, href: 'https://instagram.com/taqreeb', label: 'Instagram' },
  { icon: <Twitter />, href: 'https://twitter.com/taqreeb', label: 'Twitter' },
  { icon: <LinkedIn />, href: 'https://linkedin.com/company/taqreeb', label: 'LinkedIn' },
  { icon: <YouTube />, href: 'https://youtube.com/taqreeb', label: 'YouTube' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        backgroundColor: '#2b2030',
        color: '#FFFFFF',
        pt: { xs: 6, md: 9 },
        pb: { xs: 3, md: 4 },
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FlexBox align="flex-start" gap={1} mb={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #c99b4b 0%, #9b4d7a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                }}
              >
                ت
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={700} color="white" sx={{ lineHeight: 1.2 }}>
                  TAQREEB
                </Typography>
                <Typography variant="caption" color="rgba(255,255,255,0.6)" sx={{ lineHeight: 1 }}>
                  Your Celebration, Your Way
                </Typography>
              </Box>
            </FlexBox>
            <Typography variant="body2" color="rgba(255,255,255,0.6)" sx={{ mb: 3, lineHeight: 1.6, maxWidth: '300px' }}>
              Pakistan's leading event planning platform. Find verified vendors, compare packages, and plan your perfect celebration stress-free.
            </Typography>
            <FlexBox align="center" gap={1}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': {
                      backgroundColor: 'rgba(201, 155, 75, 0.2)',
                      color: '#f0c978',
                    },
                  }}
                  aria-label={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </IconButton>
              ))}
            </FlexBox>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <Typography variant="h6" fontWeight={700} color="white" sx={{ mb: 3 }}>
              Explore
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.explore.map((link) => (
                <MuiLink
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#f0c978' },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <Typography variant="h6" fontWeight={700} color="white" sx={{ mb: 3 }}>
              For Vendors
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.forVendors.map((link) => (
                <MuiLink
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#f0c978' },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <Typography variant="h6" fontWeight={700} color="white" sx={{ mb: 3 }}>
              Popular Areas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.popularAreas.map((link) => (
                <MuiLink
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#f0c978' },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <Typography variant="h6" fontWeight={700} color="white" sx={{ mb: 3 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.support.map((link) => (
                <MuiLink
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#f0c978' },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mb: 4 }} />

        <FlexBox align="center" justify="space-between" wrap gap={3}>
          <Typography variant="body2" color="rgba(255,255,255,0.5)">
            © {currentYear} TAQREEB. All rights reserved.
          </Typography>

          <FlexBox align="center" gap={3}>
            <FlexBox align="center" gap={0.5} color="rgba(255,255,255,0.5)" sx={{ fontSize: '0.875rem' }}>
              <LocationOn fontSize="small" />
              <span>Karachi, Pakistan</span>
            </FlexBox>
            <FlexBox align="center" gap={0.5} color="rgba(255,255,255,0.5)" sx={{ fontSize: '0.875rem' }}>
              <Phone fontSize="small" />
              <span>+92 300 0000000</span>
            </FlexBox>
            <FlexBox align="center" gap={0.5} color="rgba(255,255,255,0.5)" sx={{ fontSize: '0.875rem' }}>
              <Email fontSize="small" />
              <span>hello@taqreeb.pk</span>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Container>
    </Box>
  );
}