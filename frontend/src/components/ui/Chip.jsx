import React from 'react';
import { Chip as MuiChip, Avatar, Badge, Tooltip } from '@mui/material';

export const Chip = React.forwardRef(
  ({ variant = 'outlined', size = 'medium', color = 'primary', icon, onDelete, ...props }, ref) => (
    <MuiChip
      ref={ref}
      variant={variant}
      size={size}
      color={color}
      icon={icon}
      onDelete={onDelete}
      {...props}
    />
  )
);

Chip.displayName = 'Chip';

export function CategoryChip({ label, icon, count, selected, onClick, color = 'primary' }) {
  return (
    <Tooltip title={label}>
      <MuiChip
        label={label}
        icon={icon}
        variant={selected ? 'filled' : 'outlined'}
        color={selected ? color : 'default'}
        size="small"
        onClick={onClick}
        style={{
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          fontWeight: 500,
        }}
      >
        {count !== undefined && (
          <Badge
            badgeContent={count}
            color="primary"
            size="small"
            variant="dot"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{ marginLeft: 4 }}
          >
            <span>&nbsp;</span>
          </Badge>
        )}
      </MuiChip>
    </Tooltip>
  );
}

export function FilterChip({ label, selected, onClick, icon, count }) {
  return (
    <MuiChip
      label={label}
      icon={icon}
      variant={selected ? 'filled' : 'outlined'}
      color={selected ? 'primary' : 'default'}
      size="small"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        fontWeight: 500,
        borderWidth: selected ? 0 : 2,
      }}
      deleteIcon={
        count !== undefined && (
          <Badge
            badgeContent={count}
            color="primary"
            size="small"
            variant="dot"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <span>&nbsp;</span>
          </Badge>
        )
      }
    />
  );
}

export function AvatarChip({ src, alt, name, size = 40, ...props }) {
  return (
    <MuiChip
      avatar={<Avatar src={src} alt={alt || name} sx={{ width: size, height: size }} />}
      {...props}
    />
  );
}