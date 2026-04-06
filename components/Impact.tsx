import * as React from 'react';
import { Box, Typography, Card, CardContent, Chip, Stack } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/useTranslation';

const HeadingRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(3),
}));

const ImpactGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 24,
  '@media (min-width: 600px)': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, 0.78fr) minmax(0, 1fr) minmax(0, 1fr)',
  },
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 6,
}));

const ImpactCardShell = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$index',
})<{ $index: number }>(({ $index }) => ({
  order: $index < 2 ? $index + 1 : $index + 2,
  '@media (min-width: 1200px)': {
    order: 'initial',
  },
}));

const ImpactCard = styled(Card)(() => ({
  height: '100%',
}));

const ImpactCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1.75),
  '&:last-child': {
    paddingBottom: theme.spacing(1.75),
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(2.25),
    '&:last-child': {
      paddingBottom: theme.spacing(2.25),
    },
  },
}));

const ImpactLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  fontSize: '0.92rem',
  fontWeight: 700,
  lineHeight: 1.24,
  letterSpacing: '-0.01em',
  [theme.breakpoints.up('md')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '0.88rem',
  },
}));

const ImpactDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.45,
  [theme.breakpoints.up('lg')]: {
    marginTop: 'auto',
    lineHeight: 1.55,
  },
}));

const ImpactVisual = styled(Box)(({ theme }) => ({
  position: 'relative',
  order: 3,
  minHeight: 240,
  borderRadius: 26,
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.divider, 0.62)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  boxShadow: '0 18px 40px rgba(2, 6, 23, 0.26)',
  '@media (min-width: 600px)': {
    gridColumn: '1 / -1',
    minHeight: 280,
  },
  '@media (min-width: 1200px)': {
    order: 'initial',
    gridColumn: 'auto',
    gridRow: 'span 2',
    minHeight: 100,
  },
}));

const ImpactVisualImage = styled('img')(() => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center 42%',
  transform: 'scale(1.14)',
  '@media (min-width: 1200px)': {
    objectPosition: 'center 46%',
    transform: 'scale(1.16)',
  },
}));

const ImpactVisualOverlay = styled(Box)(() => ({
  position: 'absolute',
  inset: 0,
  background: `
    linear-gradient(180deg, ${alpha('#071022', 0.06)} 0%, ${alpha('#071022', 0.24)} 100%),
    radial-gradient(circle at center, transparent 0%, ${alpha('#071022', 0.04)} 58%, ${alpha('#071022', 0.22)} 100%)
  `,
}));

const SkillsWrap = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1.25),
  marginTop: theme.spacing(3),
  justifyContent: 'center',
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  color: theme.palette.text.primary,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.26)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.42),
  backdropFilter: 'blur(10px)',
  '& .MuiChip-label': {
    paddingInline: theme.spacing(1.6),
    fontWeight: 600,
  },
}));

export default function Impact() {
  const t = useTranslation();
  const impactCards = React.useMemo(
    () => [
      ...t.impact.items,
      ...t.hero.signals,
    ],
    [t],
  );

  return (
    <Section id={SITE_CONFIG.sectionIds.impact}>
      <HeadingRow>
        <Typography variant='h3'>
          {t.impact.title}
        </Typography>
      </HeadingRow>
      <ImpactGrid>
        {impactCards.map((item, index) => (
          <React.Fragment key={item.label}>
            <ImpactCardShell $index={index}>
              <ImpactCard>
                <ImpactCardContent>
                  <MetricValue variant='h4'>{item.value}</MetricValue>
                  <ImpactLabel variant='h6'>
                    {item.label}
                  </ImpactLabel>
                  <ImpactDescription variant='body2'>
                    {item.description}
                  </ImpactDescription>
                </ImpactCardContent>
              </ImpactCard>
            </ImpactCardShell>
            {index === 0 ? (
              <ImpactVisual aria-hidden='true'>
                <ImpactVisualImage
                  src='/images/profile/impact.png'
                  alt=''
                />
                <ImpactVisualOverlay />
              </ImpactVisual>
            ) : null}
          </React.Fragment>
        ))}
      </ImpactGrid>
      <SkillsWrap>
        {t.hero.skillPills.map((skill) => (
          <SkillChip key={skill} label={skill} />
        ))}
      </SkillsWrap>
    </Section>
  );
}
