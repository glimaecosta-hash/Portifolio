import { useCallback, useEffect, useRef, useState } from "react";
import { owner } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { APPS, DESKTOP_ORDER, getWindowMeta, isBaseApp, type WindowId } from "./app-registry";
import {
  AboutApp,
  ContatoApp,
  CurriculoApp,
  LixeiraApp,
  ProjectApp,
  ProjectsApp,
  SkillsApp,
  TerminalApp,
} from "./Apps";
import { BootScreen } from "./BootScreen";
import { OsButton } from "./OsButton";
import { OsWindow } from "./OsWindow";
import { PixelIcon, StartLogo } from "./PixelIcon";

type Win = { id: WindowId; x: number; y: number; z: number; minimized: boolean };
type Phase = "boot" | "on" | "off";

function useIsSmall() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setSmall(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return small;
}

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      setTime(
        new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Sao_Paulo",
        }),
      );
    fmt();
    const t = setInterval(fmt, 15000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export function Desktop() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [wins, setWins] = useState<Win[]>([]);
  const [activeId, setActiveId] = useState<WindowId | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const zRef = useRef(10);
  const isSmall = useIsSmall();
  const time = useClock();

  const open = useCallback((id: WindowId) => {
    setStartOpen(false);
    const z = ++zRef.current;
    setWins((prev) => {
      if (prev.some((w) => w.id === id))
        return prev.map((w) => (w.id === id ? { ...w, z, minimized: false } : w));
      const n = prev.length;
      const { width } = getWindowMeta(id);
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
        return <CurriculoApp />;
      case "contato":
        return <ContatoApp />;
      case "lixeira":
        return <LixeiraApp />;
      default:
        return <ProjectApp slug={id.replace("projeto:", "")} />;
    }
  };

  if (phase === "off") {
    return (
      <main className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-ink p-6 text-center">
        <p className="font-pixel text-2xl text-primary sm:text-3xl">
          Agora é seguro desligar o computador.
        </p>
        <OsButton
          variant="highlight"
          onClick={() => {
            opened.current = false;
            setWins([]);
            setPhase("boot");
          }}
        >
          Ligar de novo
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
        aria-label="Área de trabalho"
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
              {APPS[id].label}
            </span>
          </button>
        ))}
      </nav>

      {/* Sticky note */}
      <aside className="os-postit absolute bottom-20 right-6 w-56 rotate-2 p-4 md:bottom-auto md:right-8 md:top-8">
        <p className="font-pixel text-lg">Lembrete:</p>
        <p className="mt-1 text-sm">Disponível para novos projetos e vagas em 2026.</p>
        <button
          onClick={() => open("contato")}
          className="mt-3 font-pixel text-sm underline decoration-2 underline-offset-4 hover:text-primary-deep"
        >
          abrir contato.exe →
        </button>
      </aside>

      {/* Windows */}
      {wins
        .filter((w) => !w.minimized)
        .map((w) => {
          const meta = getWindowMeta(w.id);
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
                  {isBaseApp(id) ? APPS[id].label : id}
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
                Desligar...
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
          Iniciar
        </OsButton>
        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {wins.map((w) => {
            const meta = getWindowMeta(w.id);
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
        <div className={cn("os-inset flex h-8 items-center px-3 font-pixel text-sm")}>{time}</div>
      </footer>
    </main>
  );
}
