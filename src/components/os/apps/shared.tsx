import type { ReactNode } from "react";
import type { WindowId } from "../app-registry";

/** Função que as janelas recebem para abrir outra janela. */
export type OpenFn = (id: WindowId) => void;

/** Barra de menu decorativa no topo da janela (Arquivo, Editar...). */
export function MenuBar({ items }: { items: string[] }) {
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

/** Barra de status no rodapé da janela. */
export function StatusBar({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between border-t-2 border-ink px-3 py-1 font-pixel text-xs text-muted-foreground">
      {children}
    </div>
  );
}
