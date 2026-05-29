import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "vi";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (en: string, vi: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("vv-lang");
    if (saved === "en" || saved === "vi") return saved;
    // Default to English
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("vv-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Helper function to return translation based on current language
  const t = (en: string, vi: string) => (lang === "en" ? en : vi);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
