'use client';

import * as React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  BubbleButton,
  BubbleContent,
  BubbleDriftShell,
  BubbleField,
  BubbleHeader,
  BubbleHint,
  BubbleHintBody,
  BubbleHintLabel,
  BubbleOpen,
  BubbleOrb,
  BubbleSlot,
  BubbleStage,
  SectionIntro,
  SectionTitle,
} from './projects/Projects.styles';
import {
  getActiveProject,
  getBubbleTransforms,
  getBubbleVisualState,
  getProjectLayout,
} from './projects/projects.utils';

export default function Projects() {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const fieldRef = React.useRef<HTMLDivElement | null>(null);
  const bubbleButtonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const modalPhaseTimeoutRef = React.useRef<number | null>(null);
  const [entered, setEntered] = React.useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = React.useState<number | null>(null);
  const [bubbleMotionPaused, setBubbleMotionPaused] = React.useState(false);
  const [bubbleRecovering, setBubbleRecovering] = React.useState(false);
  const [modalPhase, setModalPhase] = React.useState<ProjectsModalPhase>('closed');
  const [launchSnapshot, setLaunchSnapshot] = React.useState<ProjectLaunchSnapshot | null>(null);

  const clearModalPhaseTimeout = React.useCallback(() => {
    if (modalPhaseTimeoutRef.current !== null) {
      window.clearTimeout(modalPhaseTimeoutRef.current);
      modalPhaseTimeoutRef.current = null;
    }
  }, []);

  const getBubbleSnapshot = React.useCallback((index: number | null) => {
    if (index === null || typeof window === 'undefined') {
      return null;
    }

    const node = bubbleButtonRefs.current[index];
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
    setLaunchSnapshot(getBubbleSnapshot(index));
    setActiveProjectIndex(index);
    setModalPhase(shouldReduceMotion ? 'open' : 'opening');
  }, [clearModalPhaseTimeout, getBubbleSnapshot, shouldReduceMotion]);

  const closeProjectModal = React.useCallback(() => {
    clearModalPhaseTimeout();

    if (typeof document !== 'undefined') {
      const activeElement = document.activeElement;

      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }
    }

    if (activeProjectIndex !== null) {
      setLaunchSnapshot(getBubbleSnapshot(activeProjectIndex));
      bubbleButtonRefs.current[activeProjectIndex]?.blur();
    }

    if (shouldReduceMotion) {
      setModalPhase('closed');
      setActiveProjectIndex(null);
      setLaunchSnapshot(null);
      return;
    }

    setModalPhase('closing');
  }, [activeProjectIndex, clearModalPhaseTimeout, getBubbleSnapshot, shouldReduceMotion]);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setEntered(true);
      return;
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
  }, [shouldReduceMotion]);

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
      setBubbleMotionPaused(true);
      setBubbleRecovering(false);
      return;
    }

    setBubbleMotionPaused(false);
    setBubbleRecovering(false);
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

      <BubbleField ref={fieldRef} data-entered={entered}>
        <Box className='water-grid' />
        <Box className='water-shimmer' />
        <Box className='water-current water-current-1' />
        <Box className='water-current water-current-2' />
        <Box className='water-current water-current-3' />
        <Box className='bubble-wake bubble-wake-1' />
        <Box className='bubble-wake bubble-wake-2' />
        <Box className='bubble-wake bubble-wake-3' />
        <Box className='bubble-collision-ring' />
        <Box className='bubble-collision-ring bubble-collision-ring-2' />
        <Box className='bubble-collision-ring bubble-collision-ring-3' />
        <BubbleOrb $variant='left' />
        <BubbleOrb $variant='right' />

        <BubbleHeader>
          <BubbleHint>
            <BubbleHintLabel
              variant='overline'
              sx={{ color: 'primary.main', letterSpacing: '0.12em' }}
            >
              {t.projects.openProject}
            </BubbleHintLabel>
            <BubbleHintBody variant='body2' sx={{ mt: 0.75 }}>
              {t.projects.bubbleHint}
            </BubbleHintBody>
          </BubbleHint>
        </BubbleHeader>

        <BubbleStage>
          {PROJECTS.map((project, index) => {
            const item = t.projects.items[index];
            const layout = getProjectLayout(index, isSmDown, isMdDown);
            const isActive = activeProjectIndex === index && modalVisible;
            const hasActiveProject = modalVisible;
            const delay = `${index * 0.9}s`;
            const visualState = getBubbleVisualState(
              isActive,
              hasActiveProject,
              entered,
              shouldReduceMotion,
            );

            return (
              <BubbleSlot
                key={project.slug}
                $recovering={bubbleRecovering}
                style={{
                  top: layout.top,
                  left: layout.left,
                  width: `${layout.size}px`,
                  height: `${layout.size}px`,
                  opacity: visualState.opacity,
                  filter: visualState.filter,
                  transform: getBubbleTransforms(
                    index,
                    isSmDown,
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
                <BubbleDriftShell
                  $tone={index}
                  $delay={delay}
                  $reduceMotion={shouldReduceMotion}
                  $modalOpen={hasActiveProject}
                  $motionPaused={bubbleMotionPaused}
                  $recovering={bubbleRecovering}
                >
                  <BubbleButton
                    type='button'
                    ref={(node) => {
                      bubbleButtonRefs.current[index] = node;
                    }}
                    $tone={index}
                    $delay={delay}
                    $reduceMotion={shouldReduceMotion}
                    $modalOpen={hasActiveProject}
                    $active={isActive}
                    $recovering={bubbleRecovering}
                    onClick={() => openProjectModal(index)}
                    aria-haspopup='dialog'
                    aria-expanded={isActive}
                    aria-controls='projects-modal'
                  >
                    <Box className='bubble-hover-sweep' />
                    <BubbleContent>
                      <BubbleOpen variant='overline'>
                        {t.projects.openProject}
                      </BubbleOpen>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: index === 2 ? '1.15rem' : '1.05rem',
                            md: index === 2 ? '1.45rem' : '1.2rem',
                            lg: index === 2 ? '1.72rem' : '1.32rem',
                          },
                          fontWeight: 800,
                          lineHeight: 1.04,
                          letterSpacing: '-0.04em',
                          textWrap: 'balance',
                        }}
                      >
                        {item.title}
                      </Typography>
                    </BubbleContent>
                  </BubbleButton>
                </BubbleDriftShell>
              </BubbleSlot>
            );
          })}

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
        </BubbleStage>
      </BubbleField>
    </Section>
  );
}
