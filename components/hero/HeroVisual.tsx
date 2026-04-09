import * as React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';

import heroImage from '../../public/images/profile/Tech-driven confidence in a digital world.png';

import {
  HeroFadeItem,
  ImageAccent,
  ImageAccentEyebrow,
  ImageFrame,
  ImageMediaClip,
  ImageLayer,
  VisualColumn,
  VisualStack,
} from './Hero.styles';

type HeroVisualProps = {
  t: ReturnType<typeof import('../../i18n/useTranslation').useTranslation>;
};

export function HeroVisual({ t }: HeroVisualProps) {
  return (
    <HeroFadeItem $delay={220}>
      <VisualColumn>
        <VisualStack>
          <ImageFrame>
            <ImageMediaClip>
              <ImageLayer>
                <Image
                  src={heroImage}
                  alt='Aleksandra Cislowski in a modern, tech-driven portrait'
                  fill
                  priority
                  placeholder='blur'
                  quality={62}
                  sizes='(max-width: 600px) 92vw, (max-width: 900px) 88vw, 44vw'
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 22%',
                  }}
                />
              </ImageLayer>
            </ImageMediaClip>

            <ImageAccent>
              <ImageAccentEyebrow variant='caption'>
                {t.hero.portraitparagraph1}
              </ImageAccentEyebrow>
              <Typography variant='body2'>
                {t.hero.portraitparagraph2}
              </Typography>
            </ImageAccent>
          </ImageFrame>
        </VisualStack>
      </VisualColumn>
    </HeroFadeItem>
  );
}
