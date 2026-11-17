import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getPortfolio } from "@/data/portfolio";
import { HTML_LANG, type Lang } from "./lang";
import { UI } from "./ui-strings";

const STORAGE_KEY = "gioos-lang";

type LangContextValue = { lang: Lang; setLang: (lang: Lang) => void };

const LangContext = createContext<LangContextValue>({ lang: "pt", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Começa em português (igual ao HTML do servidor) e aplica a escolha salva depois de carregar.
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "pt" || saved === "en") setLangState(saved);
    } catch {
      // Sem acesso ao localStorage: segue em português.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang: (next) => {
        setLangState(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // Sem acesso ao localStorage: a escolha vale só nesta visita.
        }
      },
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Textos da interface no idioma atual. */
export function useT() {
  return UI[useLang().lang];
}

/** Conteúdo do portfólio (bio, projetos, currículo...) no idioma atual. */
export function usePortfolio() {
  const { lang } = useLang();
  return useMemo(() => getPortfolio(lang), [lang]);
}
