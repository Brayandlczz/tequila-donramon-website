"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Occasion {
  id:      string;
  label:   string;
  icon:    string;
  heading: string;
  desc:    string;
  tags:    readonly [string, string, string, string];
}

const EASE = [0.22, 1, 0.36, 1] as const;

const OCCASIONS: Occasion[] = [
  {
    id:      "bodas",
    label:   "Bodas",
    icon:    "/images/occasions/wedding-rings.webp",
    heading: "El regalo que los invitados guardan para siempre.",
    desc:    "Una pieza creada para celebrar el inicio de una historia llena de amor. Algo verdaderamente memorable — ideal para bodas, ceremonias y momentos que merecen permanecer.",
    tags:    ["Nombre de los novios", "Fecha de la boda", "Diseño exclusivo", "Sin mínimo de piezas"],
  },
  {
    id:      "xv",
    label:   "XV Años",
    icon:    "/images/occasions/quinceanera-crown.webp",
    heading: "Un rito de paso que acompaña una etapa.",
    desc:    "Un recuerdo pensado para conmemorar una noche irrepetible. Un momento imposible de repetir — ideal para XV años, celebraciones familiares y momentos que marcan una etapa.",
    tags:    ["Nombre personalizado", "Fecha del evento", "Diseño a medida", "Ediciones limitadas"],
  },
  {
    id:      "corporativo",
    label:   "Corporativo",
    icon:    "/images/occasions/corporate-briefcase.webp",
    heading: "El detalle que representa más que una marca.",
    desc:    "Una forma elegante de reconocer relaciones, logros y momentos importantes. Un gesto que trasciende lo convencional — ideal para cierres, lanzamientos y reconocimientos empresariales.",
    tags:    ["Logo e identidad", "Mensaje institucional", "Volúmenes empresariales", "Entrega a tiempo"],
  },
  {
    id:      "graduaciones",
    label:   "Graduaciones",
    icon:    "/images/occasions/graduation-caps.webp",
    heading: "El primer gran logro merece quedarse para siempre.",
    desc:    "Una forma de conmemorar el cierre de una etapa inolvidable. Algo pensado para celebrarse con orgullo — ideal para graduaciones, generaciones y logros que marcan el futuro.",
    tags:    ["Nombre y generación", "Institución educativa", "Grupos y generaciones", "Regalo grupal"],
  },
  {
    id:      "aniversarios",
    label:   "Aniversarios",
    icon:    "/images/occasions/anniversary-badge.webp",
    heading: "Hay historias que merecen volver a celebrarse.",
    desc:    "Una pieza creada para honrar historias compartidas y momentos significativos. Algo verdaderamente atemporal — ideal para aniversarios y recuerdos que siguen teniendo valor con los años.",
    tags:    ["Nombres y fechas", "Mensaje especial", "Cualquier aniversario", "Edición única"],
  },
  {
    id:      "temporadas",
    label:   "Temporadas",
    icon:    "/images/occasions/christmas-ornament.webp",
    heading: "Navidad, San Valentín, Fiestas Patrias — cada fecha, una botella.",
    desc:    "Un detalle creado para acompañar las celebraciones más especiales del año. Una forma especial de compartir y convertirse en tradición — ideal para temporadas y momentos memorables.",
    tags:    ["Navidad", "Fiestas Patrias", "Día de Muertos", "San Valentín"],
  },
];

const STATS = [
  { value: "100%", label: "Piezas únicas e irrepetibles.",    aria: "100 por ciento" },
  { value: "8",    label: "Líneas de producto disponibles.",  aria: "8"              },
  { value: "∞",    label: "El momento perdura para siempre.", aria: "Infinito"       },
] as const;

const panelVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.22 } },
};

export default function Occasions() {
  const [active, setActive] = useState(OCCASIONS[0].id);
  const current = OCCASIONS.find((o) => o.id === active) ?? OCCASIONS[0];

  return (
    <section
      id="ocasiones"
      aria-labelledby="occ-heading"
      className="flex min-h-svh flex-col items-center justify-center bg-white py-20 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-16">

        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}
              className="mb-4 flex items-center gap-3"
            >
              <div aria-hidden="true" className="h-px w-8 shrink-0 bg-[var(--gold)] sm:w-10" />
              <p className="text-[9px] font-medium tracking-[0.45em] uppercase text-[var(--gold)] sm:text-[10px] sm:tracking-[0.55em]">
                Para cada momento
              </p>
            </motion.div>
            <motion.h2
              id="occ-heading"
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
              className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-extralight leading-[1.06] tracking-tight text-neutral-900"
            >
              Cada ocasión merece
              <br />
              <em className="not-italic text-[var(--gold)]">su propia botella.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}
            className="hidden max-w-xs text-[13px] leading-relaxed text-neutral-700 lg:block lg:text-right"
          >
            Desde un bautizo, cumpleaños o hasta un lanzamiento corporativo —
            personalizamos cada botella para que cuente la historia correcta.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          role="tablist"
          aria-label="Selecciona una ocasión"
          className="mb-8 flex flex-wrap gap-2"
        >
          {OCCASIONS.map(({ id, label, icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id} type="button" role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${id}`}
                id={`tab-${id}`}
                onClick={() => setActive(id)}
                className={[
                  "inline-flex items-center gap-2 px-3.5 py-2.5 sm:px-4",
                  "text-[10px] font-medium tracking-[0.2em] uppercase sm:text-[11px]",
                  "transition-all duration-300 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]",
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "border border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-neutral-800",
                ].join(" ")}
              >
                <Image
                  src={icon} alt="" aria-hidden="true" width={18} height={18}
                  className={["shrink-0 transition-all duration-300", isActive ? "brightness-0 invert" : "opacity-100"].join(" ")}
                />
                {label}
              </button>
            );
          })}
        </motion.div>

        <div
          id={`panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="border-t border-neutral-200 pt-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              variants={panelVariants} initial="initial" animate="animate" exit="exit"
              className="grid gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <div>
                <h3 className="mb-5 text-[clamp(1.3rem,3vw,2.2rem)] font-extralight leading-[1.12] tracking-tight text-neutral-900">
                  {current.heading}
                </h3>
                <p className="text-[13px] leading-relaxed text-neutral-700 sm:text-[14px] text-justify">
                  {current.desc}
                </p>
              </div>

              <div className="flex flex-col justify-center">
                <p className="mb-4 text-[9px] font-medium tracking-[0.45em] uppercase text-neutral-800">
                  Incluye:
                </p>
                <ul
                  aria-label={`Características para ${current.label}`}
                  className="grid grid-cols-2 gap-x-6 gap-y-3.5"
                  role="list"
                >
                  {current.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-2.5 text-[13px] text-neutral-800">
                      <span aria-hidden="true" className="h-px w-3.5 shrink-0 bg-[var(--gold)]" />
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  aria-label={`Cotizar botella personalizada para ${current.label}`}
                  className="mt-9 inline-flex w-fit items-center gap-3 text-[11px] font-semibold tracking-[0.3em] uppercase text-[var(--gold)] transition-all duration-300 hover:gap-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]"
                >
                  Cotizar para {current.label.toLowerCase()}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.dl
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-14 grid grid-cols-3 gap-px border-t border-neutral-200 pt-10 text-center"
        >
          {STATS.map(({ value, label, aria }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <dt className="sr-only">{label}</dt>
              <dd
                aria-label={aria}
                className="font-extralight leading-none text-[var(--gold)] text-[clamp(2rem,4.5vw,3.5rem)]"
              >
                {value}
              </dd>
              <p aria-hidden="true" className="text-[11px] leading-snug text-neutral-900 sm:text-[13px]">
                {label}
              </p>
            </div>
          ))}
        </motion.dl>

      </div>
    </section>
  );
}
