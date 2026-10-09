import React from 'react';
import { Container as MuiContainer, Box, Grid } from '@mui/material';

export const Container = React.forwardRef(
  ({ children, maxWidth = 'xl', ...props }, ref) => (
    <MuiContainer ref={ref} maxWidth={maxWidth} {...props}>
      {children}
    </MuiContainer>
  )
);

Container.displayName = 'Container';

export const FlexBox = React.forwardRef(
  ({ 
    direction = 'row', 
    align = 'stretch', 
    justify = 'flex-start', 
    gap = 0, 
    wrap = false, 
    children, 
    sx,
    ...props 
  }, ref) => (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        gap,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
);

FlexBox.displayName = 'FlexBox';

export const GridContainer = React.forwardRef(
  ({ children, ...props }, ref) => (
    <Grid ref={ref} container {...props}>
      {children}
    </Grid>
  )
);

GridContainer.displayName = 'GridContainer';

export const GridItem = React.forwardRef(
  ({ children, xs = 12, sm, md, lg, xl, ...props }, ref) => (
    <Grid
      ref={ref}
      size={{ xs, sm, md, lg, xl }}
      {...props}
    >
      {children}
    </Grid>
  )
);

GridItem.displayName = 'GridItem';