import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Input = React.forwardRef(
  ({ label, error, helperText, showPasswordToggle = false, type = 'text', InputProps, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <TextField
        ref={ref}
        label={label}
        error={!!error}
        helperText={error || helperText}
        type={showPasswordToggle && showPassword ? 'text' : type}
        InputProps={{
          ...InputProps,
          endAdornment: showPasswordToggle ? (
            <InputAdornment position="end">
              <IconButton
                onClick={handleTogglePassword}
                edge="end"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                size="small"
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ) : InputProps?.endAdornment,
        }}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';