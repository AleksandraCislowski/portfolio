'use client';

import { Box, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export const SectionTitle = styled(Typography)(() => ({
  marginBottom: 12,
}));

export const SectionIntro = styled(Typography)(({ theme }) => ({
  marginInline: 'auto',
  marginBottom: theme.spacing(4),
  maxWidth: 620,
  color: theme.palette.text.secondary,
}));

export const PlanetBackgroundVideo = styled('video')({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  pointerEvents: 'none',
  opacity: 0.16,
});

export const PlanetBackgroundImage = styled('img')({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  pointerEvents: 'none',
  opacity: 0.62,
  transform: 'scale(1.02)',
  filter: 'saturate(1.14) contrast(1.06)',
});

// Outer "space scene" shell for the whole section. It owns the backdrop, stars and entry fade.
export const PlanetField = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  borderRadius: 34,
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.divider, 0.48)}`,
  background: `linear-gradient(180deg, ${alpha('#06101F', 0.92)} 0%, ${alpha('#0A1730', 0.9)} 34%, ${alpha('#102445', 0.88)} 68%, ${alpha('#143057', 0.9)} 100%)`,
  boxShadow: '0 28px 70px rgba(2, 6, 23, 0.34)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 16% 20%, rgba(96,165,250,0.2) 0%, transparent 28%),
      radial-gradient(circle at 84% 28%, rgba(196,181,253,0.16) 0%, transparent 30%),
      radial-gradient(circle at 48% 76%, rgba(45,212,191,0.12) 0%, transparent 34%),
      linear-gradient(180deg, rgba(6,16,31,0.08) 0%, rgba(6,16,31,0.18) 100%)
    `,
    opacity: 1,
    pointerEvents: 'none',
    transition:
      'opacity 1000ms ease, transform 1400ms cubic-bezier(0.18, 0.9, 0.22, 1)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 12% 18%, rgba(255,255,255,0.28) 0 1px, transparent 1.4px), radial-gradient(circle at 28% 72%, rgba(255,255,255,0.2) 0 1px, transparent 1.4px), radial-gradient(circle at 46% 26%, rgba(255,255,255,0.24) 0 1px, transparent 1.4px), radial-gradient(circle at 66% 64%, rgba(255,255,255,0.22) 0 1px, transparent 1.4px), radial-gradient(circle at 88% 34%, rgba(255,255,255,0.26) 0 1px, transparent 1.4px), linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 26%, rgba(7,16,34,0.24) 100%)',
    opacity: 0.76,
    pointerEvents: 'none',
    backgroundSize: '220px 180px, 260px 210px, 300px 240px, 240px 200px, 280px 220px, auto',
    backgroundPosition: '12% 8%, 88% 76%, 44% 20%, 58% 86%, 96% 30%, center',
    transition:
      'opacity 1000ms ease, transform 1400ms cubic-bezier(0.18, 0.9, 0.22, 1)',
  },
  '&[data-entered="false"]::before': {
    opacity: 0,
    transform: 'scale(1.02)',
  },
  '&[data-entered="false"]::after': {
    opacity: 0,
    transform: 'translate3d(0, 12px, 0) scale(1.02)',
  },
}));

export const PlanetHeader = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 4,
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(3, 3, 1),
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'stretch',
    padding: theme.spacing(2, 2, 1),
  },
  transition:
    'opacity 720ms ease, transform 900ms cubic-bezier(0.18, 0.9, 0.22, 1)',
  '[data-entered="false"] &': {
    opacity: 0,
    transform: 'translate3d(0, -22px, 0) scale(0.96)',
  },
}));

export const PlanetHint = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: 330,
  padding: theme.spacing(2.1, 2.3),
  borderRadius: 26,
  color: theme.palette.text.primary,
  background: `linear-gradient(145deg, ${alpha('#0C1D38', 0.7)} 0%, ${alpha('#10294D', 0.64)} 100%)`,
  border: `1px solid ${alpha(theme.palette.divider, 0.46)}`,
  boxShadow: `0 18px 42px ${alpha(theme.palette.common.black, 0.26)}`,
  backdropFilter: 'blur(18px) saturate(1.12)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 26,
    background:
      'linear-gradient(135deg, rgba(255,255,255,0.08), transparent 44%, rgba(103,232,249,0.1) 100%)',
    pointerEvents: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: 'none',
  },
}));

// The main stage holds planets plus scene-level decorative glows and ring-like framing.
export const PlanetStage = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  minHeight: 560,
  padding: theme.spacing(2, 2.5, 3),
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '4% 6% 10%',
    borderRadius: '48%',
    background:
      'radial-gradient(ellipse at 50% 50%, rgba(125,211,252,0.1) 0%, rgba(96,165,250,0.06) 28%, transparent 62%)',
    filter: 'blur(24px)',
    opacity: 0.9,
    pointerEvents: 'none',
    transform: 'rotate(-8deg)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: '14% 10% 8%',
    borderRadius: '50%',
    border: '1px solid rgba(186,230,253,0.1)',
    boxShadow:
      'inset 0 0 42px rgba(125,211,252,0.06), 0 0 70px rgba(96,165,250,0.08)',
    opacity: 0.62,
    pointerEvents: 'none',
    transform: 'rotate(-11deg) scaleY(0.42)',
  },
  transition:
    'opacity 820ms ease, transform 1100ms cubic-bezier(0.18, 0.9, 0.22, 1)',
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

export const PlanetEasterHint = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing(2.5),
  bottom: theme.spacing(1.5),
  zIndex: 4,
  maxWidth: 240,
  color: alpha(theme.palette.common.white, 0.56),
  fontSize: '0.68rem',
  letterSpacing: '0.08em',
  lineHeight: 1.45,
  textAlign: 'left',
  textTransform: 'uppercase',
  textShadow: '0 0 14px rgba(125,211,252,0.28)',
  transition: 'opacity 220ms ease, transform 260ms ease',
  [theme.breakpoints.down('sm')]: {
    left: theme.spacing(1.5),
    bottom: theme.spacing(1),
    maxWidth: 190,
    fontSize: '0.62rem',
  },
}));

export const PlanetEasterLink = styled('button')(({ theme }) => ({
  appearance: 'none',
  padding: 0,
  border: 'none',
  background: 'none',
  color: alpha(theme.palette.common.white, 0.92),
  font: 'inherit',
  letterSpacing: 'inherit',
  textTransform: 'inherit',
  textDecoration: 'underline',
  textUnderlineOffset: '0.22em',
  cursor: 'pointer',
  textShadow: '0 0 16px rgba(125,211,252,0.34)',
  transition: 'color 180ms ease, opacity 180ms ease',
  '&:hover, &:focus-visible': {
    color: '#BAE6FD',
  },
  '&:focus-visible': {
    outline: `2px solid ${alpha(theme.palette.common.white, 0.72)}`,
    outlineOffset: 3,
    borderRadius: 4,
  },
}));

export const PlanetSlot = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$recovering',
})<{ $recovering: boolean }>(({ $recovering }) => ({
  position: 'absolute',
  willChange: 'transform',
  transition: `transform ${$recovering ? '1240ms' : '700ms'} cubic-bezier(0.16, 0.84, 0.2, 1), opacity 520ms ease, filter 520ms ease`,
  zIndex: 2,
}));

// Easter egg UFO/cow lives entirely in styles so the JSX stays simple and the gag remains optional.
export const PlanetCourierUfo = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$reduceMotion',
})<{ $reduceMotion: boolean }>(({ theme, $reduceMotion }) => ({
  position: 'absolute',
  left: '46%',
  top: '60%',
  width: 62,
  height: 20,
  borderRadius: '50%',
  background:
    'radial-gradient(ellipse at 50% 18%, rgba(255,255,255,0.95) 0%, rgba(226,232,240,0.62) 22%, transparent 44%), linear-gradient(180deg, rgba(203,213,225,0.98) 0%, rgba(100,116,139,0.92) 48%, rgba(30,41,59,0.86) 100%)',
  boxShadow:
    '0 7px 18px rgba(15,23,42,0.38), 0 0 22px rgba(125,211,252,0.26), inset 0 2px 4px rgba(255,255,255,0.62), inset 0 -4px 8px rgba(15,23,42,0.3)',
  opacity: $reduceMotion ? 0.72 : 0,
  pointerEvents: 'none',
  transform: 'translate3d(-50%, -50%, 0) rotate(-6deg) scale(0.86)',
  transformOrigin: '50% 50%',
  zIndex: 5,
  animation: $reduceMotion ? 'none' : 'planetCourierFlight 17s ease-in-out infinite',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '12%',
    right: '12%',
    bottom: '12%',
    height: '24%',
    borderRadius: '999px',
    background:
      'radial-gradient(circle at 18% 50%, rgba(56,189,248,0.95) 0 2px, transparent 2.8px), radial-gradient(circle at 50% 50%, rgba(254,240,138,0.9) 0 2px, transparent 2.8px), radial-gradient(circle at 82% 50%, rgba(56,189,248,0.95) 0 2px, transparent 2.8px), linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.24) 18%, rgba(255,255,255,0.16) 50%, rgba(15,23,42,0.24) 82%, transparent 100%)',
    filter: 'drop-shadow(0 0 4px rgba(125,211,252,0.55))',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    bottom: '-10%',
    width: '58%',
    height: '28%',
    borderRadius: '50%',
    background:
      'radial-gradient(ellipse at 50% 50%, rgba(15,23,42,0.46) 0%, rgba(15,23,42,0.2) 46%, transparent 72%)',
    transform: 'translateX(-50%)',
  },
  '& .planet-courier-dome': {
    position: 'absolute',
    left: '50%',
    top: '-62%',
    width: '46%',
    height: '106%',
    borderRadius: '50% 50% 42% 42%',
    background:
      'radial-gradient(ellipse at 35% 24%, rgba(255,255,255,0.98) 0%, rgba(224,242,254,0.72) 30%, rgba(56,189,248,0.32) 64%, rgba(30,41,59,0.18) 100%)',
    boxShadow:
      'inset 0 2px 4px rgba(255,255,255,0.78), inset -4px -5px 8px rgba(14,165,233,0.14), 0 0 10px rgba(125,211,252,0.22)',
    transform: 'translateX(-50%)',
    zIndex: 1,
  },
  '& .planet-courier-beam': {
    position: 'absolute',
    left: '50%',
    top: '66%',
    width: '44%',
    height: 54,
    background:
      'linear-gradient(180deg, rgba(224,242,254,0.3) 0%, rgba(125,211,252,0.2) 38%, rgba(254,215,170,0.1) 66%, transparent 100%)',
    clipPath: 'polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)',
    filter: 'blur(2.6px)',
    opacity: 0,
    transform: 'translateX(-50%)',
    transformOrigin: '50% 0%',
    animation: $reduceMotion ? 'none' : 'planetCourierBeam 17s ease-in-out infinite',
  },
  '& .planet-courier-cargo': {
    position: 'absolute',
    left: '50%',
    top: '158%',
    opacity: 0,
    pointerEvents: 'none',
    transform: 'translate3d(-50%, -50%, 0) scale(0.9)',
  },
  '& .planet-courier-cow': {
    width: 24,
    height: 16,
    animation: $reduceMotion ? 'none' : 'planetCourierCow 17s ease-in-out infinite',
    '& .planet-cow-body': {
      position: 'absolute',
      left: 2,
      top: 5,
      width: 18,
      height: 10,
      borderRadius: '48% 44% 42% 48%',
      background:
        'radial-gradient(circle at 34% 48%, rgba(15,23,42,0.78) 0 2px, transparent 2.4px), radial-gradient(circle at 70% 42%, rgba(15,23,42,0.7) 0 2px, transparent 2.4px), #f8fafc',
      boxShadow: '0 2px 4px rgba(15,23,42,0.2)',
      '&::before': {
        content: '""',
        position: 'absolute',
        right: -5,
        top: 1,
        width: 8,
        height: 7,
        borderRadius: '42% 50% 48% 42%',
        background: '#f8fafc',
        boxShadow: 'inset -2px 0 0 rgba(15,23,42,0.18)',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 3,
        bottom: -3,
        width: 12,
        height: 4,
        background:
          'linear-gradient(90deg, #334155 0 2px, transparent 2px 5px, #334155 5px 7px, transparent 7px 10px, #334155 10px 12px)',
      },
    },
  },
  '@keyframes planetCourierFlight': {
    '0%, 4%': {
      left: '46%',
      top: '60%',
      opacity: 0,
      transform: 'translate3d(-50%, -50%, 0) rotate(-7deg) scale(0.82)',
    },
    '9%': {
      left: '46%',
      top: '56%',
      opacity: 1,
      transform: 'translate3d(-50%, -50%, 0) rotate(-6deg) scale(0.92)',
    },
    '22%': {
      left: '22%',
      top: '22%',
      opacity: 1,
      transform: 'translate3d(-50%, -50%, 0) rotate(-18deg) scale(0.94)',
    },
    '30%': {
      left: '20%',
      top: '18%',
      opacity: 1,
      transform: 'translate3d(-50%, -50%, 0) rotate(-8deg) scale(0.92)',
    },
    '38%': {
      left: '20%',
      top: '18%',
      opacity: 0,
      transform: 'translate3d(-50%, -50%, 0) translateY(-8px) rotate(-8deg) scale(0.82)',
    },
    '45%, 100%': {
      left: '46%',
      top: '60%',
      opacity: 0,
      transform: 'translate3d(-50%, -50%, 0) rotate(-7deg) scale(0.82)',
    },
  },
  '@keyframes planetCourierBeam': {
    '0%, 5%, 18%, 34%, 100%': { opacity: 0 },
    '9%, 28%': { opacity: 0.76 },
  },
  '@keyframes planetCourierCow': {
    '0%, 6%, 32%, 100%': { opacity: 0 },
    '9%, 24%': { opacity: 1 },
  },
  [theme.breakpoints.down('md')]: {
    '&': {
      width: 46,
      height: 16,
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: 42,
    height: 14,
    '@keyframes planetCourierFlight': {
      '0%, 4%': {
        left: '54%',
        top: '70%',
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) rotate(-7deg) scale(0.82)',
      },
      '9%': {
        left: '54%',
        top: '66%',
        opacity: 1,
        transform: 'translate3d(-50%, -50%, 0) rotate(-6deg) scale(0.92)',
      },
      '22%': {
        left: '51%',
        top: '18%',
        opacity: 1,
        transform: 'translate3d(-50%, -50%, 0) rotate(-18deg) scale(0.94)',
      },
      '30%': {
        left: '48%',
        top: '14%',
        opacity: 1,
        transform: 'translate3d(-50%, -50%, 0) rotate(-8deg) scale(0.92)',
      },
      '38%': {
        left: '48%',
        top: '14%',
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) translateY(-8px) rotate(-8deg) scale(0.82)',
      },
      '45%, 100%': {
        left: '54%',
        top: '70%',
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) rotate(-7deg) scale(0.82)',
      },
    },
  },
}));

export const PlanetDriftShell = styled(Box, {
  shouldForwardProp: (prop) =>
    ![
      '$tone',
      '$delay',
      '$reduceMotion',
      '$modalOpen',
      '$motionPaused',
      '$recovering',
    ].includes(prop as string),
})<{
  $tone: number;
  $delay: string;
  $reduceMotion: boolean;
  $modalOpen: boolean;
  $motionPaused: boolean;
  $recovering: boolean;
}>(({ $tone, $delay, $reduceMotion, $motionPaused, $recovering }) => ({
  width: '100%',
  height: '100%',
  willChange: 'transform',
  animation: $reduceMotion
    ? 'none'
    : $tone % 3 === 0
      ? `planetDriftA 13.8s cubic-bezier(0.42, 0.02, 0.21, 0.99) ${$delay} infinite`
      : $tone % 3 === 1
        ? `planetDriftB 15.1s cubic-bezier(0.47, 0.05, 0.18, 0.98) ${$delay} infinite`
        : `planetDriftC 14.5s cubic-bezier(0.4, 0.08, 0.2, 0.98) ${$delay} infinite`,
  animationPlayState: $motionPaused ? 'paused' : 'running',
  transition: `transform ${$recovering ? '1040ms' : '700ms'} cubic-bezier(0.16, 0.84, 0.2, 1)`,
  '@keyframes planetDriftA': {
    '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
    '19%': { transform: 'translate3d(16px, -22px, 0) rotate(2.2deg)' },
    '42%': { transform: 'translate3d(-18px, -10px, 0) rotate(-2deg)' },
    '68%': { transform: 'translate3d(14px, 18px, 0) rotate(1.6deg)' },
    '84%': { transform: 'translate3d(-8px, 10px, 0) rotate(-0.9deg)' },
    '100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
  },
  '@keyframes planetDriftB': {
    '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
    '16%': { transform: 'translate3d(-18px, -14px, 0) rotate(-2.5deg)' },
    '38%': { transform: 'translate3d(14px, -26px, 0) rotate(1.8deg)' },
    '57%': { transform: 'translate3d(22px, 10px, 0) rotate(-1.4deg)' },
    '78%': { transform: 'translate3d(-10px, 20px, 0) rotate(1.1deg)' },
    '90%': { transform: 'translate3d(8px, 6px, 0) rotate(-0.6deg)' },
    '100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
  },
  '@keyframes planetDriftC': {
    '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
    '18%': { transform: 'translate3d(20px, -16px, 0) rotate(1.8deg)' },
    '36%': { transform: 'translate3d(8px, -30px, 0) rotate(-2.2deg)' },
    '58%': { transform: 'translate3d(-18px, -6px, 0) rotate(1.4deg)' },
    '76%': { transform: 'translate3d(-14px, 22px, 0) rotate(-1.3deg)' },
    '90%': { transform: 'translate3d(10px, 12px, 0) rotate(0.8deg)' },
    '100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
  },
  '@media (max-width: 599.95px)': {
    animation: $reduceMotion
      ? 'none'
      : $tone % 3 === 0
        ? `planetDriftMobileA 12.6s cubic-bezier(0.42, 0.02, 0.21, 0.99) ${$delay} infinite`
        : $tone % 3 === 1
          ? `planetDriftMobileB 13.7s cubic-bezier(0.47, 0.05, 0.18, 0.98) ${$delay} infinite`
          : `planetDriftMobileC 13.1s cubic-bezier(0.4, 0.08, 0.2, 0.98) ${$delay} infinite`,
  },
  '@keyframes planetDriftMobileA': {
    '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
    '22%': { transform: 'translate3d(10px, -14px, 0) rotate(1.4deg)' },
    '46%': { transform: 'translate3d(-12px, -6px, 0) rotate(-1.2deg)' },
    '72%': { transform: 'translate3d(8px, 10px, 0) rotate(1deg)' },
    '88%': { transform: 'translate3d(-5px, 6px, 0) rotate(-0.6deg)' },
    '100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
  },
  '@keyframes planetDriftMobileB': {
    '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
    '18%': { transform: 'translate3d(-12px, -10px, 0) rotate(-1.6deg)' },
    '40%': { transform: 'translate3d(10px, -16px, 0) rotate(1.2deg)' },
    '64%': { transform: 'translate3d(14px, 8px, 0) rotate(-1deg)' },
    '84%': { transform: 'translate3d(-8px, 12px, 0) rotate(0.8deg)' },
    '100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
  },
  '@keyframes planetDriftMobileC': {
    '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
    '20%': { transform: 'translate3d(12px, -10px, 0) rotate(1.2deg)' },
    '38%': { transform: 'translate3d(6px, -18px, 0) rotate(-1.5deg)' },
    '60%': { transform: 'translate3d(-12px, -4px, 0) rotate(1deg)' },
    '80%': { transform: 'translate3d(-10px, 14px, 0) rotate(-0.9deg)' },
    '92%': { transform: 'translate3d(6px, 8px, 0) rotate(0.5deg)' },
    '100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
  },
}));

// Drift shell handles ambient motion independently from the clickable planet button.
export const PlanetButton = styled('button', {
  shouldForwardProp: (prop) =>
    ![
      '$tone',
      '$delay',
      '$reduceMotion',
      '$modalOpen',
      '$active',
      '$recovering',
    ].includes(prop as string),
})<{
  $tone: number;
  $delay: string;
  $reduceMotion: boolean;
  $modalOpen: boolean;
  $active: boolean;
  $recovering: boolean;
}>(({
  theme,
  $tone,
  $delay,
  $reduceMotion,
  $modalOpen,
  $active,
  $recovering,
}) => {
  const planetThemes = [
    {
      body: `
        radial-gradient(circle at 30% 24%, ${alpha('#FFF3D8', 0.94)} 0%, ${alpha('#F2B36D', 0.72)} 15%, ${alpha('#B85A32', 0.96)} 42%, ${alpha('#6F2C1E', 0.98)} 70%, ${alpha('#1F0B0A', 0.98)} 100%),
        radial-gradient(ellipse at 52% 62%, ${alpha('#8A3A24', 0.7)} 0%, transparent 36%),
        radial-gradient(ellipse at 72% 46%, ${alpha('#D99055', 0.42)} 0%, transparent 22%)
      `,
      atmosphere:
        'radial-gradient(circle at 28% 22%, rgba(255,236,206,0.24) 0%, rgba(245,158,91,0.1) 24%, transparent 48%), radial-gradient(circle at 74% 82%, rgba(248,113,113,0.2) 0%, transparent 36%)',
      surfaceA:
        'radial-gradient(ellipse at 34% 40%, rgba(254,215,170,0.32) 0%, rgba(154,52,18,0.18) 42%, transparent 74%)',
      surfaceB:
        'radial-gradient(ellipse at 42% 44%, rgba(127,29,29,0.34) 0%, rgba(251,146,60,0.12) 44%, transparent 74%)',
      rim:
        'conic-gradient(from 210deg, transparent 0deg, rgba(254,215,170,0.08) 54deg, rgba(251,146,60,0.44) 112deg, rgba(185,28,28,0.18) 154deg, transparent 218deg, transparent 360deg)',
    },
    {
      body: `
        radial-gradient(circle at 30% 24%, ${alpha('#FFF7D6', 0.96)} 0%, ${alpha('#FDE68A', 0.78)} 18%, ${alpha('#C9974B', 0.96)} 48%, ${alpha('#7C4A25', 0.96)} 76%, ${alpha('#24120A', 0.98)} 100%),
        linear-gradient(168deg, transparent 0%, transparent 25%, ${alpha('#F8E7B0', 0.22)} 32%, ${alpha('#8B5E34', 0.2)} 40%, transparent 48%, transparent 100%),
        linear-gradient(12deg, transparent 0%, transparent 52%, ${alpha('#FDE68A', 0.2)} 58%, ${alpha('#6B3F22', 0.2)} 65%, transparent 73%, transparent 100%)
      `,
      atmosphere:
        'radial-gradient(circle at 28% 22%, rgba(255,247,214,0.26) 0%, rgba(253,230,138,0.1) 26%, transparent 52%), radial-gradient(circle at 74% 82%, rgba(217,119,6,0.18) 0%, transparent 38%)',
      surfaceA:
        'linear-gradient(170deg, transparent 0%, rgba(255,247,214,0.22) 34%, rgba(146,64,14,0.18) 52%, transparent 78%)',
      surfaceB:
        'linear-gradient(12deg, transparent 0%, rgba(120,53,15,0.18) 24%, rgba(254,243,199,0.18) 44%, transparent 70%)',
      rim:
        'conic-gradient(from 210deg, transparent 0deg, rgba(254,243,199,0.1) 54deg, rgba(251,191,36,0.42) 112deg, rgba(217,119,6,0.18) 154deg, transparent 218deg, transparent 360deg)',
    },
    {
      body: `
        radial-gradient(circle at 30% 24%, ${alpha('#F0FDFF', 0.96)} 0%, ${alpha('#93C5FD', 0.58)} 17%, ${alpha('#2563EB', 0.94)} 45%, ${alpha('#0F766E', 0.88)} 67%, ${alpha('#071A2D', 0.98)} 100%),
        radial-gradient(ellipse at 42% 50%, ${alpha('#22C55E', 0.5)} 0%, transparent 24%),
        radial-gradient(ellipse at 64% 34%, ${alpha('#A7F3D0', 0.38)} 0%, transparent 18%)
      `,
      atmosphere:
        'radial-gradient(circle at 28% 22%, rgba(240,253,255,0.32) 0%, rgba(147,197,253,0.14) 24%, transparent 48%), radial-gradient(circle at 74% 82%, rgba(34,197,94,0.18) 0%, transparent 36%)',
      surfaceA:
        'radial-gradient(ellipse at 34% 40%, rgba(187,247,208,0.3) 0%, rgba(22,163,74,0.18) 42%, transparent 74%)',
      surfaceB:
        'radial-gradient(ellipse at 42% 44%, rgba(224,242,254,0.34) 0%, rgba(14,165,233,0.12) 44%, transparent 74%)',
      rim:
        'conic-gradient(from 210deg, transparent 0deg, rgba(224,242,254,0.08) 54deg, rgba(125,211,252,0.46) 112deg, rgba(34,197,94,0.18) 154deg, transparent 218deg, transparent 360deg)',
    },
  ];
  const planetTheme = planetThemes[$tone % planetThemes.length];

  return {
    position: 'relative',
    display: 'flex',
    appearance: 'none',
    border: 'none',
    cursor: 'pointer',
    font: 'inherit',
    textAlign: 'left',
    width: '100%',
    height: '100%',
    padding: theme.spacing(2.1),
    borderRadius: '50%',
    overflow: 'hidden',
    textDecoration: 'none',
    color: '#F8FBFF',
    background: planetTheme.body,
    boxShadow:
      '0 22px 42px rgba(2, 6, 23, 0.34), inset 0 0 0 1px rgba(255,255,255,0.58)',
    animation: $reduceMotion
      ? 'none'
      : `planetPulse 5.4s ease-in-out ${$delay} infinite, planetGlow 4.8s ease-in-out ${$delay} infinite`,
    transform: $modalOpen
      ? $active
        ? 'scale(1.02)'
        : 'scale(0.97)'
      : 'scale(1)',
    opacity: $modalOpen && !$active ? 0.92 : 1,
    transition: `transform ${$recovering ? '1120ms' : '620ms'} cubic-bezier(0.16, 0.84, 0.2, 1), box-shadow 360ms ease, filter 360ms ease, opacity 360ms ease`,
    willChange: 'transform, box-shadow, filter, opacity',
    zIndex: 1,
    '@keyframes planetPulse': {
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
    '@keyframes planetGlow': {
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
      transition:
        'box-shadow 240ms ease, opacity 240ms ease, transform 280ms ease',
    },
    '& .planet-atmosphere': {
      position: 'absolute',
      inset: '-2%',
      borderRadius: '50%',
      background: planetTheme.atmosphere,
      boxShadow:
        'inset 0 0 18px rgba(255,255,255,0.16), 0 0 34px rgba(125,211,252,0.2)',
      mixBlendMode: 'screen',
      opacity: 0.72,
      pointerEvents: 'none',
      transition: 'opacity 260ms ease, transform 320ms ease, filter 260ms ease',
      zIndex: 2,
    },
    '& .planet-surface-detail': {
      position: 'absolute',
      borderRadius: '48% 52% 44% 56%',
      filter: 'blur(0.3px)',
      mixBlendMode: 'screen',
      opacity: 0.36,
      pointerEvents: 'none',
      transition: 'opacity 260ms ease, transform 360ms cubic-bezier(0.2, 0.9, 0.22, 1)',
      zIndex: 2,
    },
    '& .planet-surface-detail-a': {
      width: '42%',
      height: '24%',
      left: '18%',
      top: '38%',
      background: planetTheme.surfaceA,
      transform: 'rotate(-19deg)',
    },
    '& .planet-surface-detail-b': {
      width: '32%',
      height: '18%',
      right: '16%',
      bottom: '28%',
      background: planetTheme.surfaceB,
      transform: 'rotate(24deg)',
      opacity: 0.24,
    },
    '& .planet-rim-light': {
      position: 'absolute',
      inset: '4%',
      borderRadius: '50%',
      background: planetTheme.rim,
      filter: 'blur(1px)',
      mixBlendMode: 'screen',
      opacity: 0.56,
      pointerEvents: 'none',
      transition: 'opacity 260ms ease, transform 380ms cubic-bezier(0.2, 0.9, 0.22, 1)',
      zIndex: 2,
    },
    '& .planet-mars-storm': {
      position: 'absolute',
      right: '20%',
      top: '72%',
      width: '24%',
      height: '14%',
      borderRadius: '50%',
      background:
        'radial-gradient(ellipse at 34% 34%, rgba(254,202,202,0.34) 0%, rgba(248,113,113,0.24) 28%, rgba(185,28,28,0.14) 58%, transparent 86%), radial-gradient(ellipse at 58% 62%, rgba(251,146,60,0.16) 0%, rgba(127,29,29,0.12) 42%, transparent 76%)',
      boxShadow:
        '0 0 14px rgba(248,113,113,0.12), inset 0 0 10px rgba(254,202,202,0.08)',
      filter: 'blur(2.4px)',
      mixBlendMode: 'screen',
      opacity: 0.42,
      pointerEvents: 'none',
      transform: 'rotate(-12deg)',
      transition: 'opacity 260ms ease, transform 380ms cubic-bezier(0.2, 0.9, 0.22, 1)',
      zIndex: 4,
    },
    '& .planet-earth-clouds': {
      position: 'absolute',
      inset: '9% 7%',
      borderRadius: '50%',
      background:
        'radial-gradient(ellipse at 28% 32%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.2) 18%, transparent 38%), radial-gradient(ellipse at 62% 48%, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.16) 20%, transparent 42%), radial-gradient(ellipse at 44% 70%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.12) 18%, transparent 38%)',
      filter: 'blur(0.8px)',
      mixBlendMode: 'screen',
      opacity: 0.54,
      pointerEvents: 'none',
      transition: 'opacity 260ms ease, transform 380ms cubic-bezier(0.2, 0.9, 0.22, 1)',
      zIndex: 3,
    },
    '& .planet-shadow': {
      position: 'absolute',
      inset: '18% 12% 10% 16%',
      borderRadius: '50%',
      background:
        'radial-gradient(circle at 35% 28%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 18%, rgba(7,16,35,0) 42%), radial-gradient(circle at 70% 74%, rgba(7,16,35,0.34) 0%, rgba(7,16,35,0.12) 34%, rgba(7,16,35,0) 66%)',
      opacity: 0.88,
      pointerEvents: 'none',
      filter: 'blur(2px)',
      transition: 'transform 260ms ease, opacity 220ms ease',
      zIndex: 1,
    },
    '& .planet-hover-sweep': {
      position: 'absolute',
      inset: '-14% -34%',
      borderRadius: '50%',
      background:
        'linear-gradient(112deg, transparent 22%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0.72) 48%, rgba(255,255,255,0.16) 58%, transparent 74%)',
      opacity: 0,
      transform: 'translateX(-42%) rotate(-12deg)',
      pointerEvents: 'none',
      transition:
        'opacity 220ms ease, transform 420ms cubic-bezier(0.2, 0.9, 0.22, 1)',
      mixBlendMode: 'screen',
    },
    '& > *': {
      transition: 'transform 240ms ease, opacity 240ms ease',
    },
    ...($modalOpen && $active
      ? {
          filter: 'saturate(1.14) brightness(1.06)',
          boxShadow:
            '0 34px 72px rgba(2, 6, 23, 0.42), 0 0 0 14px rgba(255,255,255,0.08), 0 0 64px rgba(125,211,252,0.34), inset 0 0 0 2px rgba(255,255,255,0.82)',
        }
      : {}),
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
    '&:hover .planet-shadow': {
      transform: 'scale(1.04) translate3d(4px, 4px, 0)',
      opacity: 0.96,
    },
    '&:hover .planet-atmosphere': {
      opacity: 0.95,
      filter: 'brightness(1.12)',
      transform: 'scale(1.05) rotate(4deg)',
    },
    '&:hover .planet-surface-detail-a': {
      opacity: 0.48,
      transform: 'translate3d(-3px, -2px, 0) rotate(-13deg)',
    },
    '&:hover .planet-surface-detail-b': {
      opacity: 0.34,
      transform: 'translate3d(3px, 2px, 0) rotate(18deg)',
    },
    '&:hover .planet-rim-light': {
      opacity: 0.82,
      transform: 'scale(1.04) rotate(8deg)',
    },
    '&:hover .planet-mars-storm': {
      opacity: 0.88,
      transform: 'scale(1.08) rotate(-6deg)',
    },
    '&:hover .planet-earth-clouds': {
      opacity: 0.74,
      transform: 'scale(1.04) rotate(-8deg)',
    },
    '&:hover .planet-hover-sweep': {
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
    '&:focus-visible .planet-shadow': {
      transform: 'scale(1.04) translate3d(4px, 4px, 0)',
      opacity: 0.96,
    },
    '&:focus-visible .planet-atmosphere': {
      opacity: 0.95,
      filter: 'brightness(1.12)',
      transform: 'scale(1.05) rotate(4deg)',
    },
    '&:focus-visible .planet-surface-detail-a': {
      opacity: 0.48,
      transform: 'translate3d(-3px, -2px, 0) rotate(-13deg)',
    },
    '&:focus-visible .planet-surface-detail-b': {
      opacity: 0.34,
      transform: 'translate3d(3px, 2px, 0) rotate(18deg)',
    },
    '&:focus-visible .planet-rim-light': {
      opacity: 0.82,
      transform: 'scale(1.04) rotate(8deg)',
    },
    '&:focus-visible .planet-mars-storm': {
      opacity: 0.88,
      transform: 'scale(1.08) rotate(-6deg)',
    },
    '&:focus-visible .planet-earth-clouds': {
      opacity: 0.74,
      transform: 'scale(1.04) rotate(-8deg)',
    },
    '&:focus-visible .planet-hover-sweep': {
      opacity: 1,
      transform: 'translateX(36%) rotate(-12deg)',
    },
    '&:focus-visible > *': {
      transform: 'translateY(-6px)',
    },
  };
});

export const PlanetOrbitBack = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$tone',
})<{ $tone: number }>(({ theme, $tone }) => {
  const ringTilt = $tone % 3 === 0 ? '-22deg' : $tone % 3 === 1 ? '18deg' : '0deg';
  const isMars = $tone % 3 === 0;
  const isSaturn = $tone % 3 === 1;
  const isEarth = $tone % 3 === 2;

  return {
    position: 'absolute',
    inset: '-28%',
    width: '156%',
    height: '156%',
    pointerEvents: 'none',
    overflow: 'visible',
    zIndex: 3,
    transform: `rotate(${ringTilt})`,
    transformOrigin: '50% 50%',
    perspective: '900px',
    transformStyle: 'preserve-3d',
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '82%',
      height: '24%',
      borderRadius: '50%',
      borderStyle: 'solid',
      borderColor: 'rgba(254,243,199,0.36)',
      boxShadow:
        '0 0 14px rgba(251,191,36,0.16), inset 0 0 10px rgba(254,243,199,0.08)',
      opacity: isSaturn ? 1 : 0,
      pointerEvents: 'none',
      transform: 'translate3d(-50%, -50%, 0)',
    },
    '&::before': {
      borderWidth: '1px 0 0',
      transform: 'translate3d(-50%, -78%, 0) scaleX(0.92)',
    },
    '&::after': {
      borderWidth: '0 0 1px',
      transform: 'translate3d(-50%, -20%, 0) scaleX(1.08)',
      borderColor: 'rgba(251,191,36,0.3)',
      opacity: isSaturn ? 0.82 : 0,
    },
    '& .planet-orbit-arc': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      borderRadius: '50%',
      borderStyle: 'solid',
      borderColor: 'rgba(254,243,199,0.24)',
      boxShadow: '0 0 12px rgba(251,191,36,0.12)',
      opacity: isSaturn ? 1 : 0,
      pointerEvents: 'none',
    },
    '& .planet-orbit-arc-a': {
      width: '96%',
      height: '28%',
      borderWidth: '1px 0 0',
      transform: 'translate3d(-50%, -96%, 0) scaleX(0.98)',
    },
    '& .planet-orbit-arc-b': {
      width: '104%',
      height: '30%',
      borderWidth: '0 0 1px',
      borderColor: 'rgba(251,191,36,0.24)',
      opacity: isSaturn ? 0.72 : 0,
      transform: 'translate3d(-50%, 0%, 0) scaleX(1.02)',
    },
    '& .planet-orbit-arc-c': {
      width: '72%',
      height: '18%',
      borderWidth: '1px 0 0',
      borderColor: 'rgba(255,237,213,0.2)',
      opacity: isSaturn ? 0.56 : 0,
      transform: 'translate3d(-50%, -122%, 0) scaleX(0.9)',
    },
    '& .planet-orbit-arc-d': {
      width: '74%',
      height: '18%',
      borderWidth: '0 0 1px',
      borderColor: 'rgba(146,64,14,0.22)',
      opacity: isSaturn ? 0.5 : 0,
      transform: 'translate3d(-50%, 34%, 0) scaleX(1.14)',
    },
    '& .planet-mars-comet': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: 14,
      height: 14,
      borderRadius: '50%',
      background:
        'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.98) 0%, rgba(254,215,170,0.92) 34%, rgba(249,115,22,0.68) 68%, rgba(127,29,29,0.08) 100%)',
      boxShadow:
        '0 0 20px rgba(249,115,22,0.38), 0 0 34px rgba(254,215,170,0.22)',
      opacity: isMars ? 1 : 0,
      pointerEvents: 'none',
      transform:
        'translate3d(-50%, -50%, 0) translate3d(clamp(-136px, -10vw, -92px), clamp(58px, 6vw, 92px), 0) rotate(-24deg) scale(0.72)',
      transformOrigin: '50% 50%',
      animation: isMars ? 'marsCometFlight 10.8s linear infinite' : 'none',
      '&::before': {
        content: '""',
        position: 'absolute',
        right: '48%',
        top: '50%',
        width: 'clamp(54px, 6vw, 92px)',
        height: 7,
        borderRadius: 999,
        background:
          'linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.08) 24%, rgba(254,215,170,0.34) 62%, rgba(255,255,255,0.72) 100%)',
        filter: 'blur(1.4px)',
        opacity: 0.92,
        transform: 'translateY(-50%) rotate(4deg)',
        transformOrigin: '100% 50%',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        right: '70%',
        top: '50%',
        width: 'clamp(76px, 8vw, 128px)',
        height: 16,
        borderRadius: '50%',
        background:
          'radial-gradient(ellipse at 100% 50%, rgba(255,255,255,0.26) 0%, rgba(254,215,170,0.16) 32%, rgba(249,115,22,0.08) 58%, transparent 76%)',
        filter: 'blur(5px)',
        opacity: 0.72,
        transform: 'translateY(-50%) rotate(4deg)',
        transformOrigin: '100% 50%',
      },
    },
    '@keyframes marsCometFlight': {
      '0%, 14%': {
        opacity: 0,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(-136px, -10vw, -92px), clamp(58px, 6vw, 92px), 0) rotate(-24deg) scale(0.72)',
      },
      '22%': {
        opacity: 0.72,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(-94px, -7.2vw, -62px), clamp(36px, 4vw, 62px), 0) rotate(-24deg) scale(0.92)',
      },
      '38%': {
        opacity: 1,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(-34px, -2.8vw, -18px), clamp(8px, 1vw, 18px), 0) rotate(-24deg) scale(1.08)',
      },
      '54%': {
        opacity: 0.94,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(18px, 2.8vw, 34px), clamp(-18px, -1.6vw, -8px), 0) rotate(-24deg) scale(1)',
      },
      '68%': {
        opacity: 0.46,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(86px, 6.8vw, 118px), clamp(-44px, -4.4vw, -28px), 0) rotate(-24deg) scale(0.86)',
      },
      '78%, 100%': {
        opacity: 0,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(128px, 9.6vw, 172px), clamp(-66px, -6.6vw, -44px), 0) rotate(-24deg) scale(0.7)',
      },
    },
    '& .planet-earth-moon': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: 18,
      height: 18,
      borderRadius: '50%',
      background:
        'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.96) 0%, rgba(226,232,240,0.82) 42%, rgba(100,116,139,0.74) 100%)',
      boxShadow:
        '0 0 18px rgba(224,242,254,0.26), inset -4px -4px 7px rgba(15,23,42,0.28)',
      opacity: isEarth ? 0.92 : 0,
      pointerEvents: 'none',
      transform:
        'translate3d(-50%, -50%, 0) translate3d(clamp(-154px, -10.6vw, -104px), clamp(-22px, -2vw, -10px), 0) scale(0.74)',
      animation: isEarth ? 'earthMoonFlight 16.5s linear infinite' : 'none',
    },
    '@keyframes earthMoonFlight': {
      '0%': {
        opacity: 0,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(-154px, -10.6vw, -104px), clamp(-22px, -2vw, -10px), 0) scale(0.74)',
      },
      '4%': {
        opacity: 0.46,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(-138px, -9.6vw, -94px), clamp(-2px, -0.2vw, -1px), 0) scale(0.78)',
      },
      '11%': {
        opacity: 0.86,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(-106px, -7.4vw, -72px), clamp(22px, 2.6vw, 38px), 0) scale(0.9)',
      },
      '22%': {
        opacity: 0.96,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(-56px, -4vw, -34px), clamp(40px, 4.6vw, 60px), 0) scale(1)',
      },
      '34%': {
        opacity: 1,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(-10px, -0.8vw, -4px), clamp(42px, 4.8vw, 64px), 0) scale(1.08)',
      },
      '47%': {
        opacity: 0.96,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(56px, 4.6vw, 80px), clamp(32px, 3.6vw, 52px), 0) scale(1)',
      },
      '57%': {
        opacity: 0.72,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(104px, 7.6vw, 136px), clamp(16px, 2vw, 30px), 0) scale(0.9)',
      },
      '64%': {
        opacity: 0.28,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(122px, 8.8vw, 156px), clamp(-4px, -0.4vw, -2px), 0) scale(0.84)',
      },
      '70%, 78%': {
        opacity: 0,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(88px, 6.6vw, 118px), clamp(-30px, -3.2vw, -16px), 0) scale(0.74)',
      },
      '79%': {
        opacity: 0,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(-140px, -9.8vw, -96px), clamp(-24px, -2.2vw, -12px), 0) scale(0.72)',
      },
      '88%': {
        opacity: 0,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(-136px, -9.6vw, -94px), clamp(-20px, -1.8vw, -10px), 0) scale(0.74)',
      },
      '100%': {
        opacity: 0,
        transform:
          'translate3d(-50%, -50%, 0) translate3d(clamp(-154px, -10.6vw, -104px), clamp(-22px, -2vw, -10px), 0) scale(0.74)',
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      '& .planet-mars-comet': {
        animation: 'none',
      },
      '& .planet-earth-moon': {
        animation: 'none',
        opacity: isEarth ? 0.92 : 0,
        transform: 'translate3d(-50%, -50%, 0)',
      },
    },
    [theme.breakpoints.down('sm')]: {
      inset: '-22%',
      width: '144%',
      height: '144%',
      '&::before, &::after': {
        width: '86%',
        height: '22%',
      },
      '& .planet-orbit-arc-a': {
        transform: 'translate3d(-50%, -92%, 0) scaleX(0.98)',
      },
      '& .planet-orbit-arc-b': {
        transform: 'translate3d(-50%, 0%, 0) scaleX(1.02)',
      },
      '& .planet-orbit-arc-c': {
        transform: 'translate3d(-50%, -116%, 0) scaleX(0.9)',
      },
      '& .planet-orbit-arc-d': {
        transform: 'translate3d(-50%, 28%, 0) scaleX(1.14)',
      },
      '& .planet-mars-comet, & .planet-earth-moon': {
        width: 14,
        height: 14,
      },
    },
  };
});

export const PlanetOrbitTextRun = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  filter: 'drop-shadow(0 0 12px rgba(186,230,253,0.14))',
  [theme.breakpoints.down('sm')]: {
    filter: 'drop-shadow(0 0 10px rgba(186,230,253,0.12))',
  },
}));

export const PlanetOrbitChar = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  display: 'inline-block',
  color: alpha(theme.palette.common.white, 0.98),
  fontSize: '13px',
  fontWeight: 800,
  lineHeight: 1,
  textTransform: 'uppercase',
  whiteSpace: 'pre',
  transformOrigin: 'center center',
  backfaceVisibility: 'hidden',
  WebkitTextStroke: `0.35px ${alpha(theme.palette.common.white, 0.22)}`,
  textShadow: `0 0 10px ${alpha(theme.palette.common.white, 0.26)}, 0 0 18px ${alpha(
    theme.palette.primary.light,
    0.16,
  )}`,
}));

export const PlanetHintLabel = styled(Typography)(() => ({
  position: 'relative',
  zIndex: 1,
}));

export const PlanetHintBody = styled(Typography)(() => ({
  position: 'relative',
  zIndex: 1,
}));

// Modal layers are separated into overlay, dialog shell and transition visuals so timing can be tuned
// without coupling every effect to the content markup.
export const ProjectOverlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$phase',
})<{ $phase: 'closed' | 'opening' | 'open' | 'closing' }>(
  ({ $phase }) => ({
    position: 'fixed',
    inset: 0,
    zIndex: 1200,
    pointerEvents: $phase === 'closed' ? 'none' : 'auto',
    opacity: $phase === 'closed' ? 0 : $phase === 'closing' ? 0 : 1,
    transition: 'opacity 860ms cubic-bezier(0.2, 0.8, 0.18, 1)',
    background:
      'linear-gradient(180deg, rgba(4, 10, 24, 0.34) 0%, rgba(4, 10, 24, 0.58) 100%)',
    backdropFilter:
      $phase === 'closed' || $phase === 'closing'
        ? 'blur(0px) saturate(1)'
        : 'blur(12px) saturate(1.06)',
  }),
);

export const ProjectModal = styled(Box, {
  shouldForwardProp: (prop) =>
    !['$phase', '$tone', '$reduceMotion'].includes(prop as string),
})<{
  $phase: 'closed' | 'opening' | 'open' | 'closing';
  $tone: number;
  $reduceMotion: boolean;
}>(({ theme, $phase, $tone, $reduceMotion }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 1201,
  width: 'min(1280px, calc(100vw - 20px))',
  height: 'min(920px, calc(100vh - 20px))',
  maxHeight: 'calc(100vh - 20px)',
  borderRadius: 38,
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.divider, 0.42)}`,
  background: `linear-gradient(155deg, ${alpha('#071225', 0.96)} 0%, ${alpha('#0A1A33', 0.92)} 38%, ${alpha('#10284C', 0.9)} 100%)`,
  boxShadow: '0 42px 120px rgba(2, 6, 23, 0.6)',
  isolation: 'isolate',
  transform:
    $phase === 'open'
      ? 'translate3d(-50%, -50%, 0) scale(1)'
      : 'translate3d(-50%, -46%, 0) scale(0.82)',
  opacity: $phase === 'open' ? 1 : 0,
  pointerEvents: $phase === 'open' ? 'auto' : 'none',
  transition: $reduceMotion
    ? 'opacity 220ms ease'
    : 'transform 900ms cubic-bezier(0.16, 0.84, 0.2, 1), opacity 680ms ease',
  animation: $reduceMotion
    ? 'none'
    : $phase === 'opening'
      ? 'projectModalReveal 1120ms cubic-bezier(0.24, 0.08, 0.18, 1) forwards'
      : $phase === 'closing'
        ? 'projectModalDismiss 980ms cubic-bezier(0.3, 0.08, 0.18, 1) forwards'
        : 'none',
  '@keyframes projectModalReveal': {
    '0%': {
      opacity: 0,
      transform: 'translate3d(-50%, -48.6%, 0) scale(0.97)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate3d(-50%, -50%, 0) scale(1)',
    },
  },
  '@keyframes projectModalDismiss': {
    '0%': {
      opacity: 1,
      transform: 'translate3d(-50%, -50%, 0) scale(1)',
    },
    '100%': {
      opacity: 0,
      transform: 'translate3d(-50%, -48.6%, 0) scale(0.97)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -2,
    zIndex: 0,
    borderRadius: 'inherit',
    background: (() => {
      const palette = getLaunchPalette($tone);
      return `
        radial-gradient(circle at 20% 18%, ${alpha(palette.beam, 0.18)} 0%, transparent 26%),
        radial-gradient(circle at 82% 16%, ${alpha(palette.glow, 0.16)} 0%, transparent 24%),
        linear-gradient(128deg, ${alpha('#FFFFFF', 0.16)} 0%, transparent 28%, ${alpha(
          palette.core,
          0.14,
        )} 48%, transparent 72%)
      `;
    })(),
    opacity: $phase === 'open' ? 0.64 : 0,
    transform: $phase === 'open' ? 'scale(1)' : 'scale(1.04)',
    transition:
      'opacity 700ms ease 160ms, transform 980ms cubic-bezier(0.16, 0.84, 0.2, 1)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: '-18% -30%',
    zIndex: 0,
    borderRadius: '42%',
    background: (() => {
      const palette = getLaunchPalette($tone);
      return `linear-gradient(104deg, transparent 18%, ${alpha(palette.beam, 0.08)} 34%, ${alpha(
        '#FFFFFF',
        0.28,
      )} 48%, ${alpha(palette.glow, 0.1)} 58%, transparent 74%)`;
    })(),
    opacity: $phase === 'opening' || $phase === 'open' ? 0.5 : 0,
    transform:
      $phase === 'opening' || $phase === 'open'
        ? 'translate3d(6%, -1%, 0) rotate(-6deg)'
        : 'translate3d(-18%, 0, 0) rotate(-8deg)',
    transition:
      'opacity 620ms ease, transform 980ms cubic-bezier(0.16, 0.84, 0.2, 1)',
    mixBlendMode: 'screen',
    filter: 'blur(2px)',
    pointerEvents: 'none',
  },
  '@media (max-width:1024px)': {
    zIndex: 1201,
    top: '8px',
    left: '50%',
    width: '100vw',
    maxWidth: '100vw',
    height: 'calc(100dvh - 16px)',
    maxHeight: 'calc(100dvh - 16px)',
    borderRadius: 28,
    transform:
      $phase === 'open'
        ? 'translate3d(-50%, 0, 0) scale(1)'
        : 'translate3d(-50%, 12px, 0) scale(0.98)',
    animation: $reduceMotion
      ? 'none'
      : $phase === 'opening'
        ? 'projectModalRevealMobile 720ms cubic-bezier(0.24, 0.08, 0.18, 1) forwards'
        : $phase === 'closing'
          ? 'projectModalDismissMobile 520ms cubic-bezier(0.3, 0.08, 0.18, 1) forwards'
          : 'none',
    '@keyframes projectModalRevealMobile': {
      '0%': {
        opacity: 0,
        transform: 'translate3d(-50%, 12px, 0) scale(0.98)',
      },
      '100%': {
        opacity: 1,
        transform: 'translate3d(-50%, 0, 0) scale(1)',
      },
    },
    '@keyframes projectModalDismissMobile': {
      '0%': {
        opacity: 1,
        transform: 'translate3d(-50%, 0, 0) scale(1)',
      },
      '100%': {
        opacity: 0,
        transform: 'translate3d(-50%, 12px, 0) scale(0.98)',
      },
    },
  },
}));

function getLaunchPalette(tone: number) {
  const palettes = [
    {
      core: 'rgba(242,179,109,0.9)',
      edge: 'rgba(184,90,50,0.84)',
      glow: 'rgba(248,113,113,0.42)',
      beam: 'rgba(254,215,170,0.92)',
    },
    {
      core: 'rgba(253,230,138,0.9)',
      edge: 'rgba(201,151,75,0.82)',
      glow: 'rgba(251,191,36,0.4)',
      beam: 'rgba(254,243,199,0.94)',
    },
    {
      core: 'rgba(147,197,253,0.92)',
      edge: 'rgba(15,118,110,0.8)',
      glow: 'rgba(34,197,94,0.4)',
      beam: 'rgba(224,242,254,0.92)',
    },
  ];

  return palettes[tone % palettes.length];
}

// These launch primitives recreate the feeling that the modal grows out of the clicked planet.
export const ProjectLaunchLayer = styled(Box)(() => ({
  position: 'fixed',
  inset: 0,
  zIndex: 1201,
  pointerEvents: 'none',
  overflow: 'hidden',
}));

type ProjectLaunchVisualProps = {
  $tone: number;
  $phase: 'closed' | 'opening' | 'open' | 'closing';
  $x: number;
  $y: number;
};

export const ProjectLaunchBeam = styled(Box, {
  shouldForwardProp: (prop) =>
    !['$tone', '$phase', '$x', '$y'].includes(prop as string),
})<ProjectLaunchVisualProps>(({ $tone, $phase, $x, $y }) => {
  const palette = getLaunchPalette($tone);

  return {
    position: 'fixed',
    top: $y,
    left: $x,
    width: '140vmax',
    height: 140,
    borderRadius: 999,
    background: `linear-gradient(102deg, transparent 16%, ${alpha(palette.beam, 0.18)} 32%, ${alpha(
      palette.beam,
      0.9,
    )} 48%, ${alpha(palette.glow, 0.54)} 58%, transparent 74%)`,
    opacity: 0,
    transform: 'translate3d(-50%, -50%, 0) rotate(-14deg) scaleX(0.16)',
    filter: 'blur(6px)',
    mixBlendMode: 'screen',
    animation:
      $phase === 'opening'
        ? 'projectLaunchBeamOpen 1520ms cubic-bezier(0.16, 0.82, 0.18, 1) forwards'
        : 'projectLaunchBeamClose 1040ms cubic-bezier(0.3, 0.08, 0.18, 1) forwards',
    '@keyframes projectLaunchBeamOpen': {
      '0%': {
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) rotate(-14deg) scaleX(0.16)',
      },
      '24%': {
        opacity: 0.42,
      },
      '100%': {
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) rotate(-14deg) scaleX(0.9)',
      },
    },
    '@keyframes projectLaunchBeamClose': {
      '0%': {
        opacity: 0.16,
        transform: 'translate3d(-50%, -50%, 0) rotate(-14deg) scaleX(0.58)',
      },
      '100%': {
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) rotate(-14deg) scaleX(0.08)',
      },
    },
  };
});

type ProjectLaunchPulseProps = ProjectLaunchVisualProps & {
  $size: number;
  $scale: number;
};

export const ProjectLaunchHalo = styled(Box, {
  shouldForwardProp: (prop) =>
    !['$tone', '$phase', '$x', '$y', '$size', '$scale'].includes(
      prop as string,
    ),
})<ProjectLaunchPulseProps>(({ $tone, $phase, $x, $y, $size, $scale }) => {
  const palette = getLaunchPalette($tone);

  return {
    position: 'fixed',
    top: $y,
    left: $x,
    width: $size,
    height: $size,
    borderRadius: '50%',
    border: `1px solid ${alpha(palette.beam, 0.54)}`,
    boxShadow: `0 0 18px ${alpha(palette.glow, 0.18)}, inset 0 0 10px ${alpha(palette.beam, 0.08)}`,
    opacity: 0,
    transform: 'translate3d(-50%, -50%, 0) scale(0.92)',
    animation:
      $phase === 'opening'
        ? 'projectLaunchHaloOpen 1240ms cubic-bezier(0.18, 0.82, 0.16, 1) forwards'
        : 'projectLaunchHaloClose 1120ms cubic-bezier(0.3, 0.08, 0.18, 1) forwards',
    '@keyframes projectLaunchHaloOpen': {
      '0%': {
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) scale(0.92)',
      },
      '18%': {
        opacity: 0.3,
      },
      '100%': {
        opacity: 0,
        transform: `translate3d(-50%, -50%, 0) scale(${($scale * 0.92).toFixed(3)})`,
      },
    },
    '@keyframes projectLaunchHaloClose': {
      '0%': {
        opacity: 0.28,
        transform: `translate3d(-50%, -50%, 0) scale(${($scale * 0.66).toFixed(3)})`,
      },
      '100%': {
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) scale(0.9)',
      },
    },
  };
});

type ProjectLaunchMorphProps = ProjectLaunchVisualProps & {
  $width: number;
  $height: number;
  $scale: number;
};

export const ProjectLaunchMorph = styled(Box, {
  shouldForwardProp: (prop) =>
    !['$tone', '$phase', '$x', '$y', '$width', '$height', '$scale'].includes(
      prop as string,
    ),
})<ProjectLaunchMorphProps>(({
  $tone,
  $phase,
  $x,
  $y,
  $width,
  $height,
  $scale,
}) => {
  const palette = getLaunchPalette($tone);

  return {
    position: 'fixed',
    top: $y,
    left: $x,
    width: $width,
    height: $height,
    borderRadius: '50%',
    background: `radial-gradient(circle at 34% 24%, rgba(255,255,255,0.96) 0%, ${palette.core} 16%, ${palette.edge} 54%, rgba(7,16,35,0.94) 100%)`,
    boxShadow: `0 0 0 1px ${alpha('#FFFFFF', 0.34)}, 0 0 20px ${alpha(palette.glow, 0.18)}`,
    opacity: 0,
    transform: 'translate3d(-50%, -50%, 0) scale(1)',
    animation:
      $phase === 'opening'
        ? 'projectLaunchMorphOpen 1760ms cubic-bezier(0.16, 0.82, 0.18, 1) forwards'
        : 'projectLaunchMorphClose 1120ms cubic-bezier(0.3, 0.08, 0.18, 1) forwards',
    '@keyframes projectLaunchMorphOpen': {
      '0%': {
        opacity: 0.62,
        transform: 'translate3d(-50%, -50%, 0) scale(1) rotate(0deg)',
        borderRadius: '50%',
      },
      '44%': {
        opacity: 0.44,
        transform: `translate3d(-50%, -50%, 0) scale(${($scale * 0.2).toFixed(3)}) rotate(0deg)`,
        borderRadius: '50%',
      },
      '100%': {
        opacity: 0,
        transform: `translate3d(-50%, -50%, 0) scale(${($scale * 0.58).toFixed(3)}) rotate(0deg)`,
        borderRadius: '50%',
      },
    },
    '@keyframes projectLaunchMorphClose': {
      '0%': {
        opacity: 0.14,
        transform: `translate3d(-50%, -50%, 0) scale(${($scale * 0.34).toFixed(3)}) rotate(4deg)`,
        borderRadius: 42,
      },
      '100%': {
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) scale(1) rotate(0deg)',
        borderRadius: '50%',
      },
    },
  };
});

export const ProjectLaunchCore = styled(Box, {
  shouldForwardProp: (prop) =>
    !['$tone', '$phase', '$x', '$y', '$size', '$scale'].includes(
      prop as string,
    ),
})<ProjectLaunchPulseProps>(({ $tone, $phase, $x, $y, $size, $scale }) => {
  const palette = getLaunchPalette($tone);

  return {
    position: 'fixed',
    top: $y,
    left: $x,
    width: $size,
    height: $size,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${alpha('#FFFFFF', 0.96)} 0%, ${alpha(palette.beam, 0.88)} 30%, ${alpha(
      palette.glow,
      0.46,
    )} 60%, transparent 100%)`,
    opacity: 0,
    transform: 'translate3d(-50%, -50%, 0) scale(0.72)',
    filter: 'blur(0.5px)',
    mixBlendMode: 'screen',
    animation:
      $phase === 'opening'
        ? 'projectLaunchCoreOpen 920ms cubic-bezier(0.2, 0.82, 0.18, 1) forwards'
        : 'projectLaunchCoreClose 940ms cubic-bezier(0.3, 0.08, 0.18, 1) forwards',
    '@keyframes projectLaunchCoreOpen': {
      '0%': {
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) scale(0.72)',
      },
      '18%': {
        opacity: 0.46,
      },
      '100%': {
        opacity: 0,
        transform: `translate3d(-50%, -50%, 0) scale(${($scale * 0.7).toFixed(3)})`,
      },
    },
    '@keyframes projectLaunchCoreClose': {
      '0%': {
        opacity: 0.2,
        transform: `translate3d(-50%, -50%, 0) scale(${($scale * 0.42).toFixed(3)})`,
      },
      '100%': {
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) scale(0.72)',
      },
    },
  };
});

export const ProjectLaunchRipple = styled(Box, {
  shouldForwardProp: (prop) =>
    !['$tone', '$phase', '$x', '$y', '$size', '$scale'].includes(
      prop as string,
    ),
})<ProjectLaunchPulseProps>(({ $tone, $phase, $x, $y, $size, $scale }) => {
  const palette = getLaunchPalette($tone);

  return {
    position: 'fixed',
    top: $y,
    left: $x,
    width: $size,
    height: $size,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${alpha(palette.beam, 0.18)} 0%, ${alpha(
      palette.glow,
      0.1,
    )} 26%, rgba(255,255,255,0.02) 46%, transparent 70%)`,
    border: `1px solid ${alpha(palette.beam, 0.14)}`,
    boxShadow: `0 0 44px ${alpha(palette.glow, 0.1)}`,
    opacity: 0,
    transform: 'translate3d(-50%, -50%, 0) scale(0.2)',
    filter: 'blur(1px)',
    animation:
      $phase === 'opening'
        ? 'projectLaunchRippleOpen 1280ms cubic-bezier(0.16, 0.82, 0.16, 1) forwards'
        : 'projectLaunchRippleClose 1180ms cubic-bezier(0.3, 0.08, 0.18, 1) forwards',
    '@keyframes projectLaunchRippleOpen': {
      '0%': {
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) scale(0.2)',
      },
      '16%': {
        opacity: 0.12,
      },
      '100%': {
        opacity: 0,
        transform: `translate3d(-50%, -50%, 0) scale(${($scale * 0.78).toFixed(3)})`,
      },
    },
    '@keyframes projectLaunchRippleClose': {
      '0%': {
        opacity: 0.16,
        transform: `translate3d(-50%, -50%, 0) scale(${($scale * 0.8).toFixed(3)})`,
      },
      '100%': {
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) scale(0.24)',
      },
    },
  };
});

export const ProjectModalGlow = styled(Box)(() => ({
  position: 'absolute',
  inset: -80,
  pointerEvents: 'none',
  background: `
      radial-gradient(circle at 18% 18%, rgba(125,211,252,0.22), transparent 24%),
      radial-gradient(circle at 78% 24%, rgba(45,212,191,0.18), transparent 22%),
      radial-gradient(circle at 50% 100%, rgba(96,165,250,0.2), transparent 34%)
    `,
  filter: 'blur(16px)',
  opacity: 0.58,
}));

// Scrollable modal grid: main narrative on the left, supporting facts/preview on the right.
export const ProjectModalInner = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  height: '100%',
  overflowY: 'auto',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.4fr) minmax(280px, 0.9fr)',
  gap: theme.spacing(2.5),
  padding: theme.spacing(8, 3, 3),
  overscrollBehavior: 'contain',
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(186,230,253,0.22) transparent',
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-track': {
    marginBlock: 18,
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 999,
    border: '2px solid transparent',
    backgroundClip: 'padding-box',
    background:
      'linear-gradient(180deg, rgba(186,230,253,0.26) 0%, rgba(103,232,249,0.14) 100%)',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background:
      'linear-gradient(180deg, rgba(186,230,253,0.38) 0%, rgba(103,232,249,0.22) 100%)',
  },
  '& > *': {
    opacity: 0,
    transform: 'translate3d(0, 16px, 0) scale(0.992)',
    animation:
      'projectModalColumnIn 760ms cubic-bezier(0.16, 0.82, 0.18, 1) forwards',
  },
  '& > *:first-of-type': {
    animationDelay: '140ms',
  },
  '& > *:last-child': {
    animationDelay: '220ms',
  },
  '@keyframes projectModalColumnIn': {
    '0%': {
      opacity: 0,
      transform: 'translate3d(0, 16px, 0) scale(0.992)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate3d(0, 0, 0) scale(1)',
    },
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
    padding: theme.spacing(8.5, 2, 2),
  },
}));

export const ProjectMain = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const ProjectAside = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

// Shared card primitive keeps all modal panels visually cohesive.
export const ProjectCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 24,
  border: `1px solid ${alpha(theme.palette.divider, 0.38)}`,
  background: `linear-gradient(150deg, ${alpha('#10213D', 0.7)} 0%, ${alpha('#0D1B31', 0.54)} 100%)`,
  boxShadow: `0 18px 44px ${alpha(theme.palette.common.black, 0.18)}`,
  backdropFilter: 'blur(18px)',
}));

export const ProjectCloseButton = styled('button')(({ theme }) => ({
  appearance: 'none',
  border: `1px solid ${alpha(theme.palette.divider, 0.42)}`,
  background: alpha('#0F213E', 0.78),
  color: theme.palette.text.primary,
  borderRadius: 999,
  padding: theme.spacing(1, 1.5),
  font: 'inherit',
  fontWeight: 700,
  letterSpacing: '0.04em',
  cursor: 'pointer',
  boxShadow: `0 12px 28px ${alpha(theme.palette.common.black, 0.22)}`,
  transition:
    'transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease',
  '&:hover, &:focus-visible': {
    transform: 'translateY(-2px)',
    boxShadow: `0 18px 36px ${alpha(theme.palette.common.black, 0.3)}`,
  },
}));

export const ProjectPreviewCard = styled(ProjectCard)(({ theme }) => ({
  padding: theme.spacing(2, 2.5),
  minHeight: 220,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: `
      linear-gradient(160deg, rgba(8, 28, 52, 0.82) 0%, rgba(12, 41, 71, 0.52) 100%),
      radial-gradient(circle at 24% 20%, rgba(125,211,252,0.18), transparent 24%),
      radial-gradient(circle at 76% 82%, rgba(45,212,191,0.14), transparent 26%)
    `,
}));

// Intentionally neutral preview surface so real screenshots can replace placeholders without
// requiring a layout or visual rewrite later.
export const ProjectPreviewSurface = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  minHeight: 118,
  borderRadius: 20,
}));
