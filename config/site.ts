export const SECTION_IDS = {
  about: 'about',
  projects: 'projects',
  downloads: 'downloads',
  contact: 'contact',
} as const;

export const SECTION_ANCHORS = {
  home: '#',
  about: `#${SECTION_IDS.about}`,
  projects: `#${SECTION_IDS.projects}`,
  downloads: `#${SECTION_IDS.downloads}`,
  contact: `#${SECTION_IDS.contact}`,
} as const;

export const SITE_CONFIG = {
  brandName: 'YourName.dev',
  contactEmail: 'your@email.com',
  avatarImage: '/images/profile/IMG_4246.jpg',
  sectionIds: SECTION_IDS,
  sections: SECTION_ANCHORS,
  socialLinks: {
    linkedIn: 'https://linkedin.com',
    github: 'https://github.com',
  },
  placeholderProjectsCount: 3,
} as const;
