import * as React from 'react';
import Image from 'next/image';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
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
  width: '100%',
  gap: theme.spacing(3),
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('lg')]: {
    width: 'fit-content',
    maxWidth: '100%',
    marginInline: 'auto',
    gridTemplateColumns: '340px minmax(220px, 260px) 340px',
    gap: theme.spacing(2),
    alignItems: 'center',
  },
}));

const DownloadsCards = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  justifyItems: 'center',
  [theme.breakpoints.up('sm')]: {
    width: 'fit-content',
    maxWidth: '100%',
    marginInline: 'auto',
    gridTemplateColumns: 'repeat(2, minmax(280px, 340px))',
  },
  [theme.breakpoints.up('lg')]: {
    width: '100%',
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
  order: 2,
  [theme.breakpoints.down('lg')]: {
    minHeight: 160,
  },
  [theme.breakpoints.up('lg')]: {
    order: 2,
  },
}));

const DownloadsPreviewInner = styled(Box)(({ theme }) => ({
  width: 'min(100%, 320px)',
  display: 'grid',
  justifyItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    width: 240,
  },
}));

const MobileDownloadsCards = styled(DownloadsCards)(({ theme }) => ({
  order: 1,
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

const DownloadsCardsLeft = styled(DownloadsCards)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'grid',
    order: 1,
  },
}));

const DownloadsCardsRight = styled(DownloadsCards)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'grid',
    order: 3,
  },
}));

const DownloadsPreviewImageWrap = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 220,
  maxWidth: '100%',
  aspectRatio: '4 / 5',
  borderRadius: 14,
  overflow: 'hidden',
  boxShadow: '0 22px 42px rgba(15, 23, 42, 0.16)',
  [theme.breakpoints.down('lg')]: {
    width: 180,
  },
}));

const RecommendationsTriggerButton = styled(Button)(() => ({
  width: '100%',
  maxWidth: 260,
  minHeight: 42,
  borderRadius: 8,
  borderColor: alpha('#7DD3FC', 0.34),
  backgroundColor: alpha('#0F172A', 0.62),
  color: alpha('#F8FAFC', 0.96),
  boxShadow: '0 14px 28px rgba(2, 6, 23, 0.18)',
  transition:
    'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background-color 180ms ease',
  '&:hover': {
    borderColor: alpha('#7DD3FC', 0.68),
    backgroundColor: alpha('#0B1220', 0.92),
    boxShadow: '0 20px 34px rgba(2, 6, 23, 0.24)',
    transform: 'translateY(-1px)',
  },
}));

const RecommendationsPanel = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: 12,
  padding: theme.spacing(1.25),
  background:
    'linear-gradient(180deg, rgba(15,23,42,0.82) 0%, rgba(17,24,39,0.72) 100%)',
  border: `1px solid ${alpha('#93C5FD', 0.18)}`,
  boxShadow: '0 18px 36px rgba(2, 6, 23, 0.18)',
}));

const RecommendationsList = styled(List)(({ theme }) => ({
  padding: 0,
  display: 'grid',
  gap: theme.spacing(1),
}));

const RecommendationItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

const RecommendationText = styled(ListItemText)(() => ({
  margin: 0,
}));

const RecommendationsDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(2.5, 2.5, 1.5),
  color: alpha('#F8FAFC', 0.96),
}));

const RecommendationsDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(0, 2.5, 2.5),
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

type RecommendationItem = {
  title: string;
  description: string;
  documentId: keyof typeof SITE_CONFIG.documents;
  cta: string;
};

export default function Downloads() {
  const t = useTranslation();
  const [recommendationsOpen, setRecommendationsOpen] = React.useState(false);
  const allItems = t.downloads.items;
  const leftItems = t.downloads.items.slice(0, 2);
  const rightItems = t.downloads.items.slice(2, 4);
  const recommendationItems =
    t.downloads.recommendations.items as RecommendationItem[];

  const renderDownloadCard = (item: (typeof allItems)[number]) => {
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
            <DownloadCardMeta variant='caption'>{meta.size}</DownloadCardMeta>
          </DownloadCardTop>
          <CardTitle variant='h6'>{item.title}</CardTitle>
          <CardDescription variant='body2'>{item.description}</CardDescription>
          <DownloadCardActions>
            <Button
              component='a'
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              variant='outlined'
              disabled={!href}
              fullWidth
              size='small'
            >
              {t.downloads.viewCta}
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
              {t.downloads.downloadCta}
            </Button>
          </DownloadCardActions>
        </DownloadCardContent>
      </DownloadCard>
    );
  };

  return (
    <Section id={SITE_CONFIG.sectionIds.downloads}>
      <SectionTitle variant='h3'>{t.downloads.title}</SectionTitle>
      <SectionDescription variant='body2'>
        {t.downloads.description}
      </SectionDescription>

      <DownloadsLayout>
        <MobileDownloadsCards>
          {allItems.map((item) => renderDownloadCard(item))}
        </MobileDownloadsCards>

        <DownloadsCardsLeft>
          {leftItems.map((item) => renderDownloadCard(item))}
        </DownloadsCardsLeft>

        <DownloadsPreview>
          <DownloadsPreviewInner>
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

            <RecommendationsTriggerButton
              variant='outlined'
              onClick={() => setRecommendationsOpen(true)}
            >
              {t.downloads.recommendations.button}
            </RecommendationsTriggerButton>
          </DownloadsPreviewInner>
        </DownloadsPreview>

        <DownloadsCardsRight>
          {rightItems.map((item) => renderDownloadCard(item))}
        </DownloadsCardsRight>
      </DownloadsLayout>

      <Dialog
        open={recommendationsOpen}
        onClose={() => setRecommendationsOpen(false)}
        fullWidth
        maxWidth='sm'
        slotProps={{
          paper: {
            sx: {
              borderRadius: 1.5,
              background:
                'linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(17,24,39,0.94) 100%)',
              border: `1px solid ${alpha('#93C5FD', 0.18)}`,
              boxShadow: '0 28px 64px rgba(2, 6, 23, 0.42)',
              color: alpha('#F8FAFC', 0.96),
            },
          },
          backdrop: {
            sx: {
              backdropFilter: 'blur(6px)',
              backgroundColor: alpha('#020617', 0.66),
            },
          },
        }}
      >
        <RecommendationsDialogTitle>
          {t.downloads.recommendations.button}
          <IconButton
            aria-label={t.downloads.recommendations.closeLabel}
            onClick={() => setRecommendationsOpen(false)}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              color: alpha('#CBD5E1', 0.82),
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </RecommendationsDialogTitle>

        <RecommendationsDialogContent>
          <RecommendationsPanel aria-live='polite'>
            {recommendationItems.length > 0 ? (
              <RecommendationsList>
                {recommendationItems.map((item) => {
                  const href =
                    SITE_CONFIG.documents[
                      item.documentId as keyof typeof SITE_CONFIG.documents
                    ];

                  return (
                    <RecommendationItem key={item.title}>
                      <RecommendationText
                        primary={item.title}
                        secondary={item.description}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: alpha('#F8FAFC', 0.96),
                        }}
                        secondaryTypographyProps={{
                          variant: 'caption',
                          color: alpha('#CBD5E1', 0.76),
                        }}
                      />
                      <Button
                        component='a'
                        href={href}
                        target='_blank'
                        rel='noopener noreferrer'
                        variant='outlined'
                        size='small'
                        startIcon={<VisibilityRoundedIcon />}
                        disabled={!href}
                      >
                        {item.cta}
                      </Button>
                    </RecommendationItem>
                  );
                })}
              </RecommendationsList>
            ) : (
              <Typography variant='body2' color={alpha('#CBD5E1', 0.8)}>
                {t.downloads.recommendations.empty}
              </Typography>
            )}
          </RecommendationsPanel>
        </RecommendationsDialogContent>
      </Dialog>
    </Section>
  );
}
