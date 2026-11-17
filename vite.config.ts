import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Build para o GitHub Pages (usado pelo workflow .github/workflows/deploy.yml):
//   GITHUB_PAGES=true  -> gera o site como HTML estático, pronto para hospedagem estática
//   BASE_PATH          -> subpasta do site, ex.: "/Portifolio/" em glimaecosta-hash.github.io/Portifolio/
// Sem essas variáveis (npm run dev, Lovable), tudo continua como antes.
const isPages = process.env["GITHUB_PAGES"] === "true";
const base = isPages ? (process.env["BASE_PATH"] ?? "/Portifolio/") : "/";

export default defineConfig({
  vite: { base },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isPages && { prerender: { enabled: true, crawlLinks: true } }),
  },
  ...(isPages && { nitro: { preset: "cloudflare-module" } }),
});
