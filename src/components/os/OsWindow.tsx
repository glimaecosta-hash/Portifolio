import { useRef, type ReactNode } from "react";
import { Minus, X } from "lucide-react";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";
import { PixelIcon } from "./PixelIcon";
import type { IconName } from "./pixel-icons";
import { OsButton } from "./OsButton";

type Props = {
  title: string;
  icon: IconName;
  x: number;
  y: number;
  z: number;
  width: number;
  active: boolean;
  isSmall: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMove: (x: number, y: number) => void;
  children: ReactNode;
};

export function OsWindow({
  title,
  icon,
  x,
  y,
  z,
  width,
  active,
  isSmall,
  onFocus,
  onClose,
  onMinimize,
  onMove,
  children,
}: Props) {
  const t = useT();
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  return (
    <section
      role="dialog"
      aria-label={title}
      onPointerDown={onFocus}
      className={cn(
        "os-window flex flex-col animate-window-open",
        isSmall
          ? "fixed inset-x-2 top-2 bottom-14"
          : "absolute max-h-[calc(100dvh-6.5rem)] max-w-[calc(100vw-1.5rem)]",
      )}
      style={isSmall ? { zIndex: z } : { left: x, top: y, zIndex: z, width }}
    >
      <header
        className={cn(
          "os-titlebar",
          active ? "os-titlebar-active" : "os-titlebar-idle",
          !isSmall && "cursor-grab active:cursor-grabbing",
        )}
        onPointerDown={(e) => {
          if (isSmall || (e.target as HTMLElement).closest("button")) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { dx: e.clientX - x, dy: e.clientY - y };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const nx = Math.min(
            Math.max(e.clientX - drag.current.dx, 80 - width),
            window.innerWidth - 80,
          );
          const ny = Math.min(Math.max(e.clientY - drag.current.dy, 0), window.innerHeight - 96);
          onMove(nx, ny);
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      >
        <OsButton size="icon" aria-label={t.close(title)} onClick={onClose}>
          <X className="h-3 w-3" strokeWidth={3} />
        </OsButton>
        <span className="os-titlebar-label">
          <PixelIcon name={icon} size={16} />
          <span className="truncate">{title}</span>
        </span>
        <OsButton size="icon" aria-label={t.minimize(title)} onClick={onMinimize}>
          <Minus className="h-3 w-3" strokeWidth={3} />
        </OsButton>
      </header>
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </section>
  );
}
