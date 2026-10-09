import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Box, Button, IconButton, Typography,
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Avatar, Menu, MenuItem, Tooltip, useMediaQuery, useTheme, Divider,
} from '@mui/material';
import {
  Menu as MenuIcon, Search, Favorite, Person, Logout,
  Dashboard, BookOnline, Business, Close,
} from '@mui/icons-material';
import {
  Calendar, MapPin, Utensils, Camera, Shirt, Tag, Home,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const navItems = [
  { label: 'Events',   href: '#event-types',   Icon: Calendar },
  { label: 'Services', href: '#categories',     Icon: Home },
  { label: 'Venues',   href: '#venuetypes',     Icon: MapPin },
  { label: 'Clothing', href: '#clothingtypes',  Icon: Shirt },
  { label: 'Areas',    href: '#areas',           Icon: MapPin },
  { label: 'Vendors',  href: '#vendors',         Icon: Business },
  { label: 'Deals',    href: '#deals',           Icon: Tag },
];

function scrollTo(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Header() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openLogin    = () => { setAuthTab(0); setAuthOpen(true); };
  const openRegister = () => { setAuthTab(1); setAuthOpen(true); };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          zIndex: 1200,
          backgroundColor: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'var(--clr-border)' : 'transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar
          sx={{
            minHeight: scrolled ? 64 : 72,
            px: { xs: 2, md: 3 },
            transition: 'min-height 0.3s ease',
          }}
        >
          {/* ── Logo ── */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', mr: { md: 4 }, flexShrink: 0 }}
            onClick={() => navigate('/')}
            role="link"
            aria-label="TAQREEB home"
          >
            <Box
              sx={{
                width: 38, height: 38, borderRadius: '10px',
                background: 'linear-gradient(135deg, #c99b4b 0%, #9b4d7a 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: '1.1rem',
                fontFamily: 'serif',
                flexShrink: 0,
              }}
            >
              ت
            </Box>
            <Box sx={{ lineHeight: 1 }}>
              <Typography
                sx={{
                  fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
                  fontWeight: 800, fontSize: '1.05rem',
                  color: 'var(--clr-text)', lineHeight: 1.2, letterSpacing: '-0.02em',
                }}
              >
                TAQREEB
              </Typography>
              <Typography
                sx={{ fontSize: '0.65rem', color: 'var(--clr-muted)', lineHeight: 1.1, letterSpacing: '0.02em', display: { xs: 'none', sm: 'block' } }}
              >
                Your Celebration, Your Way
              </Typography>
            </Box>
          </Box>

          {/* ── Desktop nav ── */}
          {!isMobile && (
            <Box
              component="nav"
              aria-label="Main navigation"
              sx={{ display: 'flex', gap: 0.5, flex: 1 }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="text"
                  size="small"
                  onClick={() => scrollTo(item.href)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: 'var(--clr-muted)',
                    px: 1.5, py: 0.75,
                    borderRadius: '8px',
                    '&:hover': { color: 'var(--clr-primary)', backgroundColor: 'rgba(155,77,122,0.06)' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* ── Right actions ── */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            {/* Search shortcut */}
            <Tooltip title="Search vendors">
              <IconButton
                size="small"
                onClick={() => scrollTo('#hero')}
                sx={{ color: 'var(--clr-muted)', '&:hover': { color: 'var(--clr-primary)' } }}
                aria-label="Open search"
              >
                <Search fontSize="small" />
              </IconButton>
            </Tooltip>

            {isAuthenticated ? (
              <>
                <Tooltip title={`Signed in as ${user?.name}`}>
                  <IconButton onClick={(e) => setUserMenuAnchor(e.currentTarget)} size="small">
                    <Avatar
                      sx={{
                        width: 34, height: 34, fontSize: '0.8rem', fontWeight: 700,
                        backgroundColor: 'var(--clr-primary)', color: 'white',
                      }}
                    >
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={() => setUserMenuAnchor(null)}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 200, boxShadow: 'var(--sh-lg)' } }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight={700}>{user?.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
                  </Box>
                  <Divider />
                  {user?.role === 'vendor' && (
                    <MenuItem onClick={() => { setUserMenuAnchor(null); navigate('/vendor/dashboard'); }}>
                      <ListItemIcon><Dashboard fontSize="small" /></ListItemIcon>Vendor Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => { setUserMenuAnchor(null); }}>
                    <ListItemIcon><BookOnline fontSize="small" /></ListItemIcon>My Bookings
                  </MenuItem>
                  <MenuItem onClick={() => { setUserMenuAnchor(null); }}>
                    <ListItemIcon><Favorite fontSize="small" /></ListItemIcon>Saved Vendors
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => { setUserMenuAnchor(null); logout(); }} sx={{ color: 'error.main' }}>
                    <ListItemIcon><Logout fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>Sign Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  size="small"
                  onClick={openLogin}
                  sx={{ textTransform: 'none', fontWeight: 500, color: 'var(--clr-muted)', display: { xs: 'none', sm: 'inline-flex' } }}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={openRegister}
                  sx={{
                    textTransform: 'none', fontWeight: 600,
                    px: { xs: 2, md: 2.5 }, py: 0.875,
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                  }}
                >
                  {isMobile ? 'Join' : 'Register as Vendor'}
                </Button>
              </>
            )}

            {/* Mobile hamburger */}
            {isMobile && (
              <IconButton
                size="small"
                onClick={() => setDrawerOpen(true)}
                sx={{ color: 'var(--clr-text)', ml: 0.5 }}
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, borderRadius: '16px 0 0 16px' } }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--clr-border)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: '8px', background: 'linear-gradient(135deg, #c99b4b, #9b4d7a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontFamily: 'serif', fontSize: '1rem' }}>ت</Box>
            <Typography fontWeight={800} sx={{ fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-0.01em' }}>TAQREEB</Typography>
          </Box>
          <IconButton size="small" onClick={() => setDrawerOpen(false)} aria-label="Close menu"><Close fontSize="small" /></IconButton>
        </Box>
        <List sx={{ px: 1, pt: 1.5 }}>
          {navItems.map((item) => {
            const { Icon } = item;
            return (
              <ListItem
                key={item.label}
                onClick={() => { setDrawerOpen(false); setTimeout(() => scrollTo(item.href), 300); }}
                sx={{ borderRadius: 2, mb: 0.5, cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(155,77,122,0.06)' } }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon size={18} color="var(--clr-muted)" />
                </ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }} />
              </ListItem>
            );
          })}
        </List>
        {!isAuthenticated && (
          <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid var(--clr-border)' }}>
            <Button fullWidth variant="outlined" onClick={() => { setDrawerOpen(false); openLogin(); }} sx={{ mb: 1, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Sign In</Button>
            <Button fullWidth variant="contained" onClick={() => { setDrawerOpen(false); openRegister(); }} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>Register as Vendor</Button>
          </Box>
        )}
      </Drawer>

      {/* ── Auth Modal ── */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultTab={authTab} />
    </>
  );
}