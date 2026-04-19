import type { ProjectConfig } from '../components/projects/projects.types';

export const PROJECTS: readonly ProjectConfig[] = [
  {
    slug: 'funkologi',
    itemIndex: 0,
    desktop: { top: '12%', left: '10%', size: 234 },
    tablet: { top: '14%', left: '8%', size: 210 },
    mobile: { top: '8%', left: '41%', size: 188 },
  },
  {
    slug: 'dashboard',
    itemIndex: 2,
    desktop: { top: '10%', left: '66%', size: 194 },
    tablet: { top: '14%', left: '66%', size: 172 },
    mobile: { top: '40%', left: '10%', size: 162 },
  },
  {
    slug: 'elsewhere-log',
    itemIndex: 1,
    desktop: { top: '44%', left: '34%', size: 258 },
    tablet: { top: '46%', left: '34%', size: 224 },
    mobile: { top: '57%', left: '44%', size: 178 },
  },
] as const;
