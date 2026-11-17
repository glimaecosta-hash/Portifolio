# GioOS — Portfólio de Giovana Costa

> Um portfólio que é um sistema operacional retrô: janelas que se arrastam, ícones em pixel art e um terminal que responde a comandos.

Este é o meu portfólio pessoal. Em vez de uma página comum, ele simula um desktop antigo. Cada parte da minha trajetória é um "programa" que pode ser aberto, movido e minimizado, como em um computador de verdade. O site inteiro está disponível em **português e inglês**.

> **English:** a retro-desktop portfolio with draggable windows, pixel-art icons and a working terminal. Use the **PT | EN** buttons on the taskbar to switch the whole site to English.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)

---

## Sumário

- [O que tem no GioOS](#o-que-tem-no-gioos)
- [Português e inglês](#português-e-inglês)
- [Comandos do terminal](#comandos-do-terminal)
- [Tecnologias](#tecnologias)
- [Como rodar na sua máquina](#como-rodar-na-sua-máquina)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como editar o conteúdo](#como-editar-o-conteúdo)
- [Decisões de arquitetura](#decisões-de-arquitetura)
- [Contato](#contato)

---

## O que tem no GioOS

Ao abrir o site, uma tela de boot carrega o sistema e mostra a área de trabalho. Cada ícone abre uma janela:

| Ícone | O que mostra |
| --- | --- |
| `sobre_mim.txt` | Quem eu sou, o que faço e o que gosto de fazer |
| `Projetos` | Pasta com meus projetos. Cada um abre uma janela com descrição, tecnologias e **o que eu fiz** |
| `terminal.exe` | Um terminal de verdade, com comandos próprios ([veja a lista](#comandos-do-terminal)) |
| `habilidades.sys` | Linguagens e frameworks com nível, ferramentas e práticas de arquitetura |
| `curriculo.doc` | Objetivo, experiência, formação, cursos e idiomas |
| `contato.exe` | Formulário que abre o seu e-mail já endereçado para mim, mais GitHub e LinkedIn |
| `Lixeira` | Um easter egg. Experimente esvaziar. |

**Recursos da interface:**

- Janelas que se arrastam, ganham foco ao clicar e podem ser minimizadas e fechadas
- Barra de tarefas com menu Iniciar, seletor de idioma e relógio
- Ícones desenhados em pixel art via código, sem arquivos de imagem
- Layout responsivo: no celular, as janelas ocupam a tela inteira
- Navegação por teclado e atributos de acessibilidade (ARIA)

---

## Português e inglês

Os botões **PT | EN** na barra de tarefas, ao lado do relógio, trocam o idioma do site inteiro na hora, sem recarregar a página.

- **O que muda:** apresentação, projetos, currículo, habilidades, contato, lixeira, tela de inicialização, menu Iniciar e os nomes dos ícones (`sobre_mim.txt` → `about_me.txt`, `curriculo.doc` → `resume.doc`…).
- **Terminal:** responde no idioma escolhido e aceita comandos nos dois idiomas (`ajuda`/`help`, `abrir`/`open`).
- **Memória:** a escolha fica salva no navegador. Na próxima visita, o site já abre no idioma escolhido. A primeira visita abre em português.
- **Acessibilidade:** o atributo `lang` da página muda junto, para que leitores de tela pronunciem o texto corretamente.

---

## Comandos do terminal

Abra o `terminal.exe` e digite:

| Comando | O que faz |
| --- | --- |
| `ajuda` | Lista todos os comandos |
| `sobre` | Mostra quem eu sou |
| `projetos` | Lista os projetos |
| `habilidades` | Mostra as tecnologias com barras de nível |
| `experiencia` | Lista onde já trabalhei |
| `contato` | Mostra e-mail, GitHub e LinkedIn |
| `abrir <nome>` | Abre uma janela. Ex.: `abrir projetos`, `abrir gioos` |
| `data` | Data e hora em Belo Horizonte |
| `limpar` | Limpa a tela |

Em inglês: `help`, `about`, `projects`, `skills`, `experience`, `contact`, `open <name>`, `date` e `clear`. Os comandos dos dois idiomas funcionam sempre, e as respostas vêm no idioma escolhido no site.

As setas ↑ e ↓ navegam no histórico, e há alguns comandos escondidos. Tente `cafe` ou `sudo`.

---

## Tecnologias

| Área | Ferramentas |
| --- | --- |
| Interface | React 19, TypeScript, Tailwind CSS 4 |
| Framework e build | TanStack Start, TanStack Router, Vite 8 |
| Componentes | Radix UI, Lucide Icons |
| Qualidade | Vitest, Testing Library, ESLint, Prettier |

---

## Como rodar na sua máquina

**Pré-requisito:** [Node.js](https://nodejs.org/) 20 ou mais recente (já vem com o npm).

```bash
# 1. Clone o repositório
git clone https://github.com/glimaecosta-hash/Portifolio.git

# 2. Entre na pasta
cd Portifolio

# 3. Instale as dependências
npm install

# 4. Rode em modo de desenvolvimento
npm run dev
```

O terminal mostra o endereço para abrir no navegador, normalmente `http://localhost:8080`.

> **Dica:** rode os comandos dentro da pasta do projeto, onde está o `package.json`. Fora dela, o npm mostra o erro `ENOENT: no such file or directory`.

> **Testes no Windows:** se o `npm test` falhar com `Cannot read properties of undefined (reading 'config')`, o terminal está na pasta com a letra do disco minúscula (`c:\...`). Entre de novo com `cd /d "C:\caminho\do\projeto"` (C maiúsculo) e rode os testes outra vez.

---

## Scripts disponíveis

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento, que recarrega a página sozinho a cada alteração |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Roda localmente a versão de produção gerada |
| `npm run lint` | Verifica o código com o ESLint |
| `npm run format` | Formata todos os arquivos com o Prettier |
| `npm test` | Roda os testes com o Vitest (terminal nos dois idiomas e rotas) |

---

## Estrutura do projeto

```
src/
├── components/
│   ├── os/                  # O "sistema operacional"
│   │   ├── Desktop.tsx      # Área de trabalho e gerenciador de janelas
│   │   ├── Apps.tsx         # Conteúdo de cada janela
│   │   ├── app-registry.ts  # Lista de programas: ícone, largura e nome em cada idioma
│   │   ├── OsWindow.tsx     # A janela (arrastar, focar, minimizar, fechar)
│   │   ├── BootScreen.tsx   # Tela de inicialização
│   │   ├── PixelIcon.tsx    # Desenha os ícones em pixel
│   │   └── pixel-icons.ts   # Os ícones como grades de 16x16
│   └── ui/                  # Componentes base (Radix UI)
├── data/
│   └── portfolio.ts         # Todo o conteúdo pessoal, em português e inglês
├── lib/
│   ├── terminal.ts          # Lógica dos comandos do terminal
│   ├── i18n.tsx             # Idioma escolhido: LanguageProvider, useT, usePortfolio
│   ├── lang.ts              # Idiomas disponíveis (pt, en)
│   └── ui-strings.ts        # Textos da interface (botões, menus) nos dois idiomas
├── routes/                  # Rotas do TanStack Router
├── test/                    # Testes com Vitest
└── styles.css               # Tema, cores e estilos retrô
```

---

## Como editar o conteúdo

Todo o texto pessoal do portfólio fica em **[`src/data/portfolio.ts`](src/data/portfolio.ts)**. Para mudar qualquer informação, não é preciso mexer nos componentes.

Os textos que mudam com o idioma são escritos com as duas versões lado a lado:

```ts
summary: { pt: "Texto em português.", en: "Text in English." },
```

| O que mudar | Onde |
| --- | --- |
| Nome, cidade, contatos, cargo, apresentação e objetivo | `ownerData` |
| Projetos | `projectData` |
| Habilidades e nível de 1 a 10 | `skills` |
| Ferramentas e práticas | `tools` e `practices` |
| Experiência e formação | `experienceData` e `educationData` |
| Cursos e idiomas | `courses` e `languages` |

Os textos fixos da interface, como botões, menus e mensagens do terminal, ficam em [`src/lib/ui-strings.ts`](src/lib/ui-strings.ts) e [`src/lib/terminal.ts`](src/lib/terminal.ts).

### Adicionando um projeto

Adicione um item em `projectData`:

```ts
{
  slug: "meu-projeto",            // identificador, sem espaços nem acentos
  file: "meu_projeto.exe",        // nome que aparece embaixo do ícone
  name: { pt: "Meu Projeto", en: "My Project" },
  year: "2026",                   // "" esconde o ano
  role: { pt: "Full stack", en: "Full stack" },
  summary: { pt: "Uma frase sobre o projeto.", en: "One sentence about the project." },
  description: {
    pt: ["O que o projeto é."],
    en: ["What the project is."],
  },
  activities: {
    pt: ["O que eu fiz 1.", "O que eu fiz 2."],
    en: ["What I did 1.", "What I did 2."],
  },
  stack: ["React", "Node.js"],
  icon: "app",                    // usado quando não há imagem
  image: minhaImagem,             // opcional: importe de src/assets/
  repo: "https://github.com/...", // "" esconde o botão "Código"
  live: "",                       // "" esconde o botão "Ver online"
},
```

Ícones disponíveis: `app`, `folder`, `terminal`, `chip`, `doc`, `disk`, `mail`, `trash`.

Para o comando `abrir` do terminal reconhecer o projeto pelo nome do arquivo, use uma destas extensões no `file`: `.exe`, `.app`, `.web`, `.api`, `.py`, `.txt`, `.sys`, `.doc` ou `.shop`.

---

## Decisões de arquitetura

- **Conteúdo separado da interface.** Todos os dados pessoais ficam em um único arquivo. Atualizar o portfólio é editar texto, não componente.
- **Terminal como função pura.** `runCommand(texto, idioma)` recebe o comando e devolve as linhas de resposta. Não depende de React e pode ser testado sem renderizar nada.
- **Idioma sem biblioteca externa.** Um contexto React guarda o idioma, e os hooks `useT()` (textos da interface) e `usePortfolio()` (conteúdo pessoal) entregam tudo já traduzido. O TypeScript obriga a versão em inglês a ter as mesmas chaves que a em português, então nenhum texto fica sem tradução.
- **Ícones como código.** Cada ícone é uma grade de caracteres 16x16 ligada às cores do tema. Assim os ícones mudam junto com o tema e não precisam de arquivos de imagem.
- **Gerenciador de janelas centralizado.** Abertura, foco, ordem e posição das janelas ficam no estado do `Desktop.tsx`.
- **Nomes de arquivo sem conflito de maiúsculas.** O registro de programas se chama `app-registry.ts` para não colidir com `Apps.tsx`. No Windows, `apps.ts` e `Apps.tsx` seriam tratados como o mesmo nome.

---

## Contato

**Giovana Lima Moreira Costa**, Desenvolvedora Full Stack e estudante de Engenharia da Computação em Belo Horizonte, MG.

- E-mail: [glimaecosta@gmail.com](mailto:glimaecosta@gmail.com)
- LinkedIn: [giovana-lima-costa](https://www.linkedin.com/in/giovana-lima-costa-417b60239/)
- GitHub: [glimaecosta-hash](https://github.com/glimaecosta-hash)

---

<p align="center">Feito com React, TypeScript e muito café ☕</p>
