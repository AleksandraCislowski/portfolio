import type { Language } from '../../i18n/config';

export type NavbarItem = {
  label: string;
  href: string;
  targetHref?: string;
};

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  pl: 'Polski',
  sv: 'Svenska',
};
