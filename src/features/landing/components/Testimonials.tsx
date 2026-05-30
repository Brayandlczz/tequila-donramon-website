"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Review {
  quote: string;
  author: string;
  event: string;
}

const REVIEWS: Review[] = [
  {
    quote:
      "Pedimos 80 piezas para un lanzamiento corporativo. Cada uno de nuestros clientes quedó absolutamente encantado.",
    author: "María de Lourdes",
    event: "Corporativo · CDMX",
  },
  {
    quote:
      "El grabado es precioso. Le regalé una a mi papá con su nombre y la fecha; lloró de la emoción.",
    author: "Alejandro Lara",
    event: "Aniversario · Monterrey",
  },
  {
    quote:
      "Todo fue rapidísimo y el resultado superó completamente nuestras expectativas. Lo recomiendo ampliamente.",
    author: "Arely Ortiz",
    event: "XV Años · Querétaro",
  },
  {
    quote:
      "El detalle perfecto para cerrar nuestro evento corporativo. Todos se fueron muy felices.",
    author: "Rodrigo Vega",
    event: "Corporativo · Monterrey",
  },
  {
    quote:
      "Desde el primer contacto ellos nos ayudaron con el diseño. El resultado fue exactamente lo que imaginábamos.",
    author: "Fernanda Cruz",
    event: "Aniversario · Puebla",
  },
  {
    quote:
      "La calidad de la botella y del grabado es impresionante. Se siente como una pieza de colección.",
    author: "Mauricio Herrera",
    event: "Regalo Personal · CDMX",
  },
  {
    quote:
      "Elegimos Don Ramón para nuestra boda y terminó siendo uno de los recuerdos favoritos de nuestros invitados.",
    author: "Daniela Flores",
    event: "Boda · San Luis Potosí",
  },
  {
    quote:
      "Mandamos grabar el nombre de mi abuelo y quedó espectacular. Toda la familia quedó emocionada.",
    author: "Valeria Sánchez",
    event: "Cumpleaños · Mérida",
  },
  {
    quote:
      "Nos sorprendió la rapidez de entrega. Llegó perfectamente empacado y listo para regalar.",
    author: "Luis Cárdenas",
    event: "Regalo Personal · León",
  },
  {
    quote:
      "Las cajas personalizadas hicieron que todo se viera mucho más elegante. Valió totalmente la pena.",
    author: "Patricia Gómez",
    event: "Boda · Querétaro",
  },
  {
    quote:
      "La botella fue el centro de atención durante toda la celebración. Todos querían saber dónde la habíamos hecho.",
    author: "Andrea Navarro",
    event: "XV Años · Aguascalientes",
  },
  {
    quote:
      "El acabado luce increíble en persona. Las fotografías no le hacen justicia al nivel real de detalle.",
    author: "Ricardo Torres",
    event: "Aniversario · Guadalajara",
  },
  {
    quote:
      "La comunicación por WhatsApp fue muy sencilla y el diseño quedó aprobado en cuestión de horas.",
    author: "Eduardo Castillo",
    event: "Cumpleaños · Puebla",
  },
  {
    quote:
      "Queríamos algo auténticamente mexicano y elegante. Superó nuestras expectativas por completo.",
    author: "Mariana Lozano",
    event: "Boda · Oaxaca",
  },
  {
    quote:
      "Cada uno de nuestros invitados se llevó una botella personalizada y todavía siguen hablándonos de ellas meses después.",
    author: "Héctor Silva",
    event: "Evento Corporativo · Cancún",
  },
];

const ROW_2: Review[] = [...REVIEWS.slice(3), ...REVIEWS.slice(0, 3)];

const MARQUEE_STYLES = `
  @keyframes marquee-left {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  @keyframes marquee-right {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }

  .marquee-left {
    animation: marquee-left 38s linear infinite;
  }

  .marquee-right {
    animation: marquee-right 44s linear infinite;
  }

  .marquee-paused {
    animation-play-state: paused !important;
  }
`;

function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className="flex w-[320px] shrink-0 flex-col gap-3.5 rounded-2xl border border-neutral-200 bg-neutral-100 p-5.5"
      itemScope
      itemType="https://schema.org/Review"
    >
      <header className="flex items-center gap-3">
        <div
          className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#c92532] text-[15px] font-semibold text-white select-none"
          style={{
            boxShadow: "0 8px 18px rgba(217, 13, 43, 0.18)",
          }}
          aria-hidden="true"
        >
          {review.author.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p
            className="truncate text-[14px] font-bold leading-snug text-neutral-900"
            itemProp="author"
          >
            {review.author}
          </p>
        </div>
      </header>

      <div role="img" aria-label="5 de 5 estrellas" className="flex gap-px">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className="text-[16px] leading-none text-yellow-400"
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>

      <blockquote
        className="text-[14px] font-normal leading-[1.75] text-neutral-600 text-justify"
        itemProp="reviewBody"
      >
        "{review.quote}"
      </blockquote>
    </article>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Review[];
  reverse?: boolean;
}) {
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`flex w-max gap-3.5 ${
          reverse ? "marquee-right" : "marquee-left"
        } ${paused ? "marquee-paused" : ""}`}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.author}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  return (
    <>
      <style>{MARQUEE_STYLES}</style>

      <section
        id="opiniones"
        aria-labelledby="reviews-heading"
        itemScope
        itemType="https://schema.org/ItemList"
        className="relative overflow-hidden bg-white py-24"
        style={{
          width: "100vw",
          position: "relative",
          left: "50%",
          marginLeft: "-50vw",
        }}
      >
        <div className="mb-14 px-20 text-center max-sm:px-6">
          <motion.h2
            id="reviews-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="text-[clamp(2.15rem,5vw,4rem)] font-extrabold leading-[1.08] tracking-tight text-neutral-900"
          >
            <span className="block sm:inline">Lo que dicen</span>{" "}
            <span className="block sm:inline">nuestros clientes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-500"
          >
            Más de 50 personas han hecho de sus eventos algo inolvidable.
          </motion.p>
        </div>

        <div className="relative">
          <div className="flex flex-col gap-3.5">
            <MarqueeRow items={REVIEWS} />
            <MarqueeRow items={ROW_2} reverse />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-linear-to-r from-white to-transparent sm:w-32"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-linear-to-l from-white to-transparent sm:w-32"
          />
        </div>
      </section>
    </>
  );
}