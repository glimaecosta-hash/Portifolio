import { HTML_LANG, LANGS, useLang, useT } from "@/i18n";
import { OsButton } from "./OsButton";

/** Botões PT | EN da barra de tarefas. */
export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const t = useT();
  return (
    <div role="group" aria-label={t.language} className="flex shrink-0">
      {LANGS.map((l) => (
        <OsButton
          key={l}
          size="sm"
          variant={lang === l ? "pressed" : "default"}
          aria-pressed={lang === l}
          aria-label={t.languageNames[l]}
          title={t.languageNames[l]}
          lang={HTML_LANG[l]}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </OsButton>
      ))}
    </div>
  );
}
