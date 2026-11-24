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
      <section id="home" className="flex min-h-screen items-center bg-bg px-6 pt-16">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="font-display text-[clamp(3rem,9vw,5.5rem)] font-bold leading-[1.05] text-ink">
            Faril
          </h1>
          <p className="mt-4 max-w-xl font-body text-[17px] text-muted">
            Informatics student & mobile developer.
          </p>
        </div>
      </section>

      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-16 px-6 py-24 ${s.alt ? "bg-bg-alt" : "bg-bg"}`}
        >
          <div className="mx-auto min-h-[50vh] max-w-6xl">
            <h2 className="font-display text-[clamp(2.25rem,5vw,3rem)] font-bold text-ink">
              {s.title}
            </h2>
            <div className="mt-8 rounded-2xl border border-line bg-card p-6 font-body text-[15px] text-muted">
              Konten {s.title} menyusul.
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}