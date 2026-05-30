import type { FC } from "react";
import Image from "next/image";

interface FooterLink   { label: string; href: string; external?: boolean }
interface FooterColumn { heading: string; links: FooterLink[] }
interface SocialLink   { label: string; href: string; icon: FC<{ className?: string }> }

const COLUMNS: FooterColumn[] = [
  {
    heading: "Personalización",
    links: [
      { label: "Ocasiones",       href: "#ocassions"       },
      { label: "Cómo funciona",   href: "#personalization" },
      { label: "Complementos",    href: "#experience"       },
      { label: "Cotizar",         href: "#contact"       },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Aviso de privacidad", href: "/privacidad" },
      { label: "Términos de uso",     href: "/terminos"   },
      { label: "Consumo responsable", href: "https://www.alcoholinformate.org.mx", external: true },
    ],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

const WhatsAppIcon: FC<{ className?: string }> = ({ className }) => (
  <svg fill="currentColor" aria-hidden="true" className={className} viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"/></svg>
);

const InstagramIcon: FC<{ className?: string }> = ({ className }) => (
  <svg fill="currentColor" aria-hidden="true" className={className} viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881"/></svg>
);

const FacebookIcon: FC<{ className?: string }> = ({ className }) => (
  <svg fill="currentColor" aria-hidden="true" className={className} viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073"/></svg>
);

const SOCIAL_LINKS: SocialLink[] = [
  { label: "WhatsApp",  href: "https://wa.me/528148907348",                      icon: WhatsAppIcon  },
  { label: "Instagram", href: "https://www.instagram.com/tequila_don_ramon_cye", icon: InstagramIcon },
  { label: "Facebook",  href: "#",                                               icon: FacebookIcon  },
];

const Divider: FC = () => <div aria-hidden="true" className="h-px w-full bg-neutral-300/60" />;

const Logo: FC<{ size?: "sm" | "md" }> = ({ size = "md" }) => (
  <a
    href="/"
    aria-label="Don Ramón Personalizado — Inicio"
    className={[
      "relative block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold",
      size === "sm" ? "h-8 w-28" : "h-10 w-36",
    ].join(" ")}
  >
    <Image
      src="/images/branding/logo.webp"
      alt="Don Ramón Personalizado"
      fill sizes="144px"
      className="object-contain object-left brightness-0"
    />
  </a>
);

const SocialList: FC<{ size?: "sm" | "md" }> = ({ size = "md" }) => (
  <ul aria-label="Redes sociales de Don Ramón Personalizado" className="flex items-center gap-2" role="list">
    {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
      <li key={label}>
        <a
          href={href}
          target={href === "#" ? undefined : "_blank"}
          rel={href === "#" ? undefined : "noopener noreferrer"}
          aria-label={`${label} — Don Ramón Personalizado`}
          className={[
            "flex items-center justify-center border border-neutral-400 text-neutral-600 bg-white/60",
            "transition-all duration-300 hover:border-gold hover:text-gold hover:bg-white",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold",
            size === "sm" ? "h-8 w-8" : "h-9 w-9",
          ].join(" ")}
        >
          <Icon className={size === "sm" ? "h-4 w-4" : "h-4.5 w-4.5"} />
        </a>
      </li>
    ))}
  </ul>
);

function NavLink({ label, href, external, mobile = false }: FooterLink & { mobile?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={[
        "group flex items-center gap-2 transition-colors duration-300",
        "hover:text-gold focus-visible:outline-none focus-visible:text-gold",
        mobile ? "text-[11px] leading-snug text-neutral-700" : "text-[13px] text-neutral-700",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="h-px shrink-0 bg-(--gold)/40 transition-all duration-300 group-hover:bg-gold group-hover:w-4"
        style={{ width: mobile ? "8px" : "10px" }}
      />
      {label}
      {external && <span aria-label="(abre en nueva pestaña)" className="text-[8px] text-neutral-400">↗</span>}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Pie de página — Tequila Don Ramón Personalizado"
      className="relative w-full overflow-hidden bg-white pt-14 pb-7 sm:pt-16 sm:pb-8"
    >
      <Image
        src="/images/backgrounds/footer-bg.avif"
        alt="" fill sizes="100vw"
        className="object-cover object-bottom opacity-30 pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-16">
        <Divider />

        {/* ── Mobile ── */}
        <div className="py-7 sm:hidden">
          <div className="mb-5 flex items-center justify-between">
            <Logo size="sm" />
            <SocialList size="sm" />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6"> 
            {COLUMNS.map(({ heading, links }) => (
              <nav key={heading} aria-label={`Sección ${heading}`}>
                <h2 className="mb-3 text-center text-[8px] font-semibold uppercase tracking-[0.4em] text-gold">
                  {heading}
                </h2>
                <ul className="flex flex-col items-center gap-2" role="list">
                  {links.map((link) => (
                    <li key={link.href}>
                      <NavLink {...link} mobile />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* ── Desktop ── */}
        <div className="hidden py-8 sm:grid sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-16"> 
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-52.5 text-[12px] italic leading-[1.8] text-neutral-600">
              Donde la tradición del tequila se encuentra con el arte de la personalización
              para crear momentos que tus invitados nunca olvidarán.
            </p>
            <div>
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.45em] text-gold">
                Síguenos:
              </p>
              <SocialList />
            </div>
          </div>

          {COLUMNS.map(({ heading, links }) => (
            <nav key={heading} aria-label={`Sección ${heading}`}>
              <h2 className="mb-4 text-[9px] font-semibold uppercase tracking-[0.5em] text-gold">
                {heading}
              </h2>
              <ul className="flex flex-col gap-3" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <NavLink {...link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Divider />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col gap-2 pt-5 text-center sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-neutral-600">
            © {CURRENT_YEAR} Tequila Don Ramón - Personalizado | Franquicia MX 924872 | Todos los derechos reservados.
          </p>
          <p
            className="text-[10px] text-neutral-600 sm:whitespace-nowrap sm:text-right"
            aria-label="Aviso legal de consumo responsable"
          >
            El consumo excesivo de alcohol es perjudicial para la salud. Prohibida la venta a menores de edad.
          </p>
        </div>

      </div>
    </footer>
  );
}