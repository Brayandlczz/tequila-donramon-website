"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ─── Animation helpers ────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) =>
  ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.85, delay, ease: EASE },
  }) as const;

const fadeIn = (delay = 0) =>
  ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, delay },
  }) as const;

// ─── Icons ────────────────────────────────────────────────────────────────────

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className} viewBox="0 0 24 24"><path fill="#e53e3e" d="M20 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5zm4-3H19v1h1.5V11H19v2h-1.5V7h3zM9 9.5h1v-1H9zM4 6H2v14a2 2 0 0 0 2 2h14v-2H4zm10 5.5h1v-3h-1z"/></svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ACCESSORIES = [
  {
    title:      "Cajas grabadas",
    description: "Presentación premium personalizada para tu botella.",
    image:      "/images/accesories/engraved-box.avif",
    catalogUrl: "/catalogs/catalogo-accesorios-don-ramon.pdf",
  },
  {
    title:      "Tequileros",
    description: "Set grabado ideal para compartir en eventos.",
    image:      "/images/accesories/portashots.avif",
    catalogUrl: "/catalogs/catalogo-accesorios-don-ramon.pdf",
  },
  {
    title:      "Trajineras",
    description: "Un detalle mexicano único para celebraciones memorables.",
    image:      "/images/accesories/shot-holder.avif",
    catalogUrl: "/catalogs/catalogo-accesorios-don-ramon.pdf",
  },
] as const;

// ─── Sub-component ────────────────────────────────────────────────────────────

interface AccessoryCardProps {
  item: (typeof ACCESSORIES)[number];
  index: number;
}

function AccessoryCard({ item, index }: AccessoryCardProps) {
  return (
    <motion.li
      {...fadeUp(0.1 + index * 0.09)}
      itemScope
      itemType="https://schema.org/Product"
      className="group"
    >
      <meta itemProp="name" content={item.title} />

      {/* Imagen */}
      <a
        href={item.catalogUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden rounded-2xl aspect-square"
        aria-label={`Descargar catálogo de ${item.title}`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          quality={88}
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          itemProp="image"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 hidden items-center justify-center bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 md:flex"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white">
            Ver catálogo
          </span>
        </div>
      </a>

      {/* Caption */}
      <div className="mt-4 flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between gap-2">
          <h3
            itemProp="name"
            className="text-[14px] font-semibold tracking-wide text-neutral-900"
          >
            {item.title}
          </h3>
          <a
            href={item.catalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Descargar catálogo PDF de ${item.title}`}
            className="text-[#C9A84C]/60 transition-colors duration-200 hover:text-[#C9A84C]"
          >
            <PdfIcon className="h-4.5 w-4.5" />
          </a>
        </div>
        <p
          itemProp="description"
          className="text-[12px] leading-[1.7] text-neutral-500"
        >
          {item.description}
        </p>
      </div>
    </motion.li>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Accesories() {
  return (
    <section
      id="complements"
      aria-labelledby="complements-heading"
      itemScope
      itemType="https://schema.org/ItemList"
      className="w-full overflow-hidden bg-white pt-24 py-24 sm:py-28"
    >
      <meta itemProp="name" content="Accesorios Don Ramón" />

      <div className="w-full px-5 sm:px-8 lg:px-16">

        {/* ── Header narrativo ───────────────────────────────────────────── */}
        <motion.div
          {...fadeIn(0.1)}
          className="mb-6 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-neutral-500">
            Complementos
          </p>
          <p
            className="text-[clamp(1.6rem,3vw,2.4rem)] font-black leading-none tracking-tight text-neutral-900"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            La botella cuenta la historia,
            <br />
            los detalles la hacen{" "}
            <span style={{ color: "#C9A84C" }}>inolvidable.</span>
          </p>
          <p className="max-w-md text-[13px] leading-[1.8] text-neutral-600">
            Accesorios personalizados diseñados para presentar,
            compartir y celebrar cada botella de una forma única.
          </p>
        </motion.div>

        {/* ── Grid ───────────────────────────────────────────────────────── */}
        <ul className="grid gap-6 sm:grid-cols-3" aria-label="Accesorios">
          {ACCESSORIES.map((item, i) => (
            <AccessoryCard key={item.title} item={item} index={i} />
          ))}
        </ul>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.2)}
          className="mt-12 flex flex-col items-center gap-8 rounded-3xl border border-neutral-200 bg-[#F8F8F6] p-8 text-center sm:flex-row sm:items-center sm:justify-between sm:p-10 sm:text-left"
        >
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.45em] text-[#C9A84C]">
              El detalle perfecto
            </p>
            <h2
              id="experience-heading"
              itemProp="slogan"
              className="max-w-3xl text-[clamp(1.3rem,3vw,2.4rem)] font-light leading-[1.05] tracking-tight text-neutral-900"
            >
              Diseñado para regalar,
              brindar y recordar.
            </h2>
          </div>

          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-3 bg-neutral-900 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition-all duration-300 hover:bg-[#C9A84C] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 rounded-full"
          >
            ¡Quiero el set completo!
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </motion.div>

        {/* Trust bar */}
        <motion.p
          {...fadeIn(0.35)}
          className="mt-8 text-center text-[10px] uppercase tracking-[0.4em] text-neutral-900"
        >
          Tequila Premiado internacionalmente · 100% agave · +25 años de tradición y excelencia
        </motion.p>

      </div>
    </section>
  );
}