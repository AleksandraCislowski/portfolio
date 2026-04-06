const SECTION_IDS = {
  about: 'about',
  impact: 'impact',
  projects: 'projects',
  downloads: 'downloads',
  contact: 'contact',
} as const;

const SECTION_ANCHORS = {
  home: '#',
  about: `#${SECTION_IDS.about}`,
  impact: `#${SECTION_IDS.impact}`,
  projects: `#${SECTION_IDS.projects}`,
  downloads: `#${SECTION_IDS.downloads}`,
  contact: `#${SECTION_IDS.contact}`,
} as const;

export const SITE_CONFIG = {
  brandName: 'Aleksandra Cislowski',
  contactEmail: 'cislowski.aleksandra@gmail.com',
  contactPhone: '+46 73 333 89 01',
  location: 'Stockholm, Sweden',
  avatarImage: '/images/profile/IMG_4246.jpg',
  sectionIds: SECTION_IDS,
  sections: SECTION_ANCHORS,
  socialLinks: {
    linkedIn: 'https://www.linkedin.com/in/aleksandra-cislowski',
    github: 'https://github.com/AleksandraCislowski',
    lovorda: 'https://lovorda.com/me/Aleksandra',
  },
  documents: {
    cv: '/documents/Frontend&Scrum_Master_CV.pdf',
    portfolio: '/documents/Personality and CV profile.pdf',
    references:
      '/documents/Alva Labs Logic Test Report - Aleksandra Cislowski.pdf',
    coverLetter:
      '/documents/Alva Labs Personality Test Report - Aleksandra Cislowski.pdf',
  },
} as const;
