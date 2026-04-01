import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AnimatePresence } from 'framer-motion';

import {
  BackdropGrid,
  GlowOrb,
  HeroBackdrop,
  RightOrbViewport,
} from './Hero.styles';

type HeroBackgroundProps = {
  shouldReduceMotion: boolean;
};

export function HeroBackground({ shouldReduceMotion }: HeroBackgroundProps) {
  const showRightOrb = useMediaQuery('(min-width:1820px)');

  return (
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
      <RightOrbViewport>
        <AnimatePresence>
          {showRightOrb ? (
            <GlowOrb
              key='right-orb'
              $variant='right'
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.92, x: -20, y: -20 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      x: [0, -20, 12, 0],
                      y: [0, -16, 10, 0],
                      scale: [1, 1.06, 0.97, 1],
                    }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.88, x: -28, y: -24 }
              }
              transition={{
                opacity: { duration: shouldReduceMotion ? 0.16 : 0.42 },
                scale: {
                  duration: shouldReduceMotion ? 0.16 : 0.42,
                  ease: 'easeOut',
                },
                x: showRightOrb
                  ? {
                      duration: 16,
                      repeat: Infinity,
                      ease: 'easeInOut',
                  }
                : {
                      duration: shouldReduceMotion ? 0.16 : 0.42,
                      ease: 'easeOut',
                    },
                y: showRightOrb
                  ? {
                      duration: 16,
                      repeat: Infinity,
                      ease: 'easeInOut',
                  }
                : {
                      duration: shouldReduceMotion ? 0.16 : 0.42,
                      ease: 'easeOut',
                    },
              }}
            />
          ) : null}
        </AnimatePresence>
      </RightOrbViewport>
      <BackdropGrid />
    </HeroBackdrop>
  );
}
