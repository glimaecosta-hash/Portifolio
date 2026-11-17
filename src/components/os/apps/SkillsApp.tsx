import { usePortfolio, useT } from "@/i18n";
import { PixelIcon } from "../PixelIcon";

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

/** Janela habilidades.sys / skills.sys. */
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
