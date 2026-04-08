'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import {
  ProjectLaunchBeam,
  ProjectLaunchCore,
  ProjectLaunchHalo,
  ProjectLaunchLayer,
  ProjectLaunchMorph,
  ProjectLaunchRipple,
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

export type ProjectsModalPhase = 'closed' | 'opening' | 'open' | 'closing';

export type ProjectLaunchSnapshot = {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  expandScale: number;
};

type ActiveProject = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  paragraphs: string[];
  bulletPoints: string[];
  meta: Array<{
    label: string;
    value: string;
  }>;
  slides: Array<{
    title: string;
    caption: string;
  }>;
  liveUrl?: string;
};

type ProjectsModalProps = {
  activeProject: ActiveProject | null;
  visible: boolean;
  phase: ProjectsModalPhase;
  launchSource: ProjectLaunchSnapshot | null;
  launchTone: number;
  closeLabel: string;
  detailsLabel: string;
  factsLabel: string;
  previewLabel: string;
  sliderLabel: string;
  visitSiteLabel: string;
  onClose: () => void;
  shouldReduceMotion: boolean;
};

export function ProjectsModal({
  activeProject,
  visible,
  phase,
  launchSource,
  launchTone,
  closeLabel,
  detailsLabel,
  factsLabel,
  previewLabel,
  sliderLabel,
  visitSiteLabel,
  onClose,
  shouldReduceMotion,
}: ProjectsModalProps) {
  return (
    <>
      <ProjectOverlay $phase={phase} onClick={onClose} />
      {!shouldReduceMotion && launchSource && phase !== 'closed' && phase !== 'open' ? (
        <ProjectLaunchLayer>
          {phase === 'opening' ? (
            <>
              <ProjectLaunchRipple
                $tone={launchTone}
                $phase={phase}
                $x={launchSource.centerX}
                $y={launchSource.centerY}
                $size={Math.max(launchSource.width, launchSource.height) * 1.18}
                $scale={launchSource.expandScale * 1.05}
              />
              <ProjectLaunchHalo
                $tone={launchTone}
                $phase={phase}
                $x={launchSource.centerX}
                $y={launchSource.centerY}
                $size={Math.max(launchSource.width, launchSource.height) * 0.96}
                $scale={launchSource.expandScale * 0.72}
              />
              <ProjectLaunchCore
                $tone={launchTone}
                $phase={phase}
                $x={launchSource.centerX}
                $y={launchSource.centerY}
                $size={Math.max(launchSource.width, launchSource.height) * 0.42}
                $scale={launchSource.expandScale * 0.48}
              />
            </>
          ) : null}
          {phase === 'closing' ? (
            <>
              <ProjectLaunchRipple
                $tone={launchTone}
                $phase={phase}
                $x={launchSource.centerX}
                $y={launchSource.centerY}
                $size={Math.max(launchSource.width, launchSource.height) * 1.4}
                $scale={launchSource.expandScale * 1.6}
              />
              <ProjectLaunchBeam
                $tone={launchTone}
                $phase={phase}
                $x={launchSource.centerX}
                $y={launchSource.centerY}
              />
              <ProjectLaunchHalo
                $tone={launchTone}
                $phase={phase}
                $x={launchSource.centerX}
                $y={launchSource.centerY}
                $size={Math.max(launchSource.width, launchSource.height) * 1.1}
                $scale={launchSource.expandScale * 1.12}
              />
              <ProjectLaunchMorph
                $tone={launchTone}
                $phase={phase}
                $x={launchSource.centerX}
                $y={launchSource.centerY}
                $width={launchSource.width}
                $height={launchSource.height}
                $scale={launchSource.expandScale}
              />
              <ProjectLaunchCore
                $tone={launchTone}
                $phase={phase}
                $x={launchSource.centerX}
                $y={launchSource.centerY}
                $size={Math.max(launchSource.width, launchSource.height) * 0.58}
                $scale={launchSource.expandScale * 0.72}
              />
            </>
          ) : null}
        </ProjectLaunchLayer>
      ) : null}
      <ProjectModal
        id='projects-modal'
        role='dialog'
        aria-modal='true'
        aria-hidden={!visible}
        aria-labelledby={activeProject ? `project-modal-title-${activeProject.slug}` : undefined}
        $phase={phase}
        $tone={launchTone}
        $reduceMotion={shouldReduceMotion}
        onClick={(event) => event.stopPropagation()}
      >
        <ProjectModalGlow />
        {activeProject ? (
          <ProjectModalInner>
            <ProjectCloseButton
              type='button'
              onClick={onClose}
              aria-label={closeLabel}
              sx={{
                position: 'absolute',
                top: { xs: 14, sm: 18 },
                right: { xs: 14, sm: 18 },
                zIndex: 3,
              }}
            >
              {closeLabel}
            </ProjectCloseButton>

            <ProjectMain>
              <ProjectCard sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography
                  variant='overline'
                  sx={{ color: 'primary.main', letterSpacing: '0.12em' }}
                >
                  {activeProject.eyebrow}
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
                  {activeProject.paragraphs.map((paragraph) => (
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
                  {activeProject.bulletPoints.map((point) => (
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

              <ProjectCard sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Typography
                  variant='overline'
                  sx={{ color: 'primary.main', letterSpacing: '0.12em' }}
                >
                  {factsLabel}
                </Typography>
                <Box
                  sx={{
                    mt: 1.5,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: 1.25,
                  }}
                >
                  {activeProject.meta.map((item) => (
                    <Box
                      key={`${item.label}-${item.value}`}
                      sx={{
                        p: 1.5,
                        borderRadius: 2.5,
                        border: '1px solid rgba(255,255,255,0.08)',
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(125,211,252,0.04) 100%)',
                      }}
                    >
                      <Typography
                        variant='caption'
                        sx={{
                          display: 'block',
                          color: 'text.secondary',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ mt: 0.75, fontWeight: 700, lineHeight: 1.5 }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {activeProject.liveUrl ? (
                  <Box
                    component='a'
                    href={activeProject.liveUrl}
                    target='_blank'
                    rel='noreferrer'
                    sx={{
                      mt: 1.5,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1.75,
                      py: 1.15,
                      borderRadius: 999,
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'text.primary',
                      textDecoration: 'none',
                      fontWeight: 700,
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(125,211,252,0.08) 100%)',
                      transition: 'transform 180ms ease, border-color 180ms ease',
                      '&:hover, &:focus-visible': {
                        transform: 'translateY(-1px)',
                        borderColor: 'rgba(125,211,252,0.42)',
                      },
                    }}
                  >
                    {visitSiteLabel}
                    <OpenInNewRoundedIcon sx={{ fontSize: 18 }} />
                  </Box>
                ) : null}
              </ProjectCard>

              <ProjectPreviewCard sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Box>
                  <Typography
                    variant='overline'
                    sx={{ color: 'primary.main', letterSpacing: '0.12em' }}
                  >
                    {previewLabel}
                  </Typography>
                </Box>

                <ProjectPreviewSurface
                  role='region'
                  aria-label={sliderLabel}
                  sx={{
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: {
                      xs: 'repeat(2, minmax(0, 1fr))',
                      sm: 'repeat(3, minmax(0, 1fr))',
                    },
                  }}
                >
                  {activeProject.slides.map((slide, index) => (
                    <Box
                      key={`${slide.title}-${index}`}
                      sx={{
                        minHeight: 142,
                        p: 1.5,
                        borderRadius: 2.5,
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: `
                          linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(125,211,252,0.08) 100%),
                          radial-gradient(circle at 20% 18%, rgba(255,255,255,0.14), transparent 26%)
                        `,
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16)',
                      }}
                    >
                      <Typography
                        variant='overline'
                        sx={{ color: 'primary.main', letterSpacing: '0.12em' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        sx={{ mt: 0.75, fontWeight: 700 }}
                      >
                        {slide.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ mt: 0.75, color: 'text.secondary', lineHeight: 1.65 }}
                      >
                        {slide.caption}
                      </Typography>
                    </Box>
                  ))}
                </ProjectPreviewSurface>
              </ProjectPreviewCard>

              <ProjectCloseButton
                type='button'
                onClick={onClose}
                aria-label={closeLabel}
                sx={{
                  display: { xs: 'inline-flex', sm: 'none' },
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  mt: 0.5,
                }}
              >
                {closeLabel}
              </ProjectCloseButton>
            </ProjectAside>
          </ProjectModalInner>
        ) : null}
      </ProjectModal>
    </>
  );
}
