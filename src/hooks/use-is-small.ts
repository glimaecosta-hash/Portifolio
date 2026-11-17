import { useEffect, useState } from "react";

/** true em telas de celular (até 767px), onde as janelas ocupam a tela inteira. */
export function useIsSmall() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setSmall(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return small;
}
