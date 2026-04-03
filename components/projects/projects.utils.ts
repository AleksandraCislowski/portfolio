import { PROJECTS } from '../../config/projects';
import type { TranslationDict } from '../../i18n/useTranslation';

export function getProjectLayout(
  index: number,
  isSmDown: boolean,
  isMdDown: boolean,
) {
  const project = PROJECTS[index];

  return isSmDown ? project.mobile : isMdDown ? project.tablet : project.desktop;
}

export function getBubbleTransforms(
  index: number,
  isSmDown: boolean,
  isActive: boolean,
  hasActiveProject: boolean,
  entered: boolean,
  shouldReduceMotion: boolean,
) {
  const introTransform = index === 0
    ? 'translate3d(-38px, 60px, 0) scale(0.72) rotate(-8deg)'
    : index === 1
      ? 'translate3d(44px, 34px, 0) scale(0.76) rotate(9deg)'
      : 'translate3d(0, 84px, 0) scale(0.66) rotate(-4deg)';

  if (hasActiveProject) {
    return isActive
      ? 'translate3d(0, 0, 0) scale(0.98)'
      : 'translate3d(0, 0, 0) scale(1)';
  }

  if (entered || shouldReduceMotion) {
    return 'translate3d(0, 0, 0) scale(1)';
  }

  return introTransform;
}

export function getBubbleVisualState(
  isActive: boolean,
  hasActiveProject: boolean,
  entered: boolean,
  shouldReduceMotion: boolean,
) {
  return {
    opacity: hasActiveProject
      ? isActive
        ? 0.34
        : 0.78
      : entered || shouldReduceMotion
        ? 1
        : 0,
    filter: hasActiveProject
      ? isActive
        ? 'blur(3px)'
        : 'blur(0px)'
      : entered || shouldReduceMotion
        ? 'blur(0px)'
        : 'blur(10px)',
  };
}

export function getActiveProject(
  activeProjectIndex: number | null,
  translations: TranslationDict['projects'],
) {
  if (activeProjectIndex === null) {
    return null;
  }

  return {
    slug: PROJECTS[activeProjectIndex].slug,
    title: translations.items[activeProjectIndex].title,
    description: translations.items[activeProjectIndex].description,
  };
}
