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
  const displacedTransform = isSmDown
    ? index === 0
      ? 'translate3d(-44px, -52px, 0) scale(0.72) rotate(-8deg)'
      : index === 1
        ? 'translate3d(52px, -30px, 0) scale(0.7) rotate(8deg)'
        : 'translate3d(0, 66px, 0) scale(0.68) rotate(-6deg)'
    : index === 0
      ? 'translate3d(-96px, -18px, 0) scale(0.82) rotate(-7deg)'
      : index === 1
        ? 'translate3d(102px, -10px, 0) scale(0.8) rotate(7deg)'
        : 'translate3d(0, 96px, 0) scale(0.78) rotate(-5deg)';

  const introTransform = index === 0
    ? 'translate3d(-38px, 60px, 0) scale(0.72) rotate(-8deg)'
    : index === 1
      ? 'translate3d(44px, 34px, 0) scale(0.76) rotate(9deg)'
      : 'translate3d(0, 84px, 0) scale(0.66) rotate(-4deg)';

  if (hasActiveProject) {
    if (isActive) {
      return isSmDown
        ? 'translate3d(0, 0, 0) scale(0.88)'
        : 'translate3d(0, 0, 0) scale(0.92)';
    }

    return displacedTransform;
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
        ? 0.22
        : 0.7
      : entered || shouldReduceMotion
        ? 1
        : 0,
    filter: hasActiveProject
      ? isActive
        ? 'blur(8px)'
        : 'blur(0.8px)'
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
