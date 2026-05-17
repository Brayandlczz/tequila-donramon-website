"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Review { quote: string; author: string; event: string }

// ─── Constants ────────────────────────────────────────────────────────────────

const GALLERY = [
  { src: "/images/gallery/bottle-01.webp", alt: "Botella Don Ramón personalizada — boda"        },
  { src: "/images/gallery/bottle-02.webp", alt: "Botella Don Ramón personalizada — XV años"      },
  { src: "/images/gallery/bottle-03.webp", alt: "Botella Don Ramón personalizada — corporativo"  },
  { src: "/images/gallery/bottle-04.webp", alt: "Botella Don Ramón personalizada — graduación"   },
  { src: "/images/gallery/bottle-05.webp", alt: "Botella Don Ramón personalizada — aniversario"  },
  { src: "/images/gallery/bottle-06.webp", alt: "Botella Don Ramón personalizada — navidad"      },
  { src: "/images/gallery/bottle-07.webp", alt: "Botella Don Ramón personalizada — regalo"       },
  { src: "/images/gallery/bottle-08.webp", alt: "Botella Don Ramón personalizada — evento"       },
] as const;

const REVIEWS: Review[] = [
  { quote: "Fue el detalle que todos los invitados recordaron. Años después, aún tienen la botella.",                   author: "Yolanda Montiel",      event: "Boda · Guadalajara"         },
  { quote: "Pedimos 80 piezas para un lanzamiento corporativo. Cada cliente quedó encantado al recibirla.",            author: "María de Lourdes",     event: "Evento corporativo · CDMX"  },
  { quote: "El grabado es precioso. Le regalé una a mi papá con su nombre y la fecha — lloró.",                        author: "Alejandro Lara",       event: "Aniversario · Monterrey"    },
  { quote: "Pensé que el proceso era complicado. Todo fue rapidísimo y el resultado superó lo que imaginé.",           author: "Arely Ortíz",          event: "XV Años · Querétaro"        },
];

const ease = [0.22, 1, 0.36, 1] as const;

// ─── Review carousel ──────────────────────────────────────────────────────────

function ReviewCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const r = REVIEWS[index];

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.55, ease }}
          className="flex flex-col gap-4"
        >
          <p className="text-[clamp(0.95rem,2vw,1.15rem)] font-extralight italic leading-relaxed text-neutral-800">
            &ldquo;{r.quote}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 shrink-0 bg-[var(--gold)]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-700">
              {r.author}
              <span className="font-normal text-neutral-500"> · {r.event}</span>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="mt-6 flex gap-2" role="tablist" aria-label="Navegar entre opiniones">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Opinión ${i + 1} de ${REVIEWS.length}`}
            onClick={() => setIndex(i)}
            className={[
              "h-px cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]",
              i === index ? "w-8 bg-[var(--gold)]" : "w-4 bg-neutral-300 hover:bg-neutral-500",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={sectionRef}
      id="galeria"
      aria-labelledby="gallery-heading"
      className="relative w-full overflow-hidden bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-16">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}
              className="mb-5 flex items-center gap-3"
            >
              <div aria-hidden="true" className="h-px w-8 shrink-0 bg-[var(--gold)]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--gold)]">
                Piezas únicas
              </p>
            </motion.div>

            <motion.h2
              id="gallery-heading"
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.1, ease }}
              className="text-[clamp(1.75rem,5vw,3.5rem)] font-extralight leading-[1.08] tracking-tight text-neutral-900"
            >
              Cada botella,
              <br />
              <em className="not-italic text-[var(--gold)]">una historia real.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}
            className="hidden max-w-[260px] text-[13px] leading-relaxed text-neutral-500 lg:block lg:text-right"
          >
            Botellas personalizadas entregadas a clientes reales — bodas,
            corporativos, XV años y más.
          </motion.p>
        </div>

        {/* ── Collage desktop — columnas de imágenes verticales ────────── */}

        <motion.div
          style={{ y: parallaxY }}
          className="relative mb-16 hidden lg:grid lg:grid-cols-4 lg:gap-3"
          aria-label="Galería de botellas Don Ramón personalizadas"
        >
          {/* Columna 1 — empieza alta */}
          <div className="flex flex-col gap-3 pt-0">
            {[0, 4].map((i) => (
              <GalleryItem key={GALLERY[i].src} item={GALLERY[i]} index={i} />
            ))}
          </div>

          {/* Columna 2 — desplazada hacia abajo */}
          <div className="flex flex-col gap-3 pt-10">
            {[1, 5].map((i) => (
              <GalleryItem key={GALLERY[i].src} item={GALLERY[i]} index={i} />
            ))}
          </div>

          {/* Columna 3 — desplazada arriba intermedia */}
          <div className="flex flex-col gap-3 pt-5">
            {[2, 6].map((i) => (
              <GalleryItem key={GALLERY[i].src} item={GALLERY[i]} index={i} />
            ))}
          </div>

          {/* Columna 4 — desplazada más abajo */}
          <div className="flex flex-col gap-3 pt-16">
            {[3, 7].map((i) => (
              <GalleryItem key={GALLERY[i].src} item={GALLERY[i]} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── Collage mobile — scroll horizontal ───────────────────────── */}
        <div
          className="mb-12 flex gap-3 overflow-x-auto pb-3 lg:hidden"
          aria-label="Galería de botellas Don Ramón personalizadas"
          style={{ scrollbarWidth: "none" }}
        >
          {GALLERY.map(({ src, alt }, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06, ease }}
              className="relative aspect-[2/3] w-[130px] shrink-0 overflow-hidden bg-neutral-100 sm:w-[160px]"
            >
              <Image src={src} alt={alt} fill sizes="160px" quality={85} className="object-cover object-center" />
            </motion.div>
          ))}
        </div>

        {/* ── Reviews ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mb-20 border-t border-neutral-200 pt-10 lg:max-w-2xl"
        >
          <p className="mb-6 text-[9px] font-medium uppercase tracking-[0.5em] text-neutral-600">
            Lo que dicen nuestros clientes
          </p>
          <ReviewCarousel />
        </motion.div>

        {/* ── Closing statement ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.1, ease }}
          className="border-t border-neutral-200 pt-14 text-center"
        >
          {/* Frase principal */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.2, ease }}
            className="mx-auto max-w-2xl text-[clamp(1.4rem,4vw,2.8rem)] font-extralight leading-[1.1] tracking-tight text-neutral-900"
          >
            ¿Y tú, qué esperas para
            <br />
            <em className="not-italic text-[var(--gold)]">inmortalizar tus momentos especiales?</em>
          </motion.p>

          {/* Espacio uniforme */}
          <div className="mt-10" />

          {/* Marca + franquicia */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.35 }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.55em] text-neutral-700">
              Tequila Don Ramón Personalizado
            </p>
            <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.45em] text-neutral-400">
              Franquicia MX 924872
            </p>
          </motion.div>

          {/* Mismo espacio uniforme */}
          <div className="mt-10" />

          {/* CTA */}
          <motion.a
            href="#contacto"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5, ease }}
            aria-label="Solicitar información para personalizar una botella Don Ramón"
            className="group inline-flex items-center gap-3 bg-[var(--gold)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-black transition-colors duration-300 hover:bg-[var(--gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2"
          >
            Solicitar información
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}

// ─── Gallery item sub-component ───────────────────────────────────────────────

function GalleryItem({
  item,
  index,
}: {
  item: { src: string; alt: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[2/3] w-full overflow-hidden bg-neutral-100"
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 1280px) 25vw, 300px"
        quality={88}
        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/8"
      />
    </motion.div>
  );
}
