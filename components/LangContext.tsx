"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang } from "@/lib/translations";

const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({ lang: "en", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  
  // Keep the HTML tag in sync with the language context
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.className = `lang-${lang}`;
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
