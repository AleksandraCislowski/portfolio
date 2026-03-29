import en from './en.json';
import pl from './pl.json';
import sv from './sv.json';
import { Language, useLanguage } from './LanguageContext';

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
