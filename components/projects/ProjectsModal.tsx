'use client';

import * as React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
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
import type { ActiveProject, ProjectSlug } from './projects.types';

export type ProjectsModalPhase = 'closed' | 'opening' | 'open' | 'closing';

export type ProjectLaunchSnapshot = {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  expandScale: number;
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
  previousSlideLabel: string;
  nextSlideLabel: string;
  visitSiteLabel: string;
  onClose: () => void;
  shouldReduceMotion: boolean;
};

const overlineAccentSx = { color: 'primary.main', letterSpacing: '0.12em' } as const;
const modalCardPaddingSx = { p: { xs: 2, sm: 2.5 } } as const;
const metaGridSx = {
  mt: 1.5,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 1.25,
} as const;
const previewGridSx = {
  position: 'relative',
} as const;
const floatingCloseButtonSx = {
  position: 'absolute',
  top: { xs: 14, sm: 18 },
  right: { xs: 14, sm: 18 },
  zIndex: 3,
} as const;
const mobileCloseButtonSx = {
  display: { xs: 'inline-flex', sm: 'none' },
  alignSelf: 'stretch',
  justifyContent: 'center',
  mt: 0.5,
} as const;
const placeholderProjectSlugs: readonly ProjectSlug[] = ['personal-blog', 'dashboard'] as const;

// Main narrative card: this is the "what was built and why it mattered" part of the case study.
function ProjectModalHeader({ project }: { project: ActiveProject }) {
  return (
    <ProjectCard sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant='overline' sx={overlineAccentSx}>
        {project.eyebrow}
      </Typography>
      <Typography
        id={`project-modal-title-${project.slug}`}
        variant='h4'
        sx={{
          mt: 1,
          mb: 1.5,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          textWrap: 'balance',
        }}
      >
        {project.title}
      </Typography>
      <Typography
        id={`project-modal-description-${project.slug}`}
        variant='body1'
        sx={{ color: 'text.secondary', mb: 2.5, maxWidth: 680 }}
      >
        {project.description}
      </Typography>

      <Box sx={{ display: 'grid', gap: 1.5 }}>
        {project.paragraphs.map((paragraph) => (
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
  );
}

// Short bullet snapshot for recruiters who scan before they read the full story.
function ProjectDetailsCard({
  detailsLabel,
  points,
}: {
  detailsLabel: string;
  points: string[];
}) {
  return (
    <ProjectCard sx={modalCardPaddingSx}>
      <Typography variant='overline' sx={overlineAccentSx}>
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
        {points.map((point) => (
          <Typography key={point} component='li' variant='body2' sx={{ lineHeight: 1.7 }}>
            {point}
          </Typography>
        ))}
      </Box>
    </ProjectCard>
  );
}

// Quick metadata block plus optional link to the live project.
function ProjectFactsCard({
  factsLabel,
  meta,
  liveUrl,
  visitSiteLabel,
}: {
  factsLabel: string;
  meta: ActiveProject['meta'];
  liveUrl?: string;
  visitSiteLabel: string;
}) {
  return (
    <ProjectCard sx={modalCardPaddingSx}>
      <Typography variant='overline' sx={overlineAccentSx}>
        {factsLabel}
      </Typography>
      <Box sx={metaGridSx}>
        {meta.map((item) => (
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
            <Typography variant='body2' sx={{ mt: 0.75, fontWeight: 700, lineHeight: 1.5 }}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {liveUrl ? (
        <Box
          component='a'
          href={liveUrl}
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
  );
}

// Placeholder gallery keeps the modal structure ready for real screenshots without changing layout later.
function ProjectPreviewSlides({
  projectSlug,
  previewLabel,
  sliderLabel,
  previousSlideLabel,
  nextSlideLabel,
  slides,
}: {
  projectSlug: ActiveProject['slug'];
  previewLabel: string;
  sliderLabel: string;
  previousSlideLabel: string;
  nextSlideLabel: string;
  slides: ActiveProject['slides'];
}) {
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);

  React.useEffect(() => {
    setActiveSlideIndex(0);
  }, [projectSlug]);

  const totalSlides = slides.length;
  const activeSlide = slides[activeSlideIndex];
  const activeSlideAspectRatio =
    'imageAspectRatio' in activeSlide ? activeSlide.imageAspectRatio : undefined;
  const activeSlideImageSrc =
    'imageSrc' in activeSlide ? activeSlide.imageSrc : undefined;
  const activeSlideImageAlt =
    'imageAlt' in activeSlide ? activeSlide.imageAlt : undefined;

  const goToPreviousSlide = React.useCallback(() => {
    setActiveSlideIndex((currentIndex) =>
      currentIndex === 0 ? totalSlides - 1 : currentIndex - 1,
    );
  }, [totalSlides]);

  const goToNextSlide = React.useCallback(() => {
    setActiveSlideIndex((currentIndex) =>
      currentIndex === totalSlides - 1 ? 0 : currentIndex + 1,
    );
  }, [totalSlides]);

  if (!activeSlide) {
    return null;
  }

  return (
    <ProjectPreviewCard sx={modalCardPaddingSx}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        <Typography variant='overline' sx={overlineAccentSx}>
          {previewLabel}
        </Typography>
        <Typography
          variant='caption'
          sx={{ color: 'text.secondary', letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          {String(activeSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </Typography>
      </Box>

      <ProjectPreviewSurface role='region' aria-label={sliderLabel} sx={previewGridSx}>
        <Box
          sx={{
            display: 'grid',
            gap: 1.25,
            p: { xs: 0, sm: 0.25 },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: activeSlideAspectRatio ?? '4 / 3',
              borderRadius: 2.75,
              border: '1px solid rgba(255,255,255,0.12)',
              background: `
                radial-gradient(circle at 20% 18%, rgba(186,230,253,0.2), transparent 26%),
                linear-gradient(180deg, rgba(7,20,38,0.98) 0%, rgba(10,31,56,0.94) 100%)
              `,
              boxShadow: '0 18px 34px rgba(2, 6, 23, 0.22)',
            }}
          >
            {activeSlideImageSrc ? (
              <Image
                fill
                src={activeSlideImageSrc}
                alt={activeSlideImageAlt ?? activeSlide.title}
                sizes='(max-width: 900px) 100vw, 720px'
                style={{ objectFit: 'contain' }}
              />
            ) : null}

            {totalSlides > 1 ? (
              <>
                <Box
                  component='button'
                  type='button'
                  aria-label={previousSlideLabel}
                  onClick={goToPreviousSlide}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: { xs: 10, sm: 14 },
                    transform: 'translateY(-50%)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.16)',
                    background: 'rgba(7,20,38,0.78)',
                    color: 'text.primary',
                    cursor: 'pointer',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 12px 24px rgba(2, 6, 23, 0.26)',
                    transition: 'transform 180ms ease, background-color 180ms ease',
                    '&:hover, &:focus-visible': {
                      transform: 'translateY(-50%) scale(1.04)',
                      background: 'rgba(10,31,56,0.92)',
                    },
                  }}
                >
                  <ArrowBackRoundedIcon />
                </Box>
                <Box
                  component='button'
                  type='button'
                  aria-label={nextSlideLabel}
                  onClick={goToNextSlide}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: { xs: 10, sm: 14 },
                    transform: 'translateY(-50%)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.16)',
                    background: 'rgba(7,20,38,0.78)',
                    color: 'text.primary',
                    cursor: 'pointer',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 12px 24px rgba(2, 6, 23, 0.26)',
                    transition: 'transform 180ms ease, background-color 180ms ease',
                    '&:hover, &:focus-visible': {
                      transform: 'translateY(-50%) scale(1.04)',
                      background: 'rgba(10,31,56,0.92)',
                    },
                  }}
                >
                  <ArrowForwardRoundedIcon />
                </Box>
              </>
            ) : null}
          </Box>

          <Box sx={{ px: 0.25 }}>
            <Typography variant='overline' sx={overlineAccentSx}>
              {String(activeSlideIndex + 1).padStart(2, '0')}
            </Typography>
            <Typography variant='subtitle2' sx={{ mt: 0.5, fontWeight: 700 }}>
              {activeSlide.title}
            </Typography>
            <Typography
              variant='body2'
              sx={{ mt: 0.75, color: 'text.secondary', lineHeight: 1.65 }}
            >
              {activeSlide.caption}
            </Typography>
          </Box>

          {totalSlides > 1 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 0.9,
                pt: 0.5,
              }}
            >
              {slides.map((slide, index) => (
                <Box
                  key={`${slide.title}-${index}`}
                  component='button'
                  type='button'
                  aria-label={`${sliderLabel} ${index + 1}`}
                  onClick={() => setActiveSlideIndex(index)}
                  sx={{
                    width: index === activeSlideIndex ? 28 : 10,
                    height: 10,
                    borderRadius: 999,
                    border: 'none',
                    background:
                      index === activeSlideIndex
                        ? 'linear-gradient(90deg, rgba(125,211,252,0.94) 0%, rgba(45,212,191,0.92) 100%)'
                        : 'rgba(186,230,253,0.24)',
                    cursor: 'pointer',
                    transition: 'all 180ms ease',
                  }}
                />
              ))}
            </Box>
          ) : null}
        </Box>
      </ProjectPreviewSurface>
    </ProjectPreviewCard>
  );
}

// Shared close button wrapper keeps both desktop and mobile close actions visually in sync.
function ProjectModalCloseButton({
  closeLabel,
  onClose,
  sx,
  buttonRef,
}: {
  closeLabel: string;
  onClose: () => void;
  sx?: SxProps<Theme>;
  buttonRef?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <ProjectCloseButton
      ref={buttonRef}
      type='button'
      onClick={onClose}
      aria-label={closeLabel}
      sx={sx}
    >
      {closeLabel}
    </ProjectCloseButton>
  );
}

function ProjectComingSoon({
  project,
}: {
  project: ActiveProject;
}) {
  return (
    <ProjectCard
      sx={{
        px: { xs: 2.5, sm: 4 },
        py: { xs: 6, sm: 8 },
        minHeight: '100%',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
      }}
    >
      <Box sx={{ maxWidth: 420 }}>
        <Typography variant='overline' sx={overlineAccentSx}>
          {project.eyebrow}
        </Typography>
        <Typography
          id={`project-modal-title-${project.slug}`}
          variant='h3'
          sx={{
            mt: 1.5,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            textWrap: 'balance',
          }}
        >
          Coming soon
        </Typography>
      </Box>
    </ProjectCard>
  );
}

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
  previousSlideLabel,
  nextSlideLabel,
  visitSiteLabel,
  onClose,
  shouldReduceMotion,
}: ProjectsModalProps) {
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const activeProjectSlug = activeProject?.slug ?? null;
  const isPlaceholderProject = activeProjectSlug !== null
    && placeholderProjectSlugs.includes(activeProjectSlug);

  React.useEffect(() => {
    if (!visible || !activeProjectSlug) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activeProjectSlug, visible]);

  const handleModalKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !modalRef.current) {
      return;
    }

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) {
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === first) {
      event.preventDefault();
      last.focus();
    }

    if (!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  return (
    <>
      <ProjectOverlay $phase={phase} onClick={onClose} />

      {/* Launch visuals are only rendered during transitions; the steady-state dialog stays simpler. */}
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
        ref={modalRef}
        role='dialog'
        aria-modal='true'
        aria-hidden={!visible}
        aria-labelledby={activeProject ? `project-modal-title-${activeProject.slug}` : undefined}
        aria-describedby={activeProject ? `project-modal-description-${activeProject.slug}` : undefined}
        tabIndex={-1}
        $phase={phase}
        $tone={launchTone}
        $reduceMotion={shouldReduceMotion}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleModalKeyDown}
      >
        <ProjectModalGlow />
        {activeProject ? (
          <>
            <ProjectModalCloseButton
              buttonRef={closeButtonRef}
              closeLabel={closeLabel}
              onClose={onClose}
              sx={floatingCloseButtonSx}
            />
            {isPlaceholderProject ? (
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  height: '100%',
                  p: { xs: 2, sm: 3 },
                }}
              >
                <ProjectComingSoon project={activeProject} />
              </Box>
            ) : (
              <ProjectModalInner>
                <ProjectMain>
                  <ProjectModalHeader project={activeProject} />
                  <ProjectPreviewSlides
                    projectSlug={activeProject.slug}
                    previewLabel={previewLabel}
                    sliderLabel={sliderLabel}
                    previousSlideLabel={previousSlideLabel}
                    nextSlideLabel={nextSlideLabel}
                    slides={activeProject.slides}
                  />
                </ProjectMain>

                <ProjectAside>
                  <ProjectDetailsCard
                    detailsLabel={detailsLabel}
                    points={activeProject.bulletPoints}
                  />
                  <ProjectFactsCard
                    factsLabel={factsLabel}
                    meta={activeProject.meta}
                    liveUrl={activeProject.liveUrl}
                    visitSiteLabel={visitSiteLabel}
                  />
                  <ProjectModalCloseButton
                    closeLabel={closeLabel}
                    onClose={onClose}
                    sx={mobileCloseButtonSx}
                  />
                </ProjectAside>
              </ProjectModalInner>
            )}
          </>
        ) : null}
      </ProjectModal>
    </>
  );
}
