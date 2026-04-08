'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import { PROJECTS } from '../../config/projects';
import {
  PlanetButton,
  PlanetDriftShell,
  PlanetOrbitBack,
  PlanetOrbitChar,
  PlanetOrbitTextRun,
  PlanetSlot,
} from './Projects.styles';
import {
  buildOrbitLabel,
  getOrbitCharStyle,
  getPlanetTransforms,
  getPlanetVisualState,
  getProjectLayout,
} from './projects.utils';
import type { ProjectItem } from './projects.types';

type ProjectPlanetProps = {
  index: number;
  item: ProjectItem;
  isSmDown: boolean;
  isMdDown: boolean;
  entered: boolean;
  shouldReduceMotion: boolean;
  orbitProgress: number;
  modalVisible: boolean;
  activeProjectIndex: number | null;
  planetRecovering: boolean;
  planetMotionPaused: boolean;
  openLabel: string;
  onOpen: (index: number) => void;
  planetButtonRef: (node: HTMLButtonElement | null) => void;
};

export function ProjectPlanet({
  index,
  item,
  isSmDown,
  isMdDown,
  entered,
  shouldReduceMotion,
  orbitProgress,
  modalVisible,
  activeProjectIndex,
  planetRecovering,
  planetMotionPaused,
  openLabel,
  onOpen,
  planetButtonRef,
}: ProjectPlanetProps) {
  const project = PROJECTS[index];
  const layout = getProjectLayout(index, isSmDown, isMdDown);
  const isActive = activeProjectIndex === index && modalVisible;
  const delay = `${index * 0.9}s`;
  const orbitChars = buildOrbitLabel(item.title);
  const visualState = getPlanetVisualState(
    isActive,
    modalVisible,
    entered,
    shouldReduceMotion,
  );

  return (
    <PlanetSlot
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
          isSmDown,
          isActive,
          modalVisible,
          entered,
          shouldReduceMotion,
        ),
        transitionDelay: entered || shouldReduceMotion
          ? `${240 + index * 170}ms`
          : '0ms',
        zIndex: isActive ? 4 : 2,
      }}
    >
      {/* Drift shell controls the ambient floating motion independently from the button hit area. */}
      <PlanetDriftShell
        $tone={index}
        $delay={delay}
        $reduceMotion={shouldReduceMotion}
        $modalOpen={modalVisible}
        $motionPaused={planetMotionPaused}
        $recovering={planetRecovering}
      >
        <PlanetOrbitBack $tone={index} aria-hidden='true'>
          {/* Each planet gets a tiny decorative difference so they feel intentionally distinct. */}
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
                  (orbitProgress + index * 0.09) % 1,
                  layout.size,
                )}
              >
                {char}
              </PlanetOrbitChar>
            ))}
          </PlanetOrbitTextRun>
        </PlanetOrbitBack>

        {/* The button is the only interactive layer; visuals stay inside it so the click target stays predictable. */}
        <PlanetButton
          type='button'
          ref={planetButtonRef}
          $tone={index}
          $delay={delay}
          $reduceMotion={shouldReduceMotion}
          $modalOpen={modalVisible}
          $active={isActive}
          $recovering={planetRecovering}
          onClick={() => onOpen(index)}
          aria-haspopup='dialog'
          aria-expanded={isActive}
          aria-controls='projects-modal'
          aria-label={`${openLabel}: ${item.title}`}
        >
          <Box className='planet-hover-sweep' />
          <Box className='planet-atmosphere' />
          <Box className='planet-surface-detail planet-surface-detail-a' />
          <Box className='planet-surface-detail planet-surface-detail-b' />
          {index === 0 && <Box className='planet-mars-storm' />}
          {index === 2 && <Box className='planet-earth-clouds' />}
          <Box className='planet-rim-light' />
          <Box className='planet-shadow' />
        </PlanetButton>
      </PlanetDriftShell>
    </PlanetSlot>
  );
}
