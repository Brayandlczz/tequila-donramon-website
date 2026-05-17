"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface NavLink { label: string; href: string }

const NAV_LINKS: NavLink[] = [
  { label: "Ocasiones",       href: "#ocasiones"       },
  { label: "Personalización", href: "#personalizacion"  },
  { label: "La experiencia",  href: "#experiencia"      },
  { label: "Complementos",  href: "#complementos"      },
  { label: "Galería",        href: "#galeria"         },
  { label: "Contacto",        href: "#contacto"         },
];

const SCROLL_THRESHOLD = 60;
const ease = [0.22, 1, 0.36, 1] as const;

const menuVariants = {
  closed: { clipPath: "inset(0 0 100% 0)", opacity: 0, transition: { duration: 0.35, ease } },
  open:   { clipPath: "inset(0 0 0% 0)",   opacity: 1, transition: { duration: 0.4,  ease } },
};

const itemVariants = {
  closed: { opacity: 0, x: -12 },
  open:   (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.35, delay: 0.08 + i * 0.06, ease },
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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu  = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  return (
    <>
      <motion.header
        role="banner"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className={[
          "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "border-b border-white/[0.06] bg-[var(--surface-0)]/90 backdrop-blur-md py-4"
            : "bg-transparent py-6",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-16">

          <a
            href="/"
            aria-label="Don Ramón Personalizado — Ir al inicio"
            className="relative h-10 w-36 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]"
          >
            <Image
              src="/images/branding/logo.webp"
              alt="Don Ramón Personalizado"
              fill
              sizes="144px"
              className="object-contain object-left"
              priority
            />
          </a>

          <nav aria-label="Navegación principal" className="hidden items-center gap-8 md:flex lg:gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="
                  relative text-[10px] font-medium tracking-[0.3em] uppercase
                  text-white/70 transition-colors duration-300 hover:text-white
                  after:absolute after:-bottom-0.5 after:left-0 after:h-px
                  after:w-0 after:bg-[var(--gold)] after:transition-all after:duration-300
                  hover:after:w-full
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]
                "
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            aria-label="Cotizar botella personalizada Don Ramón"
            className="
              hidden md:inline-flex items-center gap-2
              border border-[var(--gold)]/70 px-5 py-2.5
              text-[10px] font-semibold tracking-[0.3em] uppercase
              text-[var(--gold)] transition-all duration-300
              hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)]
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]
            "
          >
            Cotizar
          </a>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="relative flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]"
          >
            {[
              menuOpen ? "translate-y-[5px] rotate-45"   : "",
              menuOpen ? "opacity-0 scale-x-0"            : "",
              menuOpen ? "-translate-y-[5px] -rotate-45"  : "",
            ].map((extra, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`block h-px w-6 bg-white origin-center transition-all duration-300 ${extra}`}
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
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-[var(--surface-0)] px-5 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Navegación móvil">
              <ul className="flex flex-col gap-1" role="list">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li key={href} custom={i} variants={itemVariants} initial="closed" animate="open" exit="closed">
                    <a
                      href={href}
                      onClick={closeMenu}
                      className="
                        flex items-center justify-between
                        border-b border-white/[0.07] py-5
                        text-[22px] font-extralight tracking-tight text-white
                        transition-colors duration-300 hover:text-[var(--gold)]
                        focus-visible:outline-none focus-visible:text-[var(--gold)]
                      "
                    >
                      {label}
                      <span aria-hidden="true" className="text-base text-[var(--gold)]/40">→</span>
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
              <a
                href="#contacto"
                onClick={closeMenu}
                aria-label="Cotizar botella personalizada Don Ramón"
                className="
                  w-full bg-[var(--gold)] py-4 text-center
                  text-[11px] font-semibold tracking-[0.35em] uppercase text-black
                  transition-colors duration-300 hover:bg-[var(--gold-light)]
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]
                "
              >
                Cotizar ahora
              </a>
              <p className="text-center text-[9px] tracking-[0.4em] uppercase text-white/25">
                donramonpersonalizado.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
