'use client';
import * as React from 'react';
import { Container, Box } from '@mui/material';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
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
  if (!t) return null;
  return (
    <>
      <Navbar />
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
        {t.footer.copyright.replace('{{year}}', currentYear.toString())}
      </Box>
    </>
  );
}
