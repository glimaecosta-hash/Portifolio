import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import type { Project, TimelineItem } from "@/data/portfolio";
import { useLang, usePortfolio, useT } from "@/lib/i18n";
import { runCommand } from "@/lib/terminal";
import { PixelIcon } from "./PixelIcon";
import { OsButton } from "./OsButton";
import type { WindowId } from "./app-registry";

type OpenFn = (id: WindowId) => void;

function MenuBar({ items }: { items: string[] }) {
  return (
    <div className="flex gap-4 border-b-2 border-ink px-3 py-1 font-pixel text-sm">
      {items.map((i) => (
        <span key={i}>
          <span className="underline">{i[0]}</span>
          {i.slice(1)}
        </span>
      ))}
    </div>
  );
}

function StatusBar({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between border-t-2 border-ink px-3 py-1 font-pixel text-xs text-muted-foreground">
      {children}
    </div>
  );
}

export function AboutApp({ onOpen }: { onOpen: OpenFn }) {
  const t = useT();
  const { owner } = usePortfolio();
  return (
    <div className="flex h-full flex-col">
      <MenuBar items={t.aboutMenu} />
      <div className="os-inset m-3 flex-1 space-y-4 p-5">
        <div className="flex items-center gap-4">
          <div className="border-2 border-ink bg-accent p-1 shadow-hard-sm">
            <PixelIcon name="avatar" size={72} />
          </div>
          <div>
            <h1 className="font-pixel text-2xl leading-tight sm:text-3xl">{owner.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {owner.role} · {owner.city}
            </p>
          </div>
        </div>
        {owner.bio.map((p) => (
          <p key={p} className="text-sm leading-relaxed">
            {p}
          </p>
        ))}
        <p className="text-sm text-muted-foreground">
          {">"} {t.aboutTip}
          <span className="animate-blink">_</span>
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <OsButton variant="primary" onClick={() => onOpen("projetos")}>
            {t.seeProjects}
          </OsButton>
          <OsButton onClick={() => onOpen("contato")}>{t.talkToMe}</OsButton>
        </div>
      </div>
    </div>
  );
}

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

type Line = { kind: "in" | "out"; text: string };

export function TerminalApp({ onOpen, autoFocus }: { onOpen: OpenFn; autoFocus: boolean }) {
  const { lang } = useLang();
  const t = useT();
  const [lines, setLines] = useState<Line[]>(() => [
    ...t.terminalWelcome.map((text) => ({ kind: "out" as const, text })),
    { kind: "out", text: "" },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const res = runCommand(value, lang);
    if (res.clear) setLines([]);
    else
      setLines((l) => [
        ...l,
        { kind: "in", text: value },
        ...res.lines.map((text) => ({ kind: "out" as const, text })),
      ]);
    if (value.trim()) setHistory((h) => [value, ...h]);
    setCursor(-1);
    setValue("");
    if (res.open) onOpen(res.open);
  };

  return (
    <div
      className="os-terminal h-[22rem] max-h-full overflow-auto p-3 text-xl leading-6 max-md:h-full"
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap break-words">
          {l.kind === "in" ? (
            <>
              <span className="text-terminal-dim">giovana@gioos:~$ </span>
              {l.text}
            </>
          ) : (
            l.text || " "
          )}
        </div>
      ))}
      <form onSubmit={submit} className="flex">
        <label htmlFor="term-input" className="shrink-0 text-terminal-dim">
          giovana@gioos:~$&nbsp;
        </label>
        <input
          id="term-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" && history.length) {
              e.preventDefault();
              const next = Math.min(cursor + 1, history.length - 1);
              setCursor(next);
              setValue(history[next] ?? "");
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              const next = cursor - 1;
              setCursor(Math.max(next, -1));
              setValue(next >= 0 ? (history[next] ?? "") : "");
            }
          }}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent caret-terminal-foreground outline-none"
          aria-label={t.terminalInput}
        />
      </form>
      <div ref={endRef} />
    </div>
  );
}

function TagList({ items, className }: { items: string[]; className: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`border-2 border-ink px-2 py-0.5 font-pixel text-xs ${className}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function SkillsApp() {
  const t = useT();
  const { skills, tools, practices } = usePortfolio();
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-3">
        <PixelIcon name="chip" size={40} />
        <div>
          <p className="font-pixel text-lg">{t.systemProperties}</p>
          <p className="text-xs text-muted-foreground">{t.processor}</p>
        </div>
      </div>
      <fieldset className="border-2 border-ink p-3">
        <legend className="px-1 font-pixel text-sm">{t.languagesFrameworks}</legend>
        <ul className="space-y-2">
          {skills.map((s) => (
            <li key={s.name} className="grid grid-cols-[7.5rem_1fr] items-center gap-3 text-sm">
              <span>{s.name}</span>
              <span
                className="os-meter"
                role="meter"
                aria-valuenow={s.level}
                aria-valuemin={0}
                aria-valuemax={10}
                aria-label={s.name}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} data-on={i < s.level} />
                ))}
              </span>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset className="border-2 border-ink p-3">
        <legend className="px-1 font-pixel text-sm">{t.dailyTools}</legend>
        <TagList items={tools} className="bg-accent" />
      </fieldset>
      <fieldset className="border-2 border-ink p-3">
        <legend className="px-1 font-pixel text-sm">{t.architectureQuality}</legend>
        <TagList items={practices} className="bg-secondary" />
      </fieldset>
    </div>
  );
}

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

export function CurriculoApp() {
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

export function ContatoApp() {
  const t = useT();
  const { owner } = usePortfolio();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const send = (e: FormEvent) => {
    e.preventDefault();
    const href = `mailto:${owner.email}?subject=${encodeURIComponent(subject || t.defaultSubject)}&body=${encodeURIComponent(message)}`;
    window.location.href = href;
  };
  return (
    <form onSubmit={send} className="space-y-3 p-4 text-sm">
      <div className="grid grid-cols-[4.5rem_1fr] items-center gap-2">
        <span className="font-pixel">{t.to}</span>
        <span className="os-inset truncate px-2 py-1">{owner.email}</span>
        <label htmlFor="assunto" className="font-pixel">
          {t.subject}
        </label>
        <input
          id="assunto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={t.subjectPlaceholder}
          className="os-inset px-2 py-1 outline-none focus:bg-card"
        />
      </div>
      <label htmlFor="mensagem" className="sr-only">
        {t.message}
      </label>
      <textarea
        id="mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        placeholder={t.messagePlaceholder}
        className="os-inset w-full resize-none p-2 outline-none focus:bg-card"
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <OsButton type="submit" variant="primary">
          <Mail className="h-4 w-4" /> {t.send}
        </OsButton>
        <div className="flex gap-2">
          <a
            href={owner.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="border-2 border-ink bg-card p-1.5 shadow-hard-sm hover:bg-secondary"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={owner.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="border-2 border-ink bg-card p-1.5 shadow-hard-sm hover:bg-secondary"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </form>
  );
}

export function LixeiraApp() {
  const t = useT();
  const [tried, setTried] = useState(false);
  return (
    <div className="space-y-3 p-4 text-sm">
      <ul className="os-inset divide-y-2 divide-dashed divide-muted">
        {t.trash.map((item) => (
          <li key={item.file} className="flex items-center gap-3 px-3 py-2">
            <PixelIcon name="doc" size={24} />
            <span className="flex-1 font-pixel">{item.file}</span>
            <span className="text-xs text-muted-foreground">{item.note}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        <OsButton onClick={() => setTried(true)}>{t.emptyTrash}</OsButton>
        {tried && <span className="text-xs">{t.emptyTrashRefused}</span>}
      </div>
    </div>
  );
}
