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
  weight: ["400", "500", "600", "700"],
});

// ─── Schema ───────────────────────────────────────────────────────────────────

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
        url: "https://www.donramonpersonalizado.com/images/branding/logo.webp",
      },
      description:
        "Casa Don Ramón es una casa tequilera especializada en botellas premium personalizadas con grabado artesanal.",
      areaServed: {
        "@type": "Country",
        name: "México",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.donramonpersonalizado.com/#website",
      url: "https://www.donramonpersonalizado.com",
      name: "Tequila Don Ramón Personalizado",
      inLanguage: "es-MX",
      publisher: {
        "@id":
          "https://www.donramonpersonalizado.com/#organization",
      },
    },
    {
      "@type": "Service",
      name: "Personalización de Botellas Don Ramón",
      serviceType:
        "Grabado artesanal y personalización premium de botellas de tequila",
      provider: {
        "@id":
          "https://www.donramonpersonalizado.com/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "México",
      },
      description:
        "Botellas premium de Tequila Don Ramón personalizadas artesanalmente para bodas, eventos corporativos, aniversarios y ocasiones especiales.",
    },
  ],
};

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://www.donramonpersonalizado.com"
  ),
  title: {
    default: "Tequila Don Ramón Personalizado",
    template: "%s | Don Ramón Personalizado",
  },
  description:
    "Botellas premium de Tequila Don Ramón personalizadas con grabado artesanal para bodas, XV años, aniversarios y eventos especiales.",
  alternates: {
    canonical:
      "https://www.donramonpersonalizado.com",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://www.donramonpersonalizado.com",
    siteName: "Tequila Don Ramón Personalizado",
    title: "Tequila Don Ramón Personalizado",
    description:
      "Botellas premium personalizadas con grabado artesanal sobre vidrio.",
    images: [
      {
        url: "/branding/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Botella personalizada de Tequila Don Ramón",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tequila Don Ramón Personalizado",
    description:
      "Botellas premium personalizadas para ocasiones especiales.",
    images: ["/branding/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// ─── Viewport ────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0804",
};

// ─── Layout ──────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${cinzel.variable}
        h-full
        scroll-smooth
        antialiased
      `}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className="min-h-full bg-[#0a0804] text-white flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}