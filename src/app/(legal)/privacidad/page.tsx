import type { Metadata } from "next";
import LegalLayout from "@/shared/ui/LegalLayout";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Política de Privacidad | Tequila Don Ramón Personalizado",
  description:
    "Política de privacidad de Tequila Don Ramón Personalizado. Conoce cómo tratamos los datos personales proporcionados a través de nuestro formulario de cotización y contacto.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.donramonpersonalizado.com/privacidad" },
};

// ─── Content ──────────────────────────────────────────────────────────────────

const sections = [
  {
    id:    "responsable",
    title: "1. Responsable del tratamiento",
    content: [
      "El responsable del tratamiento de los datos personales recabados a través de este sitio web es Casa Don Ramón, empresa dedicada a la producción, distribución y personalización de Tequila Don Ramón, con domicilio en la República Mexicana.",
      "Para cualquier consulta relacionada con el tratamiento de sus datos personales, puede contactarnos a través del correo electrónico disponible en la sección de Contacto de este sitio.",
    ],
  },
  {
    id:    "datos-recabados",
    title: "2. Datos personales recabados",
    content: [
      "Este sitio web únicamente recaba datos personales cuando el usuario decide enviar voluntariamente una solicitud de cotización o contacto. Los datos solicitados son:",
      "• Nombre completo\n• Correo electrónico\n• Empresa u organización (opcional)\n• Tipo de evento\n• Cantidad aproximada de piezas\n• Descripción del proyecto",
      "El uso del formulario de contacto es completamente voluntario. Ningún dato personal es recabado de forma automática o pasiva como condición para acceder al sitio web.",
    ],
  },
  {
    id:    "finalidad",
    title: "3. Finalidad del tratamiento",
    content: [
      "Los datos personales proporcionados a través del formulario serán utilizados exclusivamente para:",
      "• Dar respuesta a la solicitud de cotización o consulta enviada.\n• Establecer comunicación para coordinar el proceso de personalización de botellas.\n• Enviar información relevante sobre nuestros productos y servicios, únicamente si el usuario lo solicita.",
      "Los datos no serán utilizados para ninguna finalidad distinta a las aquí señaladas sin el consentimiento previo del titular.",
    ],
  },
  {
    id:    "transferencia",
    title: "4. Transferencia de datos",
    content: [
      "Casa Don Ramón no vende, alquila, cede ni transfiere los datos personales de los usuarios a terceros, salvo obligación legal o consentimiento expreso del usuario.",
      "En ningún caso los datos serán compartidos con fines publicitarios o de mercadotecnia con terceros ajenos a la operación del servicio.",
    ],
  },
  {
    id:    "conservacion",
    title: "5. Conservación de los datos",
    content: [
      "Los datos personales serán conservados únicamente durante el tiempo necesario para atender la solicitud y, en su caso, durante el período que dure la relación comercial con el usuario.",
      "Una vez concluida la finalidad para la que fueron recabados, los datos serán eliminados de forma segura.",
    ],
  },
  {
    id:    "derechos",
    title: "6. Derechos ARCO",
    content: [
      "De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), el usuario tiene derecho a:",
      "• Acceso: conocer qué datos personales se tienen sobre él y cómo son tratados.\n• Rectificación: solicitar la corrección de datos inexactos o incompletos.\n• Cancelación: solicitar la eliminación de sus datos cuando no sean necesarios.\n• Oposición: oponerse al tratamiento de sus datos para fines específicos.",
      "Para ejercer cualquiera de estos derechos, envíe una solicitud a nuestro correo de contacto indicando su nombre completo y el derecho que desea ejercer. Responderemos en un plazo máximo de 20 días hábiles conforme a la ley.",
    ],
  },
  {
    id:    "cookies",
    title: "7. Cookies y tecnologías de rastreo",
    content: [
      "Este sitio web puede utilizar cookies técnicas estrictamente necesarias para el funcionamiento del sitio. No se utilizan cookies de seguimiento, análisis de comportamiento o publicidad de terceros en la versión actual.",
      "En caso de incorporar herramientas de analítica en el futuro, la presente Política será actualizada oportunamente e informaremos al usuario.",
    ],
  },
  {
    id:    "seguridad",
    title: "8. Medidas de seguridad",
    content: [
      "Casa Don Ramón aplica medidas técnicas y organizativas razonables para proteger los datos personales contra accesos no autorizados, pérdida, alteración o divulgación indebida.",
      "Se recomienda al usuario no incluir información financiera sensible —como números de cuenta o contraseñas— en el formulario de contacto.",
    ],
  },
  {
    id:    "modificaciones",
    title: "9. Modificaciones a la política",
    content: [
      "Casa Don Ramón se reserva el derecho de modificar la presente Política de Privacidad en cualquier momento, con el fin de adaptarla a cambios legislativos, jurisprudenciales o de negocio.",
      "La versión actualizada estará siempre disponible en esta misma página. Se recomienda revisarla periódicamente.",
    ],
  },
  {
    id:    "legislacion",
    title: "10. Legislación aplicable",
    content: [
      "La presente Política se rige por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y los Lineamientos del Aviso de Privacidad vigentes en los Estados Unidos Mexicanos.",
      "Para la resolución de cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México.",
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacidadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context":    "https://schema.org",
            "@type":       "WebPage",
            name:          "Política de Privacidad",
            url:           "https://www.donramonpersonalizado.com/privacidad",
            author:        { "@type": "Organization", name: "Casa Don Ramón" },
            dateModified:  "2025-05-17",
          }),
        }}
      />
      <LegalLayout
        badge="Documento legal"
        title="Política de Privacidad"
        subtitle="Casa Don Ramón se compromete a proteger la privacidad de sus usuarios y a tratar sus datos personales conforme a la legislación mexicana vigente."
        lastUpdated="17 de mayo de 2025"
        dateISO="2025-05-17"
        meta={[
          { label: "Marco legal",     value: "LFPDPPP · México"               },
          { label: "Datos recabados", value: "Nombre · Email · Proyecto"      },
        ]}
        sections={sections}
        footerLink={{ href: "/terminos", label: "Términos y Condiciones" }}
      />
    </>
  );
}
