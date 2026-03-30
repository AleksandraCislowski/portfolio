import * as React from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';
import { SITE_CONFIG } from '../config/site';
import heroImage from '../public/images/profile/Tech-driven confidence in a digital world.png';

const MotionSection = motion.create(Box);
const MotionBox = motion.create(Box);

const heroSectionSx = {
  position: 'relative',
  overflow: 'hidden',
  px: {
    xs: 2,
    md: 4,
  },
  pt: {
    xs: 4,
    md: 6,
  },
  pb: {
    xs: 6,
    md: 8,
  },
} as const;

const HeroShell = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'grid',
  gap: theme.spacing(5),
  alignItems: 'center',
  minHeight: 'calc(100dvh - 120px)',
  padding: theme.spacing(4),
  borderRadius: 36,
  border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(135deg, ${alpha('#09111F', 0.94)} 0%, ${alpha('#101A33', 0.98)} 52%, ${alpha('#16264B', 0.94)} 100%)`
      : `linear-gradient(135deg, ${alpha('#FFFFFF', 0.92)} 0%, ${alpha('#EEF4FF', 0.98)} 54%, ${alpha('#E0EAFF', 0.94)} 100%)`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 32px 80px rgba(2, 6, 23, 0.48)'
      : '0 32px 80px rgba(37, 99, 235, 0.16)',
  backdropFilter: 'blur(16px)',
  isolation: 'isolate',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-20% auto auto -12%',
    width: 320,
    height: 320,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.34)} 0%, transparent 68%)`,
    pointerEvents: 'none',
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    right: '-10%',
    bottom: '-18%',
    width: 360,
    height: 360,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.24)} 0%, transparent 70%)`,
    pointerEvents: 'none',
    zIndex: 0,
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 1.02fr) minmax(380px, 0.98fr)',
    padding: theme.spacing(5),
  },
}));

const CopyColumn = styled(Box)(() => ({
  position: 'relative',
  zIndex: 1,
}));

const HeroEyebrow = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1.25),
  marginBottom: theme.spacing(2.5),
  padding: theme.spacing(0.9, 1.4),
  borderRadius: 999,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.5),
  color: theme.palette.text.secondary,
  backdropFilter: 'blur(10px)',
}));

const HeroKicker = styled(Typography)(({ theme }) => ({
  fontSize: '0.82rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: alpha(theme.palette.primary.main, 0.95),
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  maxWidth: 620,
  marginBottom: theme.spacing(2.5),
  textWrap: 'balance',
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: 600,
  marginBottom: theme.spacing(3.5),
  fontSize: 'clamp(1.05rem, 1.7vw, 1.2rem)',
  color: theme.palette.text.secondary,
}));

const HeroActions = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(3),
}));

const HeroMeta = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

const MetaChip = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.background.paper, 0.58),
  border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
  color: theme.palette.text.primary,
  '& .MuiChip-label': {
    fontWeight: 600,
  },
}));

const VisualColumn = styled(Box)(() => ({
  position: 'relative',
  zIndex: 1,
}));

const ImageFrame = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 28,
  minHeight: 420,
  border: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.16 : 0.7)}`,
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(180deg, ${alpha('#111827', 0.9)} 0%, ${alpha('#1E3A8A', 0.32)} 100%)`
      : `linear-gradient(180deg, ${alpha('#DBEAFE', 0.92)} 0%, ${alpha('#BFDBFE', 0.72)} 100%)`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 28px 60px rgba(2, 6, 23, 0.42)'
      : '0 28px 60px rgba(37, 99, 235, 0.22)',
  [theme.breakpoints.up('md')]: {
    minHeight: 560,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg, rgba(9,17,31,0.04) 0%, rgba(9,17,31,0.26) 100%)'
        : 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(15,23,42,0.08) 100%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
}));

const ImageAccent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: -20,
  bottom: 28,
  zIndex: 2,
  maxWidth: 220,
  padding: theme.spacing(1.75, 2),
  borderRadius: 22,
  border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha('#0F172A', 0.74)
      : alpha('#FFFFFF', 0.78),
  color: theme.palette.text.primary,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 18px 40px rgba(2, 6, 23, 0.36)'
      : '0 18px 40px rgba(37, 99, 235, 0.18)',
  backdropFilter: 'blur(14px)',
  [theme.breakpoints.down('sm')]: {
    right: 16,
    left: 16,
    bottom: 16,
    maxWidth: 'none',
  },
}));

export default function Hero() {
  const t = useTranslation();

  return (
    <MotionSection
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      sx={heroSectionSx}
    >
      <HeroShell>
        <MotionBox
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' }}
        >
          <CopyColumn>
            <HeroEyebrow>
              <HeroKicker>Tech-driven delivery</HeroKicker>
              <Typography variant='body2'>{SITE_CONFIG.location}</Typography>
            </HeroEyebrow>

            <HeroTitle variant='h1'>
              {t.hero.greeting}
            </HeroTitle>

            <HeroSubtitle>
              {t.hero.subtitle}
            </HeroSubtitle>

            <HeroActions>
              <Button
                variant='contained'
                color='primary'
                size='large'
                href={SITE_CONFIG.sections.projects}
              >
                {t.hero.primaryCta}
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                size='large'
                href={SITE_CONFIG.sections.contact}
              >
                {t.hero.secondaryCta}
              </Button>
            </HeroActions>

            <HeroMeta>
              <MetaChip label='React' />
              <MetaChip label='Next.js' />
              <MetaChip label='TypeScript' />
              <MetaChip label='Scrum' />
            </HeroMeta>
          </CopyColumn>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, x: 28, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        >
          <VisualColumn>
            <ImageFrame>
              <Image
                src={heroImage}
                alt='Aleksandra Cislowski in a modern, tech-driven portrait'
                fill
                priority
                placeholder='blur'
                sizes='(max-width: 900px) 100vw, 44vw'
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 22%',
                }}
              />

              <ImageAccent>
                <Typography variant='caption' sx={{ display: 'block', mb: 0.75 }}>
                  Product-minded frontend leadership
                </Typography>
                <Typography variant='body2'>
                  Building polished user experiences with strong delivery rhythm.
                </Typography>
              </ImageAccent>
            </ImageFrame>
          </VisualColumn>
        </MotionBox>
      </HeroShell>
    </MotionSection>
  );
}
