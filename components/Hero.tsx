import * as React from 'react';
import { Box, Typography, Button, Stack, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DESIGN_TOKENS } from '../theme/tokens';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';
import { SITE_CONFIG } from '../config/site';

const heroSectionSx = {
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  paddingBlock: 64,
  position: 'relative',
} as const;

const HeroAvatar = styled(Avatar)(({ theme }) => ({
  width: DESIGN_TOKENS.size.heroAvatar,
  height: DESIGN_TOKENS.size.heroAvatar,
  marginBottom: 24,
  boxShadow: theme.shadows[6],
}));

const HeroActions = styled(Stack)(() => ({
  justifyContent: 'center',
}));

const HeroTitle = styled(Typography)(() => ({
  marginBottom: 16,
}));

const HeroSubtitle = styled(Typography)(() => ({
  marginBottom: 32,
}));

export default function Hero() {
  const t = useTranslation();

  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      sx={heroSectionSx}
    >
      <HeroAvatar src={SITE_CONFIG.avatarImage} alt='Profile photo' />
      <HeroTitle variant='h1'>
        {t.hero.greeting}
      </HeroTitle>
      <HeroSubtitle variant='subtitle1'>
        {t.hero.subtitle}
      </HeroSubtitle>
      <HeroActions direction='row' spacing={2}>
        <Button
          variant='contained'
          color='primary'
          size='large'
          href={SITE_CONFIG.sections.projects}
        >
          {t.hero.seeProjects}
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          size='large'
          href={SITE_CONFIG.sections.contact}
        >
          {t.hero.contact}
        </Button>
      </HeroActions>
    </Box>
  );
}
