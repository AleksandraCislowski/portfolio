'use client';
import * as React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Impact from './Impact';
import Skills from './Skills';
import Projects from './Projects';
import Downloads from './Downloads';
import Contact from './Contact';
import { useTranslation } from '../i18n/useTranslation';

const AppMain = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  minHeight: '100dvh',
  transition: 'background-color 0.25s ease, color 0.25s ease',
}));

const Footer = styled(Box)(() => ({
  textAlign: 'center',
  paddingBlock: 20,
}));

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
      <AppMain>
        <Container maxWidth='lg' disableGutters>
          <Hero />
          <About />
          <Impact />
          <Skills />
          <Projects />
          <Downloads />
          <Contact />
          {children}
        </Container>
        <Footer>
          <Typography variant='caption'>
            {t.footer.copyright.replace('{{year}}', currentYear.toString())}
          </Typography>
        </Footer>
      </AppMain>
    </>
  );
}
