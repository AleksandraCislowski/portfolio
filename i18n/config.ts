export const LANGUAGES = ['en', 'sv'] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';
export const LANGUAGE_STORAGE_KEY = 'lang';
export const LANGUAGE_COOKIE_KEY = 'lang';
