import en from './en.json';
import pl from './pl.json';
import sv from './sv.json';
import { useLanguage } from './LanguageContext';
import type { Language } from './config';

export type TranslationDict = typeof en;

const translations: Record<Language, TranslationDict> = {
  en,
  pl,
  sv,
};

export function useTranslation() {
  const { lang } = useLanguage();
  return translations[lang];
}
