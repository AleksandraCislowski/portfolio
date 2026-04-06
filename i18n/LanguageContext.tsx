'use client';
import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  ReactNode,
  useEffect,
} from 'react';
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LANGUAGE_COOKIE_KEY,
  LANGUAGE_STORAGE_KEY,
  type Language,
} from './config';

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const LANGUAGE_EVENT = 'languagechange';

const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANGUAGE,
  setLang: () => {},
});

function isLanguage(value: string | null): value is Language {
  return value !== null && LANGUAGES.includes(value as Language);
}

function readLanguage(): Language {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (isLanguage(saved)) {
    return saved;
  }

  const cookieValue = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${LANGUAGE_COOKIE_KEY}=`))
    ?.split('=')[1] ?? null;

  return isLanguage(cookieValue) ? cookieValue : DEFAULT_LANGUAGE;
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

export function LanguageProvider({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  const lang = useSyncExternalStore<Language>(
    subscribe,
    readLanguage,
    () => initialLanguage,
  );

  const setLang = useMemo(
    () => (newLang: Language) => {
      if (typeof window === 'undefined') {
        return;
      }

      if (readLanguage() === newLang) {
        return;
      }

      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      document.cookie = `${LANGUAGE_COOKIE_KEY}=${newLang}; path=/; max-age=31536000; samesite=lax`;
      window.dispatchEvent(new Event(LANGUAGE_EVENT));
    },
    [],
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
