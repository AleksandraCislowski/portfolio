import * as React from 'react';

import { SITE_CONFIG } from '../../config/site';

import { itemVariants } from './Hero.animations';
import {
  CopyColumn,
  HeroActions,
  HeroEyebrow,
  HeroInlineVisualSlot,
  HeroKicker,
  HeroLocation,
  HeroSubtitle,
  HeroTitle,
  MotionBox,
  PrimaryHeroButton,
  SecondaryHeroButton,
} from './Hero.styles';

type HeroCopyProps = {
  t: ReturnType<typeof import('../../i18n/useTranslation').useTranslation>;
  visualSlot?: React.ReactNode;
};

export function HeroCopy({
  t,
  visualSlot,
}: HeroCopyProps) {
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
      </CopyColumn>
    </MotionBox>
  );
}
