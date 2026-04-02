'use client';

import * as React from 'react';
import NextLink from 'next/link';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../config/projects';
import { useTranslation } from '../i18n/useTranslation';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';

const SectionTitle = styled(Typography)(() => ({
  marginBottom: 12,
}));

const SectionIntro = styled(Typography)(({ theme }) => ({
  marginInline: 'auto',
  marginBottom: theme.spacing(4),
  maxWidth: 620,
  color: theme.palette.text.secondary,
}));

const BubbleField = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: 640,
  borderRadius: 34,
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.48 : 0.78)}`,
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(180deg, ${alpha('#06101F', 0.99)} 0%, ${alpha('#0A1730', 0.98)} 34%, ${alpha('#102445', 0.98)} 68%, ${alpha('#143057', 0.98)} 100%)`
      : `linear-gradient(180deg, ${alpha('#F5FBFF', 0.99)} 0%, ${alpha('#E8F6FF', 0.98)} 34%, ${alpha('#D8EEFF', 0.98)} 70%, ${alpha('#CAE6FF', 0.98)} 100%)`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 28px 70px rgba(2, 6, 23, 0.34)'
      : '0 28px 70px rgba(37, 99, 235, 0.16)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: theme.palette.mode === 'dark'
      ? `
        radial-gradient(circle at 16% 18%, rgba(125,211,252,0.22), transparent 20%),
        radial-gradient(circle at 80% 12%, rgba(45,212,191,0.18), transparent 18%),
        radial-gradient(circle at 56% 72%, rgba(96,165,250,0.14), transparent 24%),
        linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.06) 36%, transparent 52%, rgba(103,232,249,0.08) 66%, transparent 78%)
      `
      : `
        radial-gradient(circle at 16% 18%, rgba(125,211,252,0.3), transparent 20%),
        radial-gradient(circle at 80% 12%, rgba(45,212,191,0.2), transparent 18%),
        radial-gradient(circle at 56% 72%, rgba(96,165,250,0.18), transparent 24%),
        linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.34) 36%, transparent 52%, rgba(103,232,249,0.18) 66%, transparent 78%)
      `,
    opacity: 0.95,
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: '-18% -10% auto',
    height: '78%',
    background: theme.palette.mode === 'dark'
      ? `
        radial-gradient(120% 56% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 58%),
        repeating-radial-gradient(ellipse at 50% 4%, rgba(125,211,252,0.09) 0 2px, transparent 2px 22px),
        repeating-radial-gradient(ellipse at 50% 16%, rgba(255,255,255,0.04) 0 1px, transparent 1px 26px)
      `
      : `
        radial-gradient(120% 56% at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 58%),
        repeating-radial-gradient(ellipse at 50% 4%, rgba(125,211,252,0.14) 0 2px, transparent 2px 22px),
        repeating-radial-gradient(ellipse at 50% 16%, rgba(255,255,255,0.16) 0 1px, transparent 1px 26px)
      `,
    opacity: 0.9,
    transform: 'translate3d(0, 0, 0)',
    animation: 'waterDrift 18s linear infinite',
    pointerEvents: 'none',
  },
  '@keyframes waterDrift': {
    '0%': {
      transform: 'translate3d(-2%, 0, 0)',
    },
    '50%': {
      transform: 'translate3d(2%, 1.5%, 0)',
    },
    '100%': {
      transform: 'translate3d(-2%, 0, 0)',
    },
  },
  [theme.breakpoints.down('md')]: {
    minHeight: 600,
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 760,
  },
}));

const BubbleOrb = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$variant',
})<{ $variant: 'left' | 'right' }>(({ theme, $variant }) => ({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(22px)',
  pointerEvents: 'none',
  ...($variant === 'left'
    ? {
        width: 360,
        height: 360,
        top: -110,
        left: -100,
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.26)} 0%, transparent 72%)`,
      }
    : {
        width: 420,
        height: 420,
        right: -130,
        bottom: -130,
        background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.24)} 0%, transparent 70%)`,
      }),
}));

const BubbleHint = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(3),
  top: theme.spacing(3),
  zIndex: 3,
  maxWidth: 330,
  padding: theme.spacing(2.1, 2.3),
  borderRadius: 26,
  color: theme.palette.text.primary,
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(145deg, ${alpha('#0C1D38', 0.7)} 0%, ${alpha('#10294D', 0.64)} 100%)`
    : `linear-gradient(145deg, ${alpha('#FFFFFF', 0.82)} 0%, ${alpha('#E7F6FF', 0.72)} 100%)`,
  border: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.46 : 0.78)}`,
  boxShadow: `0 18px 42px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.26 : 0.08)}`,
  backdropFilter: 'blur(18px) saturate(1.12)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 26,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(255,255,255,0.08), transparent 44%, rgba(103,232,249,0.1) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.46), transparent 44%, rgba(103,232,249,0.18) 100%)',
    pointerEvents: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    right: 'auto',
    top: 'auto',
    margin: theme.spacing(2),
    maxWidth: 'none',
  },
}));

const BubbleLink = styled(NextLink, {
  shouldForwardProp: (prop) =>
    !['$size', '$tone', '$delay', '$reduceMotion'].includes(prop as string),
})<{
  $size: number;
  $tone: number;
  $delay: string;
  $reduceMotion: boolean;
}>(({ theme, $size, $tone, $delay, $reduceMotion }) => {
  const gradients = [
    `radial-gradient(circle at 30% 24%, ${alpha('#FFFFFF', 0.95)} 0%, ${alpha('#9FD6FF', 0.4)} 18%, ${alpha('#2563EB', 0.92)} 58%, ${alpha('#081120', 0.98)} 100%)`,
    `radial-gradient(circle at 30% 24%, ${alpha('#FFFFFF', 0.94)} 0%, ${alpha('#B7F2E5', 0.42)} 18%, ${alpha('#0891B2', 0.9)} 56%, ${alpha('#06283D', 0.98)} 100%)`,
    `radial-gradient(circle at 30% 24%, ${alpha('#FFFFFF', 0.95)} 0%, ${alpha('#C7B8FF', 0.42)} 18%, ${alpha('#7C3AED', 0.88)} 54%, ${alpha('#140A2E', 0.98)} 100%)`,
  ];

  return {
    position: 'absolute',
    display: 'flex',
    width: $size,
    height: $size,
    padding: theme.spacing(2.1),
    borderRadius: '50%',
    overflow: 'hidden',
    textDecoration: 'none',
    color: '#F8FBFF',
    background: gradients[$tone % gradients.length],
    boxShadow: '0 22px 42px rgba(2, 6, 23, 0.34), inset 0 0 0 1px rgba(255,255,255,0.58)',
    animation: $reduceMotion
      ? 'none'
      : $tone % 3 === 0
        ? `bubbleDriftA 11.5s cubic-bezier(0.42, 0.02, 0.21, 0.99) ${$delay} infinite, bubblePulse 5.4s ease-in-out ${$delay} infinite`
        : $tone % 3 === 1
          ? `bubbleDriftB 13.4s cubic-bezier(0.47, 0.05, 0.18, 0.98) ${$delay} infinite, bubblePulse 4.9s ease-in-out ${$delay} infinite`
          : `bubbleDriftC 12.7s cubic-bezier(0.4, 0.08, 0.2, 0.98) ${$delay} infinite, bubblePulse 5.8s ease-in-out ${$delay} infinite`,
    transition: 'transform 240ms ease, box-shadow 240ms ease, filter 240ms ease',
    willChange: 'transform, box-shadow, filter',
    zIndex: 1,
    '@keyframes bubbleDriftA': {
      '0%': {
        transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
      },
      '24%': {
        transform: 'translate3d(8px, -14px, 0) scale(1.016) rotate(1.2deg)',
      },
      '51%': {
        transform: 'translate3d(-10px, -4px, 0) scale(0.992) rotate(-1deg)',
      },
      '77%': {
        transform: 'translate3d(6px, 12px, 0) scale(1.02) rotate(0.8deg)',
      },
      '0%, 100%': {
        transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
      },
    },
    '@keyframes bubbleDriftB': {
      '0%': {
        transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
      },
      '18%': {
        transform: 'translate3d(-12px, -8px, 0) scale(1.018) rotate(-1.4deg)',
      },
      '43%': {
        transform: 'translate3d(10px, -18px, 0) scale(1.01) rotate(1deg)',
      },
      '66%': {
        transform: 'translate3d(14px, 8px, 0) scale(0.99) rotate(-0.9deg)',
      },
      '84%': {
        transform: 'translate3d(-6px, 12px, 0) scale(1.024) rotate(0.7deg)',
      },
      '100%': {
        transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
      },
    },
    '@keyframes bubbleDriftC': {
      '0%': {
        transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
      },
      '21%': {
        transform: 'translate3d(14px, -10px, 0) scale(1.024) rotate(1deg)',
      },
      '39%': {
        transform: 'translate3d(4px, -20px, 0) scale(0.995) rotate(-1.2deg)',
      },
      '63%': {
        transform: 'translate3d(-14px, -2px, 0) scale(1.012) rotate(0.9deg)',
      },
      '86%': {
        transform: 'translate3d(-8px, 14px, 0) scale(1.02) rotate(-0.7deg)',
      },
      '100%': {
        transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
      },
    },
    '@keyframes bubblePulse': {
      '0%, 100%': {
        boxShadow:
          '0 22px 42px rgba(2, 6, 23, 0.34), inset 0 0 0 1px rgba(255,255,255,0.58)',
      },
      '50%': {
        boxShadow:
          '0 30px 56px rgba(2, 6, 23, 0.42), 0 0 0 10px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.72)',
      },
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      background:
        'radial-gradient(circle at 34% 24%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.24) 22%, rgba(255,255,255,0.05) 48%, transparent 68%)',
      pointerEvents: 'none',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      boxShadow:
        'inset -18px -18px 28px rgba(7,16,35,0.34), inset 12px 12px 26px rgba(255,255,255,0.1)',
      pointerEvents: 'none',
    },
    '&:hover': {
      transform: 'translateY(-10px) scale(1.045)',
      filter: 'saturate(1.16) brightness(1.05)',
      boxShadow:
        '0 34px 60px rgba(2, 6, 23, 0.44), 0 0 0 10px rgba(255,255,255,0.05), inset 0 0 0 2px rgba(255,255,255,0.9)',
      animationPlayState: 'paused',
    },
    '&:focus-visible': {
      outline: `3px solid ${alpha(theme.palette.common.white, 0.94)}`,
      outlineOffset: 4,
      transform: 'translateY(-10px) scale(1.045)',
      animationPlayState: 'paused',
    },
    [theme.breakpoints.down('sm')]: {
      transform: 'translateX(-50%)',
      '&:hover': {
        transform: 'translateX(-50%) translateY(-10px) scale(1.045)',
      },
      '&:focus-visible': {
        transform: 'translateX(-50%) translateY(-10px) scale(1.045)',
      },
    },
  };
});

const BubbleContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  width: '100%',
  height: '100%',
  gap: theme.spacing(0.7),
}));

const BubbleOpen = styled(Typography)(() => ({
  opacity: 0.78,
  letterSpacing: '0.12em',
}));

const BubbleHintLabel = styled(Typography)(() => ({
  position: 'relative',
  zIndex: 1,
}));

const BubbleHintBody = styled(Typography)(() => ({
  position: 'relative',
  zIndex: 1,
}));

export default function Projects() {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Section id={SITE_CONFIG.sectionIds.projects} textAlign='center'>
      <SectionTitle variant='h3'>
        {t.projects.title}
      </SectionTitle>
      <SectionIntro variant='body2'>
        {t.projects.intro}
      </SectionIntro>

      <BubbleField>
        <BubbleOrb $variant='left' />
        <BubbleOrb $variant='right' />

        <BubbleHint>
          <BubbleHintLabel
            variant='overline'
            sx={{ color: 'primary.main', letterSpacing: '0.12em' }}
          >
            {t.projects.openProject}
          </BubbleHintLabel>
          <BubbleHintBody variant='body2' sx={{ mt: 0.75 }}>
            {t.projects.bubbleHint}
          </BubbleHintBody>
        </BubbleHint>

        {PROJECTS.map((project, index) => {
          const item = t.projects.items[index];
          const layout = isSmDown
            ? project.mobile
            : isMdDown
              ? project.tablet
              : project.desktop;
          const size = project.desktop.size;
          const delay = `${index * 0.9}s`;

          return (
            <BubbleLink
              key={project.slug}
              href={`/projects/${project.slug}`}
              $size={size}
              $tone={index}
              $delay={delay}
              $reduceMotion={Boolean(shouldReduceMotion)}
              style={{
                top: layout.top,
                left: layout.left,
                width: `${layout.size}px`,
                height: `${layout.size}px`,
              }}
            >
              <BubbleContent>
                <BubbleOpen variant='overline'>
                  {t.projects.openProject}
                </BubbleOpen>
                <Typography
                  sx={{
                    fontSize: {
                      xs: index === 2 ? '1.15rem' : '1.05rem',
                      md: index === 2 ? '1.45rem' : '1.2rem',
                      lg: index === 2 ? '1.72rem' : '1.32rem',
                    },
                    fontWeight: 800,
                    lineHeight: 1.04,
                    letterSpacing: '-0.04em',
                    textWrap: 'balance',
                  }}
                >
                  {item.title}
                </Typography>
              </BubbleContent>
            </BubbleLink>
          );
        })}
      </BubbleField>
    </Section>
  );
}
