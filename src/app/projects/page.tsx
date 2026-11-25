import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata = { title: "Projects | Faril" };

export default function AllProjects() {
  return (
    <main className="min-h-screen bg-bg-alt px-6 pb-24 pt-28">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="font-sans text-[14px] text-muted hover:text-ink">
          ← Back
        </Link>
        <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,3rem)] font-bold text-ink">
          All Projects
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