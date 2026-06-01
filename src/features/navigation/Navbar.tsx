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
              className="object-contain object-left scale-200 origin-left"
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
          href="#contact"
            aria-label="Cotizar botella personalizada Don Ramón"
            className="
              hidden items-center gap-2 md:inline-flex
              border border-white/50 rounded-full px-4 py-1.5
              text-[10px] font-bold uppercase tracking-[0.32em]
              text-white/90 transition-all duration-300 hover:border-white hover:text-white
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c92532]
            "
          >
            Contacto
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
                <p className="text-[8px] uppercase tracking-[0.45em] text-white/70">
                  Franquicia | MX 924872
                </p>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <a
                href="#contact"
                onClick={closeMenu}
                aria-label="Cotizar botella personalizada Don Ramón"
                className="
                  w-full bg-[#c92532] py-4 text-center
                  text-[11px] font-semibold uppercase tracking-[0.35em] text-white
                  transition-colors duration-300 hover:bg-[#a91f29]
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c92532]
                "
              >
                Cotizar
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}