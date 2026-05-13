"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    number: "01",
    title: "Elige tu botella",
    desc: "Elige entre nuestras líneas — Edición Limitada, Swarovski, Platinium, Cerámica y más. Cada una posee carácter, presencia y razón de ser.",
  },
  {
    number: "02",
    title: "Define tu diseño",
    desc: "Compártenos la idea que deseas plasmar o consulta los diseños disponibles. Nuestros artesanos la plasmarán en una pieza única con técnica corte diamante.",
  },
  {
    number: "03",
    title: "Coordina y recibe",
    desc: "Contáctanos vía WhatsApp para acordar los detalles de pago y entrega. Tu botella personalizada llegará lista para el momento que mereces conmemorar.",
  },
] as const;

const ZOOM = 4;
const LENS = 200;

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lens, setLens] = useState<{ x: number; y: number; bg: string } | null>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const bgX = ((x / rect.width)  * 100).toFixed(2);
    const bgY = ((y / rect.height) * 100).toFixed(2);
    setLens({ x, y, bg: `${bgX}% ${bgY}%` });
  }, []);

  const handleLeave = useCallback(() => setLens(null), []);

  return (
    <section
      id="personalizacion"
      aria-labelledby="hiw-heading"
      className="w-full overflow-hidden bg-[var(--surface-1)]"
    >
      <div className="mx-auto w-full max-w-7xl lg:grid lg:grid-cols-2 lg:min-h-svh">

        {/* Imagen con lupa */}
        <div
          ref={containerRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          aria-label="Botella Don Ramón Línea Cerámica — mueve el cursor para ver el detalle del grabado"
          className="group relative flex items-center justify-center overflow-hidden h-[60vw] min-h-[280px] max-h-[480px] cursor-crosshair select-none lg:h-full lg:max-h-none"
        >
          <div className="relative h-full w-full">
            <Image
              src="/images/products/linea-ceramica.webp"
              alt="Botella Don Ramón Línea Cerámica con grabado artesanal corte diamante"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
              className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Lupa */}
          {lens && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-20 rounded-full border border-[var(--gold)]/40 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] overflow-hidden"
              style={{
                width:  LENS,
                height: LENS,
                left:   lens.x - LENS / 2,
                top:    lens.y - LENS / 2,
                backgroundImage:    `url(${"/images/products/linea-ceramica.webp"})`,
                backgroundSize:     `${ZOOM * 100}%`,
                backgroundPosition: lens.bg,
                backgroundRepeat:   "no-repeat",
              }}
            />
          )}

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-[var(--surface-1)] lg:block" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[var(--surface-1)] lg:hidden" />
        </div>

        {/* Texto */}
        <div className="flex flex-col justify-center px-5 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-24">
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
            className="mb-5 flex items-center gap-3"
          >
            <div aria-hidden="true" className="h-px w-8 shrink-0 bg-[var(--gold)] sm:w-10" />
            <p className="text-[9px] font-medium uppercase tracking-[0.45em] text-[var(--gold)] sm:text-[10px] sm:tracking-[0.55em]">
              El proceso
            </p>
          </motion.div>

          <motion.h2
            id="hiw-heading"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
            className="mb-10 text-[clamp(1.75rem,4.5vw,3.8rem)] font-extralight leading-[1.06] tracking-tight text-white sm:mb-12"
          >
            Cada botella,
            <br />
            <em className="not-italic text-[var(--gold)]">una pieza única.</em>
          </motion.h2>

          <ol aria-label="Pasos del proceso de personalización Don Ramón" className="flex flex-col">
            {STEPS.map(({ number, title, desc }, i) => (
              <motion.li
                key={number}
                initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.25 + i * 0.13, ease: EASE }}
                className="group relative flex gap-5 pb-7 last:pb-0 sm:pb-9"
              >
                {i < STEPS.length - 1 && (
                  <div aria-hidden="true" className="absolute left-[17px] top-9 h-full w-px bg-white/[0.07]" />
                )}
                <div
                  aria-hidden="true"
                  className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--gold)]/25 bg-[var(--surface-1)] transition-colors duration-300 group-hover:border-[var(--gold)]/60"
                >
                  <span className="font-mono text-[10px] tracking-widest text-[var(--gold)]/55 transition-colors duration-300 group-hover:text-[var(--gold)]">
                    {number}
                  </span>
                </div>
                <div className="pt-1">
                  <h3 className="mb-2 text-[15px] font-medium tracking-tight text-white sm:text-[16px]">
                    {title}
                  </h3>
                  <p className="text-justify text-[13px] leading-relaxed text-white/70 sm:text-[14px]">
                    {desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          <motion.div
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
            className="mt-10 sm:mt-12"
          >
            <a
              href="#catalogos"
              aria-label="Conoce los catálogos de personalización Don Ramón"
              className="group inline-flex items-center gap-3 border border-[var(--gold)]/55 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)] transition-all duration-300 hover:bg-[var(--gold)] hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)] sm:px-8"
            >
              Conoce nuestro catálogo
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
