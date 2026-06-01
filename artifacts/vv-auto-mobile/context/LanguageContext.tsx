import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

type Language = "en" | "vi";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (en: string, vi: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
});

const STORAGE_KEY = "@vvauto_lang";

interface LanguageProviderProps {
  children: React.ReactNode;
  onReady?: () => void;
}

export function LanguageProvider({ children, onReady }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((val) => {
      if (val === "en" || val === "vi") setLangState(val);
      onReady?.();
    });
  }, []);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    AsyncStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (en: string, vi: string) => (lang === "vi" ? vi : en),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
