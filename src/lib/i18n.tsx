"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "@/data/dictionary";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; ready: boolean };

const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, ready: false });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  // Kunjungan pertama: pakai pilihan tersimpan, kalau tidak ada ikuti bahasa browser
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("lang");
    } catch {}
    const detected: Lang = navigator.language.toLowerCase().startsWith("id") ? "id" : "en";
    setLangState(saved === "id" || saved === "en" ? saved : detected);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  return <LangContext.Provider value={{ lang, setLang, ready }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);