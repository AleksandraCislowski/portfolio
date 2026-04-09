'use client';

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from '../i18n/useTranslation';
import { HeroBackground } from './hero/HeroBackground';
import { HeroCopy } from './hero/HeroCopy';
import { HeroVisual } from './hero/HeroVisual';
import { heroSectionSx } from './hero/Hero.constants';
import { HeroSection, HeroShell } from './hero/Hero.styles';
import { HOME_SECTION_REPLAY_ID, useSectionAnimationReplay } from './sectionAnimationReplay';

export default function Hero() {
  const t = useTranslation();
  const theme = useTheme();
  const isCompactHeroLayout = useMediaQuery(theme.breakpoints.down('lg'));
  const isPhoneViewport = useMediaQuery(theme.breakpoints.down('sm'));
  const replayKey = useSectionAnimationReplay(HOME_SECTION_REPLAY_ID);

  return (
    <HeroSection
      key={`hero-${replayKey}`}
      id={HOME_SECTION_REPLAY_ID}
      sx={heroSectionSx}
    >
      <HeroBackground deferVideo={isPhoneViewport} />

      <HeroShell>
        <HeroCopy
          t={t}
          visualSlot={isCompactHeroLayout ? <HeroVisual t={t} /> : null}
        />
        {isCompactHeroLayout ? null : <HeroVisual t={t} />}
      </HeroShell>
    </HeroSection>
  );
}
