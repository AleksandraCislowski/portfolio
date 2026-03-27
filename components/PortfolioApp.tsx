'use client';
import * as React from 'react';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import darkTheme from '../theme/darkTheme';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import PortfolioJoyride from './PortfolioJoyride';

export default function PortfolioApp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <PortfolioJoyride />
      <Container maxWidth='lg' disableGutters>
        <Hero />
        <About />
        <Projects />
        <Contact />
        {children}
      </Container>
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
          color: 'text.secondary',
          fontSize: 14,
        }}
      >
        © {new Date().getFullYear()} TwojeImię.dev
      </Box>
    </ThemeProvider>
  );
}
