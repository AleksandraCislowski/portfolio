import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'O mnie', href: '#about' },
  { label: 'Projekty', href: '#projects' },
  { label: 'Kontakt', href: '#contact' },
];

export default function Navbar() {
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
          TwojeImię.dev
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
      </Toolbar>
    </AppBar>
  );
}
