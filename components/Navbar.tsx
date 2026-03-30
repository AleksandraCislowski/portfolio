import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import type { SelectChangeEvent } from '@mui/material/Select';
import { LANGUAGES, useLanguage, type Language } from '../i18n/LanguageContext';
import { useTranslation } from '../i18n/useTranslation';
import { useThemeMode } from '../theme/ThemeModeContext';
import { SITE_CONFIG } from '../config/site';
import { DESIGN_TOKENS } from '../theme/tokens';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
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

const StyledToolbar = styled(Toolbar)(() => ({
  gap: DESIGN_TOKENS.spacing.xs * 8,
  minHeight: 72,
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(DESIGN_TOKENS.spacing.xs),
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const Brand = styled(Typography)(() => ({
  flexGrow: 1,
  fontWeight: 800,
  letterSpacing: '-0.02em',
}));

const DesktopNav = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  marginInline: 4,
  borderRadius: DESIGN_TOKENS.radius.sm,
  paddingInline: theme.spacing(1.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
  },
}));

const ThemeButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(0),
  border: `1px solid ${alpha('#E2E8F0', 0.28)}`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
  },
}));

const LanguageFormControl = styled(FormControl)(({ theme }) => {
  return {
    marginLeft: theme.spacing(1),
    minWidth: DESIGN_TOKENS.size.languageSelectMinWidthMobile,
    [theme.breakpoints.up('sm')]: {
      minWidth: DESIGN_TOKENS.size.languageSelectMinWidthDesktop,
    },
    '& .MuiInputLabel-root': {
      color: alpha('#E2E8F0', 0.78),
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
  };
});

const DrawerContent = styled(Box)(() => ({
  paddingTop: 16,
}));

const drawerPaperSx = {
  width: DESIGN_TOKENS.size.navDrawerWidth,
} as const;

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const t = useTranslation();
  const { mode, setMode } = useThemeMode();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const nextMode = mode === 'dark' ? 'light' : 'dark';
  const languageMenuProps = {
    PaperProps: {
      sx: {
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
      },
    },
  } as const;

  const navItems = [
    { label: t.nav.home, href: SITE_CONFIG.sections.home },
    { label: t.nav.about, href: SITE_CONFIG.sections.about },
    { label: t.nav.impact, href: SITE_CONFIG.sections.impact },
    { label: t.nav.skills, href: SITE_CONFIG.sections.skills },
    { label: t.nav.projects, href: SITE_CONFIG.sections.projects },
    { label: t.nav.downloads, href: SITE_CONFIG.sections.downloads },
    { label: t.nav.contact, href: SITE_CONFIG.sections.contact },
  ] as const;

  const languageLabels: Record<Language, string> = {
    en: 'English',
    pl: 'Polski',
    sv: 'Svenska',
  };

  const handleLanguageChange = (event: SelectChangeEvent<Language>) => {
    setLang(event.target.value as Language);
  };

  return (
    <StyledAppBar position='sticky' color='default' elevation={0}>
      <StyledToolbar>
        <MobileMenuButton
          edge='start'
          color='inherit'
          aria-label='Open navigation menu'
          onClick={() => setMobileNavOpen(true)}
        >
          <MenuIcon />
        </MobileMenuButton>

        <Brand variant='h5'>
          {SITE_CONFIG.brandName}
        </Brand>

        <DesktopNav>
          {navItems.map((item) => (
            <NavButton key={item.href} href={item.href} color='inherit'>
              {item.label}
            </NavButton>
          ))}
        </DesktopNav>

        <ThemeButton
          onClick={() => setMode(nextMode)}
          color='inherit'
          aria-label={`Switch to ${nextMode} mode`}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </ThemeButton>

        <LanguageFormControl size='small'>
          <InputLabel id='lang-select-label'>{t.nav.language}</InputLabel>
          <Select<Language>
            labelId='lang-select-label'
            id='lang-select'
            value={lang}
            label={t.nav.language}
            onChange={handleLanguageChange}
            MenuProps={languageMenuProps}
          >
            {LANGUAGES.map((language) => (
              <MenuItem key={language} value={language}>
                {languageLabels[language]}
              </MenuItem>
            ))}
          </Select>
        </LanguageFormControl>
      </StyledToolbar>

      <Drawer
        anchor='left'
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        PaperProps={{ sx: drawerPaperSx }}
      >
        <DrawerContent>
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.href}
                component='a'
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </DrawerContent>
      </Drawer>
    </StyledAppBar>
  );
}
