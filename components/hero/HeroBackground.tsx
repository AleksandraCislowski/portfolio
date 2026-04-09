import * as React from 'react';
import {
  HeroBackdrop,
  HeroBackgroundVideo,
} from './Hero.styles';

export function HeroBackground() {
  return (
    <HeroBackdrop>
      <HeroBackgroundVideo
        autoPlay
        muted
        loop
        playsInline
        aria-hidden='true'
      >
        <source src='/images/profile/hero-background.mp4' type='video/mp4' />
      </HeroBackgroundVideo>
    </HeroBackdrop>
  );
}
