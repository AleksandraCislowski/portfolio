'use client';

import * as React from 'react';
import Image from 'next/image';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';
import { useLanguage } from '../i18n/LanguageContext';
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

const GlowOrb = styled(motion.div)<{ $variant: 'left' | 'right' }>(
  ({ theme, $variant }) => ({
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(14px)',
    mixBlendMode: theme.palette.mode === 'dark' ? 'screen' : 'normal',
    opacity: theme.palette.mode === 'dark' ? 0.9 : 1,
    ...($variant === 'left'
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
    [theme.breakpoints.down('md')]:
      $variant === 'left'
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
  }),
);

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
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'minmax(0, 1.02fr) minmax(380px, 0.98fr)',
    padding: theme.spacing(5),
  },
}));

const HeroScan = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  inset: '-18%',
  zIndex: 0,
  background: `linear-gradient(132deg, transparent 20%, ${alpha(
    theme.palette.common.white,
    theme.palette.mode === 'dark' ? 0.03 : 0.16,
  )} 48%, transparent 68%)`,
  pointerEvents: 'none',
  transform: 'rotate(-12deg)',
}));

const CopyColumn = styled(Box)(() => ({
  position: 'relative',
  zIndex: 5,
}));

const HeroEyebrow = styled(motion.div)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  gap: theme.spacing(1.25),
  marginBottom: theme.spacing(2.5),
  padding: theme.spacing(0.9, 1.4),
  minHeight: 56,
  borderRadius: 999,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.5),
  color: theme.palette.text.secondary,
  backdropFilter: 'blur(10px)',
  boxShadow: `0 14px 36px ${alpha(theme.palette.primary.main, 0.12)}`,
  [theme.breakpoints.down('sm')]: {
    minHeight: 56,
  },
}));

const HeroKicker = styled(Typography)(({ theme }) => ({
  fontSize: '0.82rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: alpha(theme.palette.primary.main, 0.95),
  whiteSpace: 'nowrap',
  lineHeight: 1.1,
}));

const HeroLocation = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
  lineHeight: 1.1,
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
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  borderRadius: 18,
  paddingInline: theme.spacing(2.6),
  paddingBlock: theme.spacing(1.35),
  transition:
    'transform 200ms ease, box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease, color 220ms ease',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  boxShadow: `0 18px 36px ${alpha(theme.palette.primary.main, 0.34)}`,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-12% -32%',
    background: `linear-gradient(118deg, transparent 12%, ${alpha('#FFFFFF', 0.22)} 34%, ${alpha('#FFFFFF', 0.56)} 50%, ${alpha('#FFFFFF', 0.18)} 66%, transparent 82%)`,
    opacity: 0,
    transform: 'translateX(-34%) skewX(-18deg)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 1,
    borderRadius: 16,
    background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.24)} 0%, transparent 42%, ${alpha('#0F172A', 0.12)} 100%)`,
    opacity: 0.5,
  },
  '&:hover': {
    transform: 'translateY(-3px) scale(1.01)',
    boxShadow: `0 24px 46px ${alpha(theme.palette.primary.main, 0.38)}, 0 0 0 1px ${alpha(theme.palette.primary.light, 0.26)}`,
    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  },
  '&:hover::before': {
    opacity: 1,
    transform: 'translateX(30%) skewX(-18deg)',
  },
  '&:hover::after': {
    opacity: 0.72,
  },
  '&:active': {
    transform: 'translateY(-1px) scale(0.99)',
  },
  '&.Mui-focusVisible': {
    outline: `2px solid ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.82 : 0.96)}`,
    outlineOffset: 3,
  },
}));

const SecondaryHeroButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  borderRadius: 18,
  paddingInline: theme.spacing(2.3),
  paddingBlock: theme.spacing(1.35),
  transition:
    'transform 200ms ease, box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease, color 220ms ease',
  borderWidth: 1.5,
  backgroundColor: alpha(theme.palette.background.paper, 0.22),
  backdropFilter: 'blur(12px)',
  borderColor: alpha(
    theme.palette.secondary.main,
    theme.palette.mode === 'dark' ? 0.4 : 0.26,
  ),
  boxShadow: `0 14px 30px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.22 : 0.08)}`,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -1,
    background: `radial-gradient(circle at 18% 18%, ${alpha(theme.palette.secondary.light, 0.32)} 0%, transparent 42%), linear-gradient(135deg, ${alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.14 : 0.6)} 0%, transparent 100%)`,
    opacity: 0,
    transform: 'scale(0.92)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 16,
    border: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.22 : 0.54)}`,
    opacity: 0,
  },
  '&:hover': {
    borderColor: alpha(theme.palette.secondary.main, 0.58),
    backgroundColor: alpha(
      theme.palette.background.paper,
      theme.palette.mode === 'dark' ? 0.28 : 0.66,
    ),
    boxShadow: `0 22px 38px ${alpha(theme.palette.secondary.main, 0.18)}`,
  },
  '&:hover::before': {
    opacity: 1,
    transform: 'scale(1)',
  },
  '&:hover::after': {
    opacity: 1,
  },
  '&:active': {
    transform: 'translateY(-1px) scale(0.99)',
  },
  '&.Mui-focusVisible': {
    outline: `2px solid ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.82 : 0.96)}`,
    outlineOffset: 3,
  },
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
  '@media (max-width: 1199px)': {
    order: 2,
  },
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
  [theme.breakpoints.up('lg')]: {
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
  const { lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const heroSkills = t.hero.skillPills;

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
                  x: ['-28%', '92%'],
                  y: ['-28%', '92%'],
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
              <HeroKicker>{t.hero.kicker}</HeroKicker>
              <HeroLocation variant='body2'>{t.hero.location}</HeroLocation>
            </HeroEyebrow>

            <MotionBox variants={itemVariants}>
              <HeroTitle variant='h1'>{t.hero.greeting}</HeroTitle>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <HeroSubtitle>{t.hero.subtitle}</HeroSubtitle>
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

            <MotionBox key={`hero-meta-${lang}`} variants={itemVariants}>
              <HeroMeta>
                {heroSkills.map((label, index) => (
                  <MetaChip
                    key={`${lang}-${index}-${label}`}
                    label={label}
                    initial={
                      shouldReduceMotion ? undefined : { opacity: 0, y: 16 }
                    }
                    animate={
                      shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    transition={{
                      duration: 0.38,
                      delay: 0.18 + Math.min(index, 7) * 0.03,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </HeroMeta>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <HeroSignals>
                {t.hero.signals.map((signal) => (
                  <SignalItem key={signal.label}>
                    <Typography component='strong'>{signal.value}</Typography>
                    <Typography component='span'>{signal.label}</Typography>
                  </SignalItem>
                ))}
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
                  <Typography
                    variant='caption'
                    sx={{ display: 'block', mb: 0.75 }}
                  >
                    {t.hero.portraitparagraph1}
                  </Typography>
                  <Typography variant='body2'>
                    {t.hero.portraitparagraph2}
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
