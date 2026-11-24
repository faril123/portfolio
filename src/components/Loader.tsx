"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });
    tl.to(bar.current, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }).to(root.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
    });
    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-50 flex items-center justify-center bg-bg">
      <div className="w-48">
        <p className="mb-3 font-sans text-xs text-muted">Loading</p>
        <div className="h-px w-full bg-line">
          <div
            ref={bar}
            className="h-px bg-ink"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          />
        </div>
      </div>
    </div>
  );
}