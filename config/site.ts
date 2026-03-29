export const SECTION_IDS = {
  about: 'about',
  impact: 'impact',
  experience: 'experience',
  skills: 'skills',
  projects: 'projects',
  contact: 'contact',
} as const;

export const SECTION_ANCHORS = {
  home: '#',
  about: `#${SECTION_IDS.about}`,
  impact: `#${SECTION_IDS.impact}`,
  experience: `#${SECTION_IDS.experience}`,
  skills: `#${SECTION_IDS.skills}`,
  projects: `#${SECTION_IDS.projects}`,
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
} as const;
