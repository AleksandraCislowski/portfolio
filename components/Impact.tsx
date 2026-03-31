import * as React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/useTranslation';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ProofBubbles from './ProofBubbles';

const HeadingRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap',
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
        <ProofBubbles
          trigger={(
            <Button
              variant='outlined'
              color='primary'
              endIcon={<AutoAwesomeIcon />}
              sx={(theme) => ({
                borderRadius: 999,
                px: 2.2,
                py: 1.15,
                fontWeight: 700,
                backgroundColor: alpha(theme.palette.background.paper, 0.4),
                backdropFilter: 'blur(10px)',
                boxShadow: `0 14px 26px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.18 : 0.06)}`,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              })}
            >
              {t.proof.cta}
            </Button>
          )}
        />
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
