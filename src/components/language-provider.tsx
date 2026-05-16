"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { City, ServiceCategory } from "@/lib/data";
import {
  defaultLocale,
  isLocale,
  pickLocalized,
  translate,
  translateCategory,
  translateChip,
  translateCity,
  translateCost,
  translateDynamic,
  translateLanguageOption,
  translateOption,
  type Cost,
  type FilterChip,
  type Locale,
  type LocalizedText,
  type OptionGroupValueMap,
  type TranslationKey,
} from "@/lib/i18n";

export const localeStorageKey = "nari:locale";

type TranslateValues = Record<string, string | number>;

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, values?: TranslateValues) => string;
  /**
   * Escape hatch: use only when the key is built from runtime values.
   * Prefer `t`, `tOption`, `tCity`, `tCategory` whenever the key is known statically.
   */
  tDynamic: (key: string, values?: TranslateValues) => string;
  tOption: <G extends keyof OptionGroupValueMap>(
    group: G,
    value: OptionGroupValueMap[G],
  ) => string;
  tCity: (city: City) => string;
  tCategory: (category: ServiceCategory) => string;
  tLanguage: (language: string) => string;
  tCost: (cost: Cost) => string;
  tChip: (chip: FilterChip) => string;
  /**
   * Render a `LocalizedText` value embedded in data using the current locale.
   * Falls back to English when the active locale is missing.
   */
  tLocalized: (value: LocalizedText) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    queueMicrotask(() => {
      const stored = window.localStorage.getItem(localeStorageKey);
      if (isLocale(stored)) {
        setLocaleState(stored);
      }
    });
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(localeStorageKey, next);
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, values) => translate(locale, key, values),
      tDynamic: (key, values) => translateDynamic(locale, key, values),
      tOption: (group, value) => translateOption(locale, group, value),
      tCity: (city) => translateCity(locale, city),
      tCategory: (category) => translateCategory(locale, category),
      tLanguage: (language) => translateLanguageOption(locale, language),
      tCost: (cost) => translateCost(locale, cost),
      tChip: (chip) => translateChip(locale, chip),
      tLocalized: (value) => pickLocalized(value, locale),
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside <LanguageProvider>.");
  }
  return context;
}

export function T({ k, values }: { k: TranslationKey; values?: TranslateValues }) {
  const { t } = useLanguage();
  return <>{t(k, values)}</>;
}
