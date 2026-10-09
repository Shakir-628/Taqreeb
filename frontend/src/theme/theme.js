import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9b4d7a',
      light: '#c36b85',
      dark: '#6c3b5f',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#c99b4b',
      light: '#e0be78',
      dark: '#96702e',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#fff7fb',
      paper: '#FFFFFF',
      elevated: '#F5F5F5',
    },
    surface: {
      main: '#FFFFFF',
      variant: '#F5F5F5',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },
    warning: {
      main: '#F57C00',
      light: '#FF9800',
      dark: '#E65100',
    },
    info: {
      main: '#1976D2',
      light: '#42A5F5',
      dark: '#1565C0',
    },
    success: {
      main: '#388E3C',
      light: '#66BB6A',
      dark: '#2E7D32',
    },
    text: {
      primary: '#2b2030',
      secondary: '#6f6670',
      disabled: '#A1A1A6',
    },
    divider: '#eadfe6',
    action: {
      active: '#1D1D1F',
      hover: 'rgba(29, 29, 31, 0.08)',
      selected: 'rgba(233, 30, 99, 0.12)',
      disabled: 'rgba(29, 29, 31, 0.26)',
      disabledBackground: 'rgba(29, 29, 31, 0.12)',
    },
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    '0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.06)',
    '0 4px 8px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.08)',
    '0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.1)',
    '0 12px 24px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.12)',
    '0 16px 32px rgba(0,0,0,0.09), 0 32px 64px rgba(0,0,0,0.14)',
    '0 20px 40px rgba(0,0,0,0.1), 0 40px 80px rgba(0,0,0,0.16)',
    '0 24px 48px rgba(0,0,0,0.11), 0 48px 96px rgba(0,0,0,0.18)',
    '0 28px 56px rgba(0,0,0,0.12), 0 56px 112px rgba(0,0,0,0.2)',
    '0 32px 64px rgba(0,0,0,0.13), 0 64px 128px rgba(0,0,0,0.22)',
    '0 36px 72px rgba(0,0,0,0.14), 0 72px 144px rgba(0,0,0,0.24)',
    '0 40px 80px rgba(0,0,0,0.15), 0 80px 160px rgba(0,0,0,0.26)',
    '0 44px 88px rgba(0,0,0,0.16), 0 88px 176px rgba(0,0,0,0.28)',
    '0 48px 96px rgba(0,0,0,0.17), 0 96px 192px rgba(0,0,0,0.3)',
    '0 52px 104px rgba(0,0,0,0.18), 0 104px 208px rgba(0,0,0,0.32)',
    '0 56px 112px rgba(0,0,0,0.19), 0 112px 224px rgba(0,0,0,0.34)',
    '0 60px 120px rgba(0,0,0,0.2), 0 120px 240px rgba(0,0,0,0.36)',
    '0 64px 128px rgba(0,0,0,0.21), 0 128px 256px rgba(0,0,0,0.38)',
    '0 68px 136px rgba(0,0,0,0.22), 0 136px 272px rgba(0,0,0,0.4)',
    '0 72px 144px rgba(0,0,0,0.23), 0 144px 288px rgba(0,0,0,0.42)',
    '0 76px 152px rgba(0,0,0,0.24), 0 152px 304px rgba(0,0,0,0.44)',
    '0 80px 160px rgba(0,0,0,0.25), 0 160px 320px rgba(0,0,0,0.46)',
    '0 84px 168px rgba(0,0,0,0.26), 0 168px 336px rgba(0,0,0,0.48)',
    '0 88px 176px rgba(0,0,0,0.27), 0 176px 352px rgba(0,0,0,0.5)',
  ],
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '*::selection': {
          backgroundColor: 'rgba(233, 30, 99, 0.2)',
        },
        '::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#E0E0E0',
          borderRadius: 4,
          '&:hover': {
            backgroundColor: '#BDBDBD',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: 'medium',
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontWeight: 600,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          boxShadow: '0 2px 8px rgba(233, 30, 99, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(233, 30, 99, 0.4)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(233, 30, 99, 0.08)',
          },
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.8125rem',
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid #E0E0E0',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.06)',
            transform: 'translateY(-4px)',
            borderColor: '#E91E63',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: '0.75rem',
          height: 28,
        },
        outlined: {
          borderWidth: 1.5,
        },
        filled: {
          backgroundColor: 'rgba(233, 30, 99, 0.12)',
          color: '#C2185B',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E91E63',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
              borderColor: '#E91E63',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
            color: '#6E6E73',
            '&.Mui-focused': {
              color: '#E91E63',
            },
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '10px 16px',
          fontSize: '0.875rem',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: 'rgba(233, 30, 99, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
        },
        elevation2: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.06)',
        },
        elevation3: {
          boxShadow: '0 4px 8px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E0E0E0',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #E0E0E0',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          margin: '4px 8px',
          '&:hover': {
            backgroundColor: 'rgba(233, 30, 99, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(233, 30, 99, 0.12)',
            color: '#C2185B',
            '&:hover': {
              backgroundColor: 'rgba(233, 30, 99, 0.16)',
            },
            '& .MuiListItemIcon-root': {
              color: '#C2185B',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#6E6E73',
          minWidth: 40,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: 500,
          fontSize: '0.9375rem',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '&:hover': {
            backgroundColor: 'rgba(233, 30, 99, 0.08)',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 48,
        },
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
          backgroundColor: '#E91E63',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.875rem',
          textTransform: 'none',
          minHeight: 48,
          color: '#6E6E73',
          '&.Mui-selected': {
            color: '#E91E63',
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #E0E0E0',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#FAFAFA',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#6E6E73',
            borderBottom: '1px solid #E0E0E0',
            padding: '16px 20px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px 20px',
          borderBottom: '1px solid #F0F0F0',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child .MuiTableCell-root': {
            borderBottom: 'none',
          },
          '&:hover': {
            backgroundColor: '#FAFAFA',
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 500,
          '&.Mui-selected': {
            backgroundColor: '#E91E63',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#C2185B',
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontSize: '0.875rem',
        },
        standardSuccess: {
          backgroundColor: '#E8F5E9',
          color: '#2E7D32',
        },
        standardError: {
          backgroundColor: '#FDEDEC',
          color: '#C62828',
        },
        standardWarning: {
          backgroundColor: '#FFF8E1',
          color: '#E65100',
        },
        standardInfo: {
          backgroundColor: '#E3F2FD',
          color: '#1565C0',
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#1D1D1F',
          color: '#FFFFFF',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          fontSize: '0.75rem',
          padding: '8px 12px',
          backgroundColor: '#1D1D1F',
        },
        arrow: {
          color: '#1D1D1F',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          padding: 8,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          fontWeight: 600,
          padding: '24px 24px 0',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '24px 24px 0',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(29, 29, 31, 0.5)',
          backdropFilter: 'blur(4px)',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#E0E0E0',
        },
      },
    },
  },
});

export default theme;