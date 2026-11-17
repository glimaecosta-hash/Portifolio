import { createFileRoute } from "@tanstack/react-router";
import { Desktop } from "@/components/os/Desktop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Giovana Lima Moreira Costa — Desenvolvedora Full Stack" },
      {
        name: "description",
        content:
          "Portfólio da Giovana Lima Moreira Costa em forma de computador retrô: abra pastas, explore projetos e use o terminal.",
      },
      { property: "og:title", content: "Giovana Lima Moreira Costa — Desenvolvedora Full Stack" },
      {
        property: "og:description",
        content: "Um portfólio que é um computador retrô. Abra as janelas e conheça meus projetos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Desktop />;
}
