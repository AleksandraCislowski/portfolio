import * as React from 'react';

import { BackdropGrid, GlowOrb, HeroBackdrop } from './Hero.styles';

type HeroBackgroundProps = {
  shouldReduceMotion: boolean;
};

export function HeroBackground({ shouldReduceMotion }: HeroBackgroundProps) {
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
  );
}
