import { useLanguage } from './LanguageContext';
import * as React from 'react';

const translations = {
  en: () => import('./en.json'),
  pl: () => import('./pl.json'),
  sv: () => import('./sv.json'),
};

export function useTranslation() {
  const { lang } = useLanguage();
  const [dict, setDict] = React.useState<any>(null);

  React.useEffect(() => {
    type LangKey = keyof typeof translations;
    const allowedLangs: LangKey[] = ['en', 'pl', 'sv'];
    const selectedLang: LangKey = allowedLangs.includes(lang as LangKey)
      ? (lang as LangKey)
      : 'en';
    translations[selectedLang]().then((mod: any) => setDict(mod.default));
  }, [lang]);

  return dict;
}
