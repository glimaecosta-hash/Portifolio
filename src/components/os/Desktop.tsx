import { useCallback, useEffect, useRef, useState } from "react";
import { useClock } from "@/hooks/use-clock";
import { useIsSmall } from "@/hooks/use-is-small";
import { HTML_LANG, useLang, usePortfolio, useT } from "@/i18n";
import { cn } from "@/lib/utils";
import {
  APPS,
  DESKTOP_ORDER,
  getAppText,
  getWindowMeta,
  isBaseApp,
  type WindowId,
} from "./app-registry";
import {
  AboutApp,
  ContactApp,
  ProjectApp,
  ProjectsApp,
  ResumeApp,
  SkillsApp,
  TerminalApp,
  TrashApp,
} from "./apps";
import { BootScreen } from "./BootScreen";
import { LanguageToggle } from "./LanguageToggle";
import { OsButton } from "./OsButton";
import { OsWindow } from "./OsWindow";
import { PixelIcon, StartLogo } from "./PixelIcon";

type Win = { id: WindowId; x: number; y: number; z: number; minimized: boolean };
type Phase = "boot" | "on" | "off";

export function Desktop() {
  const { lang } = useLang();
  const t = useT();
  const { owner } = usePortfolio();
  const [phase, setPhase] = useState<Phase>("boot");
  const [wins, setWins] = useState<Win[]>([]);
  const [activeId, setActiveId] = useState<WindowId | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const zRef = useRef(10);
  const isSmall = useIsSmall();
  const time = useClock(HTML_LANG[lang]);

  const open = useCallback((id: WindowId) => {
    setStartOpen(false);
    const z = ++zRef.current;
    setWins((prev) => {
      if (prev.some((w) => w.id === id))
        return prev.map((w) => (w.id === id ? { ...w, z, minimized: false } : w));
      const n = prev.length;
      const width = isBaseApp(id) ? APPS[id].width : 600;
      const maxX = Math.max(16, window.innerWidth - width - 32);
      const x = Math.min(140 + n * 56, maxX);
      const y = Math.min(24 + n * 40, Math.max(16, window.innerHeight - 420));
      return [...prev, { id, x, y, z, minimized: false }];
    });
    setActiveId(id);
  }, []);

  const focus = (id: WindowId) => {
    if (activeId === id) return;
    const z = ++zRef.current;
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, z } : w)));
    setActiveId(id);
  };
  const close = (id: WindowId) => {
    setWins((prev) => prev.filter((w) => w.id !== id));
    if (activeId === id) setActiveId(null);
  };
  const minimize = (id: WindowId) => {
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    if (activeId === id) setActiveId(null);
  };
  const move = (id: WindowId, x: number, y: number) =>
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));

  const finishBoot = useCallback(() => {
    sessionStorage.setItem("gioos-booted", "1");
    setPhase("on");
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("gioos-booted")) setPhase("on");
  }, []);

  const opened = useRef(false);
  useEffect(() => {
    if (phase === "on" && !opened.current) {
      opened.current = true;
      open("sobre");
    }
  }, [phase, open]);

  const renderApp = (id: WindowId) => {
    switch (id) {
      case "sobre":
        return <AboutApp onOpen={open} />;
      case "projetos":
        return <ProjectsApp onOpen={open} />;
      case "terminal":
        return <TerminalApp onOpen={open} autoFocus={!isSmall} />;
      case "habilidades":
        return <SkillsApp />;
      case "curriculo":
        return <ResumeApp />;
      case "contato":
        return <ContactApp />;
      case "lixeira":
        return <TrashApp />;
      default:
        return <ProjectApp slug={id.replace("projeto:", "")} />;
    }
  };

  if (phase === "off") {
    return (
      <main className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-ink p-6 text-center">
        <p className="font-pixel text-2xl text-primary sm:text-3xl">{t.shutdownMessage}</p>
        <OsButton
          variant="highlight"
          onClick={() => {
            opened.current = false;
            setWins([]);
            setPhase("boot");
          }}
        >
          {t.turnOn}
        </OsButton>
      </main>
    );
  }

  return (
    <main className="os-desktop os-crt fixed inset-0 overflow-hidden">
      {phase === "boot" && <BootScreen onDone={finishBoot} />}

      <h1 className="sr-only">
        {owner.name} — {owner.role}
      </h1>

      {/* Wallpaper mark */}
      <p className="os-wallpaper-mark pointer-events-none absolute bottom-16 right-6 hidden text-right text-6xl leading-none lg:block">
        giovana
        <br />
        .dev
      </p>

      {/* Desktop icons */}
      <nav
        aria-label={t.desktop}
        className="absolute inset-x-2 top-3 grid grid-cols-3 gap-2 md:inset-x-auto md:bottom-16 md:left-3 md:grid-flow-col md:grid-cols-none md:auto-cols-[92px] md:grid-rows-[repeat(auto-fill,96px)]"
        onClick={() => setStartOpen(false)}
      >
        {DESKTOP_ORDER.map((id) => (
          <button
            key={id}
            onClick={() => open(id)}
            className="group flex flex-col items-center gap-1 p-1 focus-visible:outline-none"
          >
            <PixelIcon
              name={APPS[id].icon}
              size={44}
              className="transition-transform group-hover:-translate-y-0.5"
            />
            <span className="os-icon-label break-all px-1 text-center text-sm leading-tight group-focus-visible:bg-primary">
              {getAppText(id, lang).label}
            </span>
          </button>
        ))}
      </nav>

      {/* Sticky note */}
      <aside className="os-postit absolute bottom-20 right-6 w-56 rotate-2 p-4 md:bottom-auto md:right-8 md:top-8">
        <p className="font-pixel text-lg">{t.reminder}</p>
        <p className="mt-1 text-sm">{t.reminderText}</p>
        <button
          onClick={() => open("contato")}
          className="mt-3 font-pixel text-sm underline decoration-2 underline-offset-4 hover:text-primary-deep"
        >
          {t.openContact}
        </button>
      </aside>

      {/* Windows */}
      {wins
        .filter((w) => !w.minimized)
        .map((w) => {
          const meta = getWindowMeta(w.id, lang);
          return (
            <OsWindow
              key={w.id}
              title={meta.title}
              icon={meta.icon}
              width={meta.width}
              x={w.x}
              y={w.y}
              z={w.z}
              active={activeId === w.id}
              isSmall={isSmall}
              onFocus={() => focus(w.id)}
              onClose={() => close(w.id)}
              onMinimize={() => minimize(w.id)}
              onMove={(x, y) => move(w.id, x, y)}
            >
              {renderApp(w.id)}
            </OsWindow>
          );
        })}

      {/* Start menu */}
      {startOpen && (
        <div className="os-window absolute bottom-12 left-2 z-[9001] flex w-64 animate-window-open">
          <div className="flex w-8 items-end justify-center bg-primary pb-2">
            <span className="font-pixel text-lg text-primary-foreground [writing-mode:vertical-rl] rotate-180">
              GioOS <span className="text-secondary">98</span>
            </span>
          </div>
          <ul className="flex-1 py-1">
            {DESKTOP_ORDER.map((id) => (
              <li key={id}>
                <button
                  onClick={() => open(id)}
                  className="flex w-full items-center gap-3 px-3 py-1.5 text-left font-pixel text-sm hover:bg-primary hover:text-primary-foreground"
                >
                  <PixelIcon name={APPS[id].icon} size={24} />
                  {getAppText(id, lang).label}
                </button>
              </li>
            ))}
            <li className="my-1 border-t-2 border-ink" />
            <li>
              <button
                onClick={() => {
                  setStartOpen(false);
                  setPhase("off");
                }}
                className="flex w-full items-center gap-3 px-3 py-1.5 text-left font-pixel text-sm hover:bg-primary hover:text-primary-foreground"
              >
                <span className="flex h-6 w-6 items-center justify-center border-2 border-ink bg-secondary text-xs">
                  ⏻
                </span>
                {t.shutdown}
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Taskbar */}
      <footer className="os-taskbar fixed inset-x-0 bottom-0 z-[9000] flex h-12 items-center gap-2 px-2">
        <OsButton
          size="sm"
          variant={startOpen ? "pressed" : "default"}
          onClick={() => setStartOpen((s) => !s)}
          aria-expanded={startOpen}
        >
          <StartLogo />
          {t.start}
        </OsButton>
        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {wins.map((w) => {
            const meta = getWindowMeta(w.id, lang);
            const isActive = activeId === w.id && !w.minimized;
            return (
              <OsButton
                key={w.id}
                size="sm"
                variant={isActive ? "pressed" : "default"}
                className="max-w-44 shrink-0 justify-start"
                onClick={() => (isActive ? minimize(w.id) : open(w.id))}
                aria-label={meta.title}
              >
                <PixelIcon name={meta.icon} size={16} />
                <span className="hidden truncate sm:inline">{meta.title}</span>
              </OsButton>
            );
          })}
        </div>
        <LanguageToggle />
        <div className={cn("os-inset flex h-8 items-center px-3 font-pixel text-sm")}>{time}</div>
      </footer>
    </main>
  );
}
