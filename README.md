# GioOS — Portfólio de Giovana Costa

> Um portfólio que é um sistema operacional retrô: janelas que se arrastam, ícones em pixel art e um terminal que responde a comandos.

Este é o meu portfólio pessoal. Em vez de uma página comum, ele simula um desktop antigo. Cada parte da minha trajetória é um "programa" que pode ser aberto, movido e minimizado, como em um computador de verdade.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)

---

## Sumário

- [O que tem no GioOS](#o-que-tem-no-gioos)
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
- Barra de tarefas com menu Iniciar e relógio
- Ícones desenhados em pixel art via código, sem arquivos de imagem
- Layout responsivo: no celular, as janelas ocupam a tela inteira
- Navegação por teclado e atributos de acessibilidade (ARIA)

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

Também funcionam as versões em inglês (`help`, `ls`, `whoami`, `clear`…), as setas ↑ e ↓ para navegar no histórico e alguns comandos escondidos. Tente `cafe` ou `sudo`.

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

---

## Scripts disponíveis

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento, que recarrega a página sozinho a cada alteração |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Roda localmente a versão de produção gerada |
| `npm run lint` | Verifica o código com o ESLint |
| `npm run format` | Formata todos os arquivos com o Prettier |
| `npm test` | Roda os testes com o Vitest |

---

## Estrutura do projeto

```
src/
├── components/
│   ├── os/                  # O "sistema operacional"
│   │   ├── Desktop.tsx      # Área de trabalho e gerenciador de janelas
│   │   ├── Apps.tsx         # Conteúdo de cada janela
│   │   ├── app-registry.ts  # Lista de programas: título, ícone e largura
│   │   ├── OsWindow.tsx     # A janela (arrastar, focar, minimizar, fechar)
│   │   ├── BootScreen.tsx   # Tela de inicialização
│   │   ├── PixelIcon.tsx    # Desenha os ícones em pixel
│   │   └── pixel-icons.ts   # Os ícones como grades de 16x16
│   └── ui/                  # Componentes base (Radix UI)
├── data/
│   └── portfolio.ts         # Todo o conteúdo pessoal em um só lugar
├── lib/
│   └── terminal.ts          # Lógica dos comandos do terminal
├── routes/                  # Rotas do TanStack Router
└── styles.css               # Tema, cores e estilos retrô
```

---

## Como editar o conteúdo

Todo o texto do portfólio fica em **[`src/data/portfolio.ts`](src/data/portfolio.ts)**. Para mudar qualquer informação, não é preciso mexer nos componentes.

| O que mudar | Onde |
| --- | --- |
| Nome, cidade, contatos e apresentação | `owner` |
| Projetos | `projects` |
| Habilidades e nível de 1 a 10 | `skills` |
| Ferramentas e práticas | `tools` e `practices` |
| Experiência e formação | `experience` e `education` |
| Cursos e idiomas | `courses` e `languages` |

### Adicionando um projeto

```ts
{
  slug: "meu-projeto",            // identificador, sem espaços nem acentos
  file: "meu_projeto.exe",        // nome que aparece embaixo do ícone
  name: "Meu Projeto",
  year: "2026",                   // "" esconde o ano
  role: "Full stack",
  summary: "Uma frase sobre o projeto.",
  description: ["O que o projeto é."],
  activities: ["O que eu fiz 1.", "O que eu fiz 2."],
  stack: ["React", "Node.js"],
  icon: "app",                    // usado quando não há imagem
  image: minhaImagem,             // opcional: importe de src/assets/
  repo: "https://github.com/...", // "" esconde o botão "Código"
  live: "",                       // "" esconde o botão "Ver online"
},
```

Ícones disponíveis: `app`, `folder`, `terminal`, `chip`, `doc`, `disk`, `mail`, `trash`.

---

## Decisões de arquitetura

- **Conteúdo separado da interface.** Todos os dados pessoais ficam em um único arquivo. Atualizar o portfólio é editar texto, não componente.
- **Terminal como função pura.** `runCommand(texto)` recebe o comando e devolve as linhas de resposta. Não depende de React e pode ser testado sem renderizar nada.
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
