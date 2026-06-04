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
    question: "¿Las botellas son originales de Tequila Don Ramón?",
    answer:
      "Sí. Todas nuestras personalizaciones se realizan sobre botellas originales y auténticas de la línea Tequila Don Ramón, conservando su presentación, calidad y autenticidad.",
  },
  {
    icon: Brush,
    question: "¿Qué puedo personalizar en mi botella?",
    answer:
      "Podemos personalizar nombres, fechas, logotipos, frases especiales, mensajes conmemorativos y diseños exclusivos. También contamos con opciones prediseñadas listas para adaptar a tu evento.",
  },
  {
    icon: Sparkles,
    question: "¿Existe un pedido mínimo para personalizar?",
    answer:
      "No. Puedes solicitar desde una sola botella personalizada hasta pedidos para eventos corporativos, bodas, aniversarios o celebraciones de gran volumen.",
  },
  {
    icon: Package,
    question: "¿Cuánto tiempo tarda la producción y entrega?",
    answer:
      "El tiempo promedio es de 10 a 15 días hábiles después de aprobar el diseño y confirmar el pago. En pedidos especiales o grandes volúmenes, el tiempo puede variar según la complejidad del proyecto.",
  },
  {
    icon: BriefcaseBusiness,
    question: "¿Realizan envíos a todo México?",
    answer:
      "Sí. Enviamos a cualquier parte de México mediante paquetería especializada para garantizar que cada botella llegue protegida y en perfectas condiciones.",
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
      className="bg-white px-6 py-10 sm:px-10 sm:py-0 min-h-svh flex items-center scroll-mt-16"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[360px_1fr] lg:gap-20">

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