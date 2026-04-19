import type { TranslationDict } from '../../i18n/translations';

export type ProjectItem = TranslationDict['projects']['items'][number];
export type ActiveProject = ProjectItem & { slug: ProjectSlug };

export type ProjectSlug = 'funkologi' | 'elsewhere-log' | 'dashboard';

export type ProjectLayout = {
  top: string;
  left: string;
  size: number;
};

export type ProjectConfig = {
  slug: ProjectSlug;
  desktop: ProjectLayout;
  tablet: ProjectLayout;
  mobile: ProjectLayout;
};
