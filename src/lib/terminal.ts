import { experience, owner, projects, skills } from "@/data/portfolio";
import { APPS, isBaseApp, type WindowId } from "@/components/os/app-registry";

export type TerminalResult = { lines: string[]; open?: WindowId; clear?: boolean };

const HELP = [
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
];

function resolveTarget(arg: string): WindowId | undefined {
  const a = arg.toLowerCase().replace(/\.(txt|exe|sys|doc|app|web|shop|api|py)$/, "");
  const alias: Record<string, WindowId> = {
    sobre_mim: "sobre",
    curriculo: "curriculo",
    skills: "habilidades",
    email: "contato",
    lixo: "lixeira",
  };
  if (alias[a]) return alias[a];
  if (isBaseApp(a)) return a;
  const project = projects.find(
    (p) => p.slug === a || p.file.split(".")[0] === a || p.name.toLowerCase() === a,
  );
  return project ? `projeto:${project.slug}` : undefined;
}

export function runCommand(raw: string): TerminalResult {
  const input = raw.trim();
  if (!input) return { lines: [] };
  const [name = "", ...args] = input.split(/\s+/);
  const cmd = name.toLowerCase();

  switch (cmd) {
    case "ajuda":
    case "help":
      return { lines: HELP };
    case "sobre":
    case "whoami":
      return { lines: [owner.name, `${owner.role} · ${owner.city}`, "", ...owner.bio] };
    case "projetos":
    case "ls":
      return {
        lines: [
          ...projects.map((p) => `  ${p.file.padEnd(24)} ${p.name}${p.year ? ` (${p.year})` : ""}`),
          "",
          'Dica: digite "abrir encantos_da_serra" para ver um projeto.',
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
      return { lines: experience.map((e) => `  ${e.period.padEnd(13)} ${e.title} @ ${e.place}`) };
    case "contato":
      return {
        lines: [
          `  e-mail   ${owner.email}`,
          `  github   ${owner.github}`,
          `  linkedin ${owner.linkedin}`,
        ],
      };
    case "abrir":
    case "open": {
      if (!args.length) return { lines: ["Use: abrir <nome>. Ex: abrir projetos"] };
      const target = resolveTarget(args.join("_"));
      if (!target) return { lines: [`Não encontrei "${args.join(" ")}".`] };
      const label = isBaseApp(target) ? APPS[target].title : target.replace("projeto:", "");
      return { lines: [`Abrindo ${label}...`], open: target };
    }
    case "limpar":
    case "clear":
    case "cls":
      return { lines: [], clear: true };
    case "data":
    case "date":
      return {
        lines: [new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })],
      };
    case "cafe":
    case "coffee":
      return { lines: ["Passando um café... ☕", "Pronto! Produtividade +20%."] };
    case "sudo":
      return { lines: ["Boa tentativa! Aqui só a Giovana tem acesso de administradora."] };
    case "oi":
    case "ola":
    case "olá":
      return { lines: ['Oi! Que bom ter você aqui. Digite "ajuda" para começar.'] };
    default:
      return { lines: [`comando não encontrado: ${name}. Digite "ajuda".`] };
  }
}
