import { getPortfolio } from "@/data/portfolio";
import type { Lang } from "@/lib/lang";
import type { IconName } from "./pixel-icons";

export type BaseAppId =
  "sobre" | "projetos" | "terminal" | "habilidades" | "curriculo" | "contato" | "lixeira";

export type WindowId = BaseAppId | `projeto:${string}`;

type AppMeta = { icon: IconName; width: number };
type AppText = { title: string; label: string };

export const APPS: Record<BaseAppId, AppMeta> = {
  sobre: { icon: "doc", width: 540 },
  projetos: { icon: "folder", width: 620 },
  terminal: { icon: "terminal", width: 580 },
  habilidades: { icon: "chip", width: 460 },
  curriculo: { icon: "disk", width: 520 },
  contato: { icon: "mail", width: 500 },
  lixeira: { icon: "trash", width: 440 },
};

const APP_TEXT: Record<Lang, Record<BaseAppId, AppText>> = {
  pt: {
    sobre: { title: "sobre_mim.txt", label: "sobre_mim.txt" },
    projetos: { title: "C:\\Giovana\\Projetos", label: "Projetos" },
    terminal: { title: "terminal.exe", label: "terminal.exe" },
    habilidades: { title: "habilidades.sys", label: "habilidades.sys" },
    curriculo: { title: "curriculo.doc", label: "curriculo.doc" },
    contato: { title: "contato.exe", label: "contato.exe" },
    lixeira: { title: "Lixeira", label: "Lixeira" },
  },
  en: {
    sobre: { title: "about_me.txt", label: "about_me.txt" },
    projetos: { title: "C:\\Giovana\\Projects", label: "Projects" },
    terminal: { title: "terminal.exe", label: "terminal.exe" },
    habilidades: { title: "skills.sys", label: "skills.sys" },
    curriculo: { title: "resume.doc", label: "resume.doc" },
    contato: { title: "contact.exe", label: "contact.exe" },
    lixeira: { title: "Recycle Bin", label: "Recycle Bin" },
  },
};

export const DESKTOP_ORDER: BaseAppId[] = [
  "sobre",
  "projetos",
  "terminal",
  "habilidades",
  "curriculo",
  "contato",
  "lixeira",
];

export function isBaseApp(id: string): id is BaseAppId {
  return id in APPS;
}

/** Título e rótulo de um programa no idioma pedido. */
export function getAppText(id: BaseAppId, lang: Lang): AppText {
  return APP_TEXT[lang][id];
}

export function getWindowMeta(
  id: WindowId,
  lang: Lang,
): { title: string; icon: IconName; width: number } {
  if (isBaseApp(id)) return { ...APPS[id], title: APP_TEXT[lang][id].title };
  const slug = id.replace("projeto:", "");
  const project = getPortfolio(lang).projects.find((p) => p.slug === slug);
  return { title: project?.file ?? slug, icon: project?.icon ?? "app", width: 600 };
}
