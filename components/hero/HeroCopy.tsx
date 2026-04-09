import * as React from 'react';

import { SITE_CONFIG } from '../../config/site';

import {
  CopyColumn,
  HeroActions,
  HeroEyebrow,
  HeroFadeItem,
  HeroInlineVisualSlot,
  HeroKicker,
  HeroLocation,
  HeroSubtitle,
  HeroTitle,
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
    <HeroFadeItem $delay={0}>
      <CopyColumn>
        <HeroEyebrow>
          <HeroKicker>{t.hero.kicker}</HeroKicker>
          <HeroLocation variant='body2'>{t.hero.location}</HeroLocation>
        </HeroEyebrow>

        <HeroFadeItem $delay={80}>
          <HeroTitle variant='h1'>{t.hero.greeting}</HeroTitle>
        </HeroFadeItem>

        <HeroFadeItem $delay={160}>
          <HeroSubtitle>{t.hero.subtitle}</HeroSubtitle>
        </HeroFadeItem>

        <HeroFadeItem $delay={240}>
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
        </HeroFadeItem>

        {visualSlot ? (
          <HeroInlineVisualSlot>{visualSlot}</HeroInlineVisualSlot>
        ) : null}
      </CopyColumn>
    </HeroFadeItem>
  );
}
