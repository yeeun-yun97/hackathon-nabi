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
  supportedLocales,
  translate,
  translateCategory,
  translateCity,
  translateLanguageOption,
  type Locale,
} from "@/lib/i18n";

export const localeStorageKey = "nari:locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
  tCity: (city: City) => string;
  tCategory: (category: ServiceCategory) => string;
  tLanguage: (language: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isSupportedLocale(value: string | null): value is Locale {
  return value !== null && (supportedLocales as readonly string[]).includes(value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    queueMicrotask(() => {
      const stored = window.localStorage.getItem(localeStorageKey);
      if (isSupportedLocale(stored)) {
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
      tCity: (city) => translateCity(locale, city),
      tCategory: (category) => translateCategory(locale, category),
      tLanguage: (language) => translateLanguageOption(locale, language),
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

export function T({
  k,
  values,
}: {
  k: string;
  values?: Record<string, string | number>;
}) {
  const { t } = useLanguage();
  return <>{t(k, values)}</>;
}
