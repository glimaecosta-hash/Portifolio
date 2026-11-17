import { usePortfolio, useT } from "@/i18n";
import { OsButton } from "../OsButton";
import { PixelIcon } from "../PixelIcon";
import { MenuBar, type OpenFn } from "./shared";

/** Janela sobre_mim.txt / about_me.txt. */
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
