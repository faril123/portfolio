"use client";

import Reveal from "./Reveal";
import { about, experience, skills, contact } from "@/data/content";
import { useLang } from "@/lib/i18n";
import { dict } from "@/data/dictionary";

function Shell({
  id,
  title,
  alt = false,
  children,
}: {
  id: string;
  title: string;
  alt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-16 px-6 py-24 ${alt ? "bg-bg-alt" : "bg-bg"}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-[clamp(2.25rem,5vw,3rem)] font-bold text-ink">{title}</h2>
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

const chip = "rounded-full border border-line bg-bg px-3 py-1 font-body text-[13px] text-ink";

export function About() {
  const { lang } = useLang();
  return (
    <Shell id="about" title={dict[lang].sections.about}>
      <div className="max-w-2xl space-y-5">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <p className="font-body text-[17px] leading-relaxed text-muted">{p[lang]}</p>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

export function Experience() {
  const { lang } = useLang();
  return (
    <Shell id="experience" title={dict[lang].sections.experience}>
      <ol className="max-w-2xl border-l border-line pl-6">
        {experience.map((e, i) => (
          <li key={i} className="relative pb-10 last:pb-0">
            <span className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-ink" />
            <Reveal>
              <p className="font-body text-[12px] font-medium text-muted">{e.period[lang]}</p>
              <h3 className="mt-1 font-sans text-[20px] font-semibold text-ink">{e.title[lang]}</h3>
              <p className="font-body text-[15px] text-ink">{e.place}</p>
              <p className="mt-2 font-body text-[15px] leading-relaxed text-muted">{e.detail[lang]}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Shell>
  );
}

export function Skills() {
  const { lang } = useLang();
  return (
    <Shell id="skills" title={dict[lang].sections.skills} alt>
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((s, i) => (
          <Reveal key={s.group.en} delay={(i % 2) * 0.1}>
            <div className="h-full rounded-2xl border border-line bg-card p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
              <h3 className="font-sans text-[20px] font-semibold text-ink">{s.group[lang]}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <span key={it} className={chip}>
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

export function Contact() {
  const { lang } = useLang();
  return (
    <Shell id="contact" title={dict[lang].sections.contact}>
      <Reveal className="max-w-2xl">
        <p className="font-body text-[17px] leading-relaxed text-muted">{dict[lang].contact.blurb}</p>
        <a
          href={`mailto:${contact.email}`}
          className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-sans text-[15px] font-medium text-bg transition-opacity hover:opacity-85"
        >
          {contact.email}
        </a>
        <div className="mt-6 flex gap-6">
          {contact.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[14px] font-medium text-ink underline-offset-4 hover:underline"
            >
              {l.label} <span aria-hidden>↗</span>
            </a>
          ))}
        </div>
      </Reveal>
      <p className="mt-24 font-body text-[12px] text-muted">© 2026 Faril</p>
    </Shell>
  );
}