import type { Language } from '../../i18n/LanguageContext';

export type NavbarItem = {
  label: string;
  href: string;
};

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  pl: 'Polski',
  sv: 'Svenska',
};
