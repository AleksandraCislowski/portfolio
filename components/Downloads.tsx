import * as React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
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

const DownloadsLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  alignItems: 'start',
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'minmax(0, 0.9fr) minmax(280px, 0.7fr)',
    gap: theme.spacing(4),
  },
}));

const DownloadsCards = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
}));

const DownloadsPreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 220,
  borderRadius: 28,
  border: `1px dashed ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.55 : 0.9)}`,
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(160deg, ${alpha('#0F1B33', 0.72)} 0%, ${alpha('#15284B', 0.54)} 100%)`
      : `linear-gradient(160deg, ${alpha('#FFFFFF', 0.88)} 0%, ${alpha('#EEF6FF', 0.92)} 100%)`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 20px 48px rgba(2, 6, 23, 0.22)'
      : '0 20px 48px rgba(37, 99, 235, 0.08)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      theme.palette.mode === 'dark'
        ? 'radial-gradient(circle at 18% 18%, rgba(125,211,252,0.12), transparent 28%), radial-gradient(circle at 82% 78%, rgba(96,165,250,0.12), transparent 32%)'
        : 'radial-gradient(circle at 18% 18%, rgba(125,211,252,0.14), transparent 28%), radial-gradient(circle at 82% 78%, rgba(96,165,250,0.12), transparent 32%)',
    pointerEvents: 'none',
  },
  [theme.breakpoints.down('lg')]: {
    minHeight: 160,
  },
}));

const DownloadsPreviewLabel = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  display: 'grid',
  placeItems: 'center',
  padding: theme.spacing(3),
  textAlign: 'center',
  color: alpha(theme.palette.text.secondary, 0.88),
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

      <DownloadsLayout>
        <DownloadsCards>
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
        </DownloadsCards>

        <DownloadsPreview aria-hidden='true'>
          <DownloadsPreviewLabel variant='body2'>
            Image placeholder
          </DownloadsPreviewLabel>
        </DownloadsPreview>
      </DownloadsLayout>
    </Section>
  );
}
