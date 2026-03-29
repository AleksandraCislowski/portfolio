'use client';
import React, {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  ReactNode,
} from 'react';
import type { ThemeMode } from './types';

interface ThemeModeContextProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const THEME_STORAGE_KEY = 'theme-mode';
const THEME_CHANGE_EVENT = 'themechange';

const ThemeModeContext = createContext<ThemeModeContextProps | undefined>(
  undefined,
);

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

function getPreferredMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function readMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const savedMode = localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeMode(savedMode) ? savedMode : getPreferredMode();
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = () => onStoreChange();

  window.addEventListener('storage', handleChange);
  window.addEventListener(THEME_CHANGE_EVENT, handleChange);
  mediaQuery.addEventListener('change', handleChange);

  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener(THEME_CHANGE_EVENT, handleChange);
    mediaQuery.removeEventListener('change', handleChange);
  };
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore<ThemeMode>(subscribe, readMode, () => 'dark');

  const setMode = useMemo(
    () => (nextMode: ThemeMode) => {
      if (typeof window === 'undefined') {
        return;
      }

      if (readMode() === nextMode) {
        return;
      }

      localStorage.setItem(THEME_STORAGE_KEY, nextMode);
      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    },
    [],
  );

  return (
    <ThemeModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context)
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  return context;
}
