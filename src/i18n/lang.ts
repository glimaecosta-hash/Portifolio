/** Idiomas disponíveis no site. */
export type Lang = "pt" | "en";

export const LANGS: Lang[] = ["pt", "en"];

/** Código de idioma usado no HTML e na formatação de datas. */
export const HTML_LANG: Record<Lang, string> = { pt: "pt-BR", en: "en" };
