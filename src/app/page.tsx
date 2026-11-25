import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

const sections = [
  { id: "about", title: "About", alt: false },
  { id: "projects", title: "Projects", alt: true },
  { id: "experience", title: "Experience", alt: false },
  { id: "skills", title: "Skills", alt: true },
  { id: "contact", title: "Contact", alt: false },
];

export default function Home() {
  return (
    <main>
      <Hero />

      {sections.map((s) =>
  s.id === "projects" ? (
    <Projects key={s.id} />
  ) : (
    <section
      key={s.id}
      id={s.id}
      className={`scroll-mt-16 px-6 py-24 ${s.alt ? "bg-bg-alt" : "bg-bg"}`}
    >
      <div className="mx-auto min-h-[50vh] max-w-6xl">
        <h2 className="font-display text-[clamp(2.25rem,5vw,3rem)] font-bold text-ink">{s.title}</h2>
        <div className="mt-8 rounded-2xl border border-line bg-card p-6 font-body text-[15px] text-muted">
          Konten {s.title} menyusul.
        </div>
      </div>
    </section>
  )
)}
    </main>
  );
}