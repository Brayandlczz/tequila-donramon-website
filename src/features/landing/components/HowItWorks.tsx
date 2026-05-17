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

interface Color { id: string; label: string; hex: string }

const COLORS: Color[] = [
  { id: "red",    label: "Rojo",     hex: "#C0392B" },
  { id: "blue",   label: "Azul",     hex: "#2471A3" },
  { id: "green",  label: "Verde",    hex: "#1E8449" },
  { id: "orange", label: "Naranja",  hex: "#D35400" },
  { id: "yellow", label: "Amarillo", hex: "#D4AC0D" },
  { id: "purple", label: "Morado",   hex: "#7D3C98" },
  { id: "pink",   label: "Rosa",     hex: "#C0507A" },
  { id: "bronze", label: "Bronce",   hex: "#8B5E3C" },
  { id: "gold",   label: "Dorado",   hex: "#C9A84C" },
  { id: "silver", label: "Plateado", hex: "#909497" },
  { id: "black",  label: "Negro",    hex: "#1C1C1C" },
];

const ZOOM = 5;
const LENS = 240;

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeColor, setActiveColor] = useState<Color>(COLORS[8]);
  const [lens, setLens] = useState<{ x: number; y: number; bg: string } | null>(null);

  const imageSrc = `/images/bottle-colors/${activeColor.id}.webp`;

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLens({ x, y, bg: `${((x / rect.width) * 100).toFixed(2)}% ${((y / rect.height) * 100).toFixed(2)}%` });
  }, []);

  const handleLeave = useCallback(() => setLens(null), []);

  return (
    <section
      id="personalizacion"
      aria-labelledby="hiw-heading"
      className="w-full overflow-hidden bg-[var(--surface-1)]"
    >
      <div className="mx-auto w-full max-w-7xl lg:grid lg:grid-cols-2 lg:min-h-svh">

        <div className="flex flex-col lg:h-full">
          <div
            ref={containerRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            aria-label={`Botella Don Ramón en color ${activeColor.label} — mueve el cursor para ver el detalle`}
            className="group relative flex-1 overflow-hidden h-[65vw] min-h-[300px] max-h-[520px] cursor-crosshair select-none lg:h-full lg:max-h-none"
          >
            <div className="relative h-full w-full translate-y-6">
              <Image
                key={imageSrc}
                src={imageSrc}
                alt={`Botella Don Ramón personalizada en color ${activeColor.label} con grabado artesanal corte diamante`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={92}
                className="object-contain object-center transition-opacity duration-300"
              />
            </div>

            {lens && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute z-30 overflow-hidden rounded-full"
                style={{
                  width:              LENS,
                  height:             LENS,
                  left:               lens.x - LENS / 2,
                  top:                lens.y - LENS / 2,
                  backgroundImage:    `url(${imageSrc})`,
                  backgroundSize:     `${ZOOM * 100}%`,
                  backgroundPosition: lens.bg,
                  backgroundRepeat:   "no-repeat",
                  boxShadow:          "0 0 0 2px rgba(201,168,76,0.6), 0 0 0 4px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="h-px w-4 bg-[var(--gold)]/40" />
                  <div className="absolute h-4 w-px bg-[var(--gold)]/40" />
                </div>
              </div>
            )}

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-[var(--surface-1)] lg:block" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[var(--surface-1)] lg:hidden" />
          </div>

          <div className="flex flex-col items-center gap-3 px-4 py-5 lg:py-7">
            <div role="radiogroup" aria-label="Selecciona un color de grabado" className="flex flex-wrap justify-center gap-3">
              {COLORS.map((color) => {
                const isActive = color.id === activeColor.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    role="radio"
                    onClick={() => setActiveColor(color)}
                    aria-checked={isActive}
                    aria-label={color.label}
                    title={color.label}
                    className={[
                      "relative h-7 w-7 cursor-pointer rounded-full transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-1)]",
                      isActive ? "scale-125" : "scale-100 opacity-60 hover:opacity-90 hover:scale-110",
                    ].join(" ")}
                    style={{ backgroundColor: color.hex }}
                  >
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full"
                        style={{ boxShadow: `0 0 0 2px var(--surface-1), 0 0 0 4px ${color.hex}` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: activeColor.hex }} />
              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/60">{activeColor.label}</p>
            </div>
          </div>
        </div>

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
                  <h3 className="mb-2 text-[15px] font-medium tracking-tight text-white sm:text-[16px]">{title}</h3>
                  <p className="text-justify text-[13px] leading-relaxed text-white/70 sm:text-[14px]">{desc}</p>
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
