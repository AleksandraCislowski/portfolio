'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

const LANGUAGES = ['en', 'pl', 'sv'];

const defaultLang =
  typeof window !== 'undefined' && localStorage.getItem('lang')
    ? localStorage.getItem('lang')
    : 'en';

export const LanguageContext = createContext({
  lang: defaultLang,
  setLang: (lang: string) => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState(defaultLang);

  const setLang = (newLang: string) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export { LANGUAGES };
