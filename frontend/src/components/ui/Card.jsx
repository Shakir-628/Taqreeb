import React from 'react';
import { Card as MuiCard, CardContent, CardMedia, CardActions, Typography, Chip, Box } from '@mui/material';
import { Rating } from '@mui/material';

export function VendorCard({ image, name, category, area, price, rating = 0, reviews = 0, verified, deal, onClick, children }) {
  return (
    <MuiCard onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {image && (
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={name}
        />
      )}
      <CardContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={1.5}>
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {name}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
              <Chip
                label={category}
                size="small"
                variant="outlined"
                color="primary"
              />
              {verified && (
                <Chip
                  label="Verified"
                  size="small"
                  icon={<span style={{fontSize: 10}}>✓</span>}
                  color="success"
                  variant="filled"
                />
              )}
            </Box>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={1.5} flexWrap="wrap">
          <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
            <span>📍</span>
            <Typography variant="body2">{area}</Typography>
          </Box>
          {rating > 0 && (
            <Box display="flex" alignItems="center" gap={0.5}>
              <Rating value={rating} readOnly size="small" precision={0.5} />
              <Typography variant="body2" color="text.secondary">
                ({reviews})
              </Typography>
            </Box>
          )}
        </Box>

        <Box display="flex" alignItems="baseline" justifyContent="space-between" flexWrap="wrap" gap={1}>
          <Box>
            <Typography variant="h5" color="primary.main" fontWeight={700}>
              Rs. {price.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {price > 10000 ? '/ event' : '/ plate'}
            </Typography>
          </Box>
          {deal && (
            <Chip
              label={deal}
              size="small"
              variant="filled"
              color="warning"
              icon={<span style={{fontSize: 10}}>🏷️</span>}
            />
          )}
        </Box>
      </CardContent>
      {children && (
        <CardActions style={{ padding: '0 16px 16px' }}>
          {children}
        </CardActions>
      )}
    </MuiCard>
  );
}

export function Card({ children, ...props }) {
  return <MuiCard {...props}>{children}</MuiCard>;
}

export { CardContent, CardMedia, CardActions };