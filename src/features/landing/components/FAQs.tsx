"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseBusiness, Package, Sparkles,
  BadgeCheck, Plus, X, Brush,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    icon: BadgeCheck,
    question: "¿Las botellas son originales de la marca?",
    answer:
      "Sí. Trabajamos exclusivamente con botellas originales y auténticas de la línea Don Ramón, garantizando calidad, presentación y autenticidad en cada pieza personalizada.",
  },
  {
    icon: Brush,
    question: "¿Puedo personalizar el diseño completamente?",
    answer:
      "Sí. Puedes elegir un diseño exclusivo solicitado por ti o seleccionar uno de nuestro catálogo. Personalizamos nombres, logotipos, fechas, frases especiales y más, creando piezas únicas para cada ocasión.",
  },
  {
    icon: Sparkles,
    question: "¿Qué incluye la experiencia personalizada?",
    answer:
      "Cada botella puede incluir grabado artesanal personalizado y acabados especiales. Contamos con grabados disponibles en 11 colores distintos para adaptarnos al estilo y temática de tu evento.",
  },
  {
    icon: Package,
    question: "¿Cuánto tiempo tarda un pedido en llegar a mi puerta?",
    answer:
      "El tiempo estimado de entrega es de aproximadamente 15 días hábiles a partir de la confirmación del pago. El tiempo puede variar según la cantidad y complejidad del diseño solicitado.",
  },
  {
    icon: BriefcaseBusiness,
    question: "¿Pueden realizar pedidos para eventos corporativos?",
    answer:
      "Sí. Personalizamos botellas para todo tipo de eventos: bodas, aniversarios, cumpleaños, eventos corporativos, lanzamientos, regalos empresariales, celebraciones y temporadas especiales.",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Sub-component ────────────────────────────────────────────────────────────

interface FAQItemProps {
  faq: (typeof FAQS)[number];
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  const Icon = faq.icon;

  return (
    // Schema.org: Question entity
    <motion.div
      itemProp="mainEntity"
      itemScope
      itemType="https://schema.org/Question"
      key={faq.question}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
      className={cx(
        "overflow-hidden rounded-[18px] border-[1.5px] transition-colors duration-200",
        isOpen
          ? "border-[#C9A84C]/40 bg-gray-50"
          : "border-gray-100 bg-gray-50 hover:border-[#C9A84C]/25",
      )}
    >
      <meta itemProp="name" content={faq.question} />

      <button
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left"
      >
        <div
          className={cx(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200",
            isOpen
              ? "bg-[#C9A84C] text-white"
              : "bg-[#C9A84C]/10 text-[#C9A84C]",
          )}
        >
          <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
        </div>

        <span
          className={cx(
            "flex-1 text-[15px] leading-snug transition-colors duration-200",
            isOpen
              ? "font-bold text-gray-900"
              : "font-semibold text-gray-700",
          )}
        >
          {faq.question}
        </span>

        <div
          className={cx(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200",
            isOpen
              ? "bg-[#C9A84C] text-white"
              : "bg-[#C9A84C]/10 text-[#C9A84C]",
          )}
        >
          {isOpen ? (
            <X size={14} strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <Plus size={14} strokeWidth={2.5} aria-hidden="true" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          // Schema.org: Answer entity
          <motion.div
            id={`faq-answer-${index}`}
            itemProp="acceptedAnswer"
            itemScope
            itemType="https://schema.org/Answer"
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <p
              itemProp="text"
              className="px-5 pb-5 pl-5 text-[14px] leading-[1.85] text-gray-500 sm:pl-20"
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FAQSection() {
  const [active, setActive] = useState<number>(0);

  const handleToggle = useCallback((index: number) => {
    setActive((prev) => (prev === index ? -1 : index));
  }, []);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      // Schema.org: FAQPage structured data
      itemScope
      itemType="https://schema.org/FAQPage"
      className="bg-white px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-[360px_1fr] lg:gap-20">

        {/* ── LEFT ── */}
        <div className="flex flex-col items-center lg:items-start lg:sticky lg:top-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#C9A84C]/50 px-4 py-1.5"
          >
            <span className="text-[10px] font-bold uppercase tracking-[.35em] text-[#C9A84C]">
              Centro de ayuda
            </span>
          </motion.div>

          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
            className="mb-5 text-center text-[clamp(3rem,5vw,5.5rem)] font-black leading-[.87] tracking-tight text-gray-900 lg:text-left"
          >
            Preguntas
            <br />
            <span className="text-[#C9A84C]">frecuentes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
            className="mb-9 text-center text-[15px] leading-[1.75] text-gray-500 lg:text-left"
          >
            Resuelve tus dudas antes de adquirir tu botella: desde
            personalización y tiempos de entrega hasta pedidos corporativos
            y experiencias premium.
          </motion.p>

          <div className="flex items-center justify-center gap-2.5 lg:justify-start">
            <span className="h-2 w-2 rounded-full bg-[#C9A84C]" />
            <span className="h-px w-16 bg-[#C9A84C]/70" />
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex flex-col gap-2.5">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={active === index}
              onToggle={handleToggle}
            />
          ))}
        </div>

      </div>
    </section>
  );
}