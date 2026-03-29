import * as React from 'react';
import { Typography, Stack, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DESIGN_TOKENS } from '../theme/tokens';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from '../i18n/useTranslation';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';

const AboutAvatar = styled(Avatar)(() => ({
  width: DESIGN_TOKENS.size.aboutAvatar,
  height: DESIGN_TOKENS.size.aboutAvatar,
  marginBottom: 16,
}));

const AboutDescription = styled(Typography)(() => ({
  maxWidth: DESIGN_TOKENS.size.aboutDescriptionMaxWidth,
  marginBottom: 16,
}));

const AboutTitle = styled(Typography)(() => ({
  marginBottom: 8,
}));

export default function About() {
  const t = useTranslation();

  return (
    <Section id={SITE_CONFIG.sectionIds.about} centered>
      <AboutAvatar src={SITE_CONFIG.avatarImage} alt='Profile photo' />
      <AboutTitle variant='h3'>
        {t.about.title}
      </AboutTitle>
      <AboutDescription variant='body2'>
        {t.about.description}
      </AboutDescription>
      <Stack direction='row' spacing={2}>
        <IconButton
          color='primary'
          href={SITE_CONFIG.socialLinks.linkedIn}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Open LinkedIn profile'
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          color='primary'
          href={SITE_CONFIG.socialLinks.github}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Open GitHub profile'
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          color='primary'
          href={`mailto:${SITE_CONFIG.contactEmail}`}
          aria-label='Send email'
        >
          <EmailIcon />
        </IconButton>
      </Stack>
    </Section>
  );
}
