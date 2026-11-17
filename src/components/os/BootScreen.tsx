import { useEffect, useState } from "react";

const LINES = [
  "GioOS BIOS v1.0 — (c) Giovana Costa",
  "Verificando memória ........ 640K OK",
  "Carregando cafe.sys ........ OK",
  "Compilando criatividade .... OK",
  "Iniciando área de trabalho...",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const step = setInterval(() => setCount((c) => Math.min(c + 1, LINES.length)), 380);
    const done = setTimeout(onDone, 2600);
    return () => {
      clearInterval(step);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <button
      type="button"
      onClick={onDone}
      className="os-terminal fixed inset-0 z-[10000] flex cursor-pointer flex-col justify-between p-6 text-left text-xl sm:p-10 sm:text-2xl"
      aria-label="Pular inicialização"
    >
      <div className="space-y-1">
        {LINES.slice(0, count).map((l) => (
          <p key={l}>{l}</p>
        ))}
        <span className="animate-blink">█</span>
      </div>
      <div className="mx-auto w-full max-w-md space-y-3 text-center">
        <p className="font-pixel text-4xl sm:text-5xl">GioOS</p>
        <div className="h-5 border-2 border-terminal-foreground p-0.5">
          <div className="h-full animate-boot-bar bg-terminal-foreground" />
        </div>
        <p className="text-base text-terminal-dim">clique para pular</p>
      </div>
    </button>
  );
}
