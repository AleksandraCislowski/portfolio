import * as React from 'react';
import { Typography } from '@mui/material';

import { SITE_CONFIG } from '../../config/site';

import { itemVariants } from './Hero.animations';
import {
  CopyColumn,
  HeroActions,
  HeroEyebrow,
  HeroInlineVisualSlot,
  HeroKicker,
  HeroLocation,
  HeroMeta,
  HeroSignals,
  HeroSubtitle,
  HeroTitle,
  MetaChip,
  MotionBox,
  PrimaryHeroButton,
  SecondaryHeroButton,
  SignalItem,
} from './Hero.styles';

type HeroCopyProps = {
  t: ReturnType<typeof import('../../i18n/useTranslation').useTranslation>;
  lang: string;
  shouldReduceMotion: boolean;
  visualSlot?: React.ReactNode;
};

export function HeroCopy({
  t,
  lang,
  shouldReduceMotion,
  visualSlot,
}: HeroCopyProps) {
  const heroSkills = t.hero.skillPills;

  return (
    <MotionBox variants={itemVariants}>
      <CopyColumn>
        <HeroEyebrow>
          <HeroKicker>{t.hero.kicker}</HeroKicker>
          <HeroLocation variant='body2'>{t.hero.location}</HeroLocation>
        </HeroEyebrow>

        <MotionBox variants={itemVariants}>
          <HeroTitle variant='h1'>{t.hero.greeting}</HeroTitle>
        </MotionBox>

        <MotionBox variants={itemVariants}>
          <HeroSubtitle>{t.hero.subtitle}</HeroSubtitle>
        </MotionBox>

        <MotionBox variants={itemVariants}>
          <HeroActions>
            <PrimaryHeroButton
              variant='contained'
              color='primary'
              size='large'
              href={SITE_CONFIG.sections.projects}
            >
              {t.hero.primaryCta}
            </PrimaryHeroButton>
            <SecondaryHeroButton
              variant='outlined'
              color='secondary'
              size='large'
              href={SITE_CONFIG.sections.contact}
            >
              {t.hero.secondaryCta}
            </SecondaryHeroButton>
          </HeroActions>
        </MotionBox>

        {visualSlot ? (
          <HeroInlineVisualSlot>{visualSlot}</HeroInlineVisualSlot>
        ) : null}

        <MotionBox key={`hero-meta-${lang}`} variants={itemVariants}>
          <HeroMeta>
            {heroSkills.map((label, index) => (
              <MetaChip
                key={`${lang}-${index}-${label}`}
                label={label}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.38,
                  delay: 0.18 + Math.min(index, 7) * 0.03,
                  ease: 'easeOut',
                }}
              />
            ))}
          </HeroMeta>
        </MotionBox>

        <MotionBox variants={itemVariants}>
          <HeroSignals>
            {t.hero.signals.map((signal) => (
              <SignalItem key={signal.label}>
                <Typography component='strong'>{signal.value}</Typography>
                <Typography component='span'>{signal.label}</Typography>
              </SignalItem>
            ))}
          </HeroSignals>
        </MotionBox>
      </CopyColumn>
    </MotionBox>
  );
}
