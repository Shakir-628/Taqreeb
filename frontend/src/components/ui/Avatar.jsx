import React from 'react';
import { Avatar as MuiAvatar, Box, Typography } from '@mui/material';

export const Avatar = React.forwardRef(
  ({ src, alt, name, children, sx, ...props }, ref) => {
    const getInitials = (name) => {
      return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const bgColors = [
      '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
      '#2196F3', '#00BCD4', '#009688', '#4CAF50',
      '#FF9800', '#FF5722', '#795548', '#607D8B'
    ];

    const getColorIndex = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash) % bgColors.length;
    };

    const initials = name ? getInitials(name) : '?';
    const bgColor = name ? bgColors[getColorIndex(name)] : '#E91E63';

    return (
      <MuiAvatar
        ref={ref}
        src={src}
        alt={alt || name}
        sx={{
          backgroundColor: bgColor,
          fontWeight: 600,
          ...sx,
        }}
        {...props}
      >
        {children || (src ? undefined : initials)}
      </MuiAvatar>
    );
  }
);

Avatar.displayName = 'Avatar';

export function AvatarGroup({ avatars = [], max = 5, size = 40, ...props }) {
  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <Box display="flex" {...props}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt || avatar.name}
          name={avatar.name}
          sx={{
            width: size,
            height: size,
            border: '2px solid #FFFFFF',
            marginLeft: index === 0 ? 0 : -size * 0.3,
            borderRadius: '50%',
            zIndex: max - index,
            fontSize: size * 0.35,
          }}
        />
      ))}
      {remaining > 0 && (
        <Avatar
          sx={{
            width: size,
            height: size,
            border: '2px solid #FFFFFF',
            marginLeft: -size * 0.3,
            borderRadius: '50%',
            backgroundColor: '#F5F5F5',
            color: '#6E6E73',
            fontWeight: 600,
            fontSize: size * 0.3,
          }}
        >
          +{remaining}
        </Avatar>
      )}
    </Box>
  );
}