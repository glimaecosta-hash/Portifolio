import { getPortfolio } from "@/data/portfolio";
import { getAppText, isBaseApp, type BaseAppId, type WindowId } from "@/components/os/app-registry";
import type { Lang } from "./lang";

export type TerminalResult = { lines: string[]; open?: WindowId; clear?: boolean };

const TEXT = {
  pt: {
    help: [
      "Comandos disponíveis:",
      "  sobre        quem é a Giovana",
      "  projetos     lista de projetos",
      "  habilidades  tecnologias que uso",
      "  experiencia  onde já trabalhei",
      "  contato      como falar comigo",
      "  abrir <nome> abre uma janela (ex: abrir projetos, abrir gioos)",
      "  data         data e hora em Belo Horizonte",
      "  cafe         recarrega a energia",
      "  limpar       limpa a tela",
      "",
      "Os comandos em inglês também funcionam (help, about, projects...).",
    ],
    projectsTip: 'Dica: digite "abrir encantos_da_serra" para ver um projeto.',
    openUsage: "Use: abrir <nome>. Ex: abrir projetos",
    notFound: (name: string) => `Não encontrei "${name}".`,
    opening: (label: string) => `Abrindo ${label}...`,
    coffee: ["Passando um café... ☕", "Pronto! Produtividade +20%."],
    sudo: "Boa tentativa! Aqui só a Giovana tem acesso de administradora.",
    hello: 'Oi! Que bom ter você aqui. Digite "ajuda" para começar.',
    unknown: (name: string) => `comando não encontrado: ${name}. Digite "ajuda".`,
    locale: "pt-BR",
  },
  en: {
    help: [
      "Available commands:",
      "  about        who Giovana is",
      "  projects     list of projects",
      "  skills       technologies I use",
      "  experience   where I've worked",
      "  contact      how to reach me",
      "  open <name>  opens a window (e.g. open projects, open gioos)",
      "  date         date and time in Belo Horizonte",
      "  coffee       recharges the energy",
      "  clear        clears the screen",
      "",
      "Portuguese commands work too (ajuda, sobre, projetos...).",
    ],
    projectsTip: 'Tip: type "open encantos_da_serra" to see a project.',
    openUsage: "Usage: open <name>. E.g. open projects",
    notFound: (name: string) => `Couldn't find "${name}".`,
    opening: (label: string) => `Opening ${label}...`,
    coffee: ["Brewing some coffee... ☕", "Done! Productivity +20%."],
    sudo: "Nice try! Only Giovana has admin access here.",
    hello: 'Hi! Glad to have you here. Type "help" to get started.',
    unknown: (name: string) => `command not found: ${name}. Type "help".`,
    locale: "en-US",
  },
} satisfies Record<Lang, unknown>;

/** Nomes que abrem cada janela, em português e inglês. */
const ALIASES: Record<string, BaseAppId> = {
  sobre_mim: "sobre",
  about: "sobre",
  about_me: "sobre",
  projects: "projetos",
  skills: "habilidades",
  resume: "curriculo",
  cv: "curriculo",
  email: "contato",
  contact: "contato",
  lixo: "lixeira",
  trash: "lixeira",
  recycle_bin: "lixeira",
  bin: "lixeira",
};

function resolveTarget(arg: string, lang: Lang): WindowId | undefined {
  const a = arg.toLowerCase().replace(/\.(txt|exe|sys|doc|app|web|shop|api|py)$/, "");
  if (ALIASES[a]) return ALIASES[a];
  if (isBaseApp(a)) return a;
  const project = getPortfolio(lang).projects.find(
    (p) =>
      p.slug === a || p.file.split(".")[0] === a || p.name.toLowerCase().replace(/\s+/g, "_") === a,
  );
  return project ? `projeto:${project.slug}` : undefined;
}

export function runCommand(raw: string, lang: Lang = "pt"): TerminalResult {
  const input = raw.trim();
  if (!input) return { lines: [] };
  const [name = "", ...args] = input.split(/\s+/);
  const cmd = name.toLowerCase();
  const t = TEXT[lang];
  const { owner, projects, skills, experience } = getPortfolio(lang);

  switch (cmd) {
    case "ajuda":
    case "help":
      return { lines: t.help };
    case "sobre":
    case "about":
    case "whoami":
      return { lines: [owner.name, `${owner.role} · ${owner.city}`, "", ...owner.bio] };
    case "projetos":
    case "projects":
    case "ls":
      return {
        lines: [
          ...projects.map((p) => `  ${p.file.padEnd(24)} ${p.name}${p.year ? ` (${p.year})` : ""}`),
          "",
          t.projectsTip,
        ],
      };
    case "habilidades":
    case "skills":
      return {
        lines: skills.map(
          (s) => `  ${s.name.padEnd(14)} ${"█".repeat(s.level)}${"░".repeat(10 - s.level)}`,
        ),
      };
    case "experiencia":
    case "experiência":
    case "experience":
      return {
        lines: experience.map((e) => `  ${e.period.padEnd(19)} ${e.title} @ ${e.place}`),
      };
    case "contato":
    case "contact":
      return {
        lines: [
          `  e-mail   ${owner.email}`,
          `  github   ${owner.github}`,
          `  linkedin ${owner.linkedin}`,
        ],
      };
    case "abrir":
    case "open": {
      if (!args.length) return { lines: [t.openUsage] };
      const target = resolveTarget(args.join("_"), lang);
      if (!target) return { lines: [t.notFound(args.join(" "))] };
      const label = isBaseApp(target)
        ? getAppText(target, lang).title
        : target.replace("projeto:", "");
      return { lines: [t.opening(label)], open: target };
    }
    case "limpar":
    case "clear":
    case "cls":
      return { lines: [], clear: true };
    case "data":
    case "date":
      return {
        lines: [new Date().toLocaleString(t.locale, { timeZone: "America/Sao_Paulo" })],
      };
    case "cafe":
    case "café":
    case "coffee":
      return { lines: t.coffee };
    case "sudo":
      return { lines: [t.sudo] };
    case "oi":
    case "ola":
    case "olá":
    case "hi":
    case "hello":
      return { lines: [t.hello] };
    default:
      return { lines: [t.unknown(name)] };
  }
}
