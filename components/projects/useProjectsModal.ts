'use client';

import * as React from 'react';
import type { ProjectLaunchSnapshot, ProjectsModalPhase } from './ProjectsModal';

const MODAL_TRANSITION_MS = 1320;
const PROJECTS_MODAL_VISIBILITY_EVENT = 'projects-modal-visibility-change';

type UseProjectsModalParams = {
  getPlanetSnapshot: (index: number | null) => ProjectLaunchSnapshot | null;
  planetButtonRefs: React.RefObject<Array<HTMLButtonElement | null>>;
  shouldReduceMotion: boolean;
};

// Centralizes modal state so the section component can stay focused on layout and animation.
export function useProjectsModal({
  getPlanetSnapshot,
  planetButtonRefs,
  shouldReduceMotion,
}: UseProjectsModalParams) {
  const modalPhaseTimeoutRef = React.useRef<number | null>(null);
  const returnFocusIndexRef = React.useRef<number | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = React.useState<number | null>(null);
  const [modalPhase, setModalPhase] = React.useState<ProjectsModalPhase>('closed');
  const [launchSnapshot, setLaunchSnapshot] = React.useState<ProjectLaunchSnapshot | null>(null);

  const clearModalPhaseTimeout = React.useCallback(() => {
    if (modalPhaseTimeoutRef.current !== null) {
      window.clearTimeout(modalPhaseTimeoutRef.current);
      modalPhaseTimeoutRef.current = null;
    }
  }, []);

  const openProjectModal = React.useCallback((index: number) => {
    clearModalPhaseTimeout();
    returnFocusIndexRef.current = index;
    // Capture the clicked planet geometry so the launch animation starts from the real UI position.
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
      // Reuse the latest trigger position so the closing animation collapses back toward the planet.
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
  }, [
    activeProjectIndex,
    clearModalPhaseTimeout,
    getPlanetSnapshot,
    planetButtonRefs,
    shouldReduceMotion,
  ]);

  React.useEffect(() => {
    clearModalPhaseTimeout();

    // The visual transitions are phase-driven, so we promote opening/closing into settled states after
    // the CSS animation completes instead of toggling everything synchronously.
    if (modalPhase === 'opening') {
      modalPhaseTimeoutRef.current = window.setTimeout(() => {
        setModalPhase('open');
      }, MODAL_TRANSITION_MS);
    }

    if (modalPhase === 'closing') {
      modalPhaseTimeoutRef.current = window.setTimeout(() => {
        setModalPhase('closed');
        setActiveProjectIndex(null);
        setLaunchSnapshot(null);
      }, MODAL_TRANSITION_MS);
    }

    return () => {
      clearModalPhaseTimeout();
    };
  }, [clearModalPhaseTimeout, modalPhase]);

  React.useEffect(() => (
    () => {
      clearModalPhaseTimeout();
    }
  ), [clearModalPhaseTimeout]);

  React.useEffect(() => {
    if (modalPhase !== 'closed') {
      return;
    }

    const returnIndex = returnFocusIndexRef.current;

    if (returnIndex === null) {
      return;
    }

    planetButtonRefs.current[returnIndex]?.focus();
    returnFocusIndexRef.current = null;
  }, [modalPhase, planetButtonRefs]);

  React.useEffect(() => {
    if (modalPhase === 'closed') {
      return;
    }

    // Lock body scroll while the dialog is active and provide a keyboard escape hatch on every viewport.
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const shouldCompensateScrollbar =
      scrollbarWidth > 0 && window.matchMedia('(pointer: fine)').matches;

    document.documentElement.style.overflow = 'hidden';

    if (shouldCompensateScrollbar) {
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
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeProjectModal, modalPhase]);

  React.useEffect(() => {
    const isOpen = modalPhase !== 'closed';

    window.dispatchEvent(new CustomEvent(PROJECTS_MODAL_VISIBILITY_EVENT, {
      detail: { isOpen },
    }));

    return () => {
      window.dispatchEvent(new CustomEvent(PROJECTS_MODAL_VISIBILITY_EVENT, {
        detail: { isOpen: false },
      }));
    };
  }, [modalPhase]);

  return {
    activeProjectIndex,
    closeProjectModal,
    launchSnapshot,
    modalPhase,
    openProjectModal,
  };
}
