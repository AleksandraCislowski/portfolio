'use client';

import * as React from 'react';
import { startTransition } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../config/projects';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/useTranslation';
import Section from './Section';
import {
  ProjectsModal,
  type ProjectLaunchSnapshot,
  type ProjectsModalPhase,
} from './projects/ProjectsModal';
import {
  PlanetBackgroundImage,
  PlanetBackgroundVideo,
  PlanetButton,
  PlanetDriftShell,
  PlanetEasterHint,
  PlanetField,
  PlanetHeader,
  PlanetHint,
  PlanetHintBody,
  PlanetHintLabel,
  PlanetCourierUfo,
  PlanetOrbitBack,
  PlanetOrbitChar,
  PlanetOrbitTextRun,
  PlanetSlot,
  PlanetStage,
  SectionIntro,
  SectionTitle,
} from './projects/Projects.styles';
import {
  getActiveProject,
  getPlanetTransforms,
  getPlanetVisualState,
  getProjectLayout,
} from './projects/projects.utils';
import { useSectionAnimationReplay } from './sectionAnimationReplay';

const ORBIT_DURATION_MS = 30000;

function buildOrbitLabel(title: string) {
  const chunk = `${title.toUpperCase()} • `;
  let output = '';

  while (output.length < 44) {
    output += chunk;
  }

  return Array.from(output.slice(0, 44));
}

function getOrbitCharStyle(
  charIndex: number,
  totalChars: number,
  orbitProgress: number,
  planetSize: number,
) {
  const progress = ((totalChars - charIndex) / totalChars + orbitProgress) % 1;
  const angle = progress * Math.PI * 2 - Math.PI / 2;
  const ringRadiusX = planetSize * 0.74;
  const ringRadiusY = planetSize * 0.16;
  const x = Math.cos(angle) * ringRadiusX;
  const verticalOffset = planetSize * -0.092;
  const y = Math.sin(angle) * ringRadiusY + verticalOffset;
  const normalizedX = x / ringRadiusX;
  const rotateY = normalizedX * 78;
  const normalizedY = (y - verticalOffset) / ringRadiusY;
  const frontThreshold = -0.02;
  const frontFactor = normalizedY < frontThreshold
    ? 0
    : Math.max(0, Math.min(1, (normalizedY - frontThreshold) / (1 - frontThreshold)));
  const sideFade = Math.max(0, 1 - Math.max(0, Math.abs(normalizedX) - 0.72) / 0.28);
  const opacity = frontFactor * sideFade;
  const scale = 0.92 + frontFactor * 0.16;
  const fontSize = Math.max(14, Math.min(24, planetSize * 0.086));
  const xPx = `${x.toFixed(2)}px`;
  const yPx = `${y.toFixed(2)}px`;
  const opacityValue = opacity.toFixed(6);
  const rotateYValue = `${rotateY.toFixed(2)}deg`;
  const scaleValue = scale.toFixed(3);

  return {
    fontSize: `${fontSize.toFixed(2)}px`,
    opacity: opacityValue,
    transform: `translate(-50%, -50%) translate3d(${xPx}, ${yPx}, 0px) rotateY(${rotateYValue}) scale(${scaleValue})`,
  };
}

export default function Projects() {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const fieldRef = React.useRef<HTMLDivElement | null>(null);
  const planetButtonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const modalPhaseTimeoutRef = React.useRef<number | null>(null);
  const [entered, setEntered] = React.useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = React.useState<number | null>(null);
  const [planetMotionPaused, setPlanetMotionPaused] = React.useState(false);
  const [planetRecovering, setPlanetRecovering] = React.useState(false);
  const [modalPhase, setModalPhase] = React.useState<ProjectsModalPhase>('closed');
  const [launchSnapshot, setLaunchSnapshot] = React.useState<ProjectLaunchSnapshot | null>(null);
  const [orbitProgress, setOrbitProgress] = React.useState(0);
  const [hasHydrated, setHasHydrated] = React.useState(false);
  const replayKey = useSectionAnimationReplay(SITE_CONFIG.sectionIds.projects);
  const effectiveIsMdDown = hasHydrated ? isMdDown : false;
  const effectiveIsSmDown = hasHydrated ? isSmDown : false;
  const effectiveOrbitProgress = hasHydrated ? orbitProgress : 0;

  const clearModalPhaseTimeout = React.useCallback(() => {
    if (modalPhaseTimeoutRef.current !== null) {
      window.clearTimeout(modalPhaseTimeoutRef.current);
      modalPhaseTimeoutRef.current = null;
    }
  }, []);

  const getPlanetSnapshot = React.useCallback((index: number | null) => {
    if (index === null || typeof window === 'undefined') {
      return null;
    }

    const node = planetButtonRefs.current[index];
    if (!node) {
      return null;
    }

    const rect = node.getBoundingClientRect();
    const maxViewportEdge = Math.max(window.innerWidth, window.innerHeight);

    return {
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
      expandScale: Number(((maxViewportEdge / Math.max(rect.width, rect.height)) * 1.92).toFixed(3)),
    };
  }, []);

  const openProjectModal = React.useCallback((index: number) => {
    clearModalPhaseTimeout();
    setLaunchSnapshot(getPlanetSnapshot(index));
    setActiveProjectIndex(index);
    setModalPhase(shouldReduceMotion ? 'open' : 'opening');
  }, [clearModalPhaseTimeout, getPlanetSnapshot, shouldReduceMotion]);

  const closeProjectModal = React.useCallback(() => {
    clearModalPhaseTimeout();

    if (typeof document !== 'undefined') {
      const activeElement = document.activeElement;

      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }
    }

    if (activeProjectIndex !== null) {
      setLaunchSnapshot(getPlanetSnapshot(activeProjectIndex));
      planetButtonRefs.current[activeProjectIndex]?.blur();
    }

    if (shouldReduceMotion) {
      setModalPhase('closed');
      setActiveProjectIndex(null);
      setLaunchSnapshot(null);
      return;
    }

    setModalPhase('closing');
  }, [activeProjectIndex, clearModalPhaseTimeout, getPlanetSnapshot, shouldReduceMotion]);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setEntered(true);
      return;
    }

    if (replayKey > 0) {
      setEntered(false);
    }

    const node = fieldRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setEntered(true);
        observer.disconnect();
      },
      {
        threshold: 0.28,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [replayKey, shouldReduceMotion]);

  React.useEffect(() => {
    clearModalPhaseTimeout();

    if (modalPhase === 'opening') {
      modalPhaseTimeoutRef.current = window.setTimeout(() => {
        setModalPhase('open');
      }, 1320);
    }

    if (modalPhase === 'closing') {
      modalPhaseTimeoutRef.current = window.setTimeout(() => {
        setModalPhase('closed');
        setActiveProjectIndex(null);
        setLaunchSnapshot(null);
      }, 1320);
    }

    return () => {
      clearModalPhaseTimeout();
    };
  }, [clearModalPhaseTimeout, modalPhase]);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setPlanetMotionPaused(true);
      setPlanetRecovering(false);
      return;
    }

    setPlanetMotionPaused(false);
    setPlanetRecovering(false);
  }, [modalPhase, shouldReduceMotion]);

  React.useEffect(() => {
    if (modalPhase === 'closed') {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProjectModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeProjectModal, modalPhase]);

  React.useEffect(() => {
    return () => {
      clearModalPhaseTimeout();
    };
  }, [clearModalPhaseTimeout]);

  React.useEffect(() => {
    setHasHydrated(true);
  }, []);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setOrbitProgress(0);
      return;
    }

    let frameId = 0;

    const animate = (now: number) => {
      startTransition(() => {
        setOrbitProgress((now % ORBIT_DURATION_MS) / ORBIT_DURATION_MS);
      });
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [shouldReduceMotion]);

  const activeProject = getActiveProject(activeProjectIndex, t.projects);
  const modalVisible = modalPhase !== 'closed';

  return (
    <Section id={SITE_CONFIG.sectionIds.projects} textAlign='center'>
      <SectionTitle variant='h3'>
        {t.projects.title}
      </SectionTitle>
      <SectionIntro variant='body2'>
        {t.projects.intro}
      </SectionIntro>

      <PlanetField key={`projects-${replayKey}`} ref={fieldRef} data-entered={entered}>
        <PlanetBackgroundImage
          src='/images/profile/Cosmic-background.png'
          alt=''
          aria-hidden='true'
        />
        <PlanetBackgroundVideo
          autoPlay
          muted
          loop
          playsInline
          aria-hidden='true'
        >
          <source src='/images/projects/planets-background.mp4' type='video/mp4' />
        </PlanetBackgroundVideo>

        <PlanetHeader
          sx={{
            opacity: modalVisible ? 0 : 1,
            transform: modalVisible ? 'translate3d(0, -12px, 0)' : 'translate3d(0, 0, 0)',
            pointerEvents: modalVisible ? 'none' : 'auto',
            transition: 'opacity 220ms ease, transform 320ms ease',
          }}
        >
          <PlanetHint>
            <PlanetHintLabel
              variant='overline'
              sx={{ color: 'primary.main', letterSpacing: '0.12em' }}
            >
              {t.projects.openProject}
            </PlanetHintLabel>
            <PlanetHintBody variant='body2' sx={{ mt: 0.75 }}>
              {t.projects.planetHint}
            </PlanetHintBody>
          </PlanetHint>
        </PlanetHeader>

        <PlanetStage>
          {PROJECTS.map((project, index) => {
            const item = t.projects.items[index];
            const layout = getProjectLayout(index, effectiveIsSmDown, effectiveIsMdDown);
            const isActive = activeProjectIndex === index && modalVisible;
            const hasActiveProject = modalVisible;
            const delay = `${index * 0.9}s`;
            const orbitChars = buildOrbitLabel(item.title);
            const visualState = getPlanetVisualState(
              isActive,
              hasActiveProject,
              entered,
              shouldReduceMotion,
            );

            return (
              <PlanetSlot
                key={project.slug}
                $recovering={planetRecovering}
                style={{
                  top: layout.top,
                  left: layout.left,
                  width: `${layout.size}px`,
                  height: `${layout.size}px`,
                  opacity: visualState.opacity,
                  filter: visualState.filter,
                  transform: getPlanetTransforms(
                    index,
                    effectiveIsSmDown,
                    isActive,
                    hasActiveProject,
                    entered,
                    shouldReduceMotion,
                  ),
                  transitionDelay: entered || shouldReduceMotion
                    ? `${240 + index * 170}ms`
                    : '0ms',
                  zIndex: isActive ? 4 : 2,
                }}
              >
                <PlanetDriftShell
                  $tone={index}
                  $delay={delay}
                  $reduceMotion={shouldReduceMotion}
                  $modalOpen={hasActiveProject}
                  $motionPaused={planetMotionPaused}
                  $recovering={planetRecovering}
                >
                  <PlanetOrbitBack $tone={index} aria-hidden='true'>
                    {index === 0 && <Box className='planet-mars-comet' />}
                    {index === 1 && (
                      <>
                        <Box className='planet-orbit-arc planet-orbit-arc-a' />
                        <Box className='planet-orbit-arc planet-orbit-arc-b' />
                        <Box className='planet-orbit-arc planet-orbit-arc-c' />
                        <Box className='planet-orbit-arc planet-orbit-arc-d' />
                      </>
                    )}
                    {index === 2 && <Box className='planet-earth-moon' />}
                    <PlanetOrbitTextRun>
                      {orbitChars.map((char, charIndex) => (
                        <PlanetOrbitChar
                          key={`${project.slug}-${charIndex}-${char}`}
                          style={getOrbitCharStyle(
                            charIndex,
                            orbitChars.length,
                            (effectiveOrbitProgress + index * 0.09) % 1,
                            layout.size,
                          )}
                        >
                          {char}
                        </PlanetOrbitChar>
                      ))}
                    </PlanetOrbitTextRun>
                  </PlanetOrbitBack>
                  <PlanetButton
                    type='button'
                    ref={(node) => {
                      planetButtonRefs.current[index] = node;
                    }}
                    $tone={index}
                    $delay={delay}
                    $reduceMotion={shouldReduceMotion}
                    $modalOpen={hasActiveProject}
                    $active={isActive}
                    $recovering={planetRecovering}
                    onClick={() => openProjectModal(index)}
                    aria-haspopup='dialog'
                    aria-expanded={isActive}
                    aria-controls='projects-modal'
                    aria-label={`${t.projects.openProject}: ${item.title}`}
                  >
                    <Box className='planet-hover-sweep' />
                    <Box className='planet-atmosphere' />
                    <Box className='planet-surface-detail planet-surface-detail-a' />
                    <Box className='planet-surface-detail planet-surface-detail-b' />
                    {index === 0 && (
                      <>
                        <Box className='planet-mars-storm' />
                      </>
                    )}
                    {index === 2 && <Box className='planet-earth-clouds' />}
                    <Box className='planet-rim-light' />
                    <Box className='planet-shadow' />
                  </PlanetButton>
                </PlanetDriftShell>
              </PlanetSlot>
            );
          })}

          <PlanetCourierUfo aria-hidden='true' $reduceMotion={shouldReduceMotion}>
            <Box className='planet-courier-dome' />
            <Box className='planet-courier-beam' />
            <Box className='planet-courier-cargo planet-courier-cow'>
              <Box className='planet-cow-body' />
            </Box>
          </PlanetCourierUfo>

          <PlanetEasterHint
            variant='caption'
            sx={{
              opacity: modalVisible ? 0 : undefined,
              transform: modalVisible
                ? 'translate3d(0, 8px, 0)'
                : undefined,
            }}
          >
            {t.projects.easterHint}
          </PlanetEasterHint>

          <ProjectsModal
            activeProject={activeProject}
            visible={modalVisible}
            phase={modalPhase}
            launchSource={launchSnapshot}
            launchTone={activeProjectIndex ?? 0}
            closeLabel={t.projects.closeProject}
            detailsLabel={t.projects.modalDetails}
            previewLabel={t.projects.modalPreview}
            previewCopy={t.projects.modalPreviewCopy}
            placeholderEyebrow={t.projects.placeholderEyebrow}
            placeholderParagraphs={t.projects.placeholderParagraphs}
            placeholderBulletPoints={t.projects.placeholderBulletPoints}
            onClose={closeProjectModal}
            shouldReduceMotion={shouldReduceMotion}
          />
        </PlanetStage>
      </PlanetField>
    </Section>
  );
}
