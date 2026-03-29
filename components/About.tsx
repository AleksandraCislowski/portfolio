import * as React from 'react';
import { Box, Typography, Stack, Avatar, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from '../i18n/useTranslation';

export default function About() {
  const t = useTranslation();

  return (
    <Box
      id='about'
      sx={{
        py: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar
        src='/avatar.png'
        alt='avatar'
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant='h3' sx={{ mb: 1 }}>
        {t.about.title}
      </Typography>
      <Typography variant='body2' sx={{ maxWidth: 500, mb: 2 }}>
        {t.about.description}
      </Typography>
      <Stack direction='row' spacing={2}>
        <IconButton
          color='primary'
          href='https://linkedin.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Open LinkedIn profile'
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          color='primary'
          href='https://github.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Open GitHub profile'
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          color='primary'
          href='mailto:your@email.com'
          aria-label='Send email'
        >
          <EmailIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
