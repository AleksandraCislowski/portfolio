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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLanguage, LANGUAGES } from '../i18n/LanguageContext';
import { useTranslation } from '../i18n/useTranslation';

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const t = useTranslation();
  if (!t) return null;
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
      color='transparent'
      elevation={0}
      sx={{ backdropFilter: 'blur(8px)', background: 'rgba(24,26,27,0.7)' }}
    >
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2, display: { sm: 'none' } }}
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
              sx={{ fontWeight: 600, mx: 1 }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <FormControl size='small' sx={{ ml: 2, minWidth: 120 }}>
          <InputLabel id='lang-select-label'>{t.nav.language}</InputLabel>
          <Select
            labelId='lang-select-label'
            id='lang-select'
            value={lang}
            label={t.nav.language}
            onChange={(e) => setLang(e.target.value as string)}
          >
            <MenuItem value='en'>English</MenuItem>
            <MenuItem value='pl'>Polski</MenuItem>
            <MenuItem value='sv'>Svenska</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
}
