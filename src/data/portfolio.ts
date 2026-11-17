// Todo o conteúdo pessoal do portfólio, em português (pt) e inglês (en).
// Campos com { pt, en } mudam conforme o idioma escolhido no site.

import type { IconName } from "@/components/os/pixel-icons";
import type { Lang } from "@/i18n/lang";

/** Um texto em cada idioma. */
type L<T> = Record<Lang, T>;

// ─── Sobre mim ────────────────────────────────────────────────────────────────

const ownerData = {
  name: "Giovana Lima Moreira Costa",
  short: "Giovana Costa",
  first: "Giovana",
  city: "Belo Horizonte, MG",
  email: "glimaecosta@gmail.com",
  github: "https://github.com/glimaecosta-hash",
  linkedin: "https://www.linkedin.com/in/giovana-lima-costa-417b60239/",
  role: {
    pt: "Desenvolvedora Full Stack",
    en: "Full Stack Developer",
  } as L<string>,
  bio: {
    pt: [
      "Oi! Eu sou a Giovana, desenvolvedora Full Stack e graduanda em Engenharia da Computação. Gosto de transformar ideias complexas em produtos simples, rápidos e bonitos de usar.",
      "No meu dia a dia, construo sistemas completos: desde interfaces modulares e responsivas com TypeScript, React e Tailwind CSS, até arquiteturas escaláveis no backend com Node.js, NestJS, Python e MySQL — sempre com muito carinho pelo detalhe visual e pela qualidade do código.",
      "Quando não estou codando ou testando uma nova API, provavelmente estou explorando alguma novidade do mundo da tecnologia ou desmontando algum aparelho para entender como a engenharia por trás dele funciona!",
    ],
    en: [
      "Hi! I'm Giovana, a Full Stack developer and Computer Engineering student. I love turning complex ideas into products that are simple, fast and delightful to use.",
      "Day to day, I build complete systems: from modular, responsive interfaces with TypeScript, React and Tailwind CSS to scalable backend architectures with Node.js, NestJS, Python and MySQL — always with a lot of care for visual detail and code quality.",
      "When I'm not coding or testing a new API, I'm probably exploring something new in the tech world or taking a device apart to understand the engineering behind it!",
    ],
  } as L<string[]>,
  objective: {
    pt: "Desenvolvedora Full Stack com vivência no ecossistema TypeScript/JavaScript, Python e arquiteturas de backend escaláveis. Experiência em interfaces responsivas, APIs REST seguras, modelagem relacional e automação de testes, com foco em Clean Code, SOLID e padrões de projeto.",
    en: "Full Stack developer experienced in the TypeScript/JavaScript ecosystem, Python and scalable backend architectures. Hands-on experience with responsive interfaces, secure REST APIs, relational data modeling and test automation, with a focus on Clean Code, SOLID and design patterns.",
  } as L<string>,
};

// ─── Projetos ─────────────────────────────────────────────────────────────────

type ProjectData = {
  slug: string;
  file: string;
  name: L<string>;
  /** Deixe vazio quando não quiser mostrar o ano. */
  year: string;
  role: L<string>;
  summary: L<string>;
  description: L<string[]>;
  /** Atividades que eu fiz no projeto. */
  activities: L<string[]>;
  stack: string[];
  /** Print do projeto. Sem imagem, aparece o ícone em pixel. */
  image?: string;
  icon: IconName;
  /** Deixe vazio para esconder o botão. */
  repo: string;
  live: string;
};

const projectData: ProjectData[] = [
  {
    slug: "sistema-consulta",
    file: "sistema_consulta.api",
    name: { pt: "Sistema de Consulta Educacional", en: "Educational Records System" },
    year: "",
    role: { pt: "Back-end", en: "Back-end" },
    summary: {
      pt: "API REST para gestão e auditoria de dados acadêmicos.",
      en: "REST API for managing and auditing academic data.",
    },
    description: {
      pt: [
        "API REST (api_sistema_consulta) para gestão e auditoria de dados acadêmicos, com arquitetura em camadas e controle de acessos.",
      ],
      en: [
        "REST API (api_sistema_consulta) for managing and auditing academic data, with a layered architecture and access control.",
      ],
    },
    activities: {
      pt: [
        "Estruturei a API em camadas com NestJS, separando controllers, serviços e acesso a dados.",
        "Implementei o controle de acessos e a auditoria das operações sobre os dados acadêmicos.",
        "Modelei o banco relacional em MySQL.",
        "Escrevi testes unitários com Vitest, com cobertura rigorosa das regras de negócio.",
      ],
      en: [
        "Structured the API in layers with NestJS, separating controllers, services and data access.",
        "Implemented access control and auditing of every operation on academic data.",
        "Designed the relational database in MySQL.",
        "Wrote unit tests with Vitest, with thorough coverage of the business rules.",
      ],
    },
    stack: ["Node.js", "NestJS", "MySQL", "Vitest"],
    icon: "terminal",
    repo: "https://github.com/glimaecosta-hash",
    live: "",
  },
  {
    slug: "encantos-da-serra",
    file: "encantos_da_serra.web",
    name: { pt: "Encantos da Serra", en: "Encantos da Serra" },
    year: "",
    role: { pt: "Front-end", en: "Front-end" },
    summary: {
      pt: "Plataforma de distribuição entre produtores e compradores.",
      en: "Distribution platform connecting producers and buyers.",
    },
    description: {
      pt: [
        "Aplicação web para gestão dos fluxos entre produtores e compradores, com painéis analíticos.",
      ],
      en: [
        "Web application for managing the flows between producers and buyers, with analytics dashboards.",
      ],
    },
    activities: {
      pt: [
        "Construí a interface modular seguindo Atomic Design, com React, TypeScript e Tailwind CSS.",
        "Desenvolvi os painéis analíticos de acompanhamento.",
        "Integrei o front-end às APIs REST com consumo eficiente dos endpoints.",
      ],
      en: [
        "Built a modular interface following Atomic Design, with React, TypeScript and Tailwind CSS.",
        "Developed the analytics dashboards.",
        "Integrated the front end with the REST APIs, consuming the endpoints efficiently.",
      ],
    },
    stack: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
    icon: "folder",
    repo: "https://github.com/glimaecosta-hash",
    live: "",
  },
  {
    slug: "conversao-cambial",
    file: "cambio_live.py",
    name: { pt: "Conversão Cambial em Tempo Real", en: "Real-Time Currency Converter" },
    year: "",
    role: { pt: "Full stack", en: "Full stack" },
    summary: {
      pt: "Microsserviço de cotações em tempo real.",
      en: "Microservice for real-time exchange rates.",
    },
    description: {
      pt: [
        "Microsserviço assíncrono em Python que consome cotações em tempo real de uma API externa e as entrega para um front-end dinâmico.",
      ],
      en: [
        "Asynchronous Python microservice that pulls real-time exchange rates from an external API and serves them to a dynamic front end.",
      ],
    },
    activities: {
      pt: [
        "Desenvolvi o serviço assíncrono em Python com Flask para buscar as cotações.",
        "Implementei o tratamento preventivo de falhas de rede na comunicação com a API externa.",
        "Integrei o serviço a um front-end em React.",
      ],
      en: [
        "Built the asynchronous Python service with Flask to fetch the exchange rates.",
        "Implemented preventive handling of network failures when talking to the external API.",
        "Connected the service to a React front end.",
      ],
    },
    stack: ["Python", "Flask", "React", "REST APIs"],
    icon: "chip",
    repo: "https://github.com/glimaecosta-hash",
    live: "",
  },
  {
    slug: "gioos",
    file: "gioos.exe",
    name: { pt: "GioOS — este portfólio", en: "GioOS — this portfolio" },
    year: "2026",
    role: { pt: "Front-end", en: "Front-end" },
    summary: {
      pt: "Portfólio interativo no estilo de um desktop retrô.",
      en: "Interactive portfolio styled as a retro desktop.",
    },
    description: {
      pt: [
        "Este próprio portfólio: um desktop retrô com janelas que se arrastam, ícones em pixel art, um terminal que responde a comandos e versão em português e inglês.",
      ],
      en: [
        "This very portfolio: a retro desktop with draggable windows, pixel-art icons, a terminal that answers commands and both Portuguese and English versions.",
      ],
    },
    activities: {
      pt: [
        "Montei a interface com React, TypeScript, Tailwind CSS e TanStack Start.",
        "Criei o terminal com comandos próprios como uma função pura e testável.",
        "Implementei a troca de idioma entre português e inglês, com a escolha salva no navegador.",
        "Corrigi um conflito de nomes de arquivo que quebrava o projeto no Windows.",
        "Organizei todo o conteúdo pessoal em um único arquivo de dados.",
      ],
      en: [
        "Built the interface with React, TypeScript, Tailwind CSS and TanStack Start.",
        "Created the terminal and its commands as a pure, testable function.",
        "Implemented switching between Portuguese and English, with the choice saved in the browser.",
        "Fixed a file-name conflict that broke the project on Windows.",
        "Kept all personal content in a single data file.",
      ],
    },
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Vitest"],
    icon: "app",
    repo: "https://github.com/glimaecosta-hash",
    live: "",
  },
];

// ─── Habilidades ──────────────────────────────────────────────────────────────

const skills = [
  { name: "TypeScript", level: 9 },
  { name: "JavaScript", level: 9 },
  { name: "React", level: 9 },
  { name: "Tailwind CSS", level: 8 },
  { name: "Node.js", level: 8 },
  { name: "NestJS", level: 8 },
  { name: "Python", level: 7 },
  { name: "SQL / MySQL", level: 7 },
];

const tools = [
  "Git",
  "GitHub",
  "Docker",
  "Linux",
  "Vite",
  "Vitest",
  "React Testing Library",
  "Sequelize",
  "FastAPI",
  "Flask",
  "SQLite",
  "ERP Protheus (TOTVS)",
];

const practices: L<string[]> = {
  pt: ["Clean Architecture", "SOLID", "Design Patterns", "Microsserviços", "UI/UX"],
  en: ["Clean Architecture", "SOLID", "Design Patterns", "Microservices", "UI/UX"],
};

// ─── Currículo ────────────────────────────────────────────────────────────────

type TimelineData = { period: L<string>; title: L<string>; place: string; text: L<string> };

const experienceData: TimelineData[] = [
  {
    period: { pt: "07/2026 — atual", en: "07/2026 — present" },
    title: { pt: "Desenvolvedora Full Stack", en: "Full Stack Developer" },
    place: "CIEE MG",
    text: {
      pt: "Microsserviços e APIs REST em Node.js/NestJS com Clean Architecture, modelagem MySQL com Sequelize e suítes de testes com Vitest.",
      en: "Microservices and REST APIs in Node.js/NestJS with Clean Architecture, MySQL modeling with Sequelize and test suites with Vitest.",
    },
  },
  {
    period: { pt: "11/2025 — 06/2026", en: "11/2025 — 06/2026" },
    title: { pt: "Estagiária de Desenvolvimento de Sistemas", en: "Software Development Intern" },
    place: "CIEE MG",
    text: {
      pt: "Componentes React, TypeScript e Tailwind CSS para SPAs, endpoints REST para fluxos internos e consultas SQL.",
      en: "React, TypeScript and Tailwind CSS components for SPAs, REST endpoints for internal workflows and SQL queries.",
    },
  },
  {
    period: { pt: "02/2024 — 01/2025", en: "02/2024 — 01/2025" },
    title: { pt: "Analista de TI & BI", en: "IT & BI Analyst" },
    place: "BTT Telecomunicações S.A.",
    text: {
      pt: "Suporte aos sistemas de Business Intelligence, fluxos no ERP Protheus (TOTVS) e infraestrutura de servidores e redes.",
      en: "Support for Business Intelligence systems, ERP Protheus (TOTVS) workflows and server and network infrastructure.",
    },
  },
  {
    period: { pt: "05/2022 — 08/2023", en: "05/2022 — 08/2023" },
    title: { pt: "Auxiliar Administrativo", en: "Administrative Assistant" },
    place: "Localiza&Co",
    text: {
      pt: "Rotinas automatizadas e relatórios de controle operacional para fluxos financeiros.",
      en: "Automated routines and operational control reports for financial workflows.",
    },
  },
];

const educationData: TimelineData[] = [
  {
    period: { pt: "08/2023 — 2028", en: "08/2023 — 2028" },
    title: { pt: "Engenharia da Computação", en: "B.Eng. in Computer Engineering" },
    place: "Universidade UNA MG",
    text: {
      pt: "Ênfase em Arquitetura de Sistemas, Estruturas de Dados, Redes de Computadores e Engenharia de Software.",
      en: "Focus on Systems Architecture, Data Structures, Computer Networks and Software Engineering.",
    },
  },
];

const courses: L<string[]> = {
  pt: [
    "Algoritmos e Estruturas de Dados — Cursa (2024)",
    "Design Responsivo para Sites — Fundação Bradesco (2025)",
    "Fundamentos de Lógica e POO — Fundação Bradesco (2023)",
  ],
  en: [
    "Algorithms and Data Structures — Cursa (2024)",
    "Responsive Web Design — Fundação Bradesco (2025)",
    "Logic and OOP Fundamentals — Fundação Bradesco (2023)",
  ],
};

const languages: L<string[]> = {
  pt: [
    "Português (nativo)",
    "Inglês (intermediário)",
    "Em estudo: Java (POO avançada e Spring Boot)",
  ],
  en: [
    "Portuguese (native)",
    "English (intermediate)",
    "Currently learning: Java (advanced OOP and Spring Boot)",
  ],
};

// ─── Conteúdo pronto em um idioma ─────────────────────────────────────────────

export type Project = {
  slug: string;
  file: string;
  name: string;
  year: string;
  role: string;
  summary: string;
  description: string[];
  activities: string[];
  stack: string[];
  image?: string;
  icon: IconName;
  repo: string;
  live: string;
};

export type TimelineItem = { period: string; title: string; place: string; text: string };

const pickTimeline = (items: TimelineData[], lang: Lang): TimelineItem[] =>
  items.map((i) => ({
    period: i.period[lang],
    title: i.title[lang],
    place: i.place,
    text: i.text[lang],
  }));

/** Todo o conteúdo do portfólio no idioma pedido. */
export function getPortfolio(lang: Lang) {
  return {
    owner: {
      name: ownerData.name,
      short: ownerData.short,
      first: ownerData.first,
      city: ownerData.city,
      email: ownerData.email,
      github: ownerData.github,
      linkedin: ownerData.linkedin,
      role: ownerData.role[lang],
      bio: ownerData.bio[lang],
      objective: ownerData.objective[lang],
    },
    projects: projectData.map((p): Project => ({
      ...p,
      name: p.name[lang],
      role: p.role[lang],
      summary: p.summary[lang],
      description: p.description[lang],
      activities: p.activities[lang],
    })),
    skills,
    tools,
    practices: practices[lang],
    experience: pickTimeline(experienceData, lang),
    education: pickTimeline(educationData, lang),
    courses: courses[lang],
    languages: languages[lang],
  };
}

export type Portfolio = ReturnType<typeof getPortfolio>;
