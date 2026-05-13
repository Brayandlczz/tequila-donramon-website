"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id:       string;
  label:    string;
  heading:  string;
  desc:     string;
  features: string[];
  image:    string;
  imageAlt: string;
}

const PRODUCTS: Product[] = [
  {
    id:       "caja",
    label:    "Cajas con grabado",
    heading:  "La sorpresa empieza desde el estuche.",
    desc:     "Estuches de madera con grabado de la marca Tequila Don Ramón, diseñados para convertir cada entrega en una experiencia elegante y memorable desde el primer vistazo.",
    features: ["Presentación elegante y sofisticada", "Grabado distintivo de la marca", "Acabado premium en madera", "Ideal para regalos"],
    image:    "/images/products/boxes.webp",
    imageAlt: "Caja de madera personalizada con grabado de Tequila Don Ramón",
  },
  {
    id:       "tequilero",
    label:    "Portashots",
    heading:  "El complemento ideal para compartir el momento.",
    desc:     "Porta-shots de madera con grabado de la marca Tequila Don Ramón, acompañado de tequileros con identidad de la marca, pensado para disfrutar cada brindis con una presentación única y auténtica.",
    features: ["Ideal para reuniones y celebraciones", "Incluye tequileros de regalo", "Diseño distintivo de la marca", "Dos modelos disponibles"],
    image:    "/images/products/portashots.webp",
    imageAlt: "Portashots de madera con grabado de Tequila Don Ramón",
  },
];

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

export default function GiftBoxes() {
  return (
    <section
      id="complementos"
      aria-labelledby="gift-heading"
      className="w-full overflow-hidden bg-[var(--surface-0)] py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-16">

        <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.div {...fadeIn(0)} className="mb-6 flex items-center gap-4">
              <div aria-hidden="true" className="h-px w-8 shrink-0 bg-[var(--gold)]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--gold)]">
                El set completo
              </p>
            </motion.div>
            <motion.h2
              id="gift-heading"
              {...fadeUp(0.1)}
              className="text-[clamp(1.75rem,5vw,3.5rem)] font-extralight leading-[1.08] tracking-tight text-white"
            >
              La botella es el centro.
              <br />
              <em className="not-italic text-[var(--gold)]">El set es la experiencia.</em>
            </motion.h2>
          </div>

          <motion.div {...fadeUp(0.2)} className="flex flex-col justify-end">
            <p className="text-justify text-[13px] leading-relaxed text-white/60 sm:text-[14px]">
              Cada regalo merece una presentación a la altura. Combinamos botella,
              caja y tequileros con el mismo grabado — para que desde el primer
              vistazo ya sea un momento especial.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2">
          {PRODUCTS.map(({ id, label, heading, desc, features, image, imageAlt }, i) => (
            <motion.article
              key={id}
              {...fadeUp(0.1 + i * 0.12)}
              className="group flex flex-col bg-[var(--surface-0)] transition-colors duration-500 hover:bg-[var(--surface-1)]"
              aria-label={label}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/[0.03]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  quality={88}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 border border-[var(--gold)]/30 bg-black/50 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.4em] text-[var(--gold)] backdrop-blur-sm">
                  {label}
                </span>
              </div>

              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <h3 className="text-[clamp(1rem,2vw,1.45rem)] font-extralight leading-[1.2] tracking-tight text-white">
                  {heading}
                </h3>
                <p className="text-justify text-[13px] leading-relaxed text-white/80">
                  {desc}
                </p>
                <ul
                  aria-label={`Características — ${label}`}
                  className="grid grid-cols-2 gap-2"
                  role="list"
                >
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[11px] text-white/70">
                      <span aria-hidden="true" className="h-px w-3 shrink-0 bg-[var(--gold)]/40" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/[0.07] pt-5">
                  <a
                    href="/catalogos/TU-ARCHIVO.pdf"
                    download
                    aria-label={`Descargar catálogo de ${label} — Don Ramón`}
                    className="group/link inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)] transition-all duration-300 hover:gap-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]"
                  >
                    Ver catálogo
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          {...fadeIn(0.3)}
          className="mt-px flex flex-col gap-6 bg-white/[0.04] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10"
        >
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--gold)]/60">
              El aditamento perfecto
            </p>
            <p className="text-[clamp(1rem,2.5vw,1.5rem)] font-extralight leading-snug tracking-tight text-white">
              Botella + caja + tequileros.{" "}
              <em className="not-italic text-white/40">Un set que no necesita moño.</em>
            </p>
          </div>
          <a
            href="#contacto"
            aria-label="Cotizar set completo de botella, caja y tequileros personalizados Don Ramón"
            className="inline-flex shrink-0 items-center gap-3 border border-[var(--gold)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)] transition-all duration-300 hover:bg-[var(--gold)] hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]"
          >
            Cotizar set completo
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
