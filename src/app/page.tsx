import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import { About, Experience, Skills, Contact } from "@/components/InfoSections";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}