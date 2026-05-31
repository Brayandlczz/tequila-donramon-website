"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const PRODUCTS = [
  { img: "/images/gallery/bottle-01.webp" },
  { img: "/images/gallery/bottle-02.webp" },
  { img: "/images/gallery/bottle-03.webp" },
  { img: "/images/gallery/bottle-04.webp" },
];

function ProductCard() {
  const [cur, setCur] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setCur((p) => (p + 1) % PRODUCTS.length);
    }, 3600);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 55 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
      className="relative w-97.5 overflow-hidden rounded-[28px] bg-[#f8f1e6]/80 shadow-[0_30px_90px_rgba(0,0,0,.55)] backdrop-blur-md xl:w-112.5"
    >
      <div className="relative aspect-[4/4.9] w-full bg-[#eadfce]">
        {PRODUCTS.map((p, i) => (
          <div
            key={p.img}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === cur ? 1 : 0 }}
          >
            <Image
              src={p.img}
              alt=""
              fill
              sizes="340px"
              className="object-cover"
            />
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ver imagen ${i + 1}`}
              onClick={() => setCur(i)}
              className="h-0.75 rounded-full transition-all"
              style={{
                width: i === cur ? 36 : 16,
                background: i === cur ? "#fff" : "rgba(255,255,255,.45)",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="relative min-h-svh w-full overflow-hidden">

      {/* Background con parallax */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-0 z-0 scale-[1.04]"
      >
        <Image
          src="/images/backgrounds/hero-bg.avif"
          alt=""
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Scrims */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,.58)_0%,rgba(0,0,0,.35)_40%,rgba(0,0,0,.08)_70%,rgba(0,0,0,.08)_100%)]" />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(0,0,0,.45)_0%,rgba(0,0,0,.12)_50%,rgba(0,0,0,.0)_100%)]" />

      {/* Content */}
      <div className="relative z-20 flex min-h-svh items-center justify-center gap-20 px-8 pt-24 lg:px-16">

        {/* ── Texto ── */}
        <div className="max-w-3xl flex-1 text-left">

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="mb-8 inline-flex rounded-full border border-white/30 bg-white/10 px-6 py-3 font-extralight text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md"
          >
            +50 diseños disponibles
          </motion.div>

          <p className="mb-6 flex items-center gap-4 font-bold text-[10px] uppercase tracking-[0.4em] text-white">
            <span className="h-px w-10 bg-white" />
            Personalización artesanal · Corte diamante
          </p>

          {/* Headline */}
          <div className="mb-8">
            {["Graba tu historia", "en una botella", "Don Ramón."].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.span
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: EASE }}
                  className="block text-[clamp(3rem,5.5vw,6.5rem)] font-black leading-[.88] tracking-[-0.02em] text-white"
                  style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    textShadow: "0 2px 8px rgba(0,0,0,.6), 0 12px 40px rgba(0,0,0,.45)",
                    fontStretch: "condensed",
                  }}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
            className="flex flex-col gap-5 sm:flex-row sm:items-center"
          >
            <a
              href="#personalizacion"
              className="group relative inline-flex w-fit items-center gap-4 overflow-hidden border border-white/50 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition-all duration-300 hover:border-white hover:text-black"
            >
              {/* Fill on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
              />
              <span className="relative">Ver catálogo</span>
              <span
                aria-hidden="true"
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>

            <p className="max-w-xs text-[13px] leading-[1.75] text-white font-bold">
              Tu nombre, fecha o diseño grabado sobre una botella Don Ramón.{" "}
              <span className="font-medium text-white">
                El regalo que nadie olvidará.
              </span>
            </p>
          </motion.div>

        </div>

        {/* ── Card carrusel ── */}
        <div className="hidden lg:block">
          <ProductCard />
        </div>

      </div>

      {/* Línea vertical decorativa */}
      <div className="absolute bottom-0 right-9 z-30 hidden h-28 w-px bg-linear-to-b from-white/40 to-transparent lg:block" />

    </section>
  );
}