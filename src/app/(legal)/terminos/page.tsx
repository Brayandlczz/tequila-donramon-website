import type { Metadata } from "next";
import LegalLayout from "@/shared/ui/LegalLayout";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Términos y Condiciones | Tequila Don Ramón Personalizado",
  description:
    "Términos y condiciones del servicio de personalización de Tequila Don Ramón. Conoce las condiciones que rigen el uso del sitio web y la contratación del servicio.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.donramonpersonalizado.com/terminos" },
};

// ─── Content ──────────────────────────────────────────────────────────────────

const sections = [
  {
    id:    "objeto",
    title: "1. Objeto",
    content: [
      "Los presentes Términos y Condiciones regulan el acceso y uso del sitio web de Tequila Don Ramón Personalizado, así como la contratación del servicio de personalización de botellas de tequila mediante grabado artesanal con técnica corte diamante.",
      "El acceso o uso del sitio implica la aceptación plena y sin reservas de los presentes Términos. Si el usuario no está de acuerdo con alguna de las condiciones aquí establecidas, deberá abstenerse de utilizar el sitio.",
    ],
  },
  {
    id:    "servicio",
    title: "2. Descripción del servicio",
    content: [
      "Casa Don Ramón ofrece el servicio de personalización de botellas premium de Tequila Don Ramón mediante grabado artesanal. El servicio incluye:",
      "• Asesoría para la elección de línea de producto.\n• Diseño personalizado con nombre, fecha, logo, rostro o mensaje.\n• Producción artesanal mediante técnica corte diamante.\n• Entrega del pedido en el plazo acordado.",
      "El sitio web tiene carácter informativo y de contacto. La contratación efectiva del servicio se formaliza a través de comunicación directa con el equipo de Casa Don Ramón, una vez confirmados los detalles del pedido.",
    ],
  },
  {
    id:    "pedidos",
    title: "3. Pedidos y confirmación",
    content: [
      "Los pedidos se realizan mediante el formulario de contacto disponible en el sitio o a través de los canales de comunicación directa indicados. Un pedido se considera confirmado únicamente cuando el usuario recibe confirmación escrita por parte del equipo de Casa Don Ramón.",
      "Casa Don Ramón se reserva el derecho de rechazar pedidos que no cumplan con los requisitos mínimos de producción, que contengan contenido ofensivo, ilegal o que infrinjan derechos de terceros.",
    ],
  },
  {
    id:    "personalización",
    title: "4. Responsabilidad sobre el diseño",
    content: [
      "El usuario es responsable del contenido que solicita grabar en la botella —nombres, imágenes, mensajes o logotipos— y garantiza que cuenta con los derechos necesarios para su uso.",
      "Casa Don Ramón no será responsable por el uso de contenido que infrinja derechos de terceros, incluyendo derechos de autor, marcas registradas o derechos de imagen, cuando dicho contenido haya sido proporcionado por el usuario.",
    ],
  },
  {
    id:    "precios",
    title: "5. Precios y forma de pago",
    content: [
      "Los precios del servicio de personalización son informados directamente por el equipo de Casa Don Ramón una vez recibida la solicitud, y pueden variar según la línea de producto elegida, la cantidad de piezas y la complejidad del diseño.",
      "Las condiciones de pago —incluyendo anticipos, saldo y plazos— serán acordadas por escrito entre las partes antes del inicio de la producción.",
    ],
  },
  {
    id:    "entrega",
    title: "6. Tiempos de entrega",
    content: [
      "Los tiempos de producción y entrega son estimados y serán informados al confirmar el pedido. Casa Don Ramón realizará todos los esfuerzos razonables para cumplir con los plazos acordados.",
      "Casa Don Ramón no será responsable por retrasos derivados de causas ajenas a su control, incluyendo casos fortuitos, fuerza mayor o problemas en la cadena de suministro.",
    ],
  },
  {
    id:    "cancelaciones",
    title: "7. Cancelaciones y devoluciones",
    content: [
      "Por la naturaleza personalizada del servicio, una vez iniciada la producción no se aceptan cancelaciones ni devoluciones, salvo que el producto presente un defecto de fabricación imputable a Casa Don Ramón.",
      "En caso de defecto comprobado, Casa Don Ramón repondrá la pieza afectada sin costo adicional para el usuario, previa validación del defecto por parte del equipo de producción.",
    ],
  },
  {
    id:    "propiedad-intelectual",
    title: "8. Propiedad intelectual",
    content: [
      "Todos los contenidos del sitio web —incluyendo textos, imágenes, diseños, logotipos y elementos gráficos— son propiedad de Casa Don Ramón o de sus licenciantes, y están protegidos por la legislación mexicana e internacional en materia de propiedad intelectual.",
      "Queda prohibida la reproducción, distribución o modificación de cualquier contenido del sitio sin autorización previa y por escrito de Casa Don Ramón.",
    ],
  },
  {
    id:    "limitacion",
    title: "9. Limitación de responsabilidad",
    content: [
      "Casa Don Ramón no garantiza la disponibilidad ininterrumpida del sitio web y no será responsable por daños derivados de interrupciones técnicas, errores en el contenido o accesos no autorizados ajenos a su control.",
      "En ningún caso la responsabilidad de Casa Don Ramón superará el valor del pedido contratado por el usuario.",
    ],
  },
  {
    id:    "legislacion",
    title: "10. Legislación aplicable",
    content: [
      "Los presentes Términos se rigen por la legislación vigente en los Estados Unidos Mexicanos. Para la resolución de cualquier controversia derivada de su interpretación o cumplimiento, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México.",
      "Estos Términos y Condiciones fueron actualizados por última vez el 17 de mayo de 2025.",
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TerminosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context":   "https://schema.org",
            "@type":      "WebPage",
            name:         "Términos y Condiciones",
            url:          "https://www.donramonpersonalizado.com/terminos",
            author:       { "@type": "Organization", name: "Casa Don Ramón" },
            dateModified: "2025-05-17",
          }),
        }}
      />
      <LegalLayout
        badge="Documento legal"
        title="Términos y Condiciones"
        subtitle="Condiciones que regulan el uso del sitio web y la contratación del servicio de personalización de botellas de Tequila Don Ramón."
        lastUpdated="17 de mayo de 2025"
        dateISO="2025-05-17"
        meta={[
          { label: "Marco legal",  value: "Legislación mexicana vigente" },
          { label: "Servicio",     value: "Personalización artesanal"    },
        ]}
        sections={sections}
        footerLink={{ href: "/privacidad", label: "Política de Privacidad" }}
      />
    </>
  );
}
