import * as React from 'react';
import Image from 'next/image';
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

const DownloadsLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  alignItems: 'center',
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, 0.7fr) minmax(0, 1fr)',
    gap: theme.spacing(4),
    alignItems: 'center',
  },
}));

const DownloadsCards = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
}));

const DownloadsPreview = styled(Box)(({ theme }) => ({
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  minHeight: 220,
  alignSelf: 'center',
  justifySelf: 'center',
  [theme.breakpoints.down('lg')]: {
    minHeight: 160,
  },
}));

const DownloadsPreviewImageWrap = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 220,
  maxWidth: '100%',
  aspectRatio: '4 / 5',
  borderRadius: 28,
  overflow: 'hidden',
  boxShadow: '0 22px 42px rgba(15, 23, 42, 0.16)',
  [theme.breakpoints.down('lg')]: {
    width: 180,
  },
}));

const CardTitle = styled(Typography)(() => ({
  marginBottom: 8,
}));

const CardDescription = styled(Typography)(() => ({
  marginBottom: 16,
}));

export default function Downloads() {
  const t = useTranslation();
  const leftItems = t.downloads.items.slice(0, 2);
  const rightItems = t.downloads.items.slice(2, 4);

  return (
    <Section id={SITE_CONFIG.sectionIds.downloads}>
      <SectionTitle variant='h3'>{t.downloads.title}</SectionTitle>
      <SectionDescription variant='body2'>
        {t.downloads.description}
      </SectionDescription>

      <DownloadsLayout>
        <DownloadsCards>
          {leftItems.map((item) => {
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
          <DownloadsPreviewImageWrap>
            <Image
              src='/images/profile/download.png'
              alt=''
              fill
              sizes='(max-width: 1200px) 240px, 320px'
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </DownloadsPreviewImageWrap>
        </DownloadsPreview>

        <DownloadsCards>
          {rightItems.map((item) => {
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
      </DownloadsLayout>
    </Section>
  );
}
