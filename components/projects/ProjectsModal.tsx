'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
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
import type { ActiveProject } from './projects.types';

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
  display: 'grid',
  gap: 1,
  gridTemplateColumns: {
    xs: 'repeat(2, minmax(0, 1fr))',
    sm: 'repeat(3, minmax(0, 1fr))',
  },
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
  previewLabel,
  sliderLabel,
  slides,
}: {
  previewLabel: string;
  sliderLabel: string;
  slides: ActiveProject['slides'];
}) {
  return (
    <ProjectPreviewCard sx={modalCardPaddingSx}>
      <Box>
        <Typography variant='overline' sx={overlineAccentSx}>
          {previewLabel}
        </Typography>
      </Box>

      <ProjectPreviewSurface role='region' aria-label={sliderLabel} sx={previewGridSx}>
        {slides.map((slide, index) => (
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
            <Typography variant='overline' sx={overlineAccentSx}>
              {String(index + 1).padStart(2, '0')}
            </Typography>
            <Typography variant='subtitle2' sx={{ mt: 0.75, fontWeight: 700 }}>
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
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (!visible || !activeProject) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activeProject, visible]);

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
          <ProjectModalInner>
            <ProjectModalCloseButton
              buttonRef={closeButtonRef}
              closeLabel={closeLabel}
              onClose={onClose}
              sx={floatingCloseButtonSx}
            />

            <ProjectMain>
              <ProjectModalHeader project={activeProject} />
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
              <ProjectPreviewSlides
                previewLabel={previewLabel}
                sliderLabel={sliderLabel}
                slides={activeProject.slides}
              />
              <ProjectModalCloseButton
                closeLabel={closeLabel}
                onClose={onClose}
                sx={mobileCloseButtonSx}
              />
            </ProjectAside>
          </ProjectModalInner>
        ) : null}
      </ProjectModal>
    </>
  );
}
