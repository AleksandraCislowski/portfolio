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

function createWaterTexture(mode: 'light' | 'dark') {
  const stroke = mode === 'dark' ? 'rgba(186,230,253,0.12)' : 'rgba(14,116,144,0.1)';
  const glow = mode === 'dark' ? 'rgba(103,232,249,0.18)' : 'rgba(125,211,252,0.22)';
  const foam = mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.28)';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="none">
      <defs>
        <filter id="blur"><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      <g fill="none">
        <path d="M-80 180C60 120 120 250 260 194S474 96 640 154s210 92 360 42 246-26 398 26 270-18 418-10" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/>
        <path d="M-60 330C88 286 190 384 340 346S570 238 740 304s214 98 382 44 234-34 382 20 242 16 366-18" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
        <path d="M-90 516C66 462 146 574 312 542s232-124 394-72 240 124 388 72 230-68 372-18 222 72 376 28" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/>
        <path d="M-40 714C96 668 186 738 350 712s232-106 378-72 212 104 356 66 228-88 396-40 218 88 340 62" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="288" cy="244" rx="170" ry="52" fill="${glow}" filter="url(#blur)"/>
        <ellipse cx="1180" cy="176" rx="220" ry="60" fill="${glow}" filter="url(#blur)"/>
        <ellipse cx="852" cy="620" rx="260" ry="70" fill="${glow}" filter="url(#blur)"/>
        <ellipse cx="494" cy="762" rx="210" ry="54" fill="${foam}" filter="url(#blur)"/>
      </g>
    </svg>
  `;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

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
    backgroundImage: createWaterTexture(theme.palette.mode),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    mixBlendMode: theme.palette.mode === 'dark' ? 'screen' : 'multiply',
    opacity: theme.palette.mode === 'dark' ? 0.86 : 0.74,
    pointerEvents: 'none',
    transition: 'opacity 1000ms ease, transform 1400ms cubic-bezier(0.18, 0.9, 0.22, 1)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: '-12% -10%',
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
    transition: 'opacity 1000ms ease, transform 1400ms cubic-bezier(0.18, 0.9, 0.22, 1)',
  },
  '& .water-grid': {
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
  '& .water-current': {
    position: 'absolute',
    borderRadius: 999,
    pointerEvents: 'none',
    opacity: theme.palette.mode === 'dark' ? 0.34 : 0.42,
    filter: 'blur(0.2px)',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(90deg, transparent 0%, rgba(186,230,253,0.18) 18%, rgba(103,232,249,0.44) 48%, rgba(186,230,253,0.16) 82%, transparent 100%)'
      : 'linear-gradient(90deg, transparent 0%, rgba(125,211,252,0.18) 18%, rgba(14,165,233,0.34) 48%, rgba(125,211,252,0.14) 82%, transparent 100%)',
    transformOrigin: 'center',
  },
  '& .water-current-1': {
    top: '30%',
    left: '12%',
    width: '36%',
    height: 2,
    transform: 'rotate(-10deg)',
    animation: 'currentSlideOne 9.5s ease-in-out infinite',
  },
  '& .water-current-2': {
    top: '56%',
    left: '48%',
    width: '28%',
    height: 2,
    transform: 'rotate(14deg)',
    animation: 'currentSlideTwo 8.8s ease-in-out infinite',
  },
  '& .water-current-3': {
    top: '76%',
    left: '16%',
    width: '32%',
    height: 2,
    transform: 'rotate(8deg)',
    animation: 'currentSlideThree 10.4s ease-in-out infinite',
  },
  '& .bubble-wake': {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    background: theme.palette.mode === 'dark'
      ? 'radial-gradient(circle, rgba(186,230,253,0.18) 0%, rgba(96,165,250,0.08) 38%, transparent 70%)'
      : 'radial-gradient(circle, rgba(125,211,252,0.22) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)',
    mixBlendMode: theme.palette.mode === 'dark' ? 'screen' : 'multiply',
    animation: 'wakePulse 7.4s ease-in-out infinite',
  },
  '& .bubble-wake-1': {
    top: '22%',
    left: '8%',
    width: 280,
    height: 280,
    animationDelay: '0.2s',
  },
  '& .bubble-wake-2': {
    top: '18%',
    left: '64%',
    width: 240,
    height: 240,
    animationDelay: '1.4s',
  },
  '& .bubble-wake-3': {
    top: '54%',
    left: '36%',
    width: 320,
    height: 320,
    animationDelay: '0.9s',
  },
  '& .bubble-collision-ring': {
    position: 'absolute',
    top: '46%',
    left: '43%',
    width: 120,
    height: 120,
    borderRadius: '50%',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(186,230,253,0.26)'
      : '1px solid rgba(14,165,233,0.22)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 0 24px rgba(103,232,249,0.12)'
      : '0 0 24px rgba(125,211,252,0.18)',
    opacity: 0,
    pointerEvents: 'none',
    animation: 'collisionRing 8.6s ease-out infinite',
  },
  '& .bubble-collision-ring-2': {
    top: '26%',
    left: '60%',
    width: 88,
    height: 88,
    animationDelay: '2.8s',
  },
  '& .bubble-collision-ring-3': {
    top: '66%',
    left: '26%',
    width: 102,
    height: 102,
    animationDelay: '5.2s',
  },
  '& .water-shimmer': {
    position: 'absolute',
    inset: '-12% -30%',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(105deg, transparent 24%, rgba(255,255,255,0.06) 38%, rgba(186,230,253,0.14) 46%, rgba(255,255,255,0.04) 54%, transparent 68%)'
      : 'linear-gradient(105deg, transparent 24%, rgba(255,255,255,0.24) 38%, rgba(125,211,252,0.26) 46%, rgba(255,255,255,0.12) 54%, transparent 68%)',
    transform: 'translateX(-24%) skewX(-12deg)',
    animation: 'shimmerDrift 12s linear infinite',
    pointerEvents: 'none',
    opacity: 0.68,
  },
  '@keyframes waterDrift': {
    '0%': { transform: 'translate3d(-2%, 0, 0)' },
    '50%': { transform: 'translate3d(2%, 1.5%, 0)' },
    '100%': { transform: 'translate3d(-2%, 0, 0)' },
  },
  '@keyframes currentSlideOne': {
    '0%, 100%': { transform: 'translate3d(0,0,0) rotate(-10deg) scaleX(1)' },
    '50%': { transform: 'translate3d(18px,-8px,0) rotate(-7deg) scaleX(1.08)' },
  },
  '@keyframes currentSlideTwo': {
    '0%, 100%': { transform: 'translate3d(0,0,0) rotate(14deg) scaleX(1)' },
    '50%': { transform: 'translate3d(-14px,10px,0) rotate(18deg) scaleX(1.06)' },
  },
  '@keyframes currentSlideThree': {
    '0%, 100%': { transform: 'translate3d(0,0,0) rotate(8deg) scaleX(1)' },
    '50%': { transform: 'translate3d(20px,-6px,0) rotate(12deg) scaleX(1.1)' },
  },
  '@keyframes wakePulse': {
    '0%, 100%': { transform: 'scale(0.88)', opacity: 0.18 },
    '50%': { transform: 'scale(1.1)', opacity: 0.34 },
  },
  '@keyframes collisionRing': {
    '0%': { transform: 'scale(0.35)', opacity: 0 },
    '12%': { opacity: 0.44 },
    '100%': { transform: 'scale(2.6)', opacity: 0 },
  },
  '@keyframes shimmerDrift': {
    '0%': { transform: 'translateX(-28%) skewX(-12deg)' },
    '100%': { transform: 'translateX(28%) skewX(-12deg)' },
  },
  '&[data-entered="false"]::before': {
    opacity: 0,
    transform: 'scale(1.08)',
  },
  '&[data-entered="false"]::after': {
    opacity: 0,
    transform: 'translate3d(0, 24px, 0) scale(1.06)',
  },
}));

const BubbleHeader = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 4,
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(3, 3, 1),
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'stretch',
    padding: theme.spacing(2, 2, 1),
  },
  transition: 'opacity 720ms ease, transform 900ms cubic-bezier(0.18, 0.9, 0.22, 1)',
  '[data-entered="false"] &': {
    opacity: 0,
    transform: 'translate3d(0, -22px, 0) scale(0.96)',
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
  position: 'relative',
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
    maxWidth: 'none',
  },
}));

const BubbleStage = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 560,
  padding: theme.spacing(2, 2.5, 3),
  transition: 'opacity 820ms ease, transform 1100ms cubic-bezier(0.18, 0.9, 0.22, 1)',
  '[data-entered="false"] &': {
    opacity: 0,
    transform: 'translate3d(0, 26px, 0)',
  },
  [theme.breakpoints.down('md')]: {
    minHeight: 540,
    padding: theme.spacing(2, 2, 3),
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 700,
    padding: theme.spacing(1.5, 1.5, 2.5),
  },
}));

const BubbleSlot = styled(Box)(() => ({
  position: 'absolute',
  willChange: 'transform',
  transition:
    'transform 260ms cubic-bezier(0.22, 0.9, 0.24, 1), opacity 780ms ease, filter 980ms ease',
  zIndex: 2,
}));

const BubbleLink = styled(NextLink, {
  shouldForwardProp: (prop) =>
    !['$tone', '$delay', '$reduceMotion'].includes(prop as string),
})<{
  $tone: number;
  $delay: string;
  $reduceMotion: boolean;
}>(({ theme, $tone, $delay, $reduceMotion }) => {
  const gradients = [
    `radial-gradient(circle at 30% 24%, ${alpha('#FFFFFF', 0.95)} 0%, ${alpha('#9FD6FF', 0.4)} 18%, ${alpha('#2563EB', 0.92)} 58%, ${alpha('#081120', 0.98)} 100%)`,
    `radial-gradient(circle at 30% 24%, ${alpha('#FFFFFF', 0.94)} 0%, ${alpha('#B7F2E5', 0.42)} 18%, ${alpha('#0891B2', 0.9)} 56%, ${alpha('#06283D', 0.98)} 100%)`,
    `radial-gradient(circle at 30% 24%, ${alpha('#FFFFFF', 0.95)} 0%, ${alpha('#C7B8FF', 0.42)} 18%, ${alpha('#7C3AED', 0.88)} 54%, ${alpha('#140A2E', 0.98)} 100%)`,
  ];

  return {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
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
        ? `bubbleDriftA 11.5s cubic-bezier(0.42, 0.02, 0.21, 0.99) ${$delay} infinite, bubblePulse 5.4s ease-in-out ${$delay} infinite, bubbleGlow 4.6s ease-in-out ${$delay} infinite`
        : $tone % 3 === 1
          ? `bubbleDriftB 13.4s cubic-bezier(0.47, 0.05, 0.18, 0.98) ${$delay} infinite, bubblePulse 4.9s ease-in-out ${$delay} infinite, bubbleGlow 5.2s ease-in-out ${$delay} infinite`
          : `bubbleDriftC 12.7s cubic-bezier(0.4, 0.08, 0.2, 0.98) ${$delay} infinite, bubblePulse 5.8s ease-in-out ${$delay} infinite, bubbleGlow 4.9s ease-in-out ${$delay} infinite`,
    transition: 'transform 240ms ease, box-shadow 240ms ease, filter 240ms ease, opacity 240ms ease',
    willChange: 'transform, box-shadow, filter, opacity',
    zIndex: 1,
    '@keyframes bubbleDriftA': {
      '0%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)' },
      '24%': { transform: 'translate3d(8px, -14px, 0) scale(1.016) rotate(1.2deg)' },
      '51%': { transform: 'translate3d(-10px, -4px, 0) scale(0.992) rotate(-1deg)' },
      '77%': { transform: 'translate3d(6px, 12px, 0) scale(1.02) rotate(0.8deg)' },
      '100%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)' },
    },
    '@keyframes bubbleDriftB': {
      '0%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)' },
      '18%': { transform: 'translate3d(-12px, -8px, 0) scale(1.018) rotate(-1.4deg)' },
      '43%': { transform: 'translate3d(10px, -18px, 0) scale(1.01) rotate(1deg)' },
      '66%': { transform: 'translate3d(14px, 8px, 0) scale(0.99) rotate(-0.9deg)' },
      '84%': { transform: 'translate3d(-6px, 12px, 0) scale(1.024) rotate(0.7deg)' },
      '100%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)' },
    },
    '@keyframes bubbleDriftC': {
      '0%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)' },
      '21%': { transform: 'translate3d(14px, -10px, 0) scale(1.024) rotate(1deg)' },
      '39%': { transform: 'translate3d(4px, -20px, 0) scale(0.995) rotate(-1.2deg)' },
      '63%': { transform: 'translate3d(-14px, -2px, 0) scale(1.012) rotate(0.9deg)' },
      '86%': { transform: 'translate3d(-8px, 14px, 0) scale(1.02) rotate(-0.7deg)' },
      '100%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)' },
    },
    '@keyframes bubblePulse': {
      '0%, 100%': {
        boxShadow:
          '0 22px 42px rgba(2, 6, 23, 0.34), inset 0 0 0 1px rgba(255,255,255,0.58)',
        filter: 'saturate(1) brightness(1)',
      },
      '50%': {
        boxShadow:
          '0 30px 56px rgba(2, 6, 23, 0.42), 0 0 0 10px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.72)',
        filter: 'saturate(1.08) brightness(1.04)',
      },
    },
    '@keyframes bubbleGlow': {
      '0%, 100%': { opacity: 0.98 },
      '50%': { opacity: 1 },
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      background:
        'radial-gradient(circle at 34% 24%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.24) 22%, rgba(255,255,255,0.05) 48%, transparent 68%)',
      pointerEvents: 'none',
      transition: 'opacity 220ms ease, transform 280ms ease, filter 220ms ease',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      boxShadow:
        'inset -18px -18px 28px rgba(7,16,35,0.34), inset 12px 12px 26px rgba(255,255,255,0.1), 0 0 28px rgba(125,211,252,0.14)',
      pointerEvents: 'none',
      transition: 'box-shadow 240ms ease, opacity 240ms ease, transform 280ms ease',
    },
    '& .bubble-hover-sweep': {
      position: 'absolute',
      inset: '-14% -34%',
      borderRadius: '50%',
      background:
        'linear-gradient(112deg, transparent 22%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0.72) 48%, rgba(255,255,255,0.16) 58%, transparent 74%)',
      opacity: 0,
      transform: 'translateX(-42%) rotate(-12deg)',
      pointerEvents: 'none',
      transition: 'opacity 220ms ease, transform 420ms cubic-bezier(0.2, 0.9, 0.22, 1)',
      mixBlendMode: 'screen',
    },
    '& > *': {
      transition: 'transform 240ms ease, opacity 240ms ease',
    },
    '&:hover': {
      transform: 'translateY(-16px) scale(1.13)',
      filter: 'saturate(1.26) brightness(1.12)',
      boxShadow:
        '0 42px 84px rgba(2, 6, 23, 0.5), 0 0 0 16px rgba(255,255,255,0.08), 0 0 82px rgba(125,211,252,0.4), inset 0 0 0 2px rgba(255,255,255,0.98)',
      animationPlayState: 'paused',
    },
    '&:hover::before': {
      opacity: 1,
      transform: 'scale(1.13) translate3d(-5px, -7px, 0)',
      filter: 'brightness(1.18)',
    },
    '&:hover::after': {
      transform: 'scale(1.07)',
      boxShadow:
        'inset -22px -22px 32px rgba(7,16,35,0.28), inset 16px 16px 34px rgba(255,255,255,0.16), 0 0 0 3px rgba(255,255,255,0.3), 0 0 88px rgba(125,211,252,0.44)',
    },
    '&:hover .bubble-hover-sweep': {
      opacity: 1,
      transform: 'translateX(36%) rotate(-12deg)',
    },
    '&:hover > *': {
      transform: 'translateY(-6px)',
    },
    '&:focus-visible': {
      outline: `3px solid ${alpha(theme.palette.common.white, 0.94)}`,
      outlineOffset: 4,
      transform: 'translateY(-16px) scale(1.13)',
      animationPlayState: 'paused',
    },
    '&:focus-visible::before': {
      opacity: 1,
      transform: 'scale(1.13) translate3d(-5px, -7px, 0)',
      filter: 'brightness(1.18)',
    },
    '&:focus-visible::after': {
      transform: 'scale(1.07)',
      boxShadow:
        'inset -22px -22px 32px rgba(7,16,35,0.28), inset 16px 16px 34px rgba(255,255,255,0.16), 0 0 0 3px rgba(255,255,255,0.3), 0 0 88px rgba(125,211,252,0.44)',
    },
    '&:focus-visible .bubble-hover-sweep': {
      opacity: 1,
      transform: 'translateX(36%) rotate(-12deg)',
    },
    '&:focus-visible > *': {
      transform: 'translateY(-6px)',
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
  const fieldRef = React.useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setEntered(true);
      return;
    }

    const node = fieldRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setEntered(true);
        observer.disconnect();
      },
      {
        threshold: 0.28,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [shouldReduceMotion]);

  return (
    <Section id={SITE_CONFIG.sectionIds.projects} textAlign='center'>
      <SectionTitle variant='h3'>
        {t.projects.title}
      </SectionTitle>
      <SectionIntro variant='body2'>
        {t.projects.intro}
      </SectionIntro>

      <BubbleField ref={fieldRef} data-entered={entered}>
        <Box className='water-grid' />
        <Box className='water-shimmer' />
        <Box className='water-current water-current-1' />
        <Box className='water-current water-current-2' />
        <Box className='water-current water-current-3' />
        <Box className='bubble-wake bubble-wake-1' />
        <Box className='bubble-wake bubble-wake-2' />
        <Box className='bubble-wake bubble-wake-3' />
        <Box className='bubble-collision-ring' />
        <Box className='bubble-collision-ring bubble-collision-ring-2' />
        <Box className='bubble-collision-ring bubble-collision-ring-3' />
        <BubbleOrb $variant='left' />
        <BubbleOrb $variant='right' />

        <BubbleHeader>
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
        </BubbleHeader>

        <BubbleStage>
          {PROJECTS.map((project, index) => {
            const item = t.projects.items[index];
            const layout = isSmDown
              ? project.mobile
              : isMdDown
                ? project.tablet
                : project.desktop;
            const delay = `${index * 0.9}s`;

            return (
              <BubbleSlot
                key={project.slug}
                style={{
                  top: layout.top,
                  left: layout.left,
                  width: `${layout.size}px`,
                  height: `${layout.size}px`,
                  opacity: entered || shouldReduceMotion ? 1 : 0,
                  filter: entered || shouldReduceMotion ? 'blur(0px)' : 'blur(10px)',
                  transform: entered || shouldReduceMotion
                    ? 'translate3d(0, 0, 0) scale(1)'
                    : index === 0
                      ? 'translate3d(-38px, 60px, 0) scale(0.72) rotate(-8deg)'
                      : index === 1
                        ? 'translate3d(44px, 34px, 0) scale(0.76) rotate(9deg)'
                        : 'translate3d(0, 84px, 0) scale(0.66) rotate(-4deg)',
                  transitionDelay: entered || shouldReduceMotion
                    ? `${240 + index * 170}ms`
                    : '0ms',
                }}
              >
                <BubbleLink
                  href={`/projects/${project.slug}`}
                  $tone={index}
                  $delay={delay}
                  $reduceMotion={Boolean(shouldReduceMotion)}
                >
                  <Box className='bubble-hover-sweep' />
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
              </BubbleSlot>
            );
          })}
        </BubbleStage>
      </BubbleField>
    </Section>
  );
}
