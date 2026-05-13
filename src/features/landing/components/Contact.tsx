"use client";

import { useState, useCallback, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormState {
  nombre:  string;
  empresa: string;
  evento:  string;
  piezas:  string;
  mensaje: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormState = { nombre: "", empresa: "", evento: "", piezas: "", mensaje: "" };

const EVENTOS = ["Boda", "XV Años", "Graduación", "Aniversario", "Evento corporativo", "Regalo personal", "Otro"] as const;
const PIEZAS  = ["1 – 10 piezas", "11 – 50 piezas", "51 – 100 piezas", "Más de 100 piezas", "Aún no lo sé"] as const;

const INFO_ITEMS = [
  { label: "Website", value: "donramonpersonalizado.com",          href: "https://www.donramonpersonalizado.com",    external: true  },
  { label: "Email",   value: "carlos.hernandez@dontequila.com.mx", href: "mailto:carlos.hernandez@dontequila.com.mx", external: false },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }, transition: { duration: 0.8, delay, ease },
});
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 }, whileInView: { opacity: 1 },
  viewport: { once: true }, transition: { duration: 0.9, delay },
});

const fieldBase = [
  "w-full bg-transparent border-b border-white/10 pb-4 pt-2",
  "text-[15px] font-light text-white placeholder:text-white/20",
  "transition-colors duration-300 focus:outline-none focus:border-[var(--gold)]/60",
  "disabled:opacity-40 disabled:cursor-not-allowed",
].join(" ");

const labelBase  = "block mb-2 text-[9px] font-medium tracking-[0.45em] uppercase text-[var(--gold)]/60";
const selectWrap = "relative flex flex-col";
const arrowIcon  = "pointer-events-none absolute right-0 bottom-[18px] text-[var(--gold)]/50 text-[8px] tracking-widest";

export default function Contact() {
  const [form,   setForm]   = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const isLoading = status === "loading";

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 1400));
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  }, []);

  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className="w-full overflow-hidden bg-black min-h-svh flex flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-16"> 
        <div className="grid w-full gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">

          <div className="flex flex-col gap-12 lg:justify-between">
            <div>
              <motion.div {...fadeIn(0)} className="mb-6 flex items-center gap-4">
                <div aria-hidden="true" className="h-px w-8 shrink-0 bg-[var(--gold)]" />
                <p className="text-[10px] font-medium tracking-[0.5em] uppercase text-[var(--gold)]">
                  Comienza tu proyecto
                </p>
              </motion.div>

              <motion.h2
                id="contact-heading"
                {...fadeUp(0.1)}
                className="mb-5 text-[clamp(1.75rem,5vw,3.5rem)] font-extralight leading-[1.08] tracking-tight text-white"
              >
                Cada gran momento
                <br />
                <em className="not-italic text-[var(--gold)]">merece ser recordado para siempre.</em>
              </motion.h2>

              <motion.p {...fadeUp(0.2)} className="text-[13px] leading-relaxed text-white/50">
                Cuéntanos tu historia. Nuestro equipo diseñará contigo
                la botella que nadie va a olvidar.
              </motion.p>
            </div>

            <motion.div {...fadeIn(0.3)}>
              <div aria-hidden="true" className="mb-7 h-px w-full bg-white/[0.07]" />
              <ul aria-label="Información de contacto Don Ramón Personalizado" className="flex flex-col gap-5" role="list">
                {INFO_ITEMS.map(({ label, value, href, external }) => (
                  <li key={label} className="flex flex-col gap-1">
                    <span className="text-[9px] font-medium tracking-[0.45em] uppercase text-white/30">{label}</span>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="break-all text-[13px] text-white/50 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-[var(--gold)]"
                    >
                      {value}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div {...fadeIn(0.2)}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  role="status" aria-live="polite"
                  className="flex flex-col justify-center gap-5 py-10"
                >
                  <div aria-hidden="true" className="h-px w-10 bg-[var(--gold)]" />
                  <p className="text-[clamp(1.4rem,3vw,2.2rem)] font-extralight leading-snug text-white">
                    Mensaje enviado.
                    <br />
                    <em className="not-italic text-[var(--gold)]">Pronto estaremos en contacto.</em>
                  </p>
                  <p className="text-[13px] text-white/45">
                    Revisa tu bandeja de entrada en las próximas horas.
                  </p>
                  <button
                    type="button" onClick={() => setStatus("idle")}
                    className="w-fit cursor-pointer text-[10px] font-medium tracking-[0.35em] uppercase text-white/30 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-[var(--gold)]"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit} noValidate
                  aria-label="Formulario de cotización — Don Ramón Personalizado"
                  className="flex flex-col gap-8"
                >
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="flex flex-col">
                      <label htmlFor="nombre" className={labelBase}>Nombre <span aria-hidden="true">*</span></label>
                      <input
                        id="nombre" name="nombre" type="text" required autoComplete="name"
                        placeholder="Tu nombre completo"
                        value={form.nombre} onChange={handleChange}
                        disabled={isLoading} aria-required="true"
                        className={fieldBase}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="empresa" className={labelBase}>
                        Empresa <span className="normal-case tracking-normal text-white/20">(opcional)</span>
                      </label>
                      <input
                        id="empresa" name="empresa" type="text" autoComplete="organization"
                        placeholder="Tu empresa u organización"
                        value={form.empresa} onChange={handleChange}
                        disabled={isLoading} className={fieldBase}
                      />
                    </div>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className={selectWrap}>
                      <label htmlFor="evento" className={labelBase}>Tipo de evento <span aria-hidden="true">*</span></label>
                      <select
                        id="evento" name="evento" required
                        value={form.evento} onChange={handleChange}
                        disabled={isLoading} aria-required="true"
                        className={[fieldBase, "appearance-none cursor-pointer pr-6", form.evento === "" ? "text-white/20" : "text-white"].join(" ")}
                      >
                        <option value="" disabled>Selecciona</option>
                        {EVENTOS.map((e) => <option key={e} value={e} className="bg-black text-white">{e}</option>)}
                      </select>
                      <span aria-hidden="true" className={arrowIcon}>▼</span>
                    </div>
                    <div className={selectWrap}>
                      <label htmlFor="piezas" className={labelBase}>Cantidad <span aria-hidden="true">*</span></label>
                      <select
                        id="piezas" name="piezas" required
                        value={form.piezas} onChange={handleChange}
                        disabled={isLoading} aria-required="true"
                        className={[fieldBase, "appearance-none cursor-pointer pr-6", form.piezas === "" ? "text-white/20" : "text-white"].join(" ")}
                      >
                        <option value="" disabled>Selecciona</option>
                        {PIEZAS.map((p) => <option key={p} value={p} className="bg-black text-white">{p}</option>)}
                      </select>
                      <span aria-hidden="true" className={arrowIcon}>▼</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="mensaje" className={labelBase}>Tu proyecto <span aria-hidden="true">*</span></label>
                    <textarea
                      id="mensaje" name="mensaje" required rows={4}
                      placeholder="Fecha del evento, diseño que tienes en mente, línea de botella preferida…"
                      value={form.mensaje} onChange={handleChange}
                      disabled={isLoading} aria-required="true"
                      className={[fieldBase, "resize-none"].join(" ")}
                    />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="-mt-2 text-[12px] text-red-400/75">
                      Hubo un problema al enviar. Intenta de nuevo o escríbenos directamente.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-5 pt-1">
                    <button
                      type="submit" disabled={isLoading}
                      aria-label={isLoading ? "Enviando mensaje…" : "Enviar solicitud de cotización — Don Ramón Personalizado"}
                      className="group inline-flex items-center gap-3 border border-[var(--gold)] px-8 py-4 sm:px-10 text-[11px] font-semibold tracking-[0.3em] uppercase text-[var(--gold)] transition-all duration-300 hover:bg-[var(--gold)] hover:text-black disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]"
                    >
                      {isLoading ? (
                        <>
                          <span aria-hidden="true" className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current/20 border-t-current" />
                          Enviando…
                        </>
                      ) : (
                        <>
                          Solicitar cotización
                          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] leading-relaxed text-white/45">
                      Al enviar aceptas nuestra{" "}
                      <a href="/privacidad" className="underline underline-offset-2 transition-colors duration-300 hover:text-white/45">
                        política de privacidad
                      </a>.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
