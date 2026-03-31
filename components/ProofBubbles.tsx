'use client';

import * as React from 'react';
import {
  Box,
  Fade,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
  type ButtonProps,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';

type ProofBubblesProps = {
  trigger: React.ReactElement<ButtonProps>;
};

type BubbleConfig = {
  id: number;
  size: number;
  top: string;
  left: string;
  enterX: number;
  enterY: number;
  delay: number;
};

type BubbleSpread = {
  offsetX: number;
  offsetY: number;
  scale: number;
};

type ProtectedZone = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

const bubbleConfig: BubbleConfig[] = [
  { id: 0, size: 156, top: '16%', left: '22%', enterX: -140, enterY: -70, delay: 0 },
  { id: 1, size: 124, top: '15%', left: '62%', enterX: 120, enterY: -90, delay: 90 },
  { id: 2, size: 192, top: '38%', left: '36%', enterX: -110, enterY: 100, delay: 170 },
  { id: 3, size: 112, top: '60%', left: '68%', enterX: 94, enterY: 116, delay: 250 },
  { id: 4, size: 92, top: '73%', left: '18%', enterX: -120, enterY: 124, delay: 330 },
];

const bubbleResponsiveLayout: Record<
  number,
  {
    md: { top: string; left: string };
    sm: { top: string; left: string };
  }
> = {
  0: { md: { top: '18%', left: '12%' }, sm: { top: '18%', left: '10%' } },
  1: { md: { top: '16%', left: '76%' }, sm: { top: '17%', left: '72%' } },
  2: { md: { top: '38%', left: '34%' }, sm: { top: '38%', left: '28%' } },
  3: { md: { top: '68%', left: '76%' }, sm: { top: '68%', left: '68%' } },
  4: { md: { top: '74%', left: '14%' }, sm: { top: '76%', left: '12%' } },
};

const Overlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  padding: theme.spacing(2),
  backgroundColor: alpha('#09111F', 0.56),
  backdropFilter: 'blur(4px) saturate(1.05)',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
}));

const Stage = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: 32,
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(145deg, ${alpha('#09111F', 0.98)} 0%, ${alpha('#111C35', 0.98)} 48%, ${alpha('#18284A', 0.98)} 100%)`
      : `linear-gradient(145deg, ${alpha('#EDF4FF', 0.98)} 0%, ${alpha('#E2ECFF', 0.98)} 48%, ${alpha('#D7E6FF', 0.98)} 100%)`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 32px 90px rgba(2, 6, 23, 0.48)'
      : '0 32px 90px rgba(37, 99, 235, 0.16)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.05 : 0.18)} 1px, transparent 1px),
      linear-gradient(90deg, ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.05 : 0.18)} 1px, transparent 1px)
    `,
    backgroundSize: '34px 34px',
    maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.88), rgba(0,0,0,0.18))',
    pointerEvents: 'none',
  },
}));

const Orb = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$variant',
})<{ $variant: 'left' | 'right' }>(({ theme, $variant }) => ({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(18px)',
  pointerEvents: 'none',
  ...( $variant === 'left'
    ? {
        width: 300,
        height: 300,
        top: -70,
        left: -70,
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.32)} 0%, transparent 68%)`,
      }
    : {
        width: 380,
        height: 380,
        right: -120,
        bottom: -120,
        background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.26)} 0%, transparent 72%)`,
      }),
}));

const CopyPanel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  left: theme.spacing(3),
  zIndex: 3,
  maxWidth: 420,
  padding: theme.spacing(2.25),
  borderRadius: 26,
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.52 : 0.72),
  border: `1px solid ${alpha(theme.palette.divider, 0.76)}`,
  backdropFilter: 'blur(14px)',
  boxShadow: `0 18px 42px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.24 : 0.08)}`,
  [theme.breakpoints.down('sm')]: {
    top: theme.spacing(2),
    left: theme.spacing(2),
    right: theme.spacing(2),
    maxWidth: 'none',
    padding: theme.spacing(1.8),
  },
}));

const HintPill = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  bottom: theme.spacing(2),
  zIndex: 3,
  padding: theme.spacing(0.75, 1.25),
  borderRadius: 999,
  fontSize: 12,
  color: alpha(theme.palette.common.white, 0.84),
  backgroundColor: alpha('#000000', 0.22),
  border: `1px solid ${alpha(theme.palette.common.white, 0.22)}`,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const PreviewCard = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 4,
  left: '50%',
  top: '54%',
  transform: 'translate(-50%, -50%)',
  width: 'min(480px, calc(100% - 40px))',
  padding: theme.spacing(2.5),
  borderRadius: 30,
  background:
    theme.palette.mode === 'dark'
      ? alpha('#0F172A', 0.86)
      : alpha('#FFFFFF', 0.88),
  border: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.12 : 0.9)}`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 30px 70px rgba(2, 6, 23, 0.52)'
      : '0 30px 70px rgba(15, 23, 42, 0.18)',
  backdropFilter: 'blur(18px)',
  pointerEvents: 'none',
  animation: 'previewPop 280ms cubic-bezier(0.15, 0.9, 0.27, 1)',
  '@keyframes previewPop': {
    '0%': {
      opacity: 0,
      transform: 'translate(-50%, -46%) scale(0.88)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    top: '58%',
    width: 'calc(100% - 28px)',
    padding: theme.spacing(2),
  },
}));

const BubbleButton = styled('button', {
  shouldForwardProp: (prop) => ![
    '$entered',
    '$size',
    '$active',
    '$delay',
    '$transform',
    '$entryTransform',
  ].includes(prop as string),
})<{
  $entered: boolean;
  $size: number;
  $active: boolean;
  $delay: string;
  $transform: string;
  $entryTransform: string;
}>(({ theme, $entered, $size, $active, $delay, $transform, $entryTransform }) => ({
  position: 'absolute',
  width: $size,
  height: $size,
  borderRadius: '50%',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  overflow: 'hidden',
  textAlign: 'left',
  background:
    theme.palette.mode === 'dark'
      ? `radial-gradient(circle at 28% 24%, ${alpha(theme.palette.common.white, 0.48)} 0%, ${alpha(theme.palette.primary.light, 0.34)} 18%, ${alpha(theme.palette.primary.main, 0.78)} 56%, ${alpha('#081120', 0.98)} 100%)`
      : `radial-gradient(circle at 28% 24%, ${alpha(theme.palette.common.white, 0.96)} 0%, ${alpha(theme.palette.primary.light, 0.38)} 16%, ${alpha(theme.palette.primary.main, 0.9)} 56%, ${alpha('#1D4ED8', 0.96)} 100%)`,
  boxShadow: $active
    ? '0 24px 42px rgba(0, 0, 0, 0.56), inset 0 0 0 2px rgba(255,255,255,0.92)'
    : '0 14px 30px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255,255,255,0.58)',
  opacity: $entered ? 1 : 0,
  transform: $entered ? $transform : $entryTransform,
  transition: `opacity 780ms ease, transform 1250ms cubic-bezier(0.2, 0.9, 0.22, 1), box-shadow 220ms ease, filter 220ms ease`,
  transitionDelay: $delay,
  willChange: 'transform, box-shadow, filter',
  zIndex: $active ? 5 : 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 32% 24%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.28) 22%, rgba(255,255,255,0.08) 46%, rgba(255,255,255,0.02) 64%, transparent 74%)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    boxShadow: 'inset -14px -16px 24px rgba(7,16,35,0.34), inset 10px 10px 24px rgba(255,255,255,0.12)',
    pointerEvents: 'none',
  },
  '&:hover': {
    boxShadow: '0 24px 42px rgba(0, 0, 0, 0.56), inset 0 0 0 2px rgba(255,255,255,0.92)',
    filter: 'saturate(1.1) brightness(1.05)',
  },
  '&:focus-visible': {
    outline: `3px solid ${alpha(theme.palette.common.white, 0.92)}`,
    outlineOffset: 4,
  },
}));

const BubbleText = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  width: '100%',
  height: '100%',
  padding: theme.spacing(2),
  color: '#F8FBFF',
  textAlign: 'left',
}));

const parsePercent = (value: string) => Number.parseFloat(value);

const rectanglesIntersect = (
  leftA: number,
  topA: number,
  sizeA: number,
  zone: ProtectedZone,
) =>
  leftA < zone.maxX &&
  leftA + sizeA > zone.minX &&
  topA < zone.maxY &&
  topA + sizeA > zone.minY;

export default function ProofBubbles({ trigger }: ProofBubblesProps) {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [bubblesEntered, setBubblesEntered] = React.useState(false);
  const [activeBubbleId, setActiveBubbleId] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!open) {
      setBubblesEntered(false);
      setActiveBubbleId(null);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setBubblesEntered(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  const activeItem = activeBubbleId === null ? null : t.proof.items[activeBubbleId];
  const maxBubbleDelay = React.useMemo(
    () => bubbleConfig.reduce((maxDelay, bubble) => Math.max(maxDelay, bubble.delay), 0),
    [],
  );

  const getCopyProtectedZone = React.useCallback((vw: number, vh: number): ProtectedZone => {
    if (isSmDown) {
      return {
        minX: 12,
        maxX: vw - 12,
        minY: 12,
        maxY: Math.min(vh * 0.34, 244),
      };
    }

    if (isMdDown) {
      return {
        minX: 18,
        maxX: Math.min(vw * 0.5, 430),
        minY: 18,
        maxY: Math.min(vh * 0.29, 232),
      };
    }

    return {
      minX: 24,
      maxX: Math.min(vw * 0.42, 462),
      minY: 24,
      maxY: Math.min(vh * 0.32, 252),
    };
  }, [isMdDown, isSmDown]);

  const getBubbleSpread = (bubble: BubbleConfig, left: string, top: string): BubbleSpread => {
    if (activeBubbleId === null) {
      return { offsetX: 0, offsetY: 0, scale: 1 };
    }

    const x = parsePercent(left);
    const y = parsePercent(top);
    const activeBubble = bubbleConfig[activeBubbleId];
    const activeLayout = bubbleResponsiveLayout[activeBubbleId];
    const activeLeft = isSmDown
      ? activeLayout.sm.left
      : isMdDown
        ? activeLayout.md.left
        : activeBubble.left;
    const activeTop = isSmDown
      ? activeLayout.sm.top
      : isMdDown
        ? activeLayout.md.top
        : activeBubble.top;
    const activeX = parsePercent(activeLeft);
    const activeY = parsePercent(activeTop);
    const previewZone = isSmDown
      ? { minX: 18, maxX: 82, minY: 20, maxY: 80 }
      : isMdDown
        ? { minX: 19, maxX: 81, minY: 21, maxY: 79 }
        : { minX: 23, maxX: 77, minY: 19, maxY: 81 };
    const nearZone = {
      minX: previewZone.minX - 8,
      maxX: previewZone.maxX + 8,
      minY: previewZone.minY - 8,
      maxY: previewZone.maxY + 8,
    };
    const horizontalPush = isSmDown ? 92 : isMdDown ? 148 : 220;
    const verticalPush = isSmDown ? 84 : isMdDown ? 116 : 156;
    const spreadBoost = isSmDown ? 1.16 : isMdDown ? 1.24 : 1.34;
    const lateralSpread = isSmDown ? 7 : isMdDown ? 12 : 18;
    const seed = ((activeBubbleId * 13 + bubble.id * 7) % 3) - 1;
    const xDirection = x < 50 ? -1 : 1;
    const yDirection = y < 50 ? -1 : 1;
    const activeXDirection = activeX < 50 ? -1 : 1;
    const activeYDirection = activeY < 50 ? -1 : 1;
    const insideZone =
      x > previewZone.minX &&
      x < previewZone.maxX &&
      y > previewZone.minY &&
      y < previewZone.maxY;
    const nearPreview =
      x > nearZone.minX &&
      x < nearZone.maxX &&
      y > nearZone.minY &&
      y < nearZone.maxY;

    if (bubble.id === activeBubbleId) {
      return {
        offsetX:
          activeXDirection * (isSmDown ? 48 : isMdDown ? 70 : 92) +
          seed * lateralSpread,
        offsetY: activeYDirection * (isSmDown ? 16 : 22),
        scale: 0.92,
      };
    }

    if (insideZone) {
      const preferVertical =
        isSmDown || Math.abs(y - 50) <= Math.abs(x - 50) * 0.72;

      if (preferVertical) {
        return {
          offsetX:
            xDirection * (horizontalPush * 0.28 * spreadBoost) +
            seed * lateralSpread,
          offsetY:
            yDirection * verticalPush * spreadBoost +
            (activeXDirection === xDirection ? 14 : -14),
          scale: bubble.size <= 110 ? 0.96 : 0.92,
        };
      }

      return {
        offsetX:
          xDirection * horizontalPush * spreadBoost +
          (activeYDirection === yDirection ? 18 : -18),
        offsetY:
          yDirection * (verticalPush * 0.32) + seed * (lateralSpread - 2),
        scale: bubble.size <= 110 ? 0.97 : 0.93,
      };
    }

    if (nearPreview) {
      return {
        offsetX:
          xDirection * (horizontalPush * 0.52 * spreadBoost) +
          seed * lateralSpread,
        offsetY:
          (y >= activeY ? 1 : -1) * (verticalPush * 0.24) +
          seed * (lateralSpread - 4),
        scale: 0.97,
      };
    }

    return {
      offsetX: xDirection * (isSmDown ? 18 : 28) + seed * 4,
      offsetY: yDirection * (isSmDown ? 10 : 16),
      scale: 1,
    };
  };

  const triggerWithHandler = React.cloneElement(trigger, {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      trigger.props.onClick?.(event as never);
      setOpen(true);
    },
  });

  return (
    <>
      {triggerWithHandler}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        aria-labelledby='proof-bubbles-title'
        aria-describedby='proof-bubbles-description'
      >
        <Fade in={open} timeout={shouldReduceMotion ? 0 : 420}>
          <Overlay
            onClick={() => {
              if (activeBubbleId !== null) {
                setActiveBubbleId(null);
                return;
              }

              setOpen(false);
            }}
          >
            <Stage>
              <Orb $variant='left' />
              <Orb $variant='right' />

              <CopyPanel>
                <Typography
                  variant='overline'
                  sx={{ color: 'primary.main', letterSpacing: '0.12em' }}
                >
                  {t.proof.eyebrow}
                </Typography>
                <Typography id='proof-bubbles-title' variant='h4' sx={{ mt: 0.75, mb: 1 }}>
                  {t.proof.title}
                </Typography>
                <Typography id='proof-bubbles-description' variant='body2'>
                  {t.proof.description}
                </Typography>
              </CopyPanel>

              <HintPill>{t.proof.closeHint}</HintPill>

              {bubbleConfig.map((bubble) => {
                const responsive = bubbleResponsiveLayout[bubble.id];
                const top = isSmDown
                  ? responsive.sm.top
                  : isMdDown
                    ? responsive.md.top
                    : bubble.top;
                const left = isSmDown
                  ? responsive.sm.left
                  : isMdDown
                    ? responsive.md.left
                    : bubble.left;
                const bubbleSize = Math.round(
                  bubble.size * (isSmDown ? 0.8 : isMdDown ? 0.9 : 1),
                );
                const hoverScale = bubble.size <= 100 ? 1.08 : 1.14;
                const hoverTranslateY = bubble.size <= 100 ? -5 : -8;
                const isPreviewOpen = activeBubbleId !== null;
                const rawSpread = getBubbleSpread(bubble, left, top);
                const vw = typeof window !== 'undefined' ? window.innerWidth : 800;
                const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
                const safeMargin = 6;
                const leftPx = (parsePercent(left) / 100) * vw;
                const topPx = (parsePercent(top) / 100) * vh;
                const initialSpread = {
                  offsetX: Math.min(
                    Math.max(rawSpread.offsetX, safeMargin - leftPx),
                    vw - leftPx - bubbleSize - safeMargin,
                  ),
                  offsetY: Math.min(
                    Math.max(rawSpread.offsetY, safeMargin - topPx),
                    vh - topPx - bubbleSize - safeMargin,
                  ),
                  scale: rawSpread.scale,
                };
                const protectedZone = getCopyProtectedZone(vw, vh);
                const finalLeftPx = leftPx + initialSpread.offsetX;
                const finalTopPx = topPx + initialSpread.offsetY;
                const overlapCopyPanel = rectanglesIntersect(
                  finalLeftPx,
                  finalTopPx,
                  bubbleSize,
                  protectedZone,
                );
                const spread = overlapCopyPanel
                  ? (() => {
                      const zoneGap = isSmDown ? 12 : 18;
                      const pushedRight = Math.min(
                        Math.max(protectedZone.maxX + zoneGap, finalLeftPx),
                        vw - bubbleSize - safeMargin,
                      );
                      const pushedDown = Math.min(
                        Math.max(protectedZone.maxY + zoneGap, finalTopPx),
                        vh - bubbleSize - safeMargin,
                      );
                      const favorDown = finalLeftPx > protectedZone.maxX - bubbleSize * 0.35;

                      return {
                        offsetX: (favorDown ? finalLeftPx : pushedRight) - leftPx,
                        offsetY: (favorDown ? pushedDown : finalTopPx) - topPx,
                        scale: initialSpread.scale,
                      };
                    })()
                  : initialSpread;
                const motionDelay = shouldReduceMotion
                  ? '0ms'
                  : isPreviewOpen
                    ? `${Math.max(0, bubble.delay - 220)}ms`
                    : bubblesEntered
                      ? `${maxBubbleDelay - bubble.delay}ms`
                      : `${bubble.delay}ms`;
                const transform = `translate3d(${spread.offsetX}px, ${spread.offsetY}px, 0) scale(${spread.scale})`;
                const hoverTransform = `translate3d(${spread.offsetX}px, ${spread.offsetY + hoverTranslateY}px, 0) scale(${(spread.scale * hoverScale).toFixed(3)})`;
                const entryTransform = `translate3d(${Math.round(bubble.enterX * (isSmDown ? 0.58 : isMdDown ? 0.78 : 1)) + spread.offsetX}px, ${Math.round(bubble.enterY * (isSmDown ? 0.58 : isMdDown ? 0.78 : 1)) + spread.offsetY}px, 0) scale(${(0.72 * spread.scale).toFixed(3)})`;

                return (
                  <BubbleButton
                    key={bubble.id}
                    type='button'
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      event.stopPropagation();
                      setActiveBubbleId(bubble.id);
                    }}
                    aria-label={`${t.proof.items[bubble.id].label}: ${t.proof.items[bubble.id].metric}`}
                    $entered={shouldReduceMotion ? true : bubblesEntered}
                    $size={bubbleSize}
                    $active={activeBubbleId === bubble.id}
                    $delay={motionDelay}
                    $transform={transform}
                    $entryTransform={entryTransform}
                    sx={{
                      top,
                      left,
                      ...(activeBubbleId === bubble.id
                        ? {
                            boxShadow:
                              '0 18px 34px rgba(0, 0, 0, 0.56), inset 0 0 0 2px rgba(255,255,255,0.86)',
                            filter: 'saturate(1.2) brightness(1.04)',
                          }
                        : null),
                      ...(activeBubbleId === null
                        ? {
                            '&:hover': {
                              transform: hoverTransform,
                              boxShadow:
                                '0 24px 40px rgba(0, 0, 0, 0.58), inset 0 0 0 2px rgba(255,255,255,0.97)',
                              filter: 'saturate(1.22) brightness(1.06)',
                            },
                            '&:focus-visible': {
                              transform: hoverTransform,
                              boxShadow:
                                '0 24px 40px rgba(0, 0, 0, 0.58), inset 0 0 0 2px rgba(255,255,255,0.97), 0 0 0 4px rgba(255,255,255,0.32)',
                              filter: 'saturate(1.22) brightness(1.06)',
                            },
                          }
                        : null),
                    }}
                  >
                    <BubbleText>
                      <Typography
                        variant='overline'
                        sx={{ color: 'rgba(255,255,255,0.72)', letterSpacing: '0.08em' }}
                      >
                        {t.proof.items[bubble.id].label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize:
                            bubble.size >= 180
                              ? '1.7rem'
                              : bubble.size >= 120
                                ? '1.35rem'
                                : '1.08rem',
                          fontWeight: 800,
                          lineHeight: 1.02,
                          letterSpacing: '-0.04em',
                        }}
                      >
                        {t.proof.items[bubble.id].metric}
                      </Typography>
                    </BubbleText>
                  </BubbleButton>
                );
              })}

              {activeItem && (
                <PreviewCard>
                  <Typography
                    variant='overline'
                    sx={{ color: 'text.secondary', letterSpacing: '0.12em' }}
                  >
                    {t.proof.detailEyebrow}
                  </Typography>
                  <Typography variant='h5' sx={{ mt: 0.75, mb: 1 }}>
                    {activeItem.label}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontSize: 'clamp(1.25rem, 2vw, 1.55rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.04em',
                      color: 'primary.main',
                    }}
                  >
                    {activeItem.metric}
                  </Typography>
                  <Typography variant='body2'>{activeItem.description}</Typography>
                </PreviewCard>
              )}
            </Stage>
          </Overlay>
        </Fade>
      </Modal>
    </>
  );
}
