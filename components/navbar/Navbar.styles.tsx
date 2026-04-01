import { AppBar, Toolbar, Typography, Box, Button, IconButton, FormControl } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { DESIGN_TOKENS } from '../../theme/tokens';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: 0,
  zIndex: theme.zIndex.appBar,
  backgroundColor: '#101A33',
  color: '#E2E8F0',
  borderBottom: `1px solid ${alpha('#E2E8F0', 0.2)}`,
  boxShadow: '0 10px 28px rgba(2, 6, 23, 0.35)',
  backdropFilter: 'blur(10px)',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    background: `linear-gradient(90deg, ${alpha(theme.palette.primary.light, 0.8)} 0%, ${alpha(theme.palette.secondary.main, 0.85)} 100%)`,
    pointerEvents: 'none',
  },
}));

export const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: DESIGN_TOKENS.spacing.xs * 8,
  minHeight: 72,
  paddingInline: 16,
  '@media (max-width: 1180px)': {
    gap: 12,
    minHeight: 68,
    paddingInline: 12,
  },
  '@media (max-width: 980px)': {
    gap: 10,
    minHeight: 64,
    paddingInline: 10,
  },
}));

export const ToolbarRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginLeft: 'auto',
  flex: 1,
  minWidth: 0,
  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(0.5),
  },
}));

export const RightControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  '@media (max-width: 1024px)': {
    gap: theme.spacing(1),
  },
}));

export const MobileMenuButton = styled(IconButton)(() => ({
  marginRight: 4,
  '@media (min-width: 1025px)': {
    display: 'none',
  },
}));

export const ThemeButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(0),
  border: `1px solid ${alpha('#E2E8F0', 0.28)}`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
  },
  '@media (max-width: 1024px)': {
    padding: 8,
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
  },
}));

export const BrandLink = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  color: 'inherit',
  textDecoration: 'none',
  borderRadius: 14,
  '&:focus-visible': {
    outline: `2px solid ${alpha(theme.palette.primary.light, 0.9)}`,
    outlineOffset: 4,
  },
}));

export const BrandLockup = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8.8,
  '@media (max-width: 1024px)': {
    flexShrink: 0,
  },
}));

export const BrandMark = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 42,
  height: 42,
  flexShrink: 0,
  overflow: 'visible',
  borderRadius: 0,
  filter: `drop-shadow(0 8px 18px ${alpha(theme.palette.common.black, 0.2)})`,
  '@media (max-width: 1180px)': {
    width: 38,
    height: 38,
  },
  '@media (max-width: 980px)': {
    width: 34,
    height: 34,
  },
}));

export const BrandImage = styled('img')(() => ({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'contain',
}));

export const Brand = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: '-0.02em',
  whiteSpace: 'nowrap',
  fontSize: '1.4rem',
  color: theme.palette.primary.light,
  '@media (max-width: 1180px)': {
    fontSize: '1.2rem',
  },
  '@media (max-width: 980px)': {
    fontSize: '1.05rem',
  },
  '@media (max-width: 1024px)': {
    fontSize: '0.98rem',
  },
}));

export const DesktopNav = styled(Box)(() => ({
  alignItems: 'center',
  display: 'none',
  '@media (min-width: 1025px)': {
    display: 'flex',
  },
}));

export const NavButton = styled(Button)(({ theme }) => ({
  marginInline: 2,
  borderRadius: DESIGN_TOKENS.radius.sm,
  minWidth: 'auto',
  paddingInline: theme.spacing(1),
  fontSize: '0.95rem',
  whiteSpace: 'nowrap',
  '@media (max-width: 1180px)': {
    paddingInline: theme.spacing(0.75),
    fontSize: '0.88rem',
  },
  '@media (max-width: 1024px)': {
    paddingInline: theme.spacing(0.5),
    fontSize: '0.82rem',
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
  },
}));

export const LanguageFormControl = styled(FormControl)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  minWidth: DESIGN_TOKENS.size.languageSelectMinWidthMobile,
  '@media (min-width: 1025px)': {
    minWidth: DESIGN_TOKENS.size.languageSelectMinWidthDesktop,
  },
  '@media (max-width: 1180px)': {
    minWidth: 108,
    marginLeft: theme.spacing(0.5),
  },
  '@media (max-width: 1024px)': {
    minWidth: 96,
    display: 'none',
  },
  '& .MuiInputLabel-root': {
    color: alpha('#E2E8F0', 0.78),
    '@media (max-width: 1024px)': {
      fontSize: '0.82rem',
    },
  },
  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
    color: '#E2E8F0',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#E2E8F0',
  },
  '& .MuiOutlinedInput-root': {
    color: '#E2E8F0',
    backgroundColor: alpha('#0A1222', 0.35),
    '@media (max-width: 1024px)': {
      fontSize: '0.82rem',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#E2E8F0',
    WebkitTextFillColor: '#E2E8F0',
  },
  '& .MuiSelect-select': {
    color: '#E2E8F0',
    WebkitTextFillColor: '#E2E8F0',
  },
  '& .MuiSelect-select.MuiSelect-outlined': {
    color: '#E2E8F0',
    WebkitTextFillColor: '#E2E8F0',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha('#E2E8F0', 0.3),
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha('#E2E8F0', 0.45),
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha('#E2E8F0', 0.6),
  },
  '& .MuiSelect-icon': {
    color: alpha('#E2E8F0', 0.78),
  },
}));

export const DrawerLanguageFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1, 2, 2),
  minWidth: `calc(${DESIGN_TOKENS.size.navDrawerWidth}px - ${theme.spacing(4)})`,
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
    color: theme.palette.text.primary,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.background.paper, 0.72),
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.primary,
    WebkitTextFillColor: theme.palette.text.primary,
  },
  '& .MuiSelect-select': {
    color: theme.palette.text.primary,
    WebkitTextFillColor: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(theme.palette.divider, 0.9),
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(theme.palette.primary.main, 0.45),
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiSelect-icon': {
    color: theme.palette.text.secondary,
  },
}));

export const DrawerContent = styled(Box)(() => ({
  paddingTop: 16,
}));

export const drawerPaperSx = {
  width: DESIGN_TOKENS.size.navDrawerWidth,
} as const;

export const languageMenuPaperSx = {
  backgroundColor: '#101A33',
  color: '#E2E8F0',
  border: `1px solid ${alpha('#E2E8F0', 0.2)}`,
  '& .MuiMenuItem-root': {
    color: '#E2E8F0',
  },
  '& .MuiMenuItem-root.Mui-selected': {
    backgroundColor: alpha('#60A5FA', 0.25),
  },
  '& .MuiMenuItem-root.Mui-selected:hover': {
    backgroundColor: alpha('#60A5FA', 0.35),
  },
} as const;
