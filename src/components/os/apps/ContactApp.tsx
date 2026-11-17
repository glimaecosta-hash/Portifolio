import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { usePortfolio, useT } from "@/i18n";
import { OsButton } from "../OsButton";

/** Janela contato.exe / contact.exe: abre o app de e-mail de quem visita. */
export function ContactApp() {
  const t = useT();
  const { owner } = usePortfolio();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const send = (e: FormEvent) => {
    e.preventDefault();
    const href = `mailto:${owner.email}?subject=${encodeURIComponent(subject || t.defaultSubject)}&body=${encodeURIComponent(message)}`;
    window.location.href = href;
  };
  return (
    <form onSubmit={send} className="space-y-3 p-4 text-sm">
      <div className="grid grid-cols-[4.5rem_1fr] items-center gap-2">
        <span className="font-pixel">{t.to}</span>
        <span className="os-inset truncate px-2 py-1">{owner.email}</span>
        <label htmlFor="assunto" className="font-pixel">
          {t.subject}
        </label>
        <input
          id="assunto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={t.subjectPlaceholder}
          className="os-inset px-2 py-1 outline-none focus:bg-card"
        />
      </div>
      <label htmlFor="mensagem" className="sr-only">
        {t.message}
      </label>
      <textarea
        id="mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        placeholder={t.messagePlaceholder}
        className="os-inset w-full resize-none p-2 outline-none focus:bg-card"
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <OsButton type="submit" variant="primary">
          <Mail className="h-4 w-4" /> {t.send}
        </OsButton>
        <div className="flex gap-2">
          <a
            href={owner.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="border-2 border-ink bg-card p-1.5 shadow-hard-sm hover:bg-secondary"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={owner.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="border-2 border-ink bg-card p-1.5 shadow-hard-sm hover:bg-secondary"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </form>
  );
}
