import * as React from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DESIGN_TOKENS } from '../theme/tokens';
import DownloadIcon from '@mui/icons-material/Download';
import { useTranslation } from '../i18n/useTranslation';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';

const DownloadsDescription = styled(Typography)(() => ({
  maxWidth: DESIGN_TOKENS.size.downloadsDescriptionMaxWidth,
  marginInline: 'auto',
  marginBottom: 32,
}));

const DownloadsTitle = styled(Typography)(() => ({
  marginBottom: 16,
}));

export default function Downloads() {
  const t = useTranslation();

  return (
    <Section id={SITE_CONFIG.sectionIds.downloads} textAlign='center'>
      <DownloadsTitle variant='h3'>
        {t.downloads.title}
      </DownloadsTitle>
      <DownloadsDescription variant='body2'>
        {t.downloads.description}
      </DownloadsDescription>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent='center'
      >
        <Button variant='outlined' startIcon={<DownloadIcon />} disabled>
          {t.downloads.cv}
        </Button>
        <Button variant='outlined' startIcon={<DownloadIcon />} disabled>
          {t.downloads.portfolio}
        </Button>
        <Button variant='text' disabled>
          {t.downloads.other}
        </Button>
      </Stack>
    </Section>
  );
}
