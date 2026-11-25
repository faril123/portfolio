import Image from "next/image";
import type { Project } from "@/data/projects";

function Meta({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-0.5 font-body text-[13px] text-ink">{items.join(", ")}</dd>
    </div>
  );
}

export default function ProjectCard({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <article
      className={`group flex flex-col rounded-2xl border border-line bg-card p-4 shadow-[0_8px_30px_rgba(0,0,0,0.05)] ${className}`}
    >
      <div className="project-img overflow-hidden rounded-xl border border-line bg-bg-alt">
        <div className="relative aspect-[16/10] transition-transform duration-500 ease-out group-hover:scale-105">
          {p.image ? (
            <Image src={p.image} alt={`Mockup ${p.title}`} fill sizes="420px" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center font-body text-[13px] text-muted">
              Mockup
            </div>
          )}
        </div>
      </div>

      <h3 className="mt-5 font-sans text-[22px] font-semibold text-ink">{p.title}</h3>
      <p className="mt-2 font-body text-[15px] leading-relaxed text-muted">{p.description}</p>

      <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-4">
        <Meta label="Framework" items={p.framework} />
        <Meta label="Database" items={p.database} />
        <Meta label="Testing" items={p.testing} />
      </dl>

      <a
        href={p.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-fit items-center gap-1 font-sans text-[14px] font-medium text-ink underline-offset-4 hover:underline"
      >
        GitHub <span aria-hidden>↗</span>
      </a>
    </article>
  );
}