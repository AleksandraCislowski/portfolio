'use client';

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from '../i18n/useTranslation';
import { HeroBackground } from './hero/HeroBackground';
import { HeroCopy } from './hero/HeroCopy';
import { HeroVisual } from './hero/HeroVisual';
import { sectionVariants } from './hero/Hero.animations';
import { heroSectionSx } from './hero/Hero.constants';
import { HeroShell, MotionSection } from './hero/Hero.styles';
import { HOME_SECTION_REPLAY_ID, useSectionAnimationReplay } from './sectionAnimationReplay';

export default function Hero() {
  const t = useTranslation();
  const theme = useTheme();
  const isCompactHeroLayout = useMediaQuery(theme.breakpoints.down('lg'));
  const isPhoneViewport = useMediaQuery(theme.breakpoints.down('sm'));
  const replayKey = useSectionAnimationReplay(HOME_SECTION_REPLAY_ID);

  return (
    <MotionSection
      key={`hero-${replayKey}`}
      id={HOME_SECTION_REPLAY_ID}
      variants={sectionVariants}
      initial='hidden'
      animate='visible'
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
    </MotionSection>
  );
}
