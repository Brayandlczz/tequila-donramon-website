"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

interface Review { quote: string; author: string; event: string }

const GALLERY = [
  { src: "/images/gallery/bottle-01.webp", alt: "Botella Don Ramón personalizada — boda"        },
  { src: "/images/gallery/bottle-02.webp", alt: "Botella Don Ramón personalizada — XV años"      },
  { src: "/images/gallery/bottle-03.webp", alt: "Botella Don Ramón personalizada — corporativo"  },
  { src: "/images/gallery/bottle-04.webp", alt: "Botella Don Ramón personalizada — graduación"   },
  { src: "/images/gallery/bottle-05.webp", alt: "Botella Don Ramón personalizada — aniversario"  },
  { src: "/images/gallery/bottle-06.webp", alt: "Botella Don Ramón personalizada — navidad"      },
  { src: "/images/gallery/bottle-07.webp", alt: "Botella Don Ramón personalizada — regalo"       },
  { src: "/images/gallery/bottle-08.webp", alt: "Botella Don Ramón personalizada — evento"       },
  { src: "/images/gallery/bottle-09.webp", alt: "Botella Don Ramón personalizada — set completo" },
] as const;

const REVIEWS: Review[] = [
  { quote: "Fue el detalle que todos los invitados recordaron. Años después, aún tienen la botella.",                          author: "Mariana G.", event: "Boda · Guadalajara"            },
  { quote: "Pedimos 80 piezas para un lanzamiento corporativo. Cada cliente quedó encantado al recibirla.",                   author: "Carlos R.",  event: "Evento corporativo · CDMX"    },
  { quote: "El grabado es precioso. Le regalé una a mi papá con su nombre y la fecha — lloró.",                               author: "Sofía M.",   event: "Aniversario · Monterrey"      },
  { quote: "Pensé que el proceso de compra era complicado. Todo fue rapidísimo y el resultado superó lo que imaginé.",        author: "Rodrigo T.", event: "XV Años · Querétaro"          },
];

const GRID_LAYOUT = [
  [1,1,1,2],[2,1,1,1],[3,1,1,1],[2,2,2,1],
  [1,3,1,1],[2,3,1,2],[3,3,1,1],[1,4,1,1],[3,4,1,1],
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

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
          className="flex flex-col gap-3"
        >
          <p className="text-[clamp(0.95rem,2vw,1.2rem)] font-extralight italic leading-relaxed text-neutral-700">
            "{r.quote}"
          </p>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 shrink-0 bg-[var(--gold)]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-500">
              {r.author} · <span className="font-normal text-neutral-400">{r.event}</span>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex gap-2" aria-hidden="true">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Opinión ${i + 1}`}
            className={[
              "h-px transition-all duration-300 focus-visible:outline-none",
              i === index ? "w-8 bg-[var(--gold)]" : "w-4 bg-neutral-300 hover:bg-neutral-400",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

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

        {/* Header */}
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}
              className="mb-5 flex items-center gap-3"
            >
              <div aria-hidden="true" className="h-px w-8 shrink-0 bg-[var(--gold)]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--gold)]">Piezas únicas</p>
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

        {/* Collage desktop */}
        <motion.div
          style={{ y: parallaxY }}
          className="relative mb-16 hidden lg:grid lg:grid-cols-3 lg:grid-rows-[repeat(4,200px)] lg:gap-3"
          aria-label="Galería de botellas Don Ramón personalizadas"
        >
          {GALLERY.map(({ src, alt }, i) => {
            const [colStart, rowStart, colSpan, rowSpan] = GRID_LAYOUT[i];
            return (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.07, ease }}
                className="group relative overflow-hidden bg-neutral-100"
                style={{ gridColumn: `${colStart} / span ${colSpan}`, gridRow: `${rowStart} / span ${rowSpan}` }}
              >
                <Image
                  src={src} alt={alt} fill
                  sizes="(max-width: 1280px) 33vw, 400px"
                  quality={88}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Collage mobile */}
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
              className="relative aspect-[2/3] w-[140px] shrink-0 overflow-hidden bg-neutral-100 sm:w-[180px]"
            >
              <Image src={src} alt={alt} fill sizes="180px" quality={85} className="object-cover object-center" />
            </motion.div>
          ))}
        </div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mb-20 border-t border-neutral-200 pt-10 lg:max-w-2xl"
        >
          <p className="mb-6 text-[9px] font-medium uppercase tracking-[0.5em] text-neutral-500">
            Lo que dicen nuestros clientes
          </p>
          <ReviewCarousel />
        </motion.div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.1, ease }}
          className="relative border-t border-neutral-200 pt-14 text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2, ease }}
            aria-hidden="true"
            className="mx-auto mb-8 h-px w-16 origin-center bg-[var(--gold)]"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.35, ease }}
            className="mx-auto mb-3 max-w-2xl text-[clamp(1.4rem,4vw,2.8rem)] font-extralight leading-[1.1] tracking-tight text-neutral-900"
          >
            ¿Y tú, qué esperas para
            <br />
            <em className="not-italic text-[var(--gold)]">inmortalizar tus momentos especiales?</em>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.55 }}
            className="mb-1 text-[11px] font-medium uppercase tracking-[0.55em] text-neutral-600"
          >
            Tequila Don Ramón Personalizado
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.62 }}
            className="mb-10 text-[9px] font-medium uppercase tracking-[0.45em] text-neutral-400"
          >
            Franquicia MX 924872
          </motion.p>

          <motion.a
            href="#contacto"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.7, ease }}
            aria-label="Cotizar botella personalizada Don Ramón"
            className="group inline-flex items-center gap-3 bg-[var(--gold)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-black transition-colors duration-300 hover:bg-[var(--gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2"
          >
            Personalizar ahora
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}