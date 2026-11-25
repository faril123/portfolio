import Reveal from "./Reveal";
import { about, experience, skills, contact } from "@/data/content";

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

const chip =
  "rounded-full border border-line bg-bg px-3 py-1 font-body text-[13px] text-ink";

export function About() {
  return (
    <Shell id="about" title="About">
      <div className="max-w-2xl space-y-5">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <p className="font-body text-[17px] leading-relaxed text-muted">{p}</p>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

export function Experience() {
  return (
    <Shell id="experience" title="Experience">
      <ol className="max-w-2xl border-l border-line pl-6">
        {experience.map((e, i) => (
          <li key={i} className="relative pb-10 last:pb-0">
            <span className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-ink" />
            <Reveal>
              <p className="font-body text-[12px] font-medium text-muted">{e.period}</p>
              <h3 className="mt-1 font-sans text-[20px] font-semibold text-ink">{e.title}</h3>
              <p className="font-body text-[15px] text-ink">{e.place}</p>
              <p className="mt-2 font-body text-[15px] leading-relaxed text-muted">{e.detail}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Shell>
  );
}

export function Skills() {
  return (
    <Shell id="skills" title="Skills" alt>
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 2) * 0.1}>
            <div className="h-full rounded-2xl border border-line bg-card p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
              <h3 className="font-sans text-[20px] font-semibold text-ink">{s.group}</h3>
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
  return (
    <Shell id="contact" title="Contact">
      <Reveal className="max-w-2xl">
        <p className="font-body text-[17px] leading-relaxed text-muted">
          Open to internships, collaborations, and interesting projects. Feel free to reach out.
        </p>
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