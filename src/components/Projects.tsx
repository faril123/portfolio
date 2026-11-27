"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import { dict } from "@/data/dictionary";

const MAX = 5;

export default function Projects({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLElement>(null);   
  const list = useRef<HTMLDivElement>(null);
  const shown = projects.slice(0, MAX);  
  const { lang } = useLang();
  const t = dict[lang].projects;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-img",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "clipPath",
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const scroll = (dir: number) => list.current?.scrollBy({ left: dir * 440, behavior: "smooth" });

  return (
    <section ref={root} id="projects" className="scroll-mt-16 bg-bg-alt py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(2.25rem,5vw,3rem)] font-bold text-ink">{dict[lang].sections.projects}</h2>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scroll(-1)}
              aria-label={t.prev}
              className="h-10 w-10 rounded-full border border-line bg-card text-ink transition-colors hover:bg-bg"
            >
              ←
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label={t.next}
              className="h-10 w-10 rounded-full border border-line bg-card text-ink transition-colors hover:bg-bg"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6">
      <div ref={list} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
        {shown.map((p) => (
          <ProjectCard key={p.slug} p={p} className="project-card-w shrink-0 snap-start" />
        ))}
      </div>
    </div>

      {projects.length > MAX && (
        <div className="mx-auto mt-6 max-w-6xl px-6">
          <Link
            href="/projects"
            className="inline-block rounded-full border border-line bg-card px-6 py-3 font-sans text-[15px] font-medium text-ink transition-colors hover:bg-bg"
          >
            {t.seeAll} ({projects.length})
          </Link>
        </div>
      )}
    </section>
  );
}
