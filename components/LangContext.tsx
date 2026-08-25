"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang } from "@/lib/translations";

const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({ lang: "en", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("parivahan_lang") as Lang;
    if (saved === "hi" || saved === "en") {
      setLangState(saved);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("parivahan_lang", newLang);
  };
  
  // Keep the HTML tag in sync with the language context
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.className = `lang-${lang}`;
  }, [lang]);

  // Use "en" during SSR and first hydration, then swap to saved language to avoid mismatch
  const currentLang = mounted ? lang : "en";

  return <LangContext.Provider value={{ lang: currentLang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
