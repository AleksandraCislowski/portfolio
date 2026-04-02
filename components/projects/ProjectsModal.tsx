'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import {
  ProjectAside,
  ProjectCard,
  ProjectCloseButton,
  ProjectMain,
  ProjectModal,
  ProjectModalGlow,
  ProjectModalInner,
  ProjectOverlay,
  ProjectPreviewCard,
  ProjectPreviewSurface,
} from './Projects.styles';

type ActiveProject = {
  slug: string;
  title: string;
  description: string;
};

type ProjectsModalProps = {
  activeProject: ActiveProject | null;
  closeLabel: string;
  detailsLabel: string;
  previewLabel: string;
  previewCopy: string;
  placeholderEyebrow: string;
  placeholderParagraphs: string[];
  placeholderBulletPoints: string[];
  onClose: () => void;
  shouldReduceMotion: boolean;
};

export function ProjectsModal({
  activeProject,
  closeLabel,
  detailsLabel,
  previewLabel,
  previewCopy,
  placeholderEyebrow,
  placeholderParagraphs,
  placeholderBulletPoints,
  onClose,
  shouldReduceMotion,
}: ProjectsModalProps) {
  const visible = activeProject !== null;

  return (
    <>
      <ProjectOverlay $visible={visible} onClick={onClose} />
      <ProjectModal
        id='projects-modal'
        role='dialog'
        aria-modal='true'
        aria-hidden={!visible}
        aria-labelledby={activeProject ? `project-modal-title-${activeProject.slug}` : undefined}
        $visible={visible}
        $reduceMotion={shouldReduceMotion}
        onClick={(event) => event.stopPropagation()}
      >
        <ProjectModalGlow />
        {activeProject ? (
          <ProjectModalInner>
            <ProjectMain>
              <ProjectCloseButton
                type='button'
                onClick={onClose}
                aria-label={closeLabel}
              >
                {closeLabel}
              </ProjectCloseButton>

              <ProjectCard sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography
                  variant='overline'
                  sx={{ color: 'primary.main', letterSpacing: '0.12em' }}
                >
                  {placeholderEyebrow}
                </Typography>
                <Typography
                  id={`project-modal-title-${activeProject.slug}`}
                  variant='h4'
                  sx={{
                    mt: 1,
                    mb: 1.5,
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    textWrap: 'balance',
                  }}
                >
                  {activeProject.title}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ color: 'text.secondary', mb: 2.5, maxWidth: 680 }}
                >
                  {activeProject.description}
                </Typography>

                <Box sx={{ display: 'grid', gap: 1.5 }}>
                  {placeholderParagraphs.map((paragraph) => (
                    <Typography
                      key={paragraph}
                      variant='body2'
                      sx={{ color: 'text.secondary', lineHeight: 1.8 }}
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              </ProjectCard>
            </ProjectMain>

            <ProjectAside>
              <ProjectCard sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Typography
                  variant='overline'
                  sx={{ color: 'primary.main', letterSpacing: '0.12em' }}
                >
                  {detailsLabel}
                </Typography>
                <Box
                  component='ul'
                  sx={{
                    mt: 1.5,
                    mb: 0,
                    pl: 2.5,
                    display: 'grid',
                    gap: 1.1,
                    color: 'text.secondary',
                  }}
                >
                  {placeholderBulletPoints.map((point) => (
                    <Typography
                      key={point}
                      component='li'
                      variant='body2'
                      sx={{ lineHeight: 1.7 }}
                    >
                      {point}
                    </Typography>
                  ))}
                </Box>
              </ProjectCard>

              <ProjectPreviewCard sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Box>
                  <Typography
                    variant='overline'
                    sx={{ color: 'primary.main', letterSpacing: '0.12em' }}
                  >
                    {previewLabel}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ mt: 1.5, color: 'text.secondary', lineHeight: 1.8 }}
                  >
                    {previewCopy}
                  </Typography>
                </Box>

                <ProjectPreviewSurface />
              </ProjectPreviewCard>
            </ProjectAside>
          </ProjectModalInner>
        ) : null}
      </ProjectModal>
    </>
  );
}
