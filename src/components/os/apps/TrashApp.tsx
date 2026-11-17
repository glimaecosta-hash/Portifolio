import { useState } from "react";
import { useT } from "@/i18n";
import { OsButton } from "../OsButton";
import { PixelIcon } from "../PixelIcon";

/** Lixeira / Recycle Bin: o easter egg. */
export function TrashApp() {
  const t = useT();
  const [tried, setTried] = useState(false);
  return (
    <div className="space-y-3 p-4 text-sm">
      <ul className="os-inset divide-y-2 divide-dashed divide-muted">
        {t.trash.map((item) => (
          <li key={item.file} className="flex items-center gap-3 px-3 py-2">
            <PixelIcon name="doc" size={24} />
            <span className="flex-1 font-pixel">{item.file}</span>
            <span className="text-xs text-muted-foreground">{item.note}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        <OsButton onClick={() => setTried(true)}>{t.emptyTrash}</OsButton>
        {tried && <span className="text-xs">{t.emptyTrashRefused}</span>}
      </div>
    </div>
  );
}
