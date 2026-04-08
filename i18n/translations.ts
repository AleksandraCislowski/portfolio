import en from './en.json';
import pl from './pl.json';
import sv from './sv.json';
import type { Language } from './config';

export type TranslationDict = typeof en;

export const translations: Record<Language, TranslationDict> = {
  en,
  pl,
  sv,
};
