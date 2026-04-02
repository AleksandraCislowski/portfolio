export const PROJECTS = [
  {
    slug: 'saas-delivery-leadership',
    desktop: { top: '30%', left: '12%', size: 234 },
    tablet: { top: '30%', left: '7%', size: 210 },
    mobile: { top: '10%', left: '50%', size: 208 },
  },
  {
    slug: 'workflow-velocity-optimization',
    desktop: { top: '16%', left: '66%', size: 194 },
    tablet: { top: '16%', left: '68%', size: 172 },
    mobile: { top: '43%', left: '18%', size: 174 },
  },
  {
    slug: 'stakeholder-feedback-engine',
    desktop: { top: '50%', left: '44%', size: 258 },
    tablet: { top: '52%', left: '36%', size: 224 },
    mobile: { top: '58%', left: '58%', size: 192 },
  },
] as const;

export type ProjectSlug = (typeof PROJECTS)[number]['slug'];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((project) => project.slug === slug) ?? null;
}
