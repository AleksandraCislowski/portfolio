'use client';

import * as React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../config/projects';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/useTranslation';
import Section from './Section';
import { ProjectsModal } from './projects/ProjectsModal';
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
  const hadActiveProjectRef = React.useRef(false);
  const [entered, setEntered] = React.useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = React.useState<number | null>(null);
  const [bubbleMotionPaused, setBubbleMotionPaused] = React.useState(false);

  const closeProjectModal = React.useCallback(() => {
    if (typeof document !== 'undefined') {
      const activeElement = document.activeElement;

      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }
    }

    if (activeProjectIndex !== null) {
      bubbleButtonRefs.current[activeProjectIndex]?.blur();
    }

    setActiveProjectIndex(null);
  }, [activeProjectIndex]);

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
    if (shouldReduceMotion) {
      setBubbleMotionPaused(true);
      return;
    }

    if (activeProjectIndex !== null) {
      hadActiveProjectRef.current = true;
      setBubbleMotionPaused(true);
      return;
    }

    if (!hadActiveProjectRef.current) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setBubbleMotionPaused(false);
      hadActiveProjectRef.current = false;
    }, 760);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeProjectIndex, shouldReduceMotion]);

  React.useEffect(() => {
    if (activeProjectIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProjectModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProjectIndex, closeProjectModal]);

  const activeProject = getActiveProject(activeProjectIndex, t.projects);

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
            const isActive = activeProjectIndex === index;
            const hasActiveProject = activeProjectIndex !== null;
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
                    onClick={() => setActiveProjectIndex(index)}
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
