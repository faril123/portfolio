"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

const MAX = 5;

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const shown = projects.slice(0, MAX);

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
          <h2 className="font-display text-[clamp(2.25rem,5vw,3rem)] font-bold text-ink">Projects</h2>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scroll(-1)}
              aria-label="Sebelumnya"
              className="h-10 w-10 rounded-full border border-line bg-card text-ink transition-colors hover:bg-bg"
            >
              ←
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Berikutnya"
              className="h-10 w-10 rounded-full border border-line bg-card text-ink transition-colors hover:bg-bg"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={list}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        {shown.map((p) => (
          <ProjectCard key={p.slug} p={p} className="w-[85vw] shrink-0 snap-start sm:w-[420px]" />
        ))}
      </div>

      {projects.length > MAX && (
        <div className="mx-auto mt-6 max-w-6xl px-6">
          <Link
            href="/projects"
            className="inline-block rounded-full border border-line bg-card px-6 py-3 font-sans text-[15px] font-medium text-ink transition-colors hover:bg-bg"
          >
            See all ({projects.length})
          </Link>
        </div>
      )}
    </section>
  );
}