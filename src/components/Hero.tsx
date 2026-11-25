"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const title = "Hi, I'm Faril. Website and mobile Dev.";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 1.5 }) // menunggu loader selesai
        .fromTo(
          ".word-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.07 }
        )
        .fromTo(
          ".fade-up",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.12 },
          "-=0.5"
        )
        .fromTo(
          ".hero-img",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          "-=0.9"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="home" className="flex min-h-screen items-center bg-bg px-6 pt-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.05] text-ink">
            {title.split(" ").map((w, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <span className="word-inner inline-block">{w}</span>
                </span>{" "}
              </span>
            ))}
          </h1>

          <p className="fade-up mt-6 max-w-xl font-body text-[17px] text-muted">
            Informatics student focused on Flutter, clean UI/UX, and apps that solve real problems.
          </p>

          <div className="fade-up mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-bg transition-opacity hover:opacity-85"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line bg-card px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-bg-alt"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="hero-img relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-card shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <Image
            src="/profile.jpg"
            alt="Foto profil Faril"
            fill
            priority
            sizes="(min-width: 768px) 384px, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}