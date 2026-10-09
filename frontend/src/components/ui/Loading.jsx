import React from 'react';
import { Box, CircularProgress, LinearProgress, Skeleton, Typography, Stack } from '@mui/material';

export function Spinner({ size = 40, thickness = 4, color = 'primary', ...props }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" {...props}>
      <CircularProgress size={size} thickness={thickness} color={color} />
    </Box>
  );
}

export function PageLoader({ text = 'Loading...' }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="400px"
      gap={2}
    >
      <CircularProgress size={48} thickness={4} color="primary" />
      <Typography variant="body1" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}

export function CardSkeleton({ variant = 'vendor' }) {
  if (variant === 'vendor') {
    return (
      <Box>
        <Skeleton variant="rectangular" height={200} width="100%" style={{ borderRadius: '16px 16px 0 0' }} />
        <Stack spacing={1.5} p={3}>
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="text" width="40%" height={20} />
          <Stack direction="row" spacing={2}>
            <Skeleton variant="text" width="80px" height={28} />
            <Skeleton variant="circular" width={80} height={20} />
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Skeleton variant="text" width="30%" height={32} />
            <Skeleton variant="text" width="80px" height={28} />
          </Stack>
        </Stack>
      </Box>
    );
  }

  if (variant === 'list') {
    return (
      <Stack direction="row" spacing={2} p={2}>
        <Skeleton variant="circular" width={80} height={80} />
        <Stack flex={1} spacing={1}>
          <Skeleton variant="text" width="50%" height={24} />
          <Skeleton variant="text" width="30%" height={16} />
          <Skeleton variant="text" width="40%" height={16} />
          <Stack direction="row" spacing={2}>
            <Skeleton variant="circular" width={80} height={20} />
            <Skeleton variant="text" width="80px" height={20} />
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} p={3}>
      <Skeleton variant="text" width="40%" height={32} />
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="rectangular" height={120} width="100%" />
      <Stack direction="row" spacing={2}>
        <Skeleton variant="text" width="100px" height={28} />
        <Skeleton variant="circular" width={100} height={20} />
      </Stack>
    </Stack>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <Box>
      <Stack direction="row" spacing={0} p={2} style={{ backgroundColor: '#FAFAFA' }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} variant="text" width="100%" height={16} sx={{ px: 2 }} />
        ))}
      </Stack>
      {Array.from({ length: rows }).map((_, row) => (
        <Stack key={row} direction="row" spacing={0} p={2} style={{ borderBottom: '1px solid #F0F0F0' }}>
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} variant="text" width="100%" height={16} sx={{ px: 2 }} />
          ))}
        </Stack>
      ))}
    </Box>
  );
}

export function ProgressBar({ value = 0, max = 100, color = 'primary', size = 'medium', label }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const height = size === 'small' ? 4 : size === 'large' ? 12 : 8;

  return (
    <Box>
      {label && (
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
          <Typography variant="body2" fontWeight={500} color={color === 'primary' ? 'primary.main' : 'text.primary'}>
            {percentage.toFixed(0)}%
          </Typography>
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={percentage}
        color={color}
        sx={{ height, borderRadius: height / 2 }}
      />
    </Box>
  );
}