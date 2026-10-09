import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, FormControl, InputLabel, Select, MenuItem,
  Typography, Box, Grid, IconButton, Alert, Chip
} from '@mui/material';
import { Close, Calculate } from '@mui/icons-material';
import { Modal, Container } from '../components/ui';

export function VendorRegistrationModal({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    category: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    'Venue', 'Decoration', 'Catering', 'Photography', 'Makeup',
    'Transport', 'Entertainment', 'Invitations', 'Rentals',
    'Cakes', 'Planning', 'Gifts', 'Clothing',
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setSubmitting(true);
    try {
      await onSubmit?.(formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 16 } }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Vendor Registration
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 3, py: 3 }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            Create your TAQREEB account and submit your listing for review.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Business Name"
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                error={!!errors.businessName}
                helperText={errors.businessName}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Owner Name"
                value={formData.ownerName}
                onChange={(e) => handleChange('ownerName', e.target.value)}
                error={!!errors.ownerName}
                helperText={errors.ownerName}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small" error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
                {errors.category && <Typography variant="caption" color="error">{errors.category}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone / WhatsApp"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
          <Button variant="outlined" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            type="submit"
            startIcon={<Calculate />}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Registration'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export function BudgetModal({ open, onClose, onGenerate }) {
  const [budget, setBudget] = useState(2000000);
  const [result, setResult] = useState(null);
  const [generating, setGenerating] = useState(false);

  const categories = [
    { name: 'Venue', percentage: 0.35, icon: '🏛️' },
    { name: 'Catering', percentage: 0.25, icon: '🍽️' },
    { name: 'Decoration', percentage: 0.15, icon: '🌸' },
    { name: 'Photography', percentage: 0.10, icon: '📸' },
    { name: 'Entertainment', percentage: 0.08, icon: '🎤' },
    { name: 'Clothing', percentage: 0.04, icon: '👗' },
    { name: 'Others', percentage: 0.03, icon: '✨' },
  ];

  const handleGenerate = () => {
    if (budget < 50000) {
      alert('Minimum budget is PKR 50,000');
      return;
    }
    setGenerating(true);
    const breakdown = categories.map(cat => ({
      ...cat,
      amount: Math.round(budget * cat.percentage),
    }));
    setResult({ total: budget, breakdown });
    setGenerating(false);
    onGenerate?.(budget);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 16 } }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          My Event Budget
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Typography variant="body2" color="text.secondary" paragraph>
          Enter your total budget to get a recommended breakdown.
        </Typography>
        
        <TextField
          fullWidth
          label="Total Budget (PKR)"
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value) || 0)}
          size="small"
          InputProps={{
            startAdornment: 'PKR ',
          }}
        />

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleGenerate}
          disabled={generating}
          startIcon={<Calculate />}
          sx={{ mt: 3 }}
        >
          {generating ? 'Generating...' : 'Generate Plan'}
        </Button>

        {result && (
          <Box sx={{ mt: 4 }}>
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              Budget plan generated for <strong>PKR {result.total.toLocaleString()}</strong>
            </Alert>
            <Grid container spacing={2}>
              {result.breakdown.map((item: any) => (
                <Grid item xs={12} sm={6} md={4} key={item.name}>
                  <Card variant="outlined">
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ mb: 1 }}>{item.icon}</Typography>
                      <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                        {item.name}
                      </Typography>
                      <Typography variant="h6" fontWeight={700} color="primary.main">
                        PKR {item.amount.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {Math.round(item.percentage * 100)}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Modals() {
  return null;
}