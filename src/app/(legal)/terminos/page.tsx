"use client";

import { type FC } from "react";
import { motion } from "framer-motion";

const CURRENT_YEAR = new Date().getFullYear();
const ease = [0.22, 1, 0.36, 1] as const;

interface SectionData {
  number: string;
  title: string;
  content: React.ReactNode;
}

const SECTIONS: SectionData[] = [
  {
    number: "I",
    title: "Aceptación de los términos",
    content: (
      <p>
        Al acceder y utilizar este sitio web, usted acepta quedar sujeto a los presentes términos y condiciones de uso. Si no está de acuerdo con cualquiera de estos términos, le recomendamos abstenerse de utilizar este sitio.
      </p>
    ),
  },
  {
    number: "II",
    title: "Servicios ofrecidos",
    content: (
      <>
        <p>
          Don Ramón Personalizado ofrece servicios de personalización artesanal de botellas premium para eventos y ocasiones especiales.
        </p>

        <ul className="mt-3 space-y-2">
          {[
            "Grabado personalizado sobre vidrio",
            "Diseños para eventos sociales y corporativos",
            "Complementos y accesorios premium",
            "Atención personalizada y cotizaciones",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-[9px] h-px w-4 shrink-0 bg-[var(--gold)]/50"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: "III",
    title: "Disponibilidad y modificaciones",
    content: (
      <p>
        Nos reservamos el derecho de modificar, suspender o descontinuar cualquier parte del sitio o de nuestros servicios sin previo aviso.
      </p>
    ),
  },
  {
    number: "IV",
    title: "Propiedad intelectual",
    content: (
      <p>
        Todos los contenidos presentes en este sitio, incluyendo imágenes, textos, logotipos, gráficos y diseños, son propiedad de Don Ramón Personalizado o de sus respectivos titulares y están protegidos por las leyes aplicables de propiedad intelectual.
      </p>
    ),
  },
  {
    number: "V",
    title: "Uso permitido",
    content: (
      <>
        <p>El usuario se compromete a utilizar este sitio únicamente con fines lícitos y de manera responsable.</p>

        <ul className="mt-3 space-y-2">
          {[
            "No realizar actividades fraudulentas",
            "No intentar vulnerar la seguridad del sitio",
            "No utilizar contenido con fines ilícitos o comerciales no autorizados",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-[9px] h-px w-4 shrink-0 bg-[var(--gold)]/50"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: "VI",
    title: "Limitación de responsabilidad",
    content: (
      <p>
        Don Ramón Personalizado no será responsable por daños directos o indirectos derivados del uso o imposibilidad de uso de este sitio web, incluyendo interrupciones, errores o fallas técnicas.
      </p>
    ),
  },
  {
    number: "VII",
    title: "Enlaces externos",
    content: (
      <p>
        Este sitio puede contener enlaces a sitios externos de terceros. No somos responsables por el contenido, políticas o prácticas de dichos sitios.
      </p>
    ),
  },
  {
    number: "VIII",
    title: "Legislación aplicable",
    content: (
      <p>
        Los presentes términos se rigen por las leyes vigentes en los Estados Unidos Mexicanos. Cualquier controversia será sometida a la jurisdicción competente en México.
      </p>
    ),
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

const Section: FC<{ data: SectionData; index: number }> = ({
  data,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.7, delay: index * 0.05, ease }}
    className={[
      "group grid gap-6 py-10 lg:grid-cols-[200px_1fr] lg:gap-16",
      index !== 0 ? "border-t border-white/[0.06]" : "",
    ].join(" ")}
  >
    {/* Label */}
    <div className="flex flex-row items-baseline gap-4 lg:flex-col lg:gap-3">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.05 + 0.15 }}
        className="font-mono text-[11px] tracking-[0.35em] text-[var(--gold)]/40 transition-colors duration-300 group-hover:text-[var(--gold)]/70"
      >
        {data.number}
      </motion.span>

      <h2 className="text-[12px] font-semibold uppercase tracking-[0.25em] text-white/60 transition-colors duration-300 group-hover:text-white/90 lg:leading-snug">
        {data.title}
      </h2>
    </div>

    {/* Content */}
    <div className="space-y-3 text-[13px] leading-relaxed text-white/45 sm:text-[14px]">
      {data.content}
    </div>
  </motion.div>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function TermsPage() {
  return (
    <main
      id="terminos"
      aria-labelledby="terms-heading"
      className="w-full overflow-hidden bg-[var(--surface-0)]"
    >
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">

        {/* Decorative gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--gold)]/[0.06] via-transparent to-transparent"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent"
        />

        {/* Animated orb */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease }}
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--gold)]/[0.04] blur-3xl"
        />

        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">

            <div className="hidden lg:block" />

            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
                className="mb-6 flex items-center gap-3"
              >
                <div
                  aria-hidden="true"
                  className="h-px w-8 shrink-0 bg-[var(--gold)]"
                />

                <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-[var(--gold)]">
                  Legal
                </p>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  id="terms-heading"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease }}
                  className="text-[clamp(2rem,6vw,4rem)] font-extralight leading-[1.05] tracking-tight text-white"
                >
                  Términos
                  <br />
                  <em className="not-italic text-[var(--gold)]">
                    y Condiciones
                  </em>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="mt-5 text-[12px] tracking-wide text-white/25"
              >
                Última actualización: {CURRENT_YEAR} · Franquicia MX 924872
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.55, ease }}
                aria-hidden="true"
                className="mt-8 h-px w-16 origin-left bg-[var(--gold)]/40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-2 sm:px-10 lg:px-16">
        {SECTIONS.map((s, i) => (
          <Section key={s.number} data={s} index={i} />
        ))}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-3 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-[11px] text-white/20">
            © {CURRENT_YEAR} Don Ramón Personalizado · Todos los derechos reservados.
          </p>

          <a
            href="/"
            className="text-[11px] text-[var(--gold)]/50 transition-colors duration-200 hover:text-[var(--gold)] focus-visible:outline-none focus-visible:text-[var(--gold)]"
          >
            ← Volver al inicio
          </a>
        </motion.div>
      </div>
    </main>
  );
}