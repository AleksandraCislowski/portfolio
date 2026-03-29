import { alpha, createTheme, type ThemeOptions } from '@mui/material/styles';
import type { ThemeMode } from './types';
import { DESIGN_TOKENS } from './tokens';

const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: {
    main: '#0F766E',
    light: '#14B8A6',
    dark: '#0B5E58',
    contrastText: '#F8FAFC',
  },
  secondary: {
    main: '#B45309',
    light: '#F59E0B',
    dark: '#7C2D12',
    contrastText: '#FFFBEB',
  },
  background: {
    default: '#FCFAF5',
    paper: '#FFFEFB',
  },
  text: {
    primary: '#2A221A',
    secondary: '#5D5348',
  },
  divider: '#E8DECF',
};

const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: {
    main: '#2DD4BF',
    light: '#5EEAD4',
    dark: '#14B8A6',
    contrastText: '#0B1120',
  },
  secondary: {
    main: '#FB923C',
    light: '#FDBA74',
    dark: '#C2410C',
    contrastText: '#111827',
  },
  background: {
    default: '#0A1222',
    paper: '#111C34',
  },
  text: {
    primary: '#E2E8F0',
    secondary: '#94A3B8',
  },
  divider: '#22314C',
};

const sharedThemeOptions: ThemeOptions = {
  shape: {
    borderRadius: DESIGN_TOKENS.radius.md,
  },
  typography: {
    fontFamily:
      'var(--font-geist-sans), "Avenir Next", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: 'clamp(2.25rem, 6vw, 3.5rem)',
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
    },
    h3: {
      fontWeight: 700,
      fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body2: {
      lineHeight: 1.7,
    },
    caption: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },
};

export function getAppTheme(mode: ThemeMode) {
  const palette = mode === 'dark' ? darkPalette : lightPalette;

  return createTheme({
    ...sharedThemeOptions,
    palette,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage:
              mode === 'dark'
                ? 'radial-gradient(circle at 20% 20%, rgba(45,212,191,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(251,146,60,0.08), transparent 35%)'
                : 'radial-gradient(circle at 12% 10%, rgba(245,158,11,0.08), transparent 34%), radial-gradient(circle at 88% 2%, rgba(15,118,110,0.06), transparent 38%)',
            backgroundAttachment: 'fixed',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.background.paper, 0.82),
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
            boxShadow:
              mode === 'dark'
                ? '0 12px 28px rgba(2, 6, 23, 0.4)'
                : '0 12px 28px rgba(15, 23, 42, 0.08)',
          }),
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            color: theme.palette.text.primary,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.divider, 0.9),
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.primary.main, 0.55),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
              borderWidth: 1,
            },
          }),
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.secondary,
            '&.Mui-focused': {
              color: theme.palette.primary.main,
            },
          }),
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: ({ theme }) => ({
            color: theme.palette.text.primary,
          }),
          icon: ({ theme }) => ({
            color: theme.palette.text.secondary,
          }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.primary,
          }),
        },
      },
      MuiTypography: {
        styleOverrides: {
          subtitle1: ({ theme }) => ({
            color: theme.palette.text.secondary,
          }),
          body2: ({ theme }) => ({
            color: theme.palette.text.secondary,
          }),
          caption: ({ theme }) => ({
            color: theme.palette.text.secondary,
          }),
        },
      },
    },
  });
}
