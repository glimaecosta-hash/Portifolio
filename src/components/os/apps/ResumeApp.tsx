import type { ReactNode } from "react";
import type { TimelineItem } from "@/data/portfolio";
import { usePortfolio, useT } from "@/i18n";
import { MenuBar } from "./shared";

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="border-b-2 border-ink font-pixel text-lg">{title}</h3>
      {children}
    </section>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="space-y-4 border-l-2 border-dashed border-ink pl-4">
      {items.map((e) => (
        <li key={`${e.period}-${e.title}`} className="relative">
          <span className="absolute -left-[1.4rem] top-1 h-3 w-3 border-2 border-ink bg-primary" />
          <p className="font-pixel text-xs text-muted-foreground">{e.period}</p>
          <p className="font-semibold">
            {e.title} <span className="font-normal text-muted-foreground">@ {e.place}</span>
          </p>
          <p className="text-sm">{e.text}</p>
        </li>
      ))}
    </ol>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-inside list-['>_'] space-y-1 text-sm">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** Janela curriculo.doc / resume.doc. */
export function ResumeApp() {
  const t = useT();
  const { owner, experience, education, courses, languages } = usePortfolio();
  return (
    <div className="flex h-full flex-col">
      <MenuBar items={t.resumeMenu} />
      <div className="os-inset m-3 space-y-5 p-5">
        <div>
          <h2 className="font-pixel text-2xl">{owner.name}</h2>
          <p className="text-sm text-muted-foreground">
            {owner.role} · {owner.city}
          </p>
        </div>
        <p className="text-sm leading-relaxed">{owner.objective}</p>
        <CvSection title={t.experience}>
          <Timeline items={experience} />
        </CvSection>
        <CvSection title={t.education}>
          <Timeline items={education} />
        </CvSection>
        <CvSection title={t.courses}>
          <BulletList items={courses} />
        </CvSection>
        <CvSection title={t.spokenLanguages}>
          <BulletList items={languages} />
        </CvSection>
      </div>
    </div>
  );
}
