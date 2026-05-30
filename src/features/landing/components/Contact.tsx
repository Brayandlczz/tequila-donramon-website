"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Field = "nombre" | "telefono" | "ocasion" | "mensaje";

interface FormState {
  nombre: string;
  telefono: string;
  ocasion: string;
  mensaje: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const OCASIONES = [
  "Boda",
  "XV Años",
  "Aniversario",
  "Evento corporativo",
  "Cumpleaños",
  "Regalo personal",
  "Otro",
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, delay, ease: EASE },
});

// ─── Input component ──────────────────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  name: Field;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  as?: "input" | "textarea";
  required?: boolean;
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  as = "input",
  required,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  const baseClass =
    "w-full rounded-xl border bg-neutral-50 px-4 py-3.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors duration-200 " +
    (focused ? "border-neutral-900 bg-white" : "border-neutral-200");

  const shared = {
    id: name,
    name,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    placeholder,
    required,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-400"
      >
        {label}
        {required && <span className="ml-0.5 text-neutral-300">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          {...shared}
          rows={4}
          className={baseClass + " resize-none"}
        />
      ) : (
        <input {...shared} type={type} className={baseClass} />
      )}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    nombre: "",
    telefono: "",
    ocasion: "",
    mensaje: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function selectOcasion(value: string) {
    setForm((prev) => ({ ...prev, ocasion: value }));
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
      className="w-full bg-white px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-[380px_1fr] lg:gap-24">

        {/* ── LEFT ── */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            {...fadeUp(0.05)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border-[1.5px] border-neutral-200 px-4 py-1.5"
          >
            <span className="text-[10px] font-bold uppercase tracking-[.35em] text-neutral-400">
              Cotización
            </span>
          </motion.div>

          <motion.h2
            id="contact-heading"
            {...fadeUp(0.1)}
            className="mb-5 text-[clamp(2.8rem,4.5vw,5rem)] font-black leading-[.9] tracking-tight text-neutral-900"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            Hablemos
            <br />
            <span className="text-neutral-400">de tu proyecto.</span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.15)}
            className="mb-10 max-w-sm text-[14px] leading-[1.8] text-neutral-500"
          >
            Cuéntanos la ocasión, la cantidad y cualquier detalle especial.
            Te respondemos en menos de 24 horas.
          </motion.p>

          {/* Trust indicators */}
          <motion.ul
            {...fadeUp(0.2)}
            className="flex flex-col gap-3"
            aria-label="Garantías"
          >
            {[
              "Respuesta en menos de 24 h",
              "Muestras de diseño sin costo",
              "Envío a toda la República",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center justify-center gap-3 lg:justify-start"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                <span className="text-[12px] text-neutral-500">{item}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            {...fadeUp(0.25)}
            className="mt-10 flex items-center justify-center gap-2.5 lg:justify-start"
          >
            <span className="h-2 w-2 rounded-full bg-neutral-900" />
            <span className="h-px w-16 bg-neutral-300" />
          </motion.div>
        </div>

        {/* ── RIGHT ── */}
        <motion.div {...fadeUp(0.1)}>
          <AnimatePresence mode="wait">
            {sent ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex h-full min-h-105 flex-col items-center justify-center gap-6 rounded-3xl border border-neutral-100 bg-neutral-50 px-8 text-center"
              >
                <CheckCircle size={40} strokeWidth={1.5} className="text-neutral-900" />
                <div>
                  <p className="mb-2 text-[18px] font-black tracking-tight text-neutral-900"
                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                  >
                    Mensaje enviado.
                  </p>
                  <p className="text-[13px] leading-[1.8] text-neutral-500">
                    Nos pondremos en contacto contigo en menos de 24 horas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => { setSent(false); setForm({ nombre: "", telefono: "", ocasion: "", mensaje: "" }); }}
                  className="text-[11px] uppercase tracking-[0.35em] text-neutral-400 underline underline-offset-4 transition-colors hover:text-neutral-900"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
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
                    label="Teléfono / WhatsApp"
                    name="telefono"
                    type="tel"
                    placeholder="+52 000 000 0000"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Ocasión */}
                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-neutral-400">
                    Ocasión
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {OCASIONES.map((oc) => (
                      <button
                        key={oc}
                        type="button"
                        onClick={() => selectOcasion(oc)}
                        className={[
                          "rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] transition-all duration-200",
                          form.ocasion === oc
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-200 text-neutral-500 hover:border-neutral-400",
                        ].join(" ")}
                      >
                        {oc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mensaje */}
                <InputField
                  label="Cuéntanos más"
                  name="mensaje"
                  placeholder="Cantidad de botellas, diseño, fecha del evento…"
                  value={form.mensaje}
                  onChange={handleChange}
                  as="textarea"
                />

                {/* Submit */}
                <div className="flex items-center justify-between gap-6">
                  <p className="text-[11px] text-neutral-400">
                    * Campos obligatorios
                  </p>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !form.nombre || !form.telefono}
                    className="group relative inline-flex items-center gap-3 overflow-hidden border border-neutral-900 bg-neutral-900 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition-all duration-300 hover:bg-white hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}