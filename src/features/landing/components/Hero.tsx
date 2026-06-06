"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const PRODUCTS = [
  { img: "/images/carousel/bottle-01.webp" },
  { img: "/images/carousel/bottle-02.webp" },
  { img: "/images/carousel/bottle-03.webp" },
  { img: "/images/carousel/bottle-04.webp" },
];

function ProductCard() {
  const [cur, setCur] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setCur((p) => (p + 1) % PRODUCTS.length);
    }, 3600);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 55 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
      className="relative w-97.5 overflow-hidden rounded-[28px] bg-[#f8f1e6]/80 shadow-[0_30px_90px_rgba(0,0,0,.55)] backdrop-blur-md xl:w-112.5"
    >
      <div className="relative aspect-[4/4.9] w-full bg-[#eadfce]">
        {PRODUCTS.map((p, i) => (
          <div
            key={p.img}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === cur ? 1 : 0 }}
          >
            <Image
              src={p.img}
              alt=""
              fill
              sizes="340px"
              className="object-cover"
            />
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ver imagen ${i + 1}`}
              onClick={() => setCur(i)}
              className="h-0.75 rounded-full transition-all"
              style={{
                width: i === cur ? 36 : 16,
                background: i === cur ? "#fff" : "rgba(255,255,255,.45)",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="relative min-h-svh w-full overflow-hidden">
      {/* Background con parallax */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-0 z-0 scale-[1.04]"
      >
        <Image
          src="/images/backgrounds/hero-bg.avif"
          alt=""
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Scrims */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,.62)_0%,rgba(0,0,0,.38)_40%,rgba(0,0,0,.1)_70%,rgba(0,0,0,.08)_100%)]" />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(0,0,0,.48)_0%,rgba(0,0,0,.14)_50%,rgba(0,0,0,0)_100%)]" />

      {/* Content */}
      <div className="relative z-20 flex min-h-svh items-center justify-center gap-20 px-6 pt-20 sm:px-8 sm:pt-24 lg:px-16">
        {/* Texto */}
        <div className="min-w-0 flex-1 overflow-hidden text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="mb-6 inline-flex whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[8px] uppercase tracking-[0.16em] text-white backdrop-blur-md sm:mb-8 sm:px-6 sm:py-3 sm:text-[10px] sm:tracking-[0.18em]"
          >
            Sin mínimo de piezas · Envíos a todo México
          </motion.div>

          <p className="mb-5 flex items-center gap-3 font-bold sm:font-normal text-[9px] uppercase tracking-[0.28em] text-white/90 sm:mb-6 sm:gap-4 sm:text-[10px] sm:tracking-[0.4em]">
            <span className="h-px w-10 bg-white/60" />
            Atención personalizada · Respuesta en &lt;24 hrs
          </p>

          {/* Headline */}
          <div className="mb-6 sm:mb-8">
            {["Graba tu historia", "en una botella", "Don Ramón."].map(
              (line, i) => (
                <div key={line} className="overflow-hidden">
                  <motion.span
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.25 + i * 0.12,
                      ease: EASE,
                    }}
                    className="block text-[clamp(2rem,10vw,3.45rem)] font-black leading-[.88] tracking-[-0.02em] text-white sm:text-[clamp(3rem,5.5vw,6.5rem)]"
                    style={{
                      fontFamily:
                        "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      textShadow:
                        "0 2px 8px rgba(0,0,0,.6), 0 12px 40px rgba(0,0,0,.45)",
                      fontStretch: "condensed",
                    }}
                  >
                    {line}
                  </motion.span>
                </div>
              )
            )}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
            className="flex flex-col items-start gap-4"
          >
            <a
              href="https://wa.me/528148907348"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 self-start overflow-hidden whitespace-nowrap bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] sm:px-8 sm:py-4 sm:text-[11px] sm:tracking-[0.35em]"
            >
              <svg fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"/></svg>

              <span>Cotizar por WhatsApp</span>

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>

            <p className="max-w-xs text-[12px] font-light leading-[1.65] text-white/90 sm:leading-[1.7]">
              Botellas personalizadas para celebraciones, regalos y eventos
              memorables.{" "}
              <span className="font-semibold text-white">
                El regalo que nadie olvidará.
              </span>
            </p>
          </motion.div>
        </div>

        {/* Card carrusel */}
        <div className="hidden lg:block">
          <ProductCard />
        </div>
      </div>

      {/* Línea vertical decorativa */}
      <div className="absolute bottom-0 right-9 z-30 hidden h-28 w-px bg-linear-to-b from-white/40 to-transparent lg:block" />
    </section>
  );
}