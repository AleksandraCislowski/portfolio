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
import { styled } from '@mui/material/styles';
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
  backdropFilter: 'blur(10px)',
}));

const StyledToolbar = styled(Toolbar)(() => ({
  gap: DESIGN_TOKENS.spacing.xs * 8,
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(DESIGN_TOKENS.spacing.xs),
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const Brand = styled(Typography)(() => ({
  flexGrow: 1,
}));

const DesktopNav = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const NavButton = styled(Button)(() => ({
  marginInline: 4,
}));

const ThemeButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(0),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
  },
}));

const LanguageFormControl = styled(FormControl)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  minWidth: DESIGN_TOKENS.size.languageSelectMinWidthMobile,
  [theme.breakpoints.up('sm')]: {
    minWidth: DESIGN_TOKENS.size.languageSelectMinWidthDesktop,
  },
}));

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

  const navItems = [
    { label: t.nav.home, href: SITE_CONFIG.sections.home },
    { label: t.nav.about, href: SITE_CONFIG.sections.about },
    { label: t.nav.impact, href: SITE_CONFIG.sections.impact },
    { label: t.nav.experience, href: SITE_CONFIG.sections.experience },
    { label: t.nav.skills, href: SITE_CONFIG.sections.skills },
    { label: t.nav.projects, href: SITE_CONFIG.sections.projects },
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
