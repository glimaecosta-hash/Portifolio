<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- The portfolio is a single-route retro desktop: window-manager state lives in `src/components/os/Desktop.tsx`, each window's content in its own file under `src/components/os/apps/`, and all personal content in `src/data/portfolio.ts` — keeps copy edits in one file.
- The site is bilingual (pt/en). Personal content is written as `{ pt, en }` in `src/data/portfolio.ts`; fixed UI text lives in `src/i18n/ui-strings.ts`; components read both through `useT()` and `usePortfolio()` from `@/i18n` — never hard-code visible text in a component.
- Pixel icons are 16x16 char grids in `src/components/os/pixel-icons.ts` mapped to design tokens — keeps icons themeable without image assets.
- Terminal commands are a pure function in `src/lib/terminal.ts` (`runCommand(input, lang)`) — testable without rendering.
- Never create two files whose names differ only by case (e.g. `apps.ts` and `Apps.tsx`): Windows treats them as the same file and the app breaks.
- Production is GitHub Pages via `.github/workflows/deploy.yml`, which builds with `GITHUB_PAGES=true` and `BASE_PATH=/<repo>/` (see `vite.config.ts`). Reference public files with `import.meta.env.BASE_URL`, not a leading `/`, or they 404 under the repo subpath.
