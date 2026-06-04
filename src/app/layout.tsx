import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

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

const SITE_URL = "https://www.donramonpersonalizado.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: "Don Ramón Personalizado",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/branding/logo.webp`,
      },
      description:
        "Franquicia dedicada a la personalización de botellas originales de Tequila Don Ramón para regalos, celebraciones y eventos especiales.",
      areaServed: {
        "@type": "Country",
        name: "México",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Don Ramón Personalizado",
      inLanguage: "es-MX",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "Personalización de botellas Don Ramón",
      serviceType:
        "Personalización y grabado artesanal sobre botellas originales de Tequila Don Ramón",
      provider: {
        "@id": `${SITE_URL}/#organization`,
      },
      areaServed: {
        "@type": "Country",
        name: "México",
      },
      description:
        "Servicio de personalización de botellas originales de Tequila Don Ramón para bodas, XV años, aniversarios, regalos corporativos y ocasiones especiales. Operado por franquicia independiente.",
      brand: {
        "@type": "Brand",
        name: "Tequila Don Ramón",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Don Ramón Personalizado | Botellas Grabadas para Eventos",
    template: "%s | Don Ramón Personalizado",
  },
  description:
    "Personaliza botellas originales de Tequila Don Ramón para bodas, XV años, aniversarios, regalos corporativos y eventos especiales. Franquicia independiente. Envíos a todo México.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "Don Ramón Personalizado",
    title: "Don Ramón Personalizado | Botellas Grabadas para Eventos",
    description:
      "Botellas originales de Tequila Don Ramón personalizadas por franquicia independiente para regalos, celebraciones y eventos especiales.",
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
    title: "Don Ramón Personalizado | Botellas Grabadas para Eventos",
    description:
      "Personalización de botellas originales de Tequila Don Ramón para ocasiones especiales.",
    images: ["/branding/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0804",
};

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

      <body className="flex min-h-full flex-col bg-[#0a0804] font-sans text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}