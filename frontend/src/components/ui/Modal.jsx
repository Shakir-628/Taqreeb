import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

export function Modal({ 
  open, 
  onClose, 
  title, 
  children, 
  actions, 
  maxWidth = 'md', 
  fullWidth = true,
  closeIcon = true,
  ...props 
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      {...props}
    >
      {(title || closeIcon) && (
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
            {title}
          </Typography>
          {closeIcon && (
            <IconButton onClick={onClose} size="small" aria-label="Close">
              <Close fontSize="medium" />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent sx={{ px: 3, py: 3 }}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}

export function ConfirmDialog({ 
  open, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  variant = 'primary',
  loading = false,
}) {
  const confirmColor = variant === 'danger' ? 'error' : variant === 'warning' ? 'warning' : 'primary';

  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="sm">
      <Typography variant="body1" color="text.secondary" paragraph>
        {message}
      </Typography>
      <Modal.Actions>
        <Button onClick={onClose} variant="outlined" disabled={loading}>
          {cancelText}
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color={confirmColor}
          disabled={loading}
          loading={loading}
        >
          {confirmText}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export function Drawer({ open, onClose, title, children, anchor = 'right', variant = 'temporary' }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth={anchor === 'left' || anchor === 'right' ? 'sm' : 'md'}
      fullWidth={false}
      sx={{
        '& .MuiDialog-paper': {
          margin: anchor === 'left' || anchor === 'right' ? 0 : 'auto',
          maxHeight: anchor === 'left' || anchor === 'right' ? '100vh' : undefined,
          height: anchor === 'left' || anchor === 'right' ? '100vh' : undefined,
          borderRadius: anchor === 'left' ? '0 16px 16px 0' : anchor === 'right' ? '16px 0 0 16px' : 16,
        },
      }}
    >
      {title && (
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
          <Typography variant="h6" fontWeight={600}>{title}</Typography>
          <IconButton onClick={onClose} size="small">
            <Close fontSize="medium" />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent sx={{ px: 3, py: 3, overflow: 'auto' }}>
        {children}
      </DialogContent>
    </Modal>
  );
}

Modal.Actions = ({ children }) => (
  <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
    {children}
  </DialogActions>
);

Modal.Title = DialogTitle;
Modal.Content = DialogContent;