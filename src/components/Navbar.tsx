"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { dict } from "@/data/dictionary";
import gsap from "gsap";

const links = [
  { href: "/#about", key: "about" },
  { href: "/#projects", key: "projects" },
  { href: "/#experience", key: "experience" },
  { href: "/#skills", key: "skills" },
  { href: "/#contact", key: "contact" },
] as const;

const sectionIds = ["home", ...links.map((l) => l.key)];

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { lang, setLang } = useLang();
  const t = dict[lang].nav;

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.6 }
    );
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    // Wrapper selebar layar, tidak menangkap klik (pointer-events-none)
    <header
      ref={ref}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 opacity-0"
    >
      {/* Pill glossy terang:
          - gradasi putih -> abu-abu muda (kesan permukaan mengkilap)
          - inset shadow putih 1px di tepi atas (garis highlight)
          - border tipis + bayangan lembut agar terpisah dari background */}
      <div
        className={`pointer-events-auto w-full max-w-4xl rounded-[28px] border border-black/[0.06] bg-linear-to-b from-white to-[#e9e9e9] transition-shadow duration-300 ${
          scrolled
            ? "shadow-[inset_0_1px_0_#fff,0_12px_32px_rgba(0,0,0,0.12)]"
            : "shadow-[inset_0_1px_0_#fff,0_10px_30px_rgba(0,0,0,0.08)]"
        }`}
      >
        <nav
          aria-label="Main"
          className={`flex items-center justify-between pl-5 pr-2 transition-[height] duration-300 ${
            scrolled ? "h-12" : "h-14"
          }`}
        >
          <a href="/#home" className="font-display text-lg font-bold text-ink">
            Faril Portfolio
          </a>

          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={active === l.key ? "true" : undefined}
                    className={`block rounded-full px-3.5 py-1.5 text-[14px] font-medium transition-colors hover:text-ink ${
                      active === l.key ? "bg-black/[0.07] text-ink" : "text-muted"
                    }`}
                  >
                    {t[l.key]}
                  </a>
                </li>
              ))}
            </ul>

            <div
              className="ml-1 flex items-center gap-0.5 rounded-full bg-black/[0.07] p-0.5 text-[12px] font-medium"
              role="group"
              aria-label="Language"
            >
              {(["id", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                    lang === l ? "bg-ink text-bg" : "text-muted hover:text-ink"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              className="rounded-full bg-black/[0.07] px-3.5 py-1.5 text-[13px] font-medium text-ink md:hidden"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? t.close : t.menu}
            </button>
          </div>
        </nav>

        {/* Menu mobile: terbuka di dalam pill yang sama */}
        {open && (
          <ul
            id="mobile-menu"
            className="flex flex-col border-t border-black/[0.06] p-2 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.key ? "true" : undefined}
                  className={`block rounded-2xl px-4 py-3 text-[15px] font-medium ${
                    active === l.key ? "bg-black/[0.07] text-ink" : "text-muted"
                  }`}
                >
                  {t[l.key]}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}