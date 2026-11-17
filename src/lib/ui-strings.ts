// Textos fixos da interface do GioOS em cada idioma.
// O conteúdo pessoal (bio, projetos, currículo) fica em src/data/portfolio.ts.

const pt = {
  language: "Idioma",
  languageNames: { pt: "Português", en: "English" },

  // Área de trabalho
  desktop: "Área de trabalho",
  reminder: "Lembrete:",
  reminderText: "Disponível para novos projetos e vagas em 2026.",
  openContact: "abrir contato.exe →",
  start: "Iniciar",
  shutdown: "Desligar...",
  shutdownMessage: "Agora é seguro desligar o computador.",
  turnOn: "Ligar de novo",
  close: (title: string) => `Fechar ${title}`,
  minimize: (title: string) => `Minimizar ${title}`,

  // Inicialização
  bootLines: [
    "GioOS BIOS v1.0 — (c) Giovana Costa",
    "Verificando memória ........ 640K OK",
    "Carregando cafe.sys ........ OK",
    "Compilando criatividade .... OK",
    "Iniciando área de trabalho...",
  ],
  skipBoot: "Pular inicialização",
  clickToSkip: "clique para pular",

  // sobre_mim.txt
  aboutMenu: ["Arquivo", "Editar", "Ajuda"],
  aboutTip:
    "Dica: tudo aqui é clicável. Abra as pastas, arraste as janelas e experimente o terminal.exe",
  seeProjects: "Ver projetos",
  talkToMe: "Falar comigo",

  // Projetos
  address: "Endereço",
  projectsPath: "C:\\Giovana\\Projetos",
  objects: (n: number) => `${n} objetos`,
  clickToOpen: "Clique para abrir",
  fileNotFound: "Arquivo não encontrado.",
  projectScreenshot: (name: string) => `Tela do projeto ${name}`,
  whatIDid: "O que eu fiz",
  seeOnline: "Ver online",
  code: "Código",

  // Terminal
  terminalWelcome: [
    "GioOS terminal [versão 1.0]",
    '(c) Giovana Costa. Digite "ajuda" para ver os comandos.',
  ],
  terminalInput: "Digite um comando",

  // habilidades.sys
  systemProperties: "Propriedades do sistema",
  processor: "Processador: Giovana™ Full Stack Edition",
  languagesFrameworks: "Linguagens e frameworks",
  dailyTools: "Ferramentas do dia a dia",
  architectureQuality: "Arquitetura e qualidade",

  // curriculo.doc
  resumeMenu: ["Arquivo", "Exibir", "Formatar"],
  experience: "Experiência",
  education: "Formação",
  courses: "Cursos complementares",
  spokenLanguages: "Idiomas",

  // contato.exe
  to: "Para:",
  subject: "Assunto:",
  subjectPlaceholder: "Vamos trabalhar juntas?",
  defaultSubject: "Olá, Giovana!",
  message: "Mensagem",
  messagePlaceholder: "Escreva sua mensagem aqui...",
  send: "Enviar",

  // Lixeira
  trash: [
    { file: "bug_de_2019.js", note: "Funcionava na minha máquina." },
    { file: "codigo_sem_teste.ts", note: "Nunca mais." },
    { file: "estilo_com_!important.css", note: "Momento de desespero." },
    { file: "senha123.txt", note: "Brincadeira. Segurança em primeiro lugar." },
  ],
  emptyTrash: "Esvaziar lixeira",
  emptyTrashRefused: "Melhor não. Cada bug aqui me ensinou algo.",
};

export type UIStrings = typeof pt;

const en: UIStrings = {
  language: "Language",
  languageNames: { pt: "Português", en: "English" },

  desktop: "Desktop",
  reminder: "Note:",
  reminderText: "Open to new projects and job opportunities in 2026.",
  openContact: "open contact.exe →",
  start: "Start",
  shutdown: "Shut down...",
  shutdownMessage: "It's now safe to turn off your computer.",
  turnOn: "Turn on again",
  close: (title) => `Close ${title}`,
  minimize: (title) => `Minimize ${title}`,

  bootLines: [
    "GioOS BIOS v1.0 — (c) Giovana Costa",
    "Checking memory ............ 640K OK",
    "Loading coffee.sys ......... OK",
    "Compiling creativity ....... OK",
    "Starting desktop...",
  ],
  skipBoot: "Skip startup",
  clickToSkip: "click to skip",

  aboutMenu: ["File", "Edit", "Help"],
  aboutTip:
    "Tip: everything here is clickable. Open the folders, drag the windows and try terminal.exe",
  seeProjects: "See projects",
  talkToMe: "Get in touch",

  address: "Address",
  projectsPath: "C:\\Giovana\\Projects",
  objects: (n) => `${n} ${n === 1 ? "object" : "objects"}`,
  clickToOpen: "Click to open",
  fileNotFound: "File not found.",
  projectScreenshot: (name) => `Screenshot of ${name}`,
  whatIDid: "What I did",
  seeOnline: "See it live",
  code: "Code",

  terminalWelcome: [
    "GioOS terminal [version 1.0]",
    '(c) Giovana Costa. Type "help" to see the commands.',
  ],
  terminalInput: "Type a command",

  systemProperties: "System properties",
  processor: "Processor: Giovana™ Full Stack Edition",
  languagesFrameworks: "Languages and frameworks",
  dailyTools: "Everyday tools",
  architectureQuality: "Architecture and quality",

  resumeMenu: ["File", "View", "Format"],
  experience: "Experience",
  education: "Education",
  courses: "Additional courses",
  spokenLanguages: "Languages",

  to: "To:",
  subject: "Subject:",
  subjectPlaceholder: "Shall we work together?",
  defaultSubject: "Hi, Giovana!",
  message: "Message",
  messagePlaceholder: "Write your message here...",
  send: "Send",

  trash: [
    { file: "bug_from_2019.js", note: "It worked on my machine." },
    { file: "untested_code.ts", note: "Never again." },
    { file: "style_with_!important.css", note: "A moment of despair." },
    { file: "password123.txt", note: "Just kidding. Security first." },
  ],
  emptyTrash: "Empty Recycle Bin",
  emptyTrashRefused: "Better not. Every bug in here taught me something.",
};

export const UI = { pt, en };
