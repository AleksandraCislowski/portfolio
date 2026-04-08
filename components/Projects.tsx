'use client';

import * as React from 'react';
import { startTransition } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../config/projects';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/useTranslation';
import Section from './Section';
import { ProjectPlanet } from './projects/ProjectPlanet';
import {
  ProjectsModal,
} from './projects/ProjectsModal';
import {
  PlanetBackgroundImage,
  PlanetBackgroundVideo,
  PlanetEasterHint,
  PlanetField,
  PlanetHeader,
  PlanetHint,
  PlanetHintBody,
  PlanetHintLabel,
  PlanetCourierUfo,
  PlanetStage,
  SectionIntro,
  SectionTitle,
} from './projects/Projects.styles';
import {
  getActiveProject,
} from './projects/projects.utils';
import { useProjectsModal } from './projects/useProjectsModal';
import { useSectionAnimationReplay } from './sectionAnimationReplay';

const ORBIT_DURATION_MS = 30000;

export default function Projects() {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const fieldRef = React.useRef<HTMLDivElement | null>(null);
  const planetButtonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const [entered, setEntered] = React.useState(false);
  const [planetMotionPaused, setPlanetMotionPaused] = React.useState(false);
  const [planetRecovering, setPlanetRecovering] = React.useState(false);
  const [orbitProgress, setOrbitProgress] = React.useState(0);
  const [hasHydrated, setHasHydrated] = React.useState(false);
  const replayKey = useSectionAnimationReplay(SITE_CONFIG.sectionIds.projects);
  const effectiveIsMdDown = hasHydrated ? isMdDown : false;
  const effectiveIsSmDown = hasHydrated ? isSmDown : false;
  const effectiveOrbitProgress = hasHydrated ? orbitProgress : 0;

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
  const {
    activeProjectIndex,
    closeProjectModal,
    launchSnapshot,
    modalPhase,
    openProjectModal,
  } = useProjectsModal({
    getPlanetSnapshot,
    planetButtonRefs,
    shouldReduceMotion,
  });

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
    if (shouldReduceMotion) {
      setPlanetMotionPaused(true);
      setPlanetRecovering(false);
      return;
    }

    setPlanetMotionPaused(false);
    setPlanetRecovering(false);
  }, [modalPhase, shouldReduceMotion]);

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
          {PROJECTS.map((project, index) => (
            <ProjectPlanet
              key={project.slug}
              index={index}
              item={t.projects.items[index]}
              isSmDown={effectiveIsSmDown}
              isMdDown={effectiveIsMdDown}
              entered={entered}
              shouldReduceMotion={shouldReduceMotion}
              orbitProgress={effectiveOrbitProgress}
              modalVisible={modalVisible}
              activeProjectIndex={activeProjectIndex}
              planetRecovering={planetRecovering}
              planetMotionPaused={planetMotionPaused}
              openLabel={t.projects.openProject}
              onOpen={openProjectModal}
              planetButtonRef={(node) => {
                planetButtonRefs.current[index] = node;
              }}
            />
          ))}

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
            factsLabel={t.projects.modalFacts}
            previewLabel={t.projects.modalPreview}
            sliderLabel={t.projects.modalSlider}
            visitSiteLabel={t.projects.visitSite}
            onClose={closeProjectModal}
            shouldReduceMotion={shouldReduceMotion}
          />
        </PlanetStage>
      </PlanetField>
    </Section>
  );
}
