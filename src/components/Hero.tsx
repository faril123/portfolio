"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import { useLang } from "@/lib/i18n";
import { dict } from "@/data/dictionary";

const PROFILE_SRC = "/profile.jpg"; 
const PHOTO_STYLE: "framed" | "cutout" = "framed";
const CV_HREF = "/cv.pdf";
const EMAIL = "farilrahman27@email.com";
const GITHUB = "https://github.com/username";
const LINKEDIN = "https://www.linkedin.com/in/username";

const cards = [
  { label: "Flutter Developer", image: "/mockups/github-banner.png", variant: 0, pos: "left-[34%] top-[0%]" },
  { label: "Laravel Developer", image: "/mockups/fashionstore-ecommerce.png", variant: 1, pos: "left-[0%] top-[34%]" },
  { label: "UI/UX Design", image: "/mockups/angkringanku-showcase.png", variant: 2, pos: "left-[30%] top-[68%]" },
] as const;

/* ---------- Pengaturan animasi latar ---------- */
const SPEED = 0.68; 
const PARALLAX = true; 

/* ---------- Partikel latar ---------- */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(11);
const PARTICLE_COUNT = 50; 
const particleColors = ["bg-white", "bg-slate-300", "bg-sky-300", "bg-blue-200"];
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  // Setengah titik disebar di pinggir layar (area di luar card), sisanya acak
  const band = i % 4;
  let left = rnd() * 100;
  let top = rnd() * 100;
  if (i % 2 === 0) {
    if (band === 0) top = rnd() * 16; // pita atas
    if (band === 1) top = 84 + rnd() * 16; // pita bawah
    if (band === 2) left = rnd() * 9; // pita kiri
    if (band === 3) left = 91 + rnd() * 9; // pita kanan
  }
  return {
    left: +left.toFixed(2),
    top: +top.toFixed(2),
    size: +(2 + rnd() * 4).toFixed(1),
    opacity: +(0.2 + rnd() * 0.35).toFixed(2),
    color: particleColors[i % particleColors.length],
  };
});

// Glass bubble transparan (5 buah)
const bubbles = [
  { left: "3%", top: "16%", size: 96 },
  { left: "91%", top: "10%", size: 64 },
  { left: "5%", top: "70%", size: 124 },
  { left: "92%", top: "64%", size: 84 },
  { left: "54%", top: "92%", size: 72 },
] as const;

// Mesh gradient: Midnight Blue + Slate + Charcoal
const MESH_BG =
  "radial-gradient(at 12% 18%, #1b2f6b 0px, transparent 50%)," +
  "radial-gradient(at 88% 12%, #3b4a63 0px, transparent 50%)," +
  "radial-gradient(at 80% 88%, #1a2f66 0px, transparent 50%)," +
  "radial-gradient(at 8% 85%, #2b3442 0px, transparent 50%)," +
  "radial-gradient(at 50% 50%, #1d2740 0px, transparent 60%)";

/* ---------- Nama: fade in + slide up per kata, dua nada ---------- */
function Name({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="name-word mr-[0.25em] inline-block text-ink last:mr-0"
        >
          {w}
        </span>
      ))}
    </>
  );
}

/* ---------- Efek mesin ketik untuk teks profesi ---------- */
function Typewriter({ text, active }: { text: string; active: boolean }) {
  const [n, setN] = useState(0);
  const firstRun = useRef(true);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(text.length);
      return;
    }
    setN(0);
    let i = 0;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setN(i);
      if (i < text.length) id = setTimeout(tick, 65);
    };
    id = setTimeout(tick, firstRun.current ? 3000 : 200);
    firstRun.current = false;
    return () => clearTimeout(id);
  }, [text, active]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative inline-block">
        {/* Teks penuh tak terlihat: menjaga lebar agar layout tidak bergeser */}
        <span className="invisible whitespace-nowrap">{text}</span>
        <span className="absolute left-0 top-0 whitespace-nowrap">
          {text.slice(0, n)}
          {n > 0 && (
            <span className="ml-0.5 inline-block h-[1em] w-px translate-y-[0.15em] bg-ink motion-safe:animate-pulse" />
          )}
        </span>
      </span>
    </>
  );
}

/* ---------- Placeholder mockup (dipakai kalau belum ada gambar) ---------- */
function Placeholder({ variant }: { variant: number }) {
  if (variant === 0) {
    return (
      <div className="flex h-full flex-col gap-1.5 p-3">
        <span className="h-1.5 w-1/2 rounded-full bg-black/10" />
        <span className="h-1.5 w-4/5 rounded-full bg-black/[0.07]" />
        <span className="mt-auto h-4 w-2/5 rounded-md bg-black/15" />
      </div>
    );
  }
  if (variant === 1) {
    return (
      <div className="flex h-full gap-1.5 p-3">
        <span className="w-1/4 rounded-md bg-black/10" />
        <span className="flex-1 rounded-md bg-black/[0.07]" />
      </div>
    );
  }
  return (
    <div className="grid h-full grid-cols-2 gap-1.5 p-3">
      <span className="rounded-md bg-black/10" />
      <span className="rounded-md bg-black/[0.07]" />
      <span className="rounded-md bg-black/[0.07]" />
      <span className="rounded-md bg-black/10" />
    </div>
  );
}

function MockupCard({
  label,
  image,
  variant,
}: {
  label: string;
  image: string;
  variant: number;
}) {
  return (
    <div className="mock-card group w-full">
    <div className="rounded-xl border-2 border-[#2f343b]/70 bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.07)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-card">
          {image ? (
            <Image
              src={image}
              alt={label}
              fill
              sizes="160px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Placeholder variant={variant} />
          )}
        </div>
      </div>
      <p className="mx-auto mt-2 w-fit rounded-lg border border-line bg-white px-3 py-1.5 text-[12px] font-medium text-ink shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        {label}
      </p>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { lang, ready } = useLang();
  const t = dict[lang].hero;

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let removeParallax = () => {};

    const ctx = gsap.context(() => {
      /* ================= Animasi masuk ================= */
      gsap.fromTo(
        ".corner-bracket",
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 1.5,
        }
      );

      gsap
        .timeline({ delay: 1.5 })
        .fromTo(
          ".status-badge",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        )
        .fromTo(
          ".name-word",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.14 },
          "-=0.4"
        )
        .fromTo(
          ".role-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".fade-up",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.12 },
          "-=0.5"
        )
        .fromTo(
          ".mock-card",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out", stagger: 0.15 },
          "-=0.9"
        )
        .fromTo(
          ".hero-img",
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          "-=1.2"
        );

      /* ================= Animasi latar ================= */
      // Arah, durasi, dan jenis easing diacak per elemen; titik awal siklus
      // juga diacak supaya tidak ada elemen yang bergerak serempak.
      const sign = () => (Math.random() < 0.5 ? -1 : 1);
      const dur = (a: number, b: number) => gsap.utils.random(a, b) * SPEED;
      const eases = ["sine.inOut", "power1.inOut", "power2.inOut"];
      const loop = () => ({
        ease: gsap.utils.random(eases) as string,
        yoyo: true,
        repeat: -1,
      });
      const desync = (tw: gsap.core.Tween) => {
        tw.progress(gsap.utils.random(0, 1));
      };

      // Orb besar: mengambang diagonal (arah acak)
      gsap.utils.toArray<HTMLElement>(".orb-lg").forEach((el) => {
        desync(
          gsap.to(el, {
            x: sign() * gsap.utils.random(70, 120),
            y: sign() * gsap.utils.random(50, 90),
            scale: gsap.utils.random(0.95, 1.15),
            duration: dur(12, 18),
            ...loop(),
          })
        );
      });

      // Orb kecil: naik turun
      gsap.utils.toArray<HTMLElement>(".orb-sm").forEach((el) => {
        desync(
          gsap.to(el, {
            y: sign() * gsap.utils.random(35, 60),
            x: sign() * gsap.utils.random(5, 20),
            duration: dur(8, 12),
            ...loop(),
          })
        );
      });

      // Partikel: drift ke berbagai arah + kedip opacity
      gsap.utils.toArray<HTMLElement>(".particle").forEach((el) => {
        desync(
          gsap.to(el, {
            x: sign() * gsap.utils.random(30, 90),
            y: sign() * gsap.utils.random(30, 90),
            duration: dur(10, 20),
            ...loop(),
          })
        );
        desync(
          gsap.to(el, {
            opacity: gsap.utils.random(0.08, 0.6),
            duration: dur(4, 8),
            ...loop(),
          })
        );
      });

      // Glass bubble: floating + rotate
      gsap.utils.toArray<HTMLElement>(".bubble").forEach((el) => {
        desync(
          gsap.to(el, {
            x: sign() * gsap.utils.random(15, 30),
            y: sign() * gsap.utils.random(25, 45),
            rotation: sign() * gsap.utils.random(90, 180),
            duration: dur(15, 20),
            ...loop(),
          })
        );
      });

      // Glow pulse di belakang hero card
      desync(
        gsap.to(".halo", {
          opacity: 0.95,
          scale: 1.04,
          duration: gsap.utils.random(3.2, 4.4),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      );

      /* ================= Parallax mengikuti mouse ================= */
      const section = root.current;
      if (
        PARALLAX &&
        section &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        // depth: latar bergerak berlawanan arah kursor, card sedikit searah
        const layers = [
          { sel: ".parallax-orbs", depth: 25 },
          { sel: ".parallax-particles", depth: 40 },
          { sel: ".parallax-bubbles", depth: 60 },
          { sel: ".parallax-card", depth: -6 },
        ]
          .map(({ sel, depth }) => {
            const el = section.querySelector<HTMLElement>(sel);
            if (!el) return null;
            const opts = { duration: 0.9, ease: "power3.out" };
            return {
              depth,
              x: gsap.quickTo(el, "x", opts),
              y: gsap.quickTo(el, "y", opts),
            };
          })
          .filter((l): l is NonNullable<typeof l> => l !== null);

        const onMove = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
          const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
          layers.forEach((l) => {
            l.x(-nx * l.depth);
            l.y(-ny * l.depth);
          });
        };
        const onLeave = () => {
          layers.forEach((l) => {
            l.x(0);
            l.y(0);
          });
        };
        section.addEventListener("pointermove", onMove);
        section.addEventListener("pointerleave", onLeave);
        removeParallax = () => {
          section.removeEventListener("pointermove", onMove);
          section.removeEventListener("pointerleave", onLeave);
        };
      }

      /* ================= Kartu project melayang ================= */
      if (window.matchMedia("(hover: hover) and (min-width: 1024px)").matches) {
        gsap.utils.toArray<HTMLElement>(".card-float").forEach((el) => {
          gsap.to(el, {
            y: gsap.utils.random(8, 14),
            duration: gsap.utils.random(3.5, 5.5),
            delay: gsap.utils.random(0, 1.5),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      }
    }, root);

    return () => {
      removeParallax();
      ctx.revert();
    };
  }, [ready]);

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 sm:px-8 lg:px-12"
      style={{ backgroundColor: "#0A1020", backgroundImage: MESH_BG }}
    >
      {/* ===== Latar: Midnight Blue + Slate + Charcoal (di luar card) ===== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* Orb (6): 2 besar melayang diagonal, 4 kecil naik turun */}
        <div className="parallax-orbs absolute inset-0">
          <div className="orb-lg absolute -left-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-linear-to-br from-blue-700/40 to-indigo-900/30 blur-3xl" />
          <div className="orb-lg absolute -bottom-40 -right-32 h-[38rem] w-[38rem] rounded-full bg-linear-to-br from-slate-500/35 to-slate-700/30 blur-3xl" />
          <div className="orb-sm absolute right-[12%] top-[6%] h-56 w-56 rounded-full bg-linear-to-br from-blue-500/35 to-sky-700/25 blur-2xl" />
          <div className="orb-sm absolute bottom-[10%] left-[8%] h-48 w-48 rounded-full bg-linear-to-br from-slate-400/30 to-slate-600/25 blur-2xl" />
          <div className="orb-sm absolute left-[38%] -top-12 h-40 w-40 rounded-full bg-linear-to-br from-zinc-500/30 to-neutral-700/30 blur-2xl" />
          <div className="orb-sm absolute bottom-[26%] right-[3%] h-44 w-44 rounded-full bg-linear-to-br from-indigo-500/35 to-blue-800/25 blur-2xl" />
        </div>

        {/* Glass bubble (5) */}
        <div className="parallax-bubbles absolute inset-0">
          {bubbles.map((b, i) => (
            <span
              key={i}
              className="bubble absolute rounded-full border border-white/25 shadow-[inset_0_0_24px_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm"
              style={{
                left: b.left,
                top: b.top,
                width: b.size,
                height: b.size,
                background:
                  "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.03) 70%)",
              }}
            />
          ))}
        </div>

        {/* Titik-titik kecil (50) */}
        <div className="parallax-particles absolute inset-0">
          {particles.map((p, i) => (
            <span
              key={i}
              className={`particle absolute rounded-full ${p.color}`}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>
      </div>

      {/* ===== Seluruh hero dibungkus satu card putih bersih ===== */}
      <div className="parallax-card relative z-10 mx-auto w-full max-w-7xl">
        {/* Glow pulse di belakang card */}
        <div
          aria-hidden="true"
          className="halo pointer-events-none absolute -inset-4 -z-10 rounded-[44px] bg-linear-to-r from-sky-400/50 via-blue-500/40 to-slate-300/50 blur-3xl"
          style={{ opacity: 0.5 }}
        />

      <div className="relative overflow-hidden rounded-[30px] border border-white/20 bg-white px-6 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.4)] outline outline-1 outline-offset-8 outline-white/30 md:px-10 md:py-12 lg:px-14 lg:py-14">          {/* Corner brackets charcoal di empat sudut */}
          <span
            aria-hidden="true"
            className="corner-bracket pointer-events-none absolute left-4 top-4 h-6 w-6 origin-top-left rounded-tl-lg border-l-2 border-t-2 border-[#2f343b]"
          />
          <span
            aria-hidden="true"
            className="corner-bracket pointer-events-none absolute right-4 top-4 h-6 w-6 origin-top-right rounded-tr-lg border-r-2 border-t-2 border-[#2f343b]"
          />
          <span
            aria-hidden="true"
            className="corner-bracket pointer-events-none absolute bottom-4 left-4 h-6 w-6 origin-bottom-left rounded-bl-lg border-b-2 border-l-2 border-[#2f343b]"
          />
          <span
            aria-hidden="true"
            className="corner-bracket pointer-events-none absolute bottom-4 right-4 h-6 w-6 origin-bottom-right rounded-br-lg border-b-2 border-r-2 border-[#2f343b]"
          />

          {/* Konten */}
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.5fr_0.8fr_300px] lg:gap-6">
            {/* Teks */}
            <div className="order-2 lg:order-1">
              <span className="status-badge inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[12.5px] text-ink shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-500/60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                {t.status}
              </span>

              <h1 className="mt-5 whitespace-nowrap font-display text-[clamp(2.25rem,4vw,3.9rem)] font-bold leading-[1.02] tracking-tight">
                <Name text={t.name} />
              </h1>

              {/* Peran: garis + mesin ketik */}
              <div className="mt-5 flex items-center gap-3">
                <span className="role-line h-px w-9 origin-left bg-ink" />
                <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-ink">
                  <Typewriter text={t.role} active={ready} />
                </p>
              </div>

              <p className="fade-up mt-5 max-w-md font-body text-[16px] leading-relaxed text-muted">
                {t.subtitle}
              </p>

              {/* Tombol: hover lift + shadow */}
              <div className="fade-up mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-bg shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(0,0,0,0.22)] active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  {t.ctaProjects}
                </a>
                <a
                  href={CV_HREF}
                  download
                  className="rounded-full border border-line bg-card px-6 py-3 text-[15px] font-medium text-ink transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_24px_rgba(0,0,0,0.10)] active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  {t.ctaCv}
                </a>
              </div>

              {/* Sosial: scale saat hover */}
              <div className="fade-up mt-8 flex flex-wrap items-center gap-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="rounded-full border border-line bg-white px-4 py-2 text-[13px] text-ink shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.10)] motion-reduce:transform-none"
                >
                  {EMAIL}
                </a>
                {[
                  { href: `mailto:${EMAIL}`, label: "Email", Icon: FaEnvelope },
                  { href: GITHUB, label: "GitHub", Icon: FaGithub },
                  { href: LINKEDIN, label: "LinkedIn", Icon: FaLinkedinIn },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition-all duration-300 hover:scale-125 hover:bg-ink hover:text-bg hover:shadow-[0_8px_18px_rgba(0,0,0,0.18)] active:scale-95 motion-reduce:transform-none"
                  >
                    <Icon size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Kartu mockup: melayang di desktop (tengah) */}
            <div
              className="relative order-3 hidden h-[440px] lg:order-2 lg:block"
              role="list"
              aria-label={t.toolsLabel}
            >
              {cards.map((c) => (
                <div
                  key={c.label}
                  role="listitem"
                  className={`card-float absolute w-[150px] ${c.pos}`}
                >
                  <MockupCard label={c.label} image={c.image} variant={c.variant} />
                </div>
              ))}
            </div>

            {/* Foto (kanan di desktop, paling atas di HP) */}
            {PHOTO_STYLE === "cutout" ? (
              <div className="hero-img relative order-1 mx-auto aspect-[4/5] w-full max-w-[300px] lg:order-3">
                <div className="absolute left-1/2 top-[8%] aspect-square w-[92%] -translate-x-1/2 rounded-full bg-card" />
                <Image
                  src={PROFILE_SRC}
                  alt="Foto profil Faril"
                  fill
                  priority
                  sizes="(min-width: 1024px) 300px, 80vw"
                  className="object-contain object-bottom"
                />
              </div>
            ) : (
              <div className="hero-img relative order-1 mx-auto aspect-[4/5] w-full max-w-[300px] 
              overflow-hidden rounded-3xl border border-line bg-card shadow-[0_16px_40px_rgba(0,0,0,0.12)] 
              outline outline-2 outline-offset-8 outline-[#2f343b]/40 transition-[outline-offset] 
              duration-300 hover:outline-offset-4 lg:order-3">                <Image
                  src={PROFILE_SRC}
                  alt="Foto profil Faril"
                  fill
                  priority
                  sizes="(min-width: 1024px) 300px, 80vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* Kartu mockup: tiga kolom di HP/tablet */}
            <div
              className="order-3 grid grid-cols-3 gap-3 lg:hidden"
              role="list"
              aria-label={t.toolsLabel}
            >
              {cards.map((c) => (
                <div key={c.label} role="listitem">
                  <MockupCard label={c.label} image={c.image} variant={c.variant} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}