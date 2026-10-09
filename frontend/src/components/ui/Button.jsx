import React from 'react';
import { Button as MuiButton } from '@mui/material';

export const Button = React.forwardRef(
  ({ children, variant = 'contained', size = 'medium', startIcon, endIcon, fullWidth = false, disabled, loading, ...props }, ref) => {
    return (
      <MuiButton
        ref={ref}
        variant={variant}
        size={size}
        startIcon={startIcon}
        endIcon={endIcon}
        fullWidth={fullWidth}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{
                width: size === 'small' ? 16 : size === 'large' ? 24 : 20,
                height: size === 'small' ? 16 : size === 'large' ? 24 : 20,
                border: '2px solid currentColor',
                borderRightColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite',
              }} />
            </span>
          </>
        ) : (
          children
        )}
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </MuiButton>
    );
  }
);

Button.displayName = 'Button';