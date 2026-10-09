import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box, Typography, Stack,
  IconButton, Alert, CircularProgress, Divider,
} from '@mui/material';
import { Close, CheckCircle, WhatsApp, ContentCopy } from '@mui/icons-material';
import { api } from '../api';

const EVENT_TYPES = [
  'Wedding', 'Mehndi', 'Barat', 'Walima', 'Engagement',
  'Birthday', 'Corporate', 'Aqeeqah', 'Anniversary',
  'Baby Shower', 'Graduation', 'Private Party', 'Seminar', 'Other',
];

const GUEST_OPTIONS = [
  { value: '50',  label: 'Up to 50' },
  { value: '100', label: 'Up to 100' },
  { value: '200', label: '100 – 200' },
  { value: '300', label: '200 – 300' },
  { value: '500', label: '300 – 500' },
  { value: '600', label: '500 – 600' },
  { value: '800', label: '600 – 800' },
  { value: '1000', label: '800+' },
];

export default function BookingModal({ open, onClose, vendor }) {
  const [form, setForm] = useState({
    customerName: '', phone: '', email: '',
    eventType: '', eventDate: '', guests: '', budget: '', notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // { reference, vendorName }
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async () => {
    if (!form.customerName.trim() || !form.phone.trim()) {
      setError('Name and phone number are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/bookings', {
        vendorId: vendor._id,
        ...form,
        guests: form.guests ? Number(form.guests) : undefined,
        budget: form.budget ? Number(form.budget) : undefined,
      });
      const booking = res.data?.data || res.data;
      setSuccess({ reference: booking.reference, vendorName: vendor.name });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not send booking request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const whatsapp = vendor.whatsapp || vendor.phone;
    if (!whatsapp) return;
    const number = whatsapp.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum,\nI found your business on TAQREEB.\n\nI am interested in booking: ${vendor.name}\nEvent: ${form.eventType || 'Not specified'}\nDate: ${form.eventDate || 'To be decided'}\nGuests: ${form.guests || 'Not specified'}\n\nBooking Reference: ${success?.reference || ''}\n\nPlease share availability and final pricing.`
    );
    window.open(`https://wa.me/92${number.replace(/^0/, '')}?text=${msg}`, '_blank');
  };

  const handleClose = () => {
    if (!loading) {
      setForm({ customerName: '', phone: '', email: '', eventType: '', eventDate: '', guests: '', budget: '', notes: '' });
      setSuccess(null);
      setError('');
      onClose();
    }
  };

  if (!vendor) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}
    >
      {/* Header */}
      <DialogTitle sx={{ p: 3, pb: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.3 }}>
            {success ? 'Booking Request Sent!' : 'Request a Booking'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {vendor.name}
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleClose} disabled={loading} sx={{ mt: -0.5 }}>
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        {/* ── Success state ── */}
        {success ? (
          <Stack spacing={3} alignItems="center" sx={{ py: 2, textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 64, color: 'var(--clr-success)' }} />
            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                We've forwarded your request to {success.vendorName}
              </Typography>
              <Typography color="text.secondary">
                The vendor will contact you within 24 hours to confirm availability and pricing.
              </Typography>
            </Box>
            <Box
              sx={{
                border: '1px dashed var(--clr-border)',
                borderRadius: 2,
                px: 3, py: 2,
                backgroundColor: 'var(--clr-bg)',
                textAlign: 'center',
                width: '100%',
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Booking Reference
              </Typography>
              <Typography variant="h5" fontWeight={800} color="primary.main" sx={{ letterSpacing: 2 }}>
                {success.reference}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Save this for your records
              </Typography>
            </Box>
            {(vendor.whatsapp || vendor.phone) && (
              <Button
                variant="contained"
                startIcon={<WhatsApp />}
                onClick={handleWhatsApp}
                fullWidth
                sx={{ backgroundColor: 'var(--clr-whatsapp)', color: 'white', '&:hover': { backgroundColor: '#1fb954' }, borderRadius: 2, py: 1.5 }}
              >
                Also message on WhatsApp
              </Button>
            )}
          </Stack>
        ) : (
          /* ── Booking form ── */
          <Stack spacing={2.5}>
            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <TextField
                label="Your Name *"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Phone Number *"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="03XX-XXXXXXX"
                fullWidth
                size="small"
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                fullWidth
                size="small"
              />
              <TextField
                label="Event Type"
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                select
                fullWidth
                size="small"
              >
                {EVENT_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
              <TextField
                label="Event Date"
                name="eventDate"
                value={form.eventDate}
                onChange={handleChange}
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
                size="small"
              />
              <TextField
                label="Number of Guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                select
                fullWidth
                size="small"
              >
                {GUEST_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </TextField>
              <TextField
                label="Budget (PKR)"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                type="number"
                slotProps={{ htmlInput: { min: 0 } }}
                fullWidth
                size="small"
                sx={{ gridColumn: { sm: '1 / -1' } }}
              />
            </Box>

            <TextField
              label="Message / Special Requirements"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              size="small"
              placeholder="Decoration preferences, dietary requirements, any special requests..."
            />

            <Box sx={{ p: 2, background: 'var(--clr-bg)', borderRadius: 2, border: '1px solid var(--clr-border)' }}>
              <Typography variant="caption" color="text.secondary">
                📋 Your request will be sent to <strong>{vendor.name}</strong>. They will reach out to you directly on your phone/email.
              </Typography>
            </Box>
          </Stack>
        )}
      </DialogContent>

      {!success && (
        <>
          <Divider />
          <DialogActions sx={{ p: 3, gap: 1.5 }}>
            <Button onClick={handleClose} disabled={loading} variant="outlined" sx={{ borderRadius: 2 }}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              variant="contained"
              sx={{ borderRadius: 2, px: 4, minWidth: 140 }}
              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {loading ? 'Sending...' : 'Send Request'}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
