"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

type Field = "nombre" | "correo" | "ocasion" | "mensaje";

interface FormState {
  nombre: string;
  correo: string;
  ocasion: string;
  mensaje: string;
}

const OCASIONES = [
  "Boda", "XV Años", "Aniversario", "Corporativo",
  "Cumpleaños", "Regalo personal", "Temporada", "Otro",
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, delay, ease: EASE },
});

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg fill="currentColor" aria-hidden="true" className={className} viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"/></svg>
);

interface InputFieldProps {
  label: string;
  name: Field;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  as?: "input" | "textarea";
  required?: boolean;
  centerMobile?: boolean;
}

function InputField({ label, name, type = "text", placeholder, value, onChange, as = "input", required, centerMobile = false }: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  const baseClass =
    "w-full rounded-xl border bg-neutral-50 px-4 py-3.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors duration-200 " +
    (focused ? "border-[#c92532] bg-white ring-1 ring-[#c92532]/20" : "border-neutral-200") +
    (centerMobile ? " text-center lg:text-left" : "");

  const shared = {
    id: name, name, value, onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    placeholder, required,
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-700">
          {label}{required && <span className="ml-0.5 text-[#c92532]">*</span>}
        </label>
      )}
      {as === "textarea"
        ? <textarea {...shared} rows={4} className={baseClass + " resize-none"} />
        : <input {...shared} type={type} className={baseClass} />}
    </div>
  );
}

// ── WhatsApp desktop (horizontal) ─────────────────────────────────────────────
function WhatsAppBlock() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <p
            className="whitespace-nowrap text-[12px] font-black tracking-tight text-neutral-900"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            ¿Prefieres hablar directamente?
          </p>
          <p className="mt-1 text-[11px] leading-snug text-neutral-500 whitespace-nowrap">
            Te respondemos en menos de 24 horas.
          </p>
        </div>
        <a
          href="https://wa.me/528148907348"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:brightness-95"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

function WhatsAppBlockMobile() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-center">
      <p
        className="text-[13px] font-black tracking-tight text-neutral-900"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        ¿Prefieres hablar directamente?
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
        Te respondemos en menos de 24 horas.
      </p>
      <a
        href="https://wa.me/528148907348"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:brightness-95"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Escribir por WhatsApp
      </a>
    </div>
  );
}

function HeaderContent({ centered = false }: { centered?: boolean }) {
  return (
    <>
      <motion.div
        {...fadeUp(0.05)}
        className={`mb-6 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#c92532]/30 bg-[#c92532]/5 px-4 py-1.5 ${centered ? "self-center" : ""}`}
      >
        <span className="text-[10px] font-bold uppercase tracking-[.35em] text-[#c92532]">
          Cotización
        </span>
      </motion.div>

      <motion.h2
        id={centered ? undefined : "contact-heading"}
        {...fadeUp(0.1)}
        className={`mb-5 text-[clamp(2.8rem,4.5vw,5rem)] font-black leading-[.9] tracking-tight text-neutral-900 ${centered ? "text-center" : ""}`}
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        Tu ocasión merece
        <br />
        <span className="text-[#c92532]">una botella única.</span>
      </motion.h2>

      <motion.p
        {...fadeUp(0.15)}
        className={`max-w-sm text-[14px] leading-[1.8] text-neutral-700 ${centered ? "text-center" : "text-justify"}`}
      >
        Cuéntanos para quién es, cuántas botellas necesitas y cualquier detalle especial.
        Te ayudaremos a encontrar el diseño ideal para tu ocasión.
      </motion.p>
    </>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ nombre: "", correo: "", ocasion: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function selectOcasion(value: string) {
    setForm((prev) => ({ ...prev, ocasion: value }));
  }

  async function handleSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
      className="w-full bg-white px-6 py-10 sm:px-10 sm:py-28 scroll-mt-16"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[380px_1fr] lg:gap-24">

        <div className="flex flex-col items-center lg:hidden">
          <HeaderContent centered />
        </div>

        <motion.div {...fadeUp(0.1)} className="lg:order-2">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex h-full min-h-96 flex-col items-center justify-center gap-6 rounded-3xl border border-neutral-100 bg-neutral-50 px-8 text-center"
              >
                <CheckCircle size={40} strokeWidth={1.5} className="text-[#c92532]" />
                <div>
                  <p
                    className="mb-2 text-[18px] font-black tracking-tight text-neutral-900"
                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                  >
                    Mensaje enviado.
                  </p>
                  <p className="text-[13px] leading-[1.8] text-neutral-600">
                    Nos pondremos en contacto contigo en menos de 24 horas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => { setSent(false); setForm({ nombre: "", correo: "", ocasion: "", mensaje: "" }); }}
                  className="text-[11px] uppercase tracking-[0.35em] text-neutral-400 underline underline-offset-4 transition-colors hover:text-neutral-900"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-8"
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <InputField
                    label="Nombre completo"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    label="Correo electrónico"
                    name="correo"
                    type="email"
                    placeholder="tu@correo.com"
                    value={form.correo}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Ocasión */}
                <div>
                  <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-700 lg:text-left">
                    Ocasión{" "}
                    <span className="normal-case tracking-normal font-normal text-neutral-600">(opcional)</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {OCASIONES.map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => selectOcasion(label)}
                        className={[
                          "rounded-xl border px-3 py-2.5 text-center text-[11px] font-medium tracking-wide transition-all duration-200",
                          form.ocasion === label
                            ? "border-[#c92532] bg-[#c92532]/5 text-[#c92532]"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50",
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-1.5">
                  <p className="text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-700 lg:text-left">
                    Cuéntanos tu historia
                  </p>
                  <p className="text-center text-[11px] italic text-neutral-500 lg:text-left">
                    Compártenos tu idea y nosotros nos encargamos del resto.
                  </p>
                  <InputField
                    label=""
                    name="mensaje"
                    placeholder="Cantidad de botellas, fecha del evento, a quién va dedicada, qué quieres que diga…"
                    value={form.mensaje}
                    onChange={handleChange}
                    as="textarea"
                    centerMobile
                  />
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                  <p className="text-[11px] text-neutral-500">* Campos obligatorios</p>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !form.nombre || !form.correo || !form.mensaje} 
                    className="group inline-flex w-full items-center justify-center gap-3 border border-[#c92532] bg-[#c92532] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition-all duration-300 hover:bg-white hover:text-[#c92532] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                          animate={{
                            x: [0, 6, 80],
                            y: [0, -6, -60],
                            rotate: [0, -15, -30],
                            opacity: [1, 1, 0],
                            transition: { duration: 0.7, ease: "easeIn" as const },
                          }}
                          className="inline-flex"
                        >
                          <Send size={13} strokeWidth={2} aria-hidden="true" />
                        </motion.span>
                        Enviando…
                      </span>
                    ) : (
                      <>
                        Solicitar cotización
                        <Send
                          size={13}
                          strokeWidth={2}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>
                </div>

                <div className="lg:hidden">
                  <WhatsAppBlockMobile />
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="hidden flex-col items-start text-left lg:order-1 lg:flex">
          <HeaderContent />
          <motion.div {...fadeUp(0.2)} className="mt-8 w-full">
            <WhatsAppBlock />
          </motion.div>
        </div>

      </div>
    </section>
  );
}