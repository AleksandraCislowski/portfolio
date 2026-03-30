'use client';

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
import {
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';
import { SITE_CONFIG } from '../config/site';
import heroImage from '../public/images/profile/Tech-driven confidence in a digital world.png';

const MotionSection = motion.create(Box);
const MotionBox = motion.create(Box);
const MotionChip = motion.create(Chip);

const heroSectionSx = {
  position: 'relative',
  overflow: 'visible',
  px: {
    xs: 2,
    md: 4,
  },
  pt: {
    xs: 4,
    md: 6,
  },
  pb: {
    xs: 7,
    md: 12,
  },
} as const;

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: 'easeOut',
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: 'easeOut',
    },
  },
};

const HeroBackdrop = styled(Box)(() => ({
  position: 'absolute',
  inset: 0,
  overflow: 'visible',
  pointerEvents: 'none',
  zIndex: 3,
}));

const GlowOrb = styled(motion.div)<{ $variant: 'left' | 'right' }>(({ theme, $variant }) => ({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(14px)',
  mixBlendMode: theme.palette.mode === 'dark' ? 'screen' : 'normal',
  opacity: theme.palette.mode === 'dark' ? 0.9 : 1,
  ...( $variant === 'left'
    ? {
        top: -130,
        left: -150,
        width: 430,
        height: 430,
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.36)} 0%, transparent 65%)`,
      }
    : {
        right: -180,
        bottom: -220,
        width: 540,
        height: 540,
        background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.3)} 0%, transparent 67%)`,
      }),
  [theme.breakpoints.down('md')]: $variant === 'left'
    ? {
        top: -72,
        left: -102,
        width: 300,
        height: 300,
      }
    : {
        right: -118,
        bottom: -120,
        width: 340,
        height: 340,
      },
}));

const BackdropGrid = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: '7% 6% 4%',
  borderRadius: 34,
  opacity: theme.palette.mode === 'dark' ? 0.22 : 0.28,
  backgroundImage: `
    linear-gradient(${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.06 : 0.16)} 1px, transparent 1px),
    linear-gradient(90deg, ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.06 : 0.16)} 1px, transparent 1px)
  `,
  backgroundSize: '32px 32px',
  maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.12))',
}));

const HeroShell = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  display: 'grid',
  gap: theme.spacing(5),
  alignItems: 'center',
  minHeight: 'calc(100dvh - 120px)',
  padding: theme.spacing(4),
  borderRadius: 36,
  border: '1px solid transparent',
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(135deg, ${alpha('#09111F', 0.94)} 0%, ${alpha('#101A33', 0.98)} 52%, ${alpha('#16264B', 0.94)} 100%)`
      : `linear-gradient(135deg, ${alpha('#E6EEFF', 0.96)} 0%, ${alpha('#DCE7FF', 0.98)} 54%, ${alpha('#D2E0FF', 0.95)} 100%)`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? `0 32px 80px rgba(2, 6, 23, 0.48), inset 0 1px 0 ${alpha('#FFFFFF', 0.06)}`
      : `0 32px 80px rgba(37, 99, 235, 0.16), inset 0 1px 0 ${alpha('#FFFFFF', 0.9)}`,
  backdropFilter: 'blur(16px)',
  isolation: 'isolate',
  zIndex: 2,
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 1.02fr) minmax(380px, 0.98fr)',
    padding: theme.spacing(5),
  },
}));

const HeroScan = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  background: `linear-gradient(115deg, transparent 0%, ${alpha(
    theme.palette.common.white,
    theme.palette.mode === 'dark' ? 0.02 : 0.14,
  )} 48%, transparent 64%)`,
  pointerEvents: 'none',
}));

const CopyColumn = styled(Box)(() => ({
  position: 'relative',
  zIndex: 5,
}));

const HeroEyebrow = styled(motion.div)(({ theme }) => ({
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
  boxShadow: `0 14px 36px ${alpha(theme.palette.primary.main, 0.12)}`,
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
  textShadow:
    theme.palette.mode === 'dark'
      ? '0 10px 30px rgba(15, 23, 42, 0.28)'
      : '0 10px 30px rgba(59, 130, 246, 0.12)',
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

const PrimaryHeroButton = styled(Button)(({ theme }) => ({
  paddingInline: theme.spacing(2.6),
  paddingBlock: theme.spacing(1.35),
  borderRadius: 18,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  boxShadow: `0 18px 36px ${alpha(theme.palette.primary.main, 0.34)}`,
}));

const SecondaryHeroButton = styled(Button)(({ theme }) => ({
  paddingInline: theme.spacing(2.3),
  paddingBlock: theme.spacing(1.35),
  borderRadius: 18,
  borderWidth: 1.5,
  backgroundColor: alpha(theme.palette.background.paper, 0.22),
  backdropFilter: 'blur(12px)',
}));

const HeroMeta = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2.5),
}));

const HeroSignals = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(2.5),
  rowGap: theme.spacing(1.25),
}));

const SignalItem = styled(Box)(({ theme }) => ({
  minWidth: 128,
  '& strong': {
    display: 'block',
    marginBottom: 2,
    fontSize: '1.5rem',
    lineHeight: 1,
    letterSpacing: '-0.04em',
  },
  '& span': {
    color: theme.palette.text.secondary,
    fontSize: '0.92rem',
  },
}));

const MetaChip = styled(MotionChip)(({ theme }) => ({
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.background.paper, 0.58),
  border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
  color: theme.palette.text.primary,
  boxShadow: `0 12px 24px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.14 : 0.06)}`,
  '& .MuiChip-label': {
    fontWeight: 700,
  },
}));

const VisualColumn = styled(Box)(() => ({
  position: 'relative',
  zIndex: 5,
}));

const VisualStack = styled(Box)(() => ({
  position: 'relative',
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
  transition: 'transform 220ms ease, box-shadow 260ms ease',
  [theme.breakpoints.up('md')]: {
    minHeight: 560,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg, rgba(9,17,31,0.04) 0%, rgba(9,17,31,0.28) 100%)'
        : 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(15,23,42,0.08) 100%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
}));

const ImageAccent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: -20,
  bottom: 28,
  zIndex: 3,
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection
      variants={sectionVariants}
      initial='hidden'
      animate='visible'
      sx={heroSectionSx}
    >
      <HeroBackdrop>
        <GlowOrb
          $variant='left'
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 18, -10, 0],
                  y: [0, 12, -8, 0],
                  scale: [1, 1.08, 0.98, 1],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <GlowOrb
          $variant='right'
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -20, 12, 0],
                  y: [0, -16, 10, 0],
                  scale: [1, 1.06, 0.97, 1],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <BackdropGrid />
      </HeroBackdrop>

      <HeroShell>
        <HeroScan
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ['-30%', '120%'],
                }
          }
          transition={{
            duration: 5.8,
            repeat: Infinity,
            repeatDelay: 1.8,
            ease: 'easeInOut',
          }}
        />

        <MotionBox variants={itemVariants}>
          <CopyColumn>
            <HeroEyebrow>
              <HeroKicker>Tech-driven delivery</HeroKicker>
              <Typography variant='body2'>{SITE_CONFIG.location}</Typography>
            </HeroEyebrow>

            <MotionBox variants={itemVariants}>
              <HeroTitle variant='h1'>
                {t.hero.greeting}
              </HeroTitle>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <HeroSubtitle>
                {t.hero.subtitle}
              </HeroSubtitle>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <HeroActions>
                <PrimaryHeroButton
                  variant='contained'
                  color='primary'
                  size='large'
                  href={SITE_CONFIG.sections.projects}
                >
                  {t.hero.primaryCta}
                </PrimaryHeroButton>
                <SecondaryHeroButton
                  variant='outlined'
                  color='secondary'
                  size='large'
                  href={SITE_CONFIG.sections.contact}
                >
                  {t.hero.secondaryCta}
                </SecondaryHeroButton>
              </HeroActions>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <HeroMeta>
                {['React', 'Next.js', 'TypeScript', 'Scrum'].map((label, index) => (
                  <MetaChip
                    key={label}
                    label={label}
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.35 + index * 0.06,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </HeroMeta>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <HeroSignals>
                <SignalItem>
                  <Typography component='strong'>5+</Typography>
                  <Typography component='span'>years building polished digital products</Typography>
                </SignalItem>
                <SignalItem>
                  <Typography component='strong'>UI + Delivery</Typography>
                  <Typography component='span'>frontend execution paired with team momentum</Typography>
                </SignalItem>
                <SignalItem>
                  <Typography component='strong'>Stockholm</Typography>
                  <Typography component='span'>open to remote and hybrid collaboration</Typography>
                </SignalItem>
              </HeroSignals>
            </MotionBox>
          </CopyColumn>
        </MotionBox>

        <MotionBox variants={itemVariants}>
          <VisualColumn>
            <VisualStack>
              <ImageFrame>
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                  }}
                >
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
                </motion.div>

                <ImageAccent>
                  <Typography variant='caption' sx={{ display: 'block', mb: 0.75 }}>
                    Product-minded frontend leadership
                  </Typography>
                  <Typography variant='body2'>
                    Building polished user experiences with strong delivery rhythm.
                  </Typography>
                </ImageAccent>
              </ImageFrame>
            </VisualStack>
          </VisualColumn>
        </MotionBox>
      </HeroShell>
    </MotionSection>
  );
}
