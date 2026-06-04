"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Occasion {
  id: string;
  label: string;
  icon: string;
  heading: string;
  desc: string;
  tags: readonly [string, string, string, string];
}

const EASE = [0.22, 1, 0.36, 1] as const;

const OCCASIONS: Occasion[] = [
  {
    id: "bodas",
    label: "Bodas",
    icon: "/images/occasions/wedding-rings.webp",
    heading: "El regalo que los invitados guardan para siempre.",
    desc: "Una pieza creada para celebrar el inicio de una historia llena de amor. Algo verdaderamente memorable — ideal para bodas, ceremonias y momentos que merecen permanecer.",
    tags: [
      "Nombre de los novios",
      "Fecha de la boda",
      "Diseño exclusivo",
      "Sin mínimo de piezas",
    ],
  },
  {
    id: "xv",
    label: "XV Años",
    icon: "/images/occasions/quinceanera-crown.webp",
    heading: "Un rito de paso que acompaña una etapa.",
    desc: "Un recuerdo pensado para conmemorar una noche irrepetible. Un momento imposible de repetir — ideal para XV años, celebraciones familiares y momentos que marcan una etapa.",
    tags: [
      "Nombre personalizado",
      "Fecha del evento",
      "Diseño a medida",
      "Ediciones limitadas",
    ],
  },
  {
    id: "corporativo",
    label: "Corporativo",
    icon: "/images/occasions/corporate-briefcase.webp",
    heading: "El detalle que representa más que una marca.",
    desc: "Una forma elegante de reconocer relaciones, logros y momentos importantes. Un gesto que trasciende lo convencional — ideal para cierres, lanzamientos y reconocimientos empresariales.",
    tags: [
      "Logo e identidad",
      "Mensaje institucional",
      "Volúmenes empresariales",
      "Entrega a tiempo",
    ],
  },
  {
    id: "graduaciones",
    label: "Graduaciones",
    icon: "/images/occasions/graduation-caps.webp",
    heading: "El primer gran logro que merece quedarse para siempre.",
    desc: "Una forma de conmemorar el cierre de una etapa inolvidable. Algo pensado para celebrarse con orgullo — ideal para graduaciones, generaciones y logros que marcan el futuro.",
    tags: [
      "Nombre y generación",
      "Institución educativa",
      "Grupos y generaciones",
      "Regalo grupal",
    ],
  },
  {
    id: "aniversarios",
    label: "Aniversarios",
    icon: "/images/occasions/anniversary-badge.webp",
    heading: "Hay historias que merecen volver a celebrarse.",
    desc: "Una pieza creada para honrar historias compartidas y momentos significativos. Algo verdaderamente atemporal — ideal para aniversarios y recuerdos que siguen teniendo valor con los años.",
    tags: [
      "Nombres y fechas",
      "Mensaje especial",
      "Cualquier aniversario",
      "Edición única",
    ],
  },
  {
    id: "temporadas",
    label: "Temporadas",
    icon: "/images/occasions/christmas-ornament.webp",
    heading: "Navidad, Valentine's Day, Fiestas Patrias — cada fecha, una botella.",
    desc: "Un detalle creado para acompañar las celebraciones más especiales del año. Una forma especial de compartir y convertirse en tradición — ideal para temporadas y momentos memorables.",
    tags: ["Navidad", "Fiestas Patrias", "Día de Muertos", "San Valentín"],
  },
];

const STATS = [
  {
    value: "+50",
    label: "Diseños personalizables",
    aria: "Más de 50 diseños exclusivos",
  },
  {
    value: "8",
    label: "Líneas de producto disponibles.",
    aria: "8",
  },
  {
    value: "∞",
    label: "El momento perdura para siempre.",
    aria: "Infinito",
  },
] as const;

const panelVariants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.22 } },
};

export default function Occasions() {
  const [active, setActive] = useState(OCCASIONS[0].id);
  const current = OCCASIONS.find((o) => o.id === active) ?? OCCASIONS[0];

  return (
    <section
      id="ocassions"
      aria-labelledby="occ-heading"
      className="flex min-h-svh flex-col items-center justify-center bg-white py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-16">

        {/* ── Header ── */}
        <div className="mb-12 flex flex-col items-center gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mb-4 flex items-center justify-center gap-3 lg:justify-start"
            >
              <div
                aria-hidden="true"
                className="h-px w-8 shrink-0 bg-gold sm:w-10"
              />
              <p className="text-[9px] font-medium uppercase tracking-[0.45em] text-gold sm:text-[10px] sm:tracking-[0.55em]">
                Para cada momento
              </p>
            </motion.div>

            <motion.h2
              id="occ-heading"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
              className="text-center text-[clamp(1.9rem,4.4vw,3.6rem)] font-bold leading-[1.04] tracking-tight text-neutral-900 lg:text-left"
            >
              Cada ocasión merece
              <br />
              <em className="not-italic text-gold">
                su propia botella.
              </em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="hidden max-w-sm text-[14px] leading-[1.8] text-neutral-700 lg:block lg:text-right"
          >
            Desde un bautizo, cumpleaños o hasta un lanzamiento corporativo —
            personalizamos cada botella para que cuente la historia correcta.
          </motion.p>
        </div>

        {/* ── Tabs ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          role="tablist"
          aria-label="Selecciona una ocasión"
          className="mb-10 flex flex-wrap justify-center gap-2 lg:justify-start"
        >
          {OCCASIONS.map(({ id, label, icon }) => {
            const isActive = active === id;

            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${id}`}
                id={`tab-${id}`}
                onClick={() => setActive(id)}
                className={[
                  "inline-flex items-center gap-2 border px-3.5 py-2.5 sm:px-4",
                  "text-[10px] font-medium uppercase tracking-[0.22em] sm:text-[11px]",
                  "cursor-pointer transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold",
                  isActive
                    ? "border-gold bg-(--gold)/8 text-neutral-900"
                    : "border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900",
                ].join(" ")}
              >
                <Image
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  width={18}
                  height={18}
                  className={[
                    "shrink-0 transition-all duration-300",
                    isActive ? "opacity-90" : "opacity-60",
                  ].join(" ")}
                />
                {label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Panel ── */}
        <div
          id={`panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="border-t border-neutral-200 pt-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-24"
            >
              {/* Texto izquierdo */}
              <div>
                <h3 className="mb-5 max-w-xl text-center text-[clamp(1.45rem,3vw,2.35rem)] font-extralight leading-[1.12] tracking-tight text-neutral-900 lg:text-left">
                  {current.heading}
                </h3>

                <p className="max-w-2xl text-center text-[14px] leading-[1.85] text-neutral-600 lg:text-left">
                  {current.desc}
                </p>
              </div>

              {/* Tags + CTA derecho */}
              <div className="flex flex-col items-center justify-center lg:items-start">
                <p className="mb-5 text-center text-[9px] font-medium uppercase tracking-[0.45em] text-neutral-800 lg:text-left">
                  Incluye:
                </p>

                <ul
                  aria-label={`Características para ${current.label}`}
                  className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8 [&>li]:justify-center lg:[&>li]:justify-start"
                  role="list"
                >
                  {current.tags.map((tag) => (
                    <li
                      key={tag}
                      className="flex items-center gap-3 text-[14px] leading-relaxed text-neutral-800"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-4 shrink-0 bg-gold"
                      />
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                    aria-label={`Cotizar botella personalizada para ${current.label}`}
                    className="
                    mx-auto mt-10 inline-flex min-h-12 w-fit items-center gap-3
                    border border-neutral-800
                    bg-white
                    px-6 py-3
                    text-[11px] font-medium uppercase tracking-[0.28em]
                    text-neutral-800
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:bg-neutral-50
                    hover:shadow-md
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-neutral-800
                    focus-visible:ring-offset-2
                    lg:mx-0"            >
                    Cotizar para {current.label.toLowerCase()}
                    <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Stats ── */}
        <motion.dl
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-14 grid grid-cols-3 gap-px border-t border-neutral-200 pt-8 text-center"
        >
          {STATS.map(({ value, label, aria }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <dt className="sr-only">{label}</dt>

              <dd
                aria-label={aria}
                className="text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-none text-gold"
              >
                {value}
              </dd>

              <p
                aria-hidden="true"
                className="text-[11px] leading-snug text-neutral-900 sm:text-[13px]"
              >
                {label}
              </p>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}