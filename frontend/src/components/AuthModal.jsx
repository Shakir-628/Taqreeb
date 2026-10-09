import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  Button, TextField, Box, Typography, Stack,
  IconButton, Alert, CircularProgress, Divider, Tabs, Tab,
} from '@mui/material';
import { Close, Person, Store } from '@mui/icons-material';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ pt: 3 }}>{children}</Box> : null;
}

export default function AuthModal({ open, onClose, defaultTab = 0 }) {
  const [tab, setTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', phone: '', role: 'customer' });

  const handleLoginChange = (e) => { setLoginForm((p) => ({ ...p, [e.target.name]: e.target.value })); setError(''); };
  const handleRegisterChange = (e) => { setRegisterForm((p) => ({ ...p, [e.target.name]: e.target.value })); setError(''); };

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) { setError('Email and password are required.'); return; }
    setLoading(true);
    try {
      const res = await api.post('/auth/login', loginForm);
      const { token, user } = res.data;
      login(user, token);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setError('Name, email and password are required.'); return;
    }
    if (registerForm.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      const res = await api.post('/auth/register', registerForm);
      const { token, user } = res.data;
      login(user, token);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => { if (!loading) { setError(''); onClose(); } };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ p: 3, pb: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {tab === 0 ? 'Welcome back' : 'Join TAQREEB'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {tab === 0 ? 'Sign in to your account' : 'Create your free account'}
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleClose} disabled={loading}><Close fontSize="small" /></IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Tabs value={tab} onChange={(_, v) => { setTab(v); setError(''); }} variant="fullWidth" sx={{ mb: 1, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}>
          <Tab label="Sign In" />
          <Tab label="Register" />
        </Tabs>

        {error && <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>{error}</Alert>}

        {/* ── Login ── */}
        <TabPanel value={tab} index={0}>
          <Stack spacing={2}>
            <TextField label="Email" name="email" value={loginForm.email} onChange={handleLoginChange} type="email" fullWidth size="small" />
            <TextField label="Password" name="password" value={loginForm.password} onChange={handleLoginChange} type="password" fullWidth size="small"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
            <Button variant="contained" onClick={handleLogin} disabled={loading} fullWidth sx={{ py: 1.5, borderRadius: 2 }}
              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Stack>
        </TabPanel>

        {/* ── Register ── */}
        <TabPanel value={tab} index={1}>
          <Stack spacing={2}>
            <TextField label="Full Name" name="name" value={registerForm.name} onChange={handleRegisterChange} fullWidth size="small" />
            <TextField label="Email" name="email" value={registerForm.email} onChange={handleRegisterChange} type="email" fullWidth size="small" />
            <TextField label="Phone" name="phone" value={registerForm.phone} onChange={handleRegisterChange} placeholder="03XX-XXXXXXX" fullWidth size="small" />
            <TextField label="Password" name="password" value={registerForm.password} onChange={handleRegisterChange} type="password" fullWidth size="small" helperText="Minimum 8 characters" />

            {/* Account type */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>I am a:</Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {[
                  { value: 'customer', label: 'Customer', icon: <Person sx={{ fontSize: 18 }} /> },
                  { value: 'vendor',   label: 'Vendor',   icon: <Store sx={{ fontSize: 18 }} /> },
                ].map((opt) => (
                  <Box
                    key={opt.value}
                    onClick={() => setRegisterForm((p) => ({ ...p, role: opt.value }))}
                    sx={{
                      flex: 1, p: 1.5, borderRadius: 2, border: '2px solid',
                      borderColor: registerForm.role === opt.value ? 'primary.main' : 'var(--clr-border)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1,
                      transition: 'all 0.2s',
                      backgroundColor: registerForm.role === opt.value ? 'rgba(155, 77, 122, 0.06)' : 'transparent',
                    }}
                  >
                    <Box sx={{ color: registerForm.role === opt.value ? 'primary.main' : 'text.secondary' }}>{opt.icon}</Box>
                    <Typography variant="body2" fontWeight={600} color={registerForm.role === opt.value ? 'primary.main' : 'text.secondary'}>
                      {opt.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Button variant="contained" onClick={handleRegister} disabled={loading} fullWidth sx={{ py: 1.5, borderRadius: 2 }}
              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

            <Typography variant="caption" color="text.secondary" align="center">
              By registering, you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Stack>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
}
