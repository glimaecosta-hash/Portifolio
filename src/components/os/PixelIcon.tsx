import { ICONS, PALETTE, type IconName } from "./pixel-icons";

export function PixelIcon({
  name,
  size = 40,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const rows = ICONS[name];
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {rows.flatMap((row, y) =>
        row
          .split("")
          .map((ch, x) =>
            ch === "." ? null : (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={1.02}
                height={1.02}
                style={{ fill: PALETTE[ch] }}
              />
            ),
          ),
      )}
    </svg>
  );
}

export function StartLogo({ size = 16 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid grid-cols-2 gap-px border-2 border-ink bg-ink"
      style={{ width: size, height: size }}
    >
      <span className="bg-primary" />
      <span className="bg-secondary" />
      <span className="bg-accent" />
      <span className="bg-card" />
    </span>
  );
}
