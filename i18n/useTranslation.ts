import * as React from 'react';
import en from './en.json';
import { Language, useLanguage } from './LanguageContext';

export type TranslationDict = typeof en;

const translations: Record<Language, () => Promise<{ default: TranslationDict }>> = {
  en: () => import('./en.json'),
  pl: () => import('./pl.json'),
  sv: () => import('./sv.json'),
};

export function useTranslation() {
  const { lang } = useLanguage();
  const [dict, setDict] = React.useState<TranslationDict>(en);

  React.useEffect(() => {
    translations[lang]().then((mod) => setDict(mod.default));
  }, [lang]);

  return dict;
}
