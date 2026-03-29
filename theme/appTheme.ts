import { alpha, createTheme, type ThemeOptions } from '@mui/material/styles';
import type { ThemeMode } from './types';
import { DESIGN_TOKENS } from './tokens';

const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: {
    main: '#2563EB',
    light: '#3B82F6',
    dark: '#1D4ED8',
    contrastText: '#EFF6FF',
  },
  secondary: {
    main: '#7C3AED',
    light: '#A78BFA',
    dark: '#6D28D9',
    contrastText: '#F5F3FF',
  },
  background: {
    default: '#F6F9FF',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#0F172A',
    secondary: '#475569',
  },
  divider: '#D9E5FF',
};

const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: {
    main: '#60A5FA',
    light: '#93C5FD',
    dark: '#3B82F6',
    contrastText: '#0B1220',
  },
  secondary: {
    main: '#C4B5FD',
    light: '#DDD6FE',
    dark: '#8B5CF6',
    contrastText: '#111827',
  },
  background: {
    default: '#0A1222',
    paper: '#101A33',
  },
  text: {
    primary: '#E2E8F0',
    secondary: '#94A3B8',
  },
  divider: '#25365E',
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
                ? 'radial-gradient(circle at 18% 18%, rgba(96,165,250,0.16), transparent 42%), radial-gradient(circle at 82% 0%, rgba(124,58,237,0.14), transparent 36%)'
                : 'radial-gradient(circle at 10% 8%, rgba(59,130,246,0.14), transparent 34%), radial-gradient(circle at 90% 2%, rgba(139,92,246,0.12), transparent 38%), radial-gradient(circle at 50% 100%, rgba(45,212,191,0.08), transparent 40%)',
            backgroundAttachment: 'fixed',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.background.paper, 0.82),
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
            boxShadow: '0 10px 28px rgba(2, 6, 23, 0.35)',
          }),
          colorDefault: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.background.paper, 0.82),
            color: theme.palette.text.primary,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
            boxShadow: '0 10px 28px rgba(2, 6, 23, 0.35)',
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
