'use client';
import { createContext, useContext, useMemo, useSyncExternalStore, ReactNode } from 'react';

const LANGUAGES = ['en', 'pl', 'sv'] as const;
export type Language = (typeof LANGUAGES)[number];

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const STORAGE_KEY = 'lang';
const LANGUAGE_EVENT = 'languagechange';

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
});

function isLanguage(value: string | null): value is Language {
  return value !== null && LANGUAGES.includes(value as Language);
}

function readLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  return isLanguage(saved) ? saved : 'en';
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleChange = () => onStoreChange();
  window.addEventListener('storage', handleChange);
  window.addEventListener(LANGUAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener(LANGUAGE_EVENT, handleChange);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore<Language>(subscribe, readLanguage, () => 'en');

  const setLang = useMemo(
    () => (newLang: Language) => {
      if (typeof window === 'undefined') {
        return;
      }

      if (readLanguage() === newLang) {
        return;
      }

      localStorage.setItem(STORAGE_KEY, newLang);
      window.dispatchEvent(new Event(LANGUAGE_EVENT));
    },
    [],
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
    }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export { LANGUAGES };
