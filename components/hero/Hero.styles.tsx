import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

export const MotionSection = motion.create(Box);
export const MotionBox = motion.create(Box);
export const MotionChip = motion.create(Chip);

export const HeroBackgroundVideo = styled('video')({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  pointerEvents: 'none',
  opacity: 0.42,
});

export const HeroBackdrop = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: '50%',
  width: '100vw',
  transform: 'translateX(-50%)',
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: 1,
}));

export const HeroShell = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  display: 'grid',
  gap: theme.spacing(5),
  alignItems: 'center',
  minHeight: 'calc(100dvh - 120px)',
  width: 'min(1280px, calc(100vw - 24px))',
  marginInline: 'auto',
  padding: theme.spacing(4, 3),
  zIndex: 2,
  overflow: 'visible',
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'minmax(0, 1.02fr) minmax(380px, 0.98fr)',
    padding: theme.spacing(5, 4),
  },
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100vw - 20px)',
    padding: theme.spacing(3, 2),
  },
}));

export const CopyColumn = styled(Box)(() => ({
  position: 'relative',
  zIndex: 5,
}));

export const HeroInlineVisualSlot = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(4.5),
  },
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
  '& > *': {
    width: '100%',
  },
}));

export const HeroEyebrow = styled(motion.div)(({ theme }) => ({
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

export const HeroKicker = styled(Typography)(({ theme }) => ({
  fontSize: '0.82rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: alpha(theme.palette.primary.main, 0.95),
  whiteSpace: 'nowrap',
  lineHeight: 1.1,
}));

export const HeroLocation = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
  lineHeight: 1.1,
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  maxWidth: 620,
  marginBottom: theme.spacing(2.5),
  textWrap: 'balance',
  textShadow:
    theme.palette.mode === 'dark'
      ? '0 10px 30px rgba(15, 23, 42, 0.28)'
      : '0 10px 30px rgba(59, 130, 246, 0.12)',
}));

export const HeroSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: 600,
  marginBottom: theme.spacing(3.5),
  fontSize: 'clamp(1.05rem, 1.7vw, 1.2rem)',
  color: theme.palette.text.secondary,
}));

export const HeroActions = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(3),
}));

export const PrimaryHeroButton = styled(Button)(({ theme }) => ({
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

export const SecondaryHeroButton = styled(Button)(({ theme }) => ({
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
    inset: 0,
    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.light, theme.palette.mode === 'dark' ? 0.16 : 0.22)} 0%, transparent 58%)`,
    opacity: 0,
    transform: 'translateX(-8%) scale(0.98)',
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
    transform: 'translateY(-3px) scale(1.01)',
    borderColor: alpha(theme.palette.secondary.main, 0.58),
    backgroundColor: alpha(
      theme.palette.background.paper,
      theme.palette.mode === 'dark' ? 0.28 : 0.66,
    ),
    boxShadow: `0 24px 46px ${alpha(theme.palette.secondary.main, 0.2)}, 0 0 0 1px ${alpha(theme.palette.secondary.light, 0.22)}`,
  },
  '&:hover::before': {
    opacity: 1,
    transform: 'translateX(0) scale(1)',
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

export const HeroMeta = styled(Stack)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2.5),
  maxWidth: 640,
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1.1),
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
}));

export const HeroSignals = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(2.5),
  rowGap: theme.spacing(1.25),
}));

export const SignalItem = styled(Box)(({ theme }) => ({
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

export const MetaChip = styled(MotionChip)(({ theme }) => ({
  width: '100%',
  minHeight: 40,
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.background.paper, 0.58),
  border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
  color: theme.palette.text.primary,
  boxShadow: `0 12px 24px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.14 : 0.06)}`,
  justifyContent: 'center',
  '& .MuiChip-label': {
    display: 'block',
    fontWeight: 700,
    textAlign: 'center',
    whiteSpace: 'normal',
    lineHeight: 1.25,
    paddingInline: theme.spacing(1.5),
  },
}));

export const VisualColumn = styled(Box)(() => ({
  position: 'relative',
  zIndex: 5,
  '@media (max-width: 1199px)': {
    order: 2,
  },
}));

export const VisualStack = styled(Box)(() => ({
  position: 'relative',
  overflow: 'visible',
}));

export const ImageFrame = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'visible',
  borderRadius: 28,
  minHeight: 420,
  [theme.breakpoints.up('lg')]: {
    minHeight: 560,
  },
}));

export const ImageMediaClip = styled(Box)(({ theme }) => ({
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

export const ImageLayer = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  [theme.breakpoints.up('lg')]: {
    right: -44,
  },
}));

export const ImageAccent = styled(Box)(({ theme }) => ({
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

export const ImageAccentEyebrow = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(0.75),
}));
