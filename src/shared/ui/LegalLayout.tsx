"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Section {
  id:      string;
  title:   string;
  content: string[];
}

interface LegalLayoutProps {
  badge:       string;
  title:       string;
  subtitle:    string;
  lastUpdated: string;
  dateISO:     string;
  meta:        { label: string; value: string }[];
  sections:    Section[];
  footerLink:  { href: string; label: string };
}

export default function LegalLayout({
  badge, title, subtitle, lastUpdated, dateISO, meta, sections, footerLink,
}: LegalLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-neutral-900">

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-neutral-200 px-5 sm:px-10 lg:px-16">
        <Link
          href="/"
          aria-label="Tequila Don Ramón Personalizado — Volver al inicio"
          className="group flex items-center"
        >
          <Image
            src="/images/branding/logo.webp"
            alt="Tequila Don Ramón Personalizado"
            width={120}
            height={40}
            className="h-9 w-auto object-contain brightness-0 transition-opacity duration-200 group-hover:opacity-70"
            priority
          />
        </Link>

        <Link
          href="/"
          className="text-[10px] font-medium tracking-[0.3em] uppercase text-neutral-400 transition-colors duration-200 hover:text-neutral-900"
        >
          ← Inicio
        </Link>
      </header>

      <div className="flex w-full flex-1">

        {/* ── Sidebar desktop ───────────────────────────────────────────── */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-neutral-200 px-8 py-12 xl:w-72 lg:flex">

          <div className="mb-10 space-y-5">
            <p className="text-[9px] font-medium tracking-[0.4em] uppercase text-neutral-400">
              {badge}
            </p>
            <h2 className="text-xl font-light leading-snug text-neutral-800">
              {title}
            </h2>
            <div className="space-y-3 border-t border-neutral-200 pt-4">
              <div>
                <span className="mb-0.5 block text-[8px] font-medium tracking-widest uppercase text-gold-dark">
                  Actualización
                </span>
                <time className="text-[9px] text-neutral-500" dateTime={dateISO}>
                  {lastUpdated}
                </time>
              </div>
              {meta.map((m) => (
                <div key={m.label}>
                  <span className="mb-0.5 block text-[8px] font-medium tracking-widest uppercase text-gold-dark">
                    {m.label}
                  </span>
                  <span className="text-[9px] text-neutral-500">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          <nav aria-label="Índice de secciones">
            <p className="mb-4 text-[8px] font-medium tracking-[0.4em] uppercase text-neutral-400">
              Índice
            </p>
            <ol className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block text-[9px] leading-relaxed tracking-wide text-neutral-500 transition-colors duration-200 hover:text-neutral-900"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-auto space-y-2 border-t border-neutral-200 pt-8">
            <Link
              href={footerLink.href}
              className="block text-[9px] font-medium tracking-widest uppercase text-neutral-400 transition-colors duration-200 hover:text-neutral-900"
            >
              {footerLink.label} →
            </Link>
            <p className="text-[8px] tracking-wide text-neutral-400">
              © {new Date().getFullYear()} Tequila Don Ramón Personalizado · MX 924872
            </p>
          </div>
        </aside>

        {/* ── Main content ──────────────────────────────────────────────── */}
        <main className="min-w-0 flex-1 px-5 py-14 sm:px-10 sm:py-16 xl:px-20">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 border-b border-neutral-200 pb-12"
          >
            <p className="mb-4 text-[10px] font-medium tracking-[0.45em] uppercase text-neutral-400 text-center lg:text-left">
              {badge}
            </p>
            <h1 className="mb-5 text-[clamp(2.4rem,5vw,4.5rem)] font-extralight leading-[1.02] tracking-tight text-neutral-900 text-center lg:text-left">
              {title}
            </h1>
            <p className="mb-8 max-w-xl text-[13px] leading-relaxed text-neutral-500 text-center lg:text-left">
              {subtitle}
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="border border-neutral-200 bg-neutral-50 px-4 py-2">
                <span className="mb-0.5 block text-[8px] font-medium tracking-widest uppercase text-gold-dark">
                  Actualización
                </span>
                <time className="text-[10px] text-neutral-600" dateTime={dateISO}>
                  {lastUpdated}
                </time>
              </div>
              {meta.map((m) => (
                <div key={m.label} className="border border-neutral-200 bg-neutral-50 px-4 py-2">
                  <span className="mb-0.5 block text-[8px] font-medium tracking-widest uppercase text-gold-dark">
                    {m.label}
                  </span>
                  <span className="text-[10px] text-neutral-600">{m.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Índice mobile */}
          <nav aria-label="Índice" className="mb-12 border border-neutral-200 bg-neutral-50 p-5 lg:hidden">
            <p className="mb-4 text-[9px] font-medium tracking-[0.4em] uppercase text-neutral-400 text-center">
              Índice
            </p>
            <ol className="space-y-2.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block text-center text-[11px] tracking-wide text-neutral-500 transition-colors duration-200 hover:text-neutral-900"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Secciones */}
          <article aria-label={`${title} — contenido completo`} className="space-y-14">
            {sections.map((s, i) => (
              <motion.section
                key={s.id}
                id={s.id}
                aria-labelledby={`heading-${s.id}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.03 }}
              >
                <h2
                  id={`heading-${s.id}`}
                  className="mb-5 text-[clamp(1.1rem,2.5vw,1.5rem)] font-semibold leading-snug tracking-tight text-neutral-800 text-center lg:text-left"
                >
                  {s.title}
                </h2>
                <div className="space-y-4">
                  {s.content.map((p, j) => (
                    <p
                      key={j}
                      className="whitespace-pre-line text-center lg:text-justify text-[13px] leading-[1.9] text-neutral-600 sm:text-[14px]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </motion.section>
            ))}
          </article>

          {/* Footer mobile */}
          <footer className="mt-20 flex flex-col gap-3 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between lg:hidden">
            <p className="text-[9px] tracking-wide uppercase text-neutral-400 text-center sm:text-left">
              © {new Date().getFullYear()} Tequila Don Ramón Personalizado · MX 924872
            </p>
            <Link
              href={footerLink.href}
              className="text-[9px] font-medium tracking-widest uppercase text-neutral-500 transition-colors duration-200 hover:text-neutral-900 text-center sm:text-left"
            >
              {footerLink.label} →
            </Link>
          </footer>
        </main>
      </div>
    </div>
  );
}