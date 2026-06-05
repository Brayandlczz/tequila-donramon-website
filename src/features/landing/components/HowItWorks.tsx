"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    number: "1",
    title: "Elige tu botella",
    desc: "Explora nuestro catálogo y elige la línea que más te represente — Edición Limitada, Swarovski, Platinium, Cerámica y más. Cada pieza tiene carácter y presencia propia.",
    image: "/images/steps/step-1.webp",
    alt: "Botellas Don Ramón personalizadas por ocasión— Edición Limitada, Swarovski, Platinium y Cerámica",
    imageLeft: true,
  },
  {
    number: "2",
    title: "Define tu diseño",
    desc: "Compártenos tu idea o consulta nuestros diseños disponibles. Nuestros artesanos plasmarán cada detalle con la técnica corte diamante para una pieza única e irrepetible.",
    image: "/images/steps/step-2.webp",
    alt: "Botella Don Ramón personalizada con técnica corte diamante",
    imageLeft: false,
  },
  {
    number: "3",
    title: "Confirma y recibe",
    desc: "Contáctanos vía WhatsApp para acordar pago y entrega. Tu botella personalizada llegará perfectamente embalada, lista para el momento que mereces conmemorar.",
    image: "/images/steps/step-3.webp",
    alt: "Botella Don Ramón Edición especial Luis Miguel personalizada lista para disfrutarse",
    imageLeft: true,
  },
] as const;

// ─── Shine styles ─────────────────────────────────────────────────────────────

const SHINE_STYLES = `
  @keyframes shine-fwd {
    from { transform: translateX(-130%); }
    to   { transform: translateX( 130%); }
  }
  @keyframes shine-bwd {
    from { transform: translateX( 130%); }
    to   { transform: translateX(-130%); }
  }
  .shine-card { position: relative; overflow: hidden; }
  .shine-card::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.55) 50%, transparent 75%);
    transform: translateX(-130%);
  }
  .shine-card.shine-fwd::after { animation: shine-fwd 0.55s ease forwards; }
  .shine-card.shine-bwd::after { animation: shine-bwd 0.55s ease forwards; }
`;

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useShine() {
  const onMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.classList.remove("shine-bwd");
    void el.offsetWidth;
    el.classList.add("shine-fwd");
  }, []);

  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.classList.remove("shine-fwd");
    void el.offsetWidth;
    el.classList.add("shine-bwd");
  }, []);

  return { onMouseEnter, onMouseLeave };
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step {
  number: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
  imageLeft: boolean;
}

// ─── StepRow ──────────────────────────────────────────────────────────────────

function StepRow({ step }: { step: Step }) {
  const { number, title, desc, image, alt, imageLeft } = step;
  const shine = useShine();

  const imageBlock = (
    <motion.div
      initial={{ opacity: 0, x: imageLeft ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
      className="shine-card w-full rounded-2xl bg-gray-100 lg:w-[52%]"
      style={{ aspectRatio: "4/3" }}
      onMouseEnter={shine.onMouseEnter}
      onMouseLeave={shine.onMouseLeave}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={90}
          className="object-cover object-center"
        />
      </div>
    </motion.div>
  );

  const textBlock = (
    <motion.div
      initial={{ opacity: 0, x: imageLeft ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
      className="flex flex-col items-center justify-center text-center lg:w-[44%] lg:items-start lg:text-left"
    >
      <span
        className="mb-2 font-serif text-[4.5rem] font-bold leading-none text-[#c92532]"
        aria-hidden="true"
      >
        {number}
      </span>
      <h3 className="mb-3 text-[1.35rem] font-bold leading-snug tracking-tight text-gray-900">
        {title}
      </h3>
      <p className="text-[14px] leading-relaxed text-gray-500">{desc}</p>
    </motion.div>
  );

  return (
    <div
      className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-16 ${
        !imageLeft ? "lg:flex-row-reverse" : ""
      }`}
    >
      {imageBlock}
      {textBlock}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  return (
    <>
      <style>{SHINE_STYLES}</style>

      <section
        id="personalization"
        aria-labelledby="hiw-heading"
        className="bg-white py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">

          <motion.h2
            id="hiw-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-16 text-center text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-snug tracking-tight text-gray-900 sm:mb-20"
          >
            Tu tequila en{" "}
            <span className="text-[#c92532]">3 simples pasos</span>
          </motion.h2>

          <ol
            aria-label="Pasos del proceso de personalización Don Ramón"
            className="flex flex-col gap-6 sm:gap-6"
          >
            {STEPS.map((step) => (
              <li key={step.number}>
                <StepRow step={step} />
              </li>
            ))}
          </ol>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="mt-10 flex justify-center"
          >
          <a
            href="/catalogs/catalogo-botellas-don-ramon.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Descargar catálogo de botellas Don Ramón personalizadas"
            className="rounded-full bg-[#c92532] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.3em] text-white shadow-[0_14px_28px_rgba(201,37,50,.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b3202c] hover:shadow-[0_18px_36px_rgba(201,37,50,.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c92532] focus-visible:ring-offset-2"
          >
            Ver catálogo de botellas
          </a>
          </motion.div>

        </div>
      </section>
    </>
  );
}
