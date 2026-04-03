'use client';

import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';
import { useLanguage } from '../i18n/LanguageContext';
import { HeroBackground } from './hero/HeroBackground';
import { HeroCopy } from './hero/HeroCopy';
import { HeroVisual } from './hero/HeroVisual';
import { sectionVariants } from './hero/Hero.animations';
import { heroSectionSx } from './hero/Hero.constants';
import { HeroShell, MotionSection } from './hero/Hero.styles';

export default function Hero() {
  const t = useTranslation();
  const { lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <MotionSection
      variants={sectionVariants}
      initial='hidden'
      animate='visible'
      sx={heroSectionSx}
    >
      <HeroBackground />

      <HeroShell>
        <HeroCopy t={t} lang={lang} shouldReduceMotion={shouldReduceMotion} />
        <HeroVisual t={t} />
      </HeroShell>
    </MotionSection>
  );
}
