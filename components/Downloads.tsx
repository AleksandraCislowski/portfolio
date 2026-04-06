import * as React from 'react';
import Image from 'next/image';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
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
  justifyItems: 'center',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1fr',
    justifyItems: 'stretch',
  },
}));

const DownloadCard = styled(Card)(() => ({
  height: '100%',
  width: 'min(100%, 340px)',
  borderRadius: 24,
  border: `1px solid ${alpha('#93C5FD', 0.16)}`,
  boxShadow: '0 18px 36px rgba(2, 6, 23, 0.22)',
  background:
    'linear-gradient(180deg, rgba(15,23,42,0.9) 0%, rgba(17,24,39,0.84) 100%)',
  color: alpha('#F8FAFC', 0.96),
  transition:
    'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 24px 44px rgba(2, 6, 23, 0.28)',
    borderColor: alpha('#7DD3FC', 0.28),
  },
  '@media (min-width:1200px)': {
    width: '100%',
  },
}));

const DownloadCardContent = styled(CardContent)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

const DownloadCardTop = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
}));

const DownloadCardBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  padding: theme.spacing(0.45, 0.9),
  borderRadius: 999,
  backgroundColor: alpha('#7DD3FC', 0.12),
  color: alpha('#E0F2FE', 0.9),
}));

const DownloadCardMeta = styled(Typography)(() => ({
  color: alpha('#CBD5E1', 0.74),
}));

const DownloadCardActions = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(1),
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
  marginBottom: 4,
  color: alpha('#FFFFFF', 0.96),
}));

const CardDescription = styled(Typography)(() => ({
  marginBottom: 2,
  flexGrow: 1,
  color: alpha('#CBD5E1', 0.84),
}));

const documentMeta = {
  cv: { size: '158 KB', label: 'PDF' },
  portfolio: { size: '160 KB', label: 'PDF' },
  references: { size: '92 KB', label: 'PDF' },
  coverLetter: { size: '382 KB', label: 'PDF' },
} as const;

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
            const meta = documentMeta[item.id as keyof typeof documentMeta];

            return (
              <DownloadCard key={item.id}>
                <DownloadCardContent>
                  <DownloadCardTop>
                    <DownloadCardBadge>
                      <DescriptionOutlinedIcon sx={{ fontSize: 16 }} />
                      <Typography variant='caption'>{meta.label}</Typography>
                    </DownloadCardBadge>
                    <DownloadCardMeta variant='caption'>
                      {meta.size}
                    </DownloadCardMeta>
                  </DownloadCardTop>
                  <CardTitle variant='h6'>{item.title}</CardTitle>
                  <CardDescription variant='body2'>
                    {item.description}
                  </CardDescription>
                  <DownloadCardActions>
                    <Button
                      component='a'
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='text'
                      disabled={!href}
                      fullWidth
                      size='small'
                    >
                      View
                    </Button>
                    <Button
                      component='a'
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='outlined'
                      startIcon={<DownloadIcon />}
                      disabled={!href}
                      fullWidth
                      size='small'
                    >
                      {item.cta}
                    </Button>
                  </DownloadCardActions>
                </DownloadCardContent>
              </DownloadCard>
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
            const meta = documentMeta[item.id as keyof typeof documentMeta];

            return (
              <DownloadCard key={item.id}>
                <DownloadCardContent>
                  <DownloadCardTop>
                    <DownloadCardBadge>
                      <DescriptionOutlinedIcon sx={{ fontSize: 16 }} />
                      <Typography variant='caption'>{meta.label}</Typography>
                    </DownloadCardBadge>
                    <DownloadCardMeta variant='caption'>
                      {meta.size}
                    </DownloadCardMeta>
                  </DownloadCardTop>
                  <CardTitle variant='h6'>{item.title}</CardTitle>
                  <CardDescription variant='body2'>
                    {item.description}
                  </CardDescription>
                  <DownloadCardActions>
                    <Button
                      component='a'
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='text'
                      disabled={!href}
                      fullWidth
                      size='small'
                    >
                      View
                    </Button>
                    <Button
                      component='a'
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='outlined'
                      startIcon={<DownloadIcon />}
                      disabled={!href}
                      fullWidth
                      size='small'
                    >
                      {item.cta}
                    </Button>
                  </DownloadCardActions>
                </DownloadCardContent>
              </DownloadCard>
            );
          })}
        </DownloadsCards>
      </DownloadsLayout>
    </Section>
  );
}
