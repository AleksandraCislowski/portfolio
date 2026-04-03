'use client';

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';
import { useLanguage } from '../i18n/LanguageContext';
import { HeroBackground } from './hero/HeroBackground';
import { HeroCopy } from './hero/HeroCopy';
import { HeroVisual } from './hero/HeroVisual';
import { sectionVariants } from './hero/Hero.animations';
import { heroSectionSx } from './hero/Hero.constants';
import { HeroShell, MotionSection } from './hero/Hero.styles';
import { HOME_SECTION_REPLAY_ID, useSectionAnimationReplay } from './sectionAnimationReplay';

export default function Hero() {
  const t = useTranslation();
  const { lang } = useLanguage();
  const theme = useTheme();
  const isCompactHeroLayout = useMediaQuery(theme.breakpoints.down('lg'));
  const shouldReduceMotion = useReducedMotion() ?? false;
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
      <HeroBackground />

      <HeroShell>
        <HeroCopy
          t={t}
          lang={lang}
          shouldReduceMotion={shouldReduceMotion}
          visualSlot={isCompactHeroLayout ? <HeroVisual t={t} /> : null}
        />
        {isCompactHeroLayout ? null : <HeroVisual t={t} />}
      </HeroShell>
    </MotionSection>
  );
}
