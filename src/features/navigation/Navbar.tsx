"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Ocasiones", href: "#ocassions" },
  { label: "Personalización", href: "#personalization" },
  { label: "Complementos", href: "#complements" },
  { label: "Preguntas frecuentes", href: "#faq" },
];

const SCROLL_THRESHOLD = 60;
const ease = [0.22, 1, 0.36, 1] as const;

const menuVariants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    transition: { duration: 0.35, ease },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.4, ease },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: -12 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      delay: 0.08 + i * 0.06,
      ease,
    },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  return (
    <>
      <motion.header
        role="banner"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="fixed inset-x-0 top-0 z-50 w-full px-4 pt-4 sm:px-8 lg:px-16"
      >
        <div
          className={[
            "mx-auto flex w-full max-w-7xl items-center justify-between transition-all duration-500",
            scrolled
              ? "rounded-full border border-white/10 bg-black/60 px-5 py-3 shadow-[0_18px_60px_rgba(0,0,0,.25)] backdrop-blur-xl sm:px-6"
              : "bg-transparent px-0 py-2",
          ].join(" ")}
        >
          <a
            href="/"
            aria-label="Don Ramón Personalizado — Ir al inicio"
            className="relative h-8 w-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c92532] sm:h-9 sm:w-32"
          >
            <Image
              src="/images/branding/logo.webp"
              alt="Don Ramón Personalizado"
              fill
              sizes="192px"
              className="object-contain object-left scale-150 origin-left"
              priority
            />
          </a>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-10 md:flex lg:gap-12"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="
                  relative text-[10px] font-medium uppercase tracking-[0.32em]
                  text-white/82 transition-colors duration-300 hover:text-white
                  after:absolute after:-bottom-1 after:left-0 after:h-px
                  after:w-0 after:bg-[#c92532] after:transition-all after:duration-300
                  hover:after:w-full
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c92532]
                "
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="/galeria"
            className="
              hidden items-center gap-2 md:inline-flex
              bg-white rounded-full px-4 py-2.5
              text-[10px] font-medium uppercase tracking-[0.2em]
              text-black/82 transition-all duration-300 hover:bg-white/85
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white
            "
          >
            Galería de diseños
          </a>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c92532] md:hidden"
          >
            {[
              menuOpen ? "translate-y-[5px] rotate-45" : "",
              menuOpen ? "opacity-0 scale-x-0" : "",
              menuOpen ? "-translate-y-[5px] -rotate-45" : "",
            ].map((extra, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`block h-px w-6 origin-center bg-white transition-all duration-300 ${extra}`}
              />
            ))}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto
                       bg-black/75 px-6 pb-10 pt-28 backdrop-blur-2xl
                       md:hidden"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-24 h-px bg-white/10"
            />

            <nav aria-label="Navegación móvil">
              <ul className="flex flex-col gap-1" role="list">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <a
                      href={href}
                      onClick={closeMenu}
                      className="
                        group flex items-center justify-between
                        border-b border-white/[0.07] py-5
                        text-[22px] font-extralight tracking-tight text-white/90
                        transition-colors duration-300 hover:text-white
                        focus-visible:outline-none focus-visible:text-white
                      "
                    >
                      {label}
                      <span
                        aria-hidden="true"
                        className="text-sm text-white/20 transition-all duration-300
                                   group-hover:translate-x-1 group-hover:text-white/60"
                      >
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              custom={NAV_LINKS.length}
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-5"
            >
              <div
                aria-hidden="true"
                className="flex items-center gap-3 pb-1"
              >
                <div className="h-px flex-1 bg-white/10" />
                <p className="text-[8px] uppercase tracking-[0.45em] text-white/80">
                  Franquicia | MX 924872
                </p>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <a
                href="https://wa.me/528148907348"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                aria-label="Cotizar por WhatsApp"
                className="
                  w-full bg-[#25D366] py-4 text-center inline-flex items-center justify-center gap-2
                  text-[11px] font-bold uppercase tracking-[0.3em] text-white
                  transition-colors duration-300 hover:bg-[#1fbc59]
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#25D366]
                "
              >
                <svg fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"/></svg>
                Cotizar por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
