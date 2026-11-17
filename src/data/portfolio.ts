import type { IconName } from "@/components/os/pixel-icons";

export const owner = {
  name: "Giovana Lima Moreira Costa",
  short: "Giovana Costa",
  first: "Giovana",
  role: "Desenvolvedora Full Stack",
  city: "Belo Horizonte, MG",
  email: "glimaecosta@gmail.com",
  github: "https://github.com/glimaecosta-hash",
  linkedin: "https://www.linkedin.com/in/giovana-lima-costa-417b60239/",
  bio: [
    "Oi! Eu sou a Giovana, desenvolvedora Full Stack e graduanda em Engenharia da Computação. Gosto de transformar ideias complexas em produtos simples, rápidos e bonitos de usar.",
    "No meu dia a dia, construo sistemas completos: desde interfaces modulares e responsivas com TypeScript, React e Tailwind CSS, até arquiteturas escaláveis no backend com Node.js, NestJS, Python e MySQL — sempre com muito carinho pelo detalhe visual e pela qualidade do código.",
    "Quando não estou codando ou testando uma nova API, provavelmente estou explorando alguma novidade do mundo da tecnologia ou desmontando algum aparelho para entender como a engenharia por trás dele funciona!",
  ],
  objective:
    "Desenvolvedora Full Stack com vivência no ecossistema TypeScript/JavaScript, Python e arquiteturas de backend escaláveis. Experiência em interfaces responsivas, APIs REST seguras, modelagem relacional e automação de testes, com foco em Clean Code, SOLID e padrões de projeto.",
};

export type Project = {
  slug: string;
  file: string;
  name: string;
  /** Deixe vazio quando não quiser mostrar o ano. */
  year: string;
  role: string;
  summary: string;
  description: string[];
  /** Atividades que eu fiz no projeto. */
  activities: string[];
  stack: string[];
  /** Print do projeto. Sem imagem, aparece o ícone em pixel. */
  image?: string;
  icon: IconName;
  /** Deixe vazio para esconder o botão. */
  repo: string;
  live: string;
};

export const projects: Project[] = [
  {
    slug: "sistema-consulta",
    file: "sistema_consulta.api",
    name: "Sistema de Consulta Educacional",
    year: "",
    role: "Back-end",
    summary: "API REST para gestão e auditoria de dados acadêmicos.",
    description: [
      "API REST (api_sistema_consulta) para gestão e auditoria de dados acadêmicos, com arquitetura em camadas e controle de acessos.",
    ],
    activities: [
      "Estruturei a API em camadas com NestJS, separando controllers, serviços e acesso a dados.",
      "Implementei o controle de acessos e a auditoria das operações sobre os dados acadêmicos.",
      "Modelei o banco relacional em MySQL.",
      "Escrevi testes unitários com Vitest, com cobertura rigorosa das regras de negócio.",
    ],
    stack: ["Node.js", "NestJS", "MySQL", "Vitest"],
    icon: "terminal",
    repo: "https://github.com/glimaecosta-hash",
    live: "",
  },
  {
    slug: "encantos-da-serra",
    file: "encantos_da_serra.web",
    name: "Encantos da Serra",
    year: "",
    role: "Front-end",
    summary: "Plataforma de distribuição entre produtores e compradores.",
    description: [
      "Aplicação web para gestão dos fluxos entre produtores e compradores, com painéis analíticos.",
    ],
    activities: [
      "Construí a interface modular seguindo Atomic Design, com React, TypeScript e Tailwind CSS.",
      "Desenvolvi os painéis analíticos de acompanhamento.",
      "Integrei o front-end às APIs REST com consumo eficiente dos endpoints.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "APIs REST"],
    icon: "folder",
    repo: "https://github.com/glimaecosta-hash",
    live: "",
  },
  {
    slug: "conversao-cambial",
    file: "cambio_live.py",
    name: "Conversão Cambial em Tempo Real",
    year: "",
    role: "Full stack",
    summary: "Microsserviço de cotações em tempo real.",
    description: [
      "Microsserviço assíncrono em Python que consome cotações em tempo real de uma API externa e as entrega para um front-end dinâmico.",
    ],
    activities: [
      "Desenvolvi o serviço assíncrono em Python com Flask para buscar as cotações.",
      "Implementei o tratamento preventivo de falhas de rede na comunicação com a API externa.",
      "Integrei o serviço a um front-end em React.",
    ],
    stack: ["Python", "Flask", "React", "APIs REST"],
    icon: "chip",
    repo: "https://github.com/glimaecosta-hash",
    live: "",
  },
  {
    slug: "gioos",
    file: "gioos.exe",
    name: "GioOS — este portfólio",
    year: "2026",
    role: "Front-end",
    summary: "Portfólio interativo no estilo de um desktop retrô.",
    description: [
      "Este próprio portfólio: um desktop retrô com janelas que se arrastam, ícones em pixel art e um terminal que responde a comandos.",
    ],
    activities: [
      "Montei a interface com React, TypeScript, Tailwind CSS e TanStack Start.",
      "Criei o terminal com comandos próprios como uma função pura e testável.",
      "Corrigi um conflito de nomes de arquivo que quebrava o projeto no Windows.",
      "Organizei todo o conteúdo pessoal em um único arquivo de dados.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Vitest"],
    icon: "app",
    repo: "https://github.com/glimaecosta-hash",
    live: "",
  },
];

export const skills = [
  { name: "TypeScript", level: 9 },
  { name: "JavaScript", level: 9 },
  { name: "React", level: 9 },
  { name: "Tailwind CSS", level: 8 },
  { name: "Node.js", level: 8 },
  { name: "NestJS", level: 8 },
  { name: "Python", level: 7 },
  { name: "SQL / MySQL", level: 7 },
];

export const tools = [
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

export const practices = [
  "Clean Architecture",
  "SOLID",
  "Design Patterns",
  "Microsserviços",
  "UI/UX",
];

export const experience = [
  {
    period: "07/2026 — atual",
    title: "Desenvolvedora Full Stack",
    place: "CIEE MG",
    text: "Microsserviços e APIs REST em Node.js/NestJS com Clean Architecture, modelagem MySQL com Sequelize e suítes de testes com Vitest.",
  },
  {
    period: "11/2025 — 06/2026",
    title: "Estagiária de Desenvolvimento de Sistemas",
    place: "CIEE MG",
    text: "Componentes React, TypeScript e Tailwind CSS para SPAs, endpoints REST para fluxos internos e consultas SQL.",
  },
  {
    period: "02/2024 — 01/2025",
    title: "Analista de TI & BI",
    place: "BTT Telecomunicações S.A.",
    text: "Suporte aos sistemas de Business Intelligence, fluxos no ERP Protheus (TOTVS) e infraestrutura de servidores e redes.",
  },
  {
    period: "05/2022 — 08/2023",
    title: "Auxiliar Administrativo",
    place: "Localiza&Co",
    text: "Rotinas automatizadas e relatórios de controle operacional para fluxos financeiros.",
  },
];

export const education = [
  {
    period: "08/2023 — 2028",
    title: "Engenharia da Computação",
    place: "Universidade UNA MG",
    text: "Ênfase em Arquitetura de Sistemas, Estruturas de Dados, Redes de Computadores e Engenharia de Software.",
  },
];

export const courses = [
  "Algoritmos e Estruturas de Dados — Cursa (2024)",
  "Design Responsivo para Sites — Fundação Bradesco (2025)",
  "Fundamentos de Lógica e POO — Fundação Bradesco (2023)",
];

export const languages = [
  "Português (nativo)",
  "Inglês (intermediário)",
  "Em estudo: Java (POO avançada e Spring Boot)",
];
