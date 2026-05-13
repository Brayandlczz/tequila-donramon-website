import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400"],
});

// ─── Structured Data (JSON-LD) ───────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.donramonpersonalizado.com/#organization",
      name: "Casa Don Ramón",
      url: "https://www.donramonpersonalizado.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.donramonpersonalizado.com/logo.png",
      },
      description:
        "Casa Don Ramón es una de las casas tequileras más prestigiosas de México, especializada en botellas personalizadas grabadas artesanalmente.",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.donramonpersonalizado.com/#website",
      url: "https://www.donramonpersonalizado.com",
      name: "Tequila Don Ramón Personalizado",
      inLanguage: "es-MX",
      publisher: {
        "@id": "https://www.donramonpersonalizado.com/#organization",
      },
    },
    {
      "@type": "Service",
      name: "Personalización de Botellas de Tequila Don Ramón",
      provider: {
        "@id": "https://www.donramonpersonalizado.com/#organization",
      },
      serviceType: "Personalización artesanal de botellas premium",
      areaServed: {
        "@type": "Country",
        name: "México",
      },
      description:
        "Botellas premium personalizadas con grabado artesanal sobre vidrio utilizando técnica corte diamante.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué se puede grabar en las botellas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nombres, fechas, mensajes, logotipos, diseños personalizados y elementos especiales para cada ocasión.",
          },
        },
        {
          "@type": "Question",
          name: "¿Para qué ocasiones son ideales?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bodas, XV años, graduaciones, aniversarios, eventos corporativos, temporadas especiales y regalos premium.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué técnica utilizan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cada pieza es trabajada artesanalmente con técnica corte diamante sobre vidrio premium.",
          },
        },
      ],
    },
  ],
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://www.donramonpersonalizado.com"),

  title: {
    default:
      "Tequila Don Ramón Personalizado — Botellas Premium Grabadas",
    template: "%s | Don Ramón Personalizado",
  },

  description:
    "Botellas premium de Tequila Don Ramón personalizadas con grabado artesanal. Diseños exclusivos para bodas, XV años, graduaciones, aniversarios y eventos corporativos.",

  keywords: [
    "tequila personalizado",
    "botellas grabadas",
    "don ramón personalizado",
    "tequila premium",
    "grabado artesanal",
    "botellas para eventos",
    "regalos premium",
  ],

  authors: [
    {
      name: "Casa Don Ramón",
      url: "https://www.donramonpersonalizado.com",
    },
  ],

  creator: "Casa Don Ramón",
  publisher: "Casa Don Ramón",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.donramonpersonalizado.com",
    languages: {
      "es-MX": "https://www.donramonpersonalizado.com",
    },
  },

  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://www.donramonpersonalizado.com",
    siteName: "Tequila Don Ramón Personalizado",

    title:
      "Tequila Don Ramón Personalizado — Botellas Premium Grabadas",

    description:
      "Transforma una botella premium de Don Ramón en una pieza única con grabado artesanal sobre vidrio.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Botella personalizada de Tequila Don Ramón grabada artesanalmente",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Tequila Don Ramón Personalizado — Botellas Premium Grabadas",

    description:
      "Botellas premium personalizadas con grabado artesanal para ocasiones especiales.",

    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],

    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  category: "food & drink",
};

// ─── Viewport ─────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0804",
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={[
        geistSans.variable,
        geistMono.variable,
        cinzel.variable,
        "h-full scroll-smooth antialiased",
      ].join(" ")}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className="min-h-full bg-[#0a0804] text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}