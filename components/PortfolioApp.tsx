'use client';
import * as React from 'react';
import { Container, Box, Typography, Stack } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Impact from './Impact';
import Projects from './Projects';
import Downloads from './Downloads';
import Contact from './Contact';
import { useTranslation } from '../i18n/useTranslation';
import { SITE_CONFIG } from '../config/site';

const AppMain = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  minHeight: '100dvh',
  overflowX: 'clip',
  transition: 'background-color 0.25s ease, color 0.25s ease',
}));

const Footer = styled('footer')(({ theme }) => ({
  position: 'relative',
  marginTop: 40,
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
  background: `
    linear-gradient(180deg, ${alpha(theme.palette.background.default, 0)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 24%, ${alpha(theme.palette.background.paper, 0.96)} 100%),
    radial-gradient(circle at top left, ${alpha(theme.palette.primary.main, 0.14)} 0%, transparent 30%),
    radial-gradient(circle at top right, ${alpha(theme.palette.secondary.main, 0.12)} 0%, transparent 28%)
  `,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '0 auto auto 0',
    width: '100%',
    height: 1,
    background: `linear-gradient(90deg, transparent 0%, ${alpha(theme.palette.primary.light, 0.7)} 20%, ${alpha(theme.palette.secondary.light, 0.55)} 50%, ${alpha(theme.palette.primary.light, 0.7)} 80%, transparent 100%)`,
    opacity: 0.85,
  },
}));

const FooterCard = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  width: '100%',
  maxWidth: 1180,
  padding: '28px 20px 30px',
  [theme.breakpoints.up('md')]: {
    padding: '34px 32px 38px',
  },
}));

const FooterEyebrow = styled(Typography)(({ theme }) => ({
  marginBottom: 8,
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  color: alpha(theme.palette.primary.light, 0.82),
  fontSize: '0.72rem',
  fontWeight: 700,
}));

const FooterBrand = styled(Typography)(({ theme }) => ({
  marginBottom: 6,
  color: theme.palette.primary.light,
  fontWeight: 800,
  letterSpacing: '-0.02em',
}));

const FooterSocialLinks = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(1.5),
  flexWrap: 'wrap',
}));

const FooterSocialButton = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: 16,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.24),
  boxShadow: '0 14px 28px rgba(2, 6, 23, 0.2)',
  backdropFilter: 'blur(10px)',
  transition:
    'transform 180ms ease, box-shadow 200ms ease, border-color 200ms ease, background-color 200ms ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: alpha(theme.palette.primary.main, 0.42),
    backgroundColor: alpha(theme.palette.background.paper, 0.34),
    boxShadow: `0 18px 34px ${alpha(theme.palette.primary.main, 0.16)}`,
  },
}));

export default function PortfolioApp({
  children,
  currentYear,
}: {
  children: React.ReactNode;
  currentYear: number;
}) {
  const t = useTranslation();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      <Navbar />
      <AppMain id='main-content'>
        {isHomePage ? <Hero /> : null}
        <Container maxWidth='lg' disableGutters>
          {isHomePage ? (
            <>
              <About />
              <Impact />
              <Projects />
              <Downloads />
              <Contact />
            </>
          ) : null}
          {children}
        </Container>
        <Footer>
          <FooterCard>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 2.5, md: 4 }}
              justifyContent='space-between'
              alignItems={{ xs: 'flex-start', md: 'center' }}
            >
              <Box>
                <FooterEyebrow variant='caption'>Portfolio</FooterEyebrow>
                <FooterBrand as='p' variant='h6'>
                  {SITE_CONFIG.brandName}
                </FooterBrand>
                <Typography variant='caption'>
                  {t.footer.copyright.replace('{{year}}', currentYear.toString())}
                </Typography>
              </Box>
              <FooterSocialLinks>
                <FooterSocialButton
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  aria-label={t.accessibility.sendEmail}
                >
                  <EmailIcon />
                </FooterSocialButton>
                <FooterSocialButton
                  href={SITE_CONFIG.socialLinks.linkedIn}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={t.accessibility.openLinkedIn}
                >
                  <LinkedInIcon />
                </FooterSocialButton>
                <FooterSocialButton
                  href={SITE_CONFIG.socialLinks.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={t.accessibility.openGitHub}
                >
                  <GitHubIcon />
                </FooterSocialButton>
                <FooterSocialButton
                  href={SITE_CONFIG.socialLinks.lovorda}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={t.accessibility.openLovorda}
                >
                  <TravelExploreRoundedIcon />
                </FooterSocialButton>
              </FooterSocialLinks>
            </Stack>
          </FooterCard>
        </Footer>
      </AppMain>
    </>
  );
}
