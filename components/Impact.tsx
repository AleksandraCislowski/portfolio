import * as React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/useTranslation';

const HeadingRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(3),
}));

const MetricsGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 24,
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 8,
}));

export default function Impact() {
  const t = useTranslation();

  return (
    <Section id={SITE_CONFIG.sectionIds.impact}>
      <HeadingRow>
        <Typography variant='h3'>
          {t.impact.title}
        </Typography>
      </HeadingRow>
      <MetricsGrid>
        {t.impact.items.map((item) => (
          <Card key={item.label}>
            <CardContent>
              <MetricValue variant='h4'>{item.value}</MetricValue>
              <Typography variant='h6' sx={{ mb: 1 }}>
                {item.label}
              </Typography>
              <Typography variant='body2'>{item.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </MetricsGrid>
    </Section>
  );
}
