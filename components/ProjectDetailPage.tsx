'use client';

import NextLink from 'next/link';
import * as React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { PROJECTS, type ProjectSlug } from '../config/projects';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/useTranslation';
import Section from './Section';

const ProjectShell = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 36,
  border: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.5 : 0.78)}`,
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(145deg, ${alpha('#09111F', 0.98)} 0%, ${alpha('#111C35', 0.98)} 48%, ${alpha('#18284A', 0.98)} 100%)`
      : `linear-gradient(145deg, ${alpha('#F4F8FF', 0.98)} 0%, ${alpha('#E8F0FF', 0.98)} 48%, ${alpha('#DBE8FF', 0.98)} 100%)`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 28px 72px rgba(2, 6, 23, 0.36)'
      : '0 28px 72px rgba(37, 99, 235, 0.14)',
}));

const ProjectGlow = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$variant',
})<{ $variant: 'left' | 'right' }>(({ theme, $variant }) => ({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(24px)',
  pointerEvents: 'none',
  ...($variant === 'left'
    ? {
        width: 320,
        height: 320,
        top: -120,
        left: -90,
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.22)} 0%, transparent 72%)`,
      }
    : {
        width: 360,
        height: 360,
        right: -140,
        bottom: -160,
        background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.22)} 0%, transparent 74%)`,
      }),
}));

const ProjectPanel = styled(Stack)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  gap: theme.spacing(4),
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  alignSelf: 'flex-start',
  borderRadius: 999,
  paddingInline: theme.spacing(1.8),
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.3 : 0.76),
  border: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.42 : 0.78)}`,
  backdropFilter: 'blur(10px)',
}));

const Lead = styled(Typography)(({ theme }) => ({
  maxWidth: 760,
  color: theme.palette.text.secondary,
}));

const PlaceholderGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(280px, 0.8fr)',
  },
}));

const CopyCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 28,
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.34 : 0.78),
  border: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.44 : 0.78)}`,
  backdropFilter: 'blur(12px)',
}));

type ProjectDetailPageProps = {
  slug: ProjectSlug;
};

export default function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const t = useTranslation();
  const projectIndex = PROJECTS.findIndex((project) => project.slug === slug);
  const project = t.projects.items[projectIndex];

  return (
    <Section sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 5, md: 6 } }}>
      <ProjectShell>
        <ProjectGlow $variant='left' />
        <ProjectGlow $variant='right' />

        <ProjectPanel>
          <NextLink
            href={`/${SITE_CONFIG.sections.projects}`}
            style={{ textDecoration: 'none', alignSelf: 'flex-start' }}
          >
            <BackButton
              color='inherit'
              startIcon={<ArrowBackRoundedIcon />}
            >
              {t.projects.backLabel}
            </BackButton>
          </NextLink>

          <Box>
            <Typography
              variant='overline'
              sx={{ color: 'primary.main', letterSpacing: '0.14em' }}
            >
              {t.projects.placeholderEyebrow}
            </Typography>
            <Typography
              variant='h2'
              sx={{
                mt: 1.2,
                mb: 1.5,
                fontSize: { xs: '2.4rem', md: '3.3rem' },
                letterSpacing: '-0.05em',
                textWrap: 'balance',
              }}
            >
              {project.title}
            </Typography>
            <Lead variant='body1'>
              {project.description}
            </Lead>
          </Box>

          <PlaceholderGrid>
            <CopyCard>
              <Typography variant='h5' sx={{ mb: 1.5 }}>
                {t.projects.placeholderTitle}
              </Typography>
              {t.projects.placeholderParagraphs.map((paragraph) => (
                <Typography
                  key={paragraph}
                  variant='body1'
                  sx={{ mb: 1.5, color: 'text.secondary' }}
                >
                  {paragraph}
                </Typography>
              ))}
            </CopyCard>

            <CopyCard>
              <Typography variant='overline' sx={{ color: 'primary.main', letterSpacing: '0.12em' }}>
                {t.projects.openProject}
              </Typography>
              <Typography variant='h6' sx={{ mt: 1, mb: 1.5 }}>
                Lorem Ipsum
              </Typography>
              {t.projects.placeholderBulletPoints.map((item) => (
                <Typography key={item} variant='body2' sx={{ mb: 1.2, color: 'text.secondary' }}>
                  {item}
                </Typography>
              ))}
            </CopyCard>
          </PlaceholderGrid>
        </ProjectPanel>
      </ProjectShell>
    </Section>
  );
}
