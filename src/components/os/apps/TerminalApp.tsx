import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLang, useT } from "@/i18n";
import { runCommand } from "@/lib/terminal";
import type { OpenFn } from "./shared";

type Line = { kind: "in" | "out"; text: string };

/** Janela terminal.exe. A lógica dos comandos fica em src/lib/terminal.ts. */
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
