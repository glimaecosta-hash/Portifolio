import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { usePortfolio, useT } from "@/i18n";
import { OsButton } from "../OsButton";
import { PixelIcon } from "../PixelIcon";
import { StatusBar, type OpenFn } from "./shared";

/** Print do projeto ou, sem imagem, o ícone em pixel. */
function ProjectCover({ project, lazy }: { project: Project; lazy?: boolean }) {
  const t = useT();
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={t.projectScreenshot(project.name)}
        width={1024}
        height={768}
        loading={lazy ? "lazy" : undefined}
        className="aspect-[4/3] w-full object-cover"
      />
    );
  }
  return (
    <span className="flex aspect-[4/3] w-full items-center justify-center bg-secondary">
      <PixelIcon name={project.icon} size={64} />
    </span>
  );
}

/** Pasta Projetos: lista todos os projetos. */
export function ProjectsApp({ onOpen }: { onOpen: OpenFn }) {
  const t = useT();
  const { projects } = usePortfolio();
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b-2 border-ink px-3 py-2 text-sm">
        <span className="font-pixel">{t.address}</span>
        <span className="os-inset flex-1 truncate px-2 py-0.5">{t.projectsPath}</span>
      </div>
      <div className="os-inset m-3 grid flex-1 grid-cols-2 gap-3 p-3 sm:grid-cols-4">
        {projects.map((p) => (
          <button
            key={p.slug}
            onClick={() => onOpen(`projeto:${p.slug}`)}
            className="group flex flex-col items-center gap-2 p-2 text-center focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-ink"
          >
            <span className="block w-full border-2 border-ink bg-card p-1 shadow-hard-sm transition-transform group-hover:-translate-y-1">
              <ProjectCover project={p} lazy />
            </span>
            <span className="px-1 font-pixel text-sm group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:bg-primary group-focus-visible:text-primary-foreground">
              {p.file}
            </span>
          </button>
        ))}
      </div>
      <StatusBar>
        <span>{t.objects(projects.length)}</span>
        <span>{t.clickToOpen}</span>
      </StatusBar>
    </div>
  );
}

/** Janela de um projeto: descrição, o que eu fiz, tecnologias e links. */
export function ProjectApp({ slug }: { slug: string }) {
  const t = useT();
  const { projects } = usePortfolio();
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <p className="p-4">{t.fileNotFound}</p>;
  return (
    <div className="space-y-4 p-4">
      <div className="border-2 border-ink shadow-hard-sm">
        <ProjectCover project={p} />
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-pixel text-2xl">{p.name}</h2>
        <span className="text-xs text-muted-foreground">
          {[p.year, p.role].filter(Boolean).join(" · ")}
        </span>
      </div>
      {p.description.map((d) => (
        <p key={d} className="text-sm leading-relaxed">
          {d}
        </p>
      ))}
      {p.activities.length > 0 && (
        <fieldset className="border-2 border-ink p-3">
          <legend className="px-1 font-pixel text-sm">{t.whatIDid}</legend>
          <ul className="list-inside list-['>_'] space-y-1 text-sm leading-relaxed">
            {p.activities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </fieldset>
      )}
      <div className="flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span key={s} className="border-2 border-ink bg-secondary px-2 py-0.5 font-pixel text-xs">
            {s}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {p.live && (
          <OsButton variant="primary" onClick={() => window.open(p.live, "_blank")}>
            <ExternalLink className="h-4 w-4" /> {t.seeOnline}
          </OsButton>
        )}
        {p.repo && (
          <OsButton onClick={() => window.open(p.repo, "_blank")}>
            <Github className="h-4 w-4" /> {t.code}
          </OsButton>
        )}
      </div>
    </div>
  );
}
