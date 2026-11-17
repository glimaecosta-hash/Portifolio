import { useEffect, useState } from "react";

/** Hora atual de Belo Horizonte (HH:MM), atualizada a cada 15 segundos. */
export function useClock(locale: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      setTime(
        new Date().toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Sao_Paulo",
        }),
      );
    fmt();
    const t = setInterval(fmt, 15000);
    return () => clearInterval(t);
  }, [locale]);
  return time;
}
