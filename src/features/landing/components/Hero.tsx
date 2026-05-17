"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const HEADING_LINES = ["Graba tu historia", "en una botella", "Don Ramón."] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY   = useTransform(scrollYProgress, [0, 1],    ["0%", "18%"]);
  const contentO = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], ["0%", "6%"]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh w-full flex-col overflow-hidden bg-[var(--surface-0)]"
    >
      <h1 id="hero-heading" className="sr-only">
        Tequila Don Ramón Personalizado — Botellas grabadas con tu nombre,
        fecha, logo o rostro para bodas, XV años y eventos premium
      </h1>

      <motion.div aria-hidden="true" style={{ y: imageY }} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src="/images/backgrounds/hero-bg.avif"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={88}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--surface-0)] via-[var(--surface-0)]/60 to-[var(--surface-0)]/20" />
      <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-r from-[var(--surface-0)]/70 via-[var(--surface-0)]/15 to-transparent" />

      <motion.div
        style={{ opacity: contentO, y: contentY }}
        className="relative z-20 mx-auto mt-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-10 sm:pb-20 lg:px-16 lg:pb-28"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-6 flex items-center gap-3 sm:mb-8"
        >
          <div aria-hidden="true" className="h-px w-8 shrink-0 bg-[var(--gold)] sm:w-10" />
          <p className="text-[9px] font-medium uppercase tracking-[0.45em] text-[var(--gold)] sm:text-[10px] sm:tracking-[0.55em]">
            Personalización artesanal · Corte diamante
          </p>
        </motion.div>

        <div aria-hidden="true" className="mb-6 sm:mb-8">
          {HEADING_LINES.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.18 + i * 0.12, ease }}
                className={[
                  "text-[clamp(2rem,6.5vw,7rem)] font-extralight leading-[1.04] tracking-tight",
                  i === 2 ? "text-[var(--gold)]" : "text-white",
                ].join(" ")}
              >
                {line}
              </motion.p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          aria-hidden="true"
          className="mb-6 h-px w-12 bg-[var(--gold)]/70 sm:mb-8"
        />

        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-end md:justify-between">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.58, ease }}
            className="flex flex-col gap-2"
          >
            <p
              style={{ fontFamily: "'Cinzel', serif" }}
              className="text-[10px] font-normal uppercase tracking-[0.35em] text-white/60"
            >
              Una pieza · Un momento · Un recuerdo
            </p>
            <p
              style={{ fontFamily: "'Cinzel', serif" }}
              className="max-w-sm text-[12px] font-normal leading-[1.9] tracking-[0.12em] text-white/80"
            >
              Tu nombre, fecha o mensaje grabado sobre una botella de la marca de tequila más
              reconocida de México.{" "}
              <span className="text-[var(--gold)]/90">- El regalo que nadie olvidará.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.7, ease }}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <a
              href="#personalizacion"
              className="group inline-flex items-center gap-3 border border-[var(--gold)] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)] transition-all duration-300 hover:bg-[var(--gold)] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] sm:px-8"
            >
              ¿Cómo personalizar?
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <a
              href="#catalogos"
              className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/80 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
            >
              Ver catálogo
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-hidden="true"
        className="absolute bottom-6 right-6 z-20 flex flex-col items-center gap-2 sm:bottom-8 sm:right-10 md:right-14"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-[var(--gold)]/80 to-transparent"
        />
        <span className="text-[8px] uppercase tracking-[0.45em] text-white/80">
          Conocer más
        </span>
      </motion.div>
    </section>
  );
}
