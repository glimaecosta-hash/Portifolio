import { projects } from "@/data/portfolio";
import type { IconName } from "./pixel-icons";

export type BaseAppId =
  "sobre" | "projetos" | "terminal" | "habilidades" | "curriculo" | "contato" | "lixeira";

export type WindowId = BaseAppId | `projeto:${string}`;

type AppMeta = { title: string; label: string; icon: IconName; width: number };

export const APPS: Record<BaseAppId, AppMeta> = {
  sobre: { title: "sobre_mim.txt", label: "sobre_mim.txt", icon: "doc", width: 540 },
  projetos: { title: "C:\\Giovana\\Projetos", label: "Projetos", icon: "folder", width: 620 },
  terminal: { title: "terminal.exe", label: "terminal.exe", icon: "terminal", width: 580 },
  habilidades: { title: "habilidades.sys", label: "habilidades.sys", icon: "chip", width: 460 },
  curriculo: { title: "curriculo.doc", label: "curriculo.doc", icon: "disk", width: 520 },
  contato: { title: "contato.exe", label: "contato.exe", icon: "mail", width: 500 },
  lixeira: { title: "Lixeira", label: "Lixeira", icon: "trash", width: 440 },
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

export function getWindowMeta(id: WindowId): { title: string; icon: IconName; width: number } {
  if (isBaseApp(id)) return APPS[id];
  const slug = id.replace("projeto:", "");
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.file ?? slug, icon: "app", width: 600 };
}
