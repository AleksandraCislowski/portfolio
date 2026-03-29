'use client';
import * as React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Downloads from './Downloads';
import Contact from './Contact';
import { useTranslation } from '../i18n/useTranslation';

export default function PortfolioApp({
  children,
  currentYear,
}: {
  children: React.ReactNode;
  currentYear: number;
}) {
  const t = useTranslation();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '100dvh',
          transition: 'background-color 0.25s ease, color 0.25s ease',
        }}
      >
        <Container maxWidth='lg' disableGutters>
          <Hero />
          <About />
          <Projects />
          <Downloads />
          <Contact />
          {children}
        </Container>
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
          }}
        >
          <Typography variant='caption'>
            {t.footer.copyright.replace('{{year}}', currentYear.toString())}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
