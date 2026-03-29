import * as React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/useTranslation';

const SectionTitle = styled(Typography)(() => ({
  marginBottom: 12,
}));

const SectionDescription = styled(Typography)(() => ({
  marginBottom: 24,
  maxWidth: 760,
}));

const DownloadsGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: 20,
}));

const CardTitle = styled(Typography)(() => ({
  marginBottom: 8,
}));

const CardDescription = styled(Typography)(() => ({
  marginBottom: 16,
}));

export default function Downloads() {
  const t = useTranslation();

  return (
    <Section id={SITE_CONFIG.sectionIds.downloads}>
      <SectionTitle variant='h3'>{t.downloads.title}</SectionTitle>
      <SectionDescription variant='body2'>
        {t.downloads.description}
      </SectionDescription>

      <DownloadsGrid>
        {t.downloads.items.map((item) => {
          const href =
            SITE_CONFIG.documents[item.id as keyof typeof SITE_CONFIG.documents];

          return (
            <Card key={item.id}>
              <CardContent>
                <CardTitle variant='h6'>{item.title}</CardTitle>
                <CardDescription variant='body2'>
                  {item.description}
                </CardDescription>
                <Button
                  component='a'
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='outlined'
                  startIcon={<DownloadIcon />}
                  disabled={!href}
                >
                  {item.cta}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </DownloadsGrid>
    </Section>
  );
}
