import { useEffect, useState } from "react";
import { useT } from "@/i18n";

export function BootScreen({ onDone }: { onDone: () => void }) {
  const t = useT();
  const LINES = t.bootLines;
  const total = LINES.length;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const step = setInterval(() => setCount((c) => Math.min(c + 1, total)), 380);
    const done = setTimeout(onDone, 2600);
    return () => {
      clearInterval(step);
      clearTimeout(done);
    };
  }, [onDone, total]);

  return (
    <button
      type="button"
      onClick={onDone}
      className="os-terminal fixed inset-0 z-[10000] flex cursor-pointer flex-col justify-between p-6 text-left text-xl sm:p-10 sm:text-2xl"
      aria-label={t.skipBoot}
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
        <p className="text-base text-terminal-dim">{t.clickToSkip}</p>
      </div>
    </button>
  );
}
