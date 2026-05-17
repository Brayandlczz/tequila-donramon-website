"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Pillar { number: string; title: string; desc: string }
interface Award  { distinction: string; body: string; year: string; logo: string }

const PILLARS: Pillar[] = [
  {
    number: "I",
    title:  "Tu historia grabada",
    desc:   "Nombres, fechas y mensajes grabados a mano sobre cada botella. Cada trazo único, como el momento que celebras.",
  },
  {
    number: "II",
    title:  "Precisión artesanal",
    desc:   "Técnica corte diamante sobre vidrio — el mismo nivel de detalle que un joyero aplica sobre una pieza de colección.",
  },
  {
    number: "III",
    title:  "Respaldo de excelencia",
    desc:   "+25 años del mejor tequila en México que une tradición, innovación y orgullo nacional. Cuando personalizas Don Ramón, el prestigio ya viene incluido.",
  },
];

const AWARDS: Award[] = [
  { distinction: "Double Gold",           body: "New York International Spirits Awards", year: "2021", logo:  "/images/awards/award-01.webp" },
  { distinction: "Platinum",              body: "Las Vegas Global Spirit Awards",         year: "2020", logo: "/images/awards/award-02.webp" },
  { distinction: "Gold",                  body: "Las Vegas Global Spirit Awards",         year: "2020", logo: "/images/awards/award-03.webp" },
  { distinction: "Gold — Luxury Masters", body: "The Global Spirits Masters",             year: "2020", logo: "/images/awards/award-04.webp" },
];

const BADGES = ["Kosher Certification", "IFS Food", "100% Agave"] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true },
  transition:  { duration: 0.8, delay, ease },
});

const fadeIn = (delay = 0) => ({
  initial:     { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport:    { once: true },
  transition:  { duration: 0.9, delay },
});

function Eyebrow({ label }: { label: string }) {
  return (
    <motion.div {...fadeIn(0)} className="mb-5 flex items-center gap-3">
      <div aria-hidden="true" className="h-px w-8 shrink-0 bg-[var(--gold)]" />
      <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--gold)]">{label}</p>
    </motion.div>
  );
}

export default function Brand() {
  return (
    <section
      id="experiencia"
      aria-labelledby="brand-heading"
      className="w-full overflow-hidden bg-white py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-16">

        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow label="La experiencia" />
            <motion.h2
              id="brand-heading"
              {...fadeUp(0.1)}
              className="text-[clamp(1.75rem,5vw,3.5rem)] font-extralight leading-[1.08] tracking-tight text-neutral-900"
            >
              No vendemos tequila.
              <br />
              <em className="not-italic text-[var(--gold)]">Creamos recuerdos.</em>
            </motion.h2>
          </div>

          <motion.div {...fadeUp(0.2)} className="flex flex-col justify-end gap-3 text-justify">
            <p className="text-[13px] leading-relaxed text-neutral-800 sm:text-[14px]">
              Tomamos la línea premium de tequila más reconocida de México y la
              convertimos en algo completamente tuyo — nombre, fecha y mensaje grabados para siempre.
            </p>
            <p className="text-[13px] leading-relaxed text-neutral-800 sm:text-[14px]">
              Casa Don Ramón es una marca de tequila 100% agave ultra-premium reconocida
              en los cinco continentes. Tú traes la historia. Nosotros ponemos el tequila.
            </p>
          </motion.div>
        </div>

        <motion.div {...fadeIn(0.1)} aria-hidden="true" className="mb-10 h-px w-full bg-neutral-300" />

        <ol
          aria-label="Pilares del servicio de personalización Don Ramón"
          className="mb-14 grid gap-px bg-neutral-300 sm:grid-cols-3"
        >
          {PILLARS.map(({ number, title, desc }, i) => (
            <motion.li
              key={number}
              {...fadeUp(0.1 + i * 0.1)}
              className="group flex cursor-default flex-col gap-3 bg-white p-5 transition-colors duration-300 hover:bg-neutral-100 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="font-mono text-[10px] tracking-[0.4em] text-[var(--gold)] transition-colors duration-300"
              >
                {number}
              </span>
              <div>
                <h3 className="mb-1.5 text-[14px] font-light tracking-tight text-neutral-900 sm:text-[16px]">
                  {title}
                </h3>
                <p className="text-justify text-[12px] leading-relaxed text-neutral-700 sm:text-[13px]">
                  {desc}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow label="Reconocimientos" />
            <motion.h3
              {...fadeUp(0.15)}
              className="text-[clamp(1.35rem,3.5vw,2.6rem)] font-extralight leading-[1.1] tracking-tight text-neutral-900"
            >
              Premiados en los
              <br />
              <em className="not-italic text-[var(--gold)]">concursos más exigentes</em>
              <br />
              del mundo.
            </motion.h3>
            <motion.p {...fadeIn(0.25)} className="mt-4 text-[13px] leading-relaxed text-neutral-700">
              Cuando tu nombre aparece en una botella Don Ramón,
              va acompañado de historia y prestigio internacional.
            </motion.p>
          </div>

          <motion.div {...fadeIn(0.2)} className="flex flex-col justify-center">
            <ul
              aria-label="Premios y distinciones internacionales de Casa Don Ramón"
              className="flex flex-col divide-y divide-neutral-100"
              role="list"
            >
              {AWARDS.map(({ distinction, body, year, logo }, i) => (
                <motion.li
                  key={`${distinction}-${i}`}
                  {...fadeUp(0.2 + i * 0.08)}
                  className="flex items-center gap-4 py-3"
                >
                  <div className="relative h-10 w-10 shrink-0 brightness-0">
                    <Image
                      src={logo}
                      alt={`Logo ${distinction}`}
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-[13px] font-medium text-neutral-900">{distinction}</span>
                    <span className="truncate text-[11px] text-neutral-400">{body}</span>
                  </div>

                  <span
                    aria-label={`Año ${year}`}
                    className="shrink-0 font-mono text-[11px] tracking-widest text-[var(--gold)]/65"
                  >
                    {year}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              {...fadeIn(0.4)}
              className="mt-6 flex flex-wrap gap-2"
              aria-label="Certificaciones de Casa Don Ramón"
            >
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="border border-neutral-200 px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.35em] text-neutral-900"
                >
                  {b}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
