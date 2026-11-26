import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import { About, Experience, Skills, Contact } from "@/components/InfoSections";
import { getProjects } from "@/lib/notion";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main>
      <Hero />
      <About />
      <Projects projects={projects} />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}