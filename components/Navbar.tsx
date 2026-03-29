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
import MenuIcon from '@mui/icons-material/Menu';
import { useLanguage, type Language } from '../i18n/LanguageContext';
import { useTranslation } from '../i18n/useTranslation';
import { useThemeMode } from '../theme/ThemeModeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const t = useTranslation();
  const { mode, setMode } = useThemeMode();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const navItems = [
    { label: t.nav.home, href: '#' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.downloads, href: '#downloads' },
    { label: t.nav.contact, href: '#contact' },
  ];
  return (
    <AppBar
      position='sticky'
      color='default'
      elevation={0}
      sx={{ backdropFilter: 'blur(8px)' }}
    >
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2, display: { sm: 'none' } }}
          onClick={() => setMobileNavOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: 2 }}
        >
          YourName.dev
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              href={item.href}
              color='inherit'
              sx={{ mx: 1 }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          color='inherit'
          aria-label='toggle theme'
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <FormControl size='small' sx={{ ml: 2, minWidth: 120 }}>
          <InputLabel id='lang-select-label'>{t.nav.language}</InputLabel>
          <Select
            labelId='lang-select-label'
            id='lang-select'
            value={lang}
            label={t.nav.language}
            onChange={(e) => setLang(e.target.value as Language)}
          >
            <MenuItem value='en'>English</MenuItem>
            <MenuItem value='pl'>Polski</MenuItem>
            <MenuItem value='sv'>Svenska</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
      <Drawer
        anchor='left'
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      >
        <Box sx={{ width: 280, pt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.label}
                component='a'
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
