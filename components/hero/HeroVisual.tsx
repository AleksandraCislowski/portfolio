import * as React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';

import heroImage from '../../public/images/profile/Tech-driven confidence in a digital world.png';

import { itemVariants } from './Hero.animations';
import {
  ImageAccent,
  ImageAccentEyebrow,
  ImageFrame,
  ImageLayer,
  MotionBox,
  VisualColumn,
  VisualStack,
} from './Hero.styles';

type HeroVisualProps = {
  t: ReturnType<typeof import('../../i18n/useTranslation').useTranslation>;
};

export function HeroVisual({ t }: HeroVisualProps) {
  return (
    <MotionBox variants={itemVariants}>
      <VisualColumn>
        <VisualStack>
          <ImageFrame>
            <ImageLayer>
              <Image
                src={heroImage}
                alt='Aleksandra Cislowski in a modern, tech-driven portrait'
                fill
                priority
                placeholder='blur'
                sizes='(max-width: 900px) 100vw, 44vw'
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 22%',
                }}
              />
            </ImageLayer>

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
    </MotionBox>
  );
}
