import { PROJECTS } from '../../config/projects';
import type { TranslationDict } from '../../i18n/translations';
import type { ProjectItem } from './projects.types';

// The orbit text is intentionally repeated so the ring still looks continuous during rotation.
export function buildOrbitLabel(title: string) {
  const orbitLabel = `• ${title.toUpperCase()} • `;
  const repeatCount = Math.max(2, Math.min(4, Math.round(56 / orbitLabel.length)));

  return Array.from(orbitLabel.repeat(repeatCount));
}

// Positions each glyph on an ellipse and fades the back half so the ring reads like a 3D orbit.
export function getOrbitCharStyle(
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

export function getProjectLayout(
  index: number,
  isSmDown: boolean,
  isMdDown: boolean,
) {
  const project = PROJECTS[index];

  return isSmDown ? project.mobile : isMdDown ? project.tablet : project.desktop;
}

// Planets enter with slightly different offsets to avoid the section feeling mechanically symmetrical.
export function getPlanetTransforms(
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

// Non-active planets stay visible behind the dialog so the modal still feels anchored to the scene.
export function getPlanetVisualState(
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

  const project = PROJECTS[activeProjectIndex];
  const item: ProjectItem = translations.items[project.itemIndex];

  return {
    slug: project.slug,
    ...item,
  };
}
