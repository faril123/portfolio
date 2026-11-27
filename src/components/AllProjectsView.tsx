"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { useLang } from "@/lib/i18n";
import { dict } from "@/data/dictionary";

export default function AllProjectsView({ projects }: { projects: Project[] }) {
  const { lang } = useLang();
  const t = dict[lang].projects;

  return (
    <main className="min-h-screen bg-bg-alt px-6 pb-24 pt-28">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="font-sans text-[14px] text-muted hover:text-ink">
          ← {t.back}
        </Link>
        <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,3rem)] font-bold text-ink">
          {t.allProjects}
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </main>
  );
}