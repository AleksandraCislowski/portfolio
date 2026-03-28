'use client';
import * as React from 'react';
import { Container, Box } from '@mui/material';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import PortfolioJoyride from './PortfolioJoyride';

export default function PortfolioApp({
  children,
  currentYear,
}: {
  children: React.ReactNode;
  currentYear: number;
}) {
  return (
    <>
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
        © {currentYear} TwojeImię.dev
      </Box>
    </>
  );
}
