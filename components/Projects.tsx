import * as React from 'react';
import { Box, Typography, Card, CardContent, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DESIGN_TOKENS } from '../theme/tokens';
import { useTranslation } from '../i18n/useTranslation';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';

const PLACEHOLDER_PROJECTS = Array.from(
  { length: SITE_CONFIG.placeholderProjectsCount },
  (_, index) => index + 1,
);

const CardsGrid = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 32,
  justifyContent: 'center',
}));

const CardColumn = styled(Box)(() => ({
  flex: '1 1 300px',
  maxWidth: DESIGN_TOKENS.size.projectCardMaxWidth,
  minWidth: DESIGN_TOKENS.size.projectCardMinWidth,
  textAlign: 'left',
}));

const ProjectCard = styled(Card)(() => ({
  borderRadius: DESIGN_TOKENS.radius.lg,
  transition: 'transform 0.3s',
  '&:hover': { transform: 'scale(1.04)' },
}));

const SectionTitle = styled(Typography)(() => ({
  marginBottom: 32,
}));

const ProjectTitle = styled(Typography)(() => ({
  marginBottom: 8,
}));

export default function Projects() {
  const t = useTranslation();

  return (
    <Section id={SITE_CONFIG.sectionIds.projects} textAlign='center'>
      <SectionTitle variant='h3'>
        {t.projects.title}
      </SectionTitle>
      <CardsGrid>
        {PLACEHOLDER_PROJECTS.map((projectNumber) => (
          <CardColumn key={projectNumber}>
            <ProjectCard>
              <Skeleton variant='rectangular' height={160} animation='wave' />
              <CardContent>
                <ProjectTitle variant='h6'>
                  {`Project ${projectNumber}`}
                </ProjectTitle>
                <Typography variant='body2'>{t.projects.description}</Typography>
              </CardContent>
            </ProjectCard>
          </CardColumn>
        ))}
      </CardsGrid>
    </Section>
  );
}
