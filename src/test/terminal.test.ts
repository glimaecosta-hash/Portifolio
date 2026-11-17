import { describe, expect, it } from "vitest";
import { runCommand } from "@/lib/terminal";

describe("terminal", () => {
  it("responde em português por padrão", () => {
    expect(runCommand("ajuda").lines[0]).toBe("Comandos disponíveis:");
  });

  it("responde em inglês quando o idioma é en", () => {
    expect(runCommand("help", "en").lines[0]).toBe("Available commands:");
  });

  it("aceita comandos dos dois idiomas em qualquer idioma", () => {
    expect(runCommand("projects", "pt").lines.length).toBeGreaterThan(1);
    expect(runCommand("projetos", "en").lines.length).toBeGreaterThan(1);
  });

  it("abre janelas pelo nome em português ou inglês", () => {
    expect(runCommand("abrir sobre_mim.txt").open).toBe("sobre");
    expect(runCommand("open about_me.txt", "en").open).toBe("sobre");
    expect(runCommand("open resume", "en")).toEqual({
      lines: ["Opening resume.doc..."],
      open: "curriculo",
    });
  });

  it("abre um projeto pelo nome do arquivo", () => {
    expect(runCommand("abrir encantos_da_serra").open).toBe("projeto:encantos-da-serra");
    expect(runCommand("open gioos.exe", "en").open).toBe("projeto:gioos");
  });

  it("mostra a bio no idioma escolhido", () => {
    expect(runCommand("sobre").lines).toContain("Desenvolvedora Full Stack · Belo Horizonte, MG");
    expect(runCommand("about", "en").lines).toContain("Full Stack Developer · Belo Horizonte, MG");
  });

  it("avisa sobre comando desconhecido", () => {
    expect(runCommand("xyz", "en").lines[0]).toContain("command not found");
  });
});
