import { SEOHead } from "@/components/seo";
import { createPageSEO } from "@/lib/seo";
import { Shield } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo/constants";

export function Component() {
  const seoConfig = createPageSEO({
    title: "Política de Privacidad - Flexigom Tucumán",
    description:
      "Política de privacidad de Flexigom. Información sobre el tratamiento de datos personales, cookies y protección de información.",
    path: "/privacidad",
    keywords: ["política de privacidad", "protección de datos", "privacidad"],
  });

  return (
    <>
      <SEOHead config={seoConfig} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-600 p-4 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="font-bold text-gray-900 text-4xl md:text-5xl">
              Política de Privacidad
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Última actualización: {new Date().toLocaleDateString("es-AR")}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-8 max-w-none prose prose-gray">
            {/* Introduction */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                1. Introducción
              </h2>
              <p className="text-gray-600">
                En Flexigom respetamos tu privacidad y estamos comprometidos con
                la protección de tus datos personales. Esta política de
                privacidad describe cómo recopilamos, utilizamos y protegemos tu
                información cuando visitás nuestro sitio web o realizás una
                compra.
              </p>
            </div>

            {/* Información que Recopilamos */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                2. Información que Recopilamos
              </h2>
              <p className="mb-3 text-gray-600">
                Podemos recopilar y procesar los siguientes tipos de
                información:
              </p>

              <h3 className="mb-3 font-semibold text-gray-900 text-lg">
                2.1. Información que nos proporcionás
              </h3>
              <ul className="space-y-2 mb-4 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Nombre, apellido y datos de contacto (teléfono, email,
                    dirección)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Información de facturación y entrega para procesar pedidos
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Consultas o comentarios que nos enviés a través de
                    formularios o medios de contacto
                  </span>
                </li>
              </ul>

              <h3 className="mb-3 font-semibold text-gray-900 text-lg">
                2.2. Información recopilada automáticamente
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Datos de navegación (páginas visitadas, tiempo de
                    permanencia)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>Dirección IP y tipo de navegador</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>Información del dispositivo utilizado</span>
                </li>
              </ul>
            </div>

            {/* Uso de la Información */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                3. Cómo Utilizamos tu Información
              </h2>
              <p className="mb-3 text-gray-600">
                Utilizamos la información recopilada para:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>Procesar y gestionar tus pedidos y entregas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Comunicarnos contigo sobre tu compra y servicio al cliente
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>Mejorar nuestro sitio web y servicios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Enviarte información sobre productos y ofertas (solo si has
                    dado tu consentimiento)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>Cumplir con obligaciones legales y fiscales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Prevenir fraudes y garantizar la seguridad del sitio
                  </span>
                </li>
              </ul>
            </div>

            {/* Compartir Información */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                4. Compartir tu Información
              </h2>
              <p className="mb-3 text-gray-600">
                No vendemos ni alquilamos tu información personal a terceros.
                Podemos compartir tu información únicamente en los siguientes
                casos:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Con proveedores de servicios que nos ayudan a operar nuestro
                    negocio (ejemplo: servicios de entrega)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Cuando sea requerido por ley o por autoridades competentes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Para proteger nuestros derechos, propiedad o seguridad
                  </span>
                </li>
              </ul>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                5. Cookies y Tecnologías Similares
              </h2>
              <p className="mb-3 text-gray-600">
                Nuestro sitio web puede utilizar cookies para mejorar tu
                experiencia de navegación. Las cookies son pequeños archivos de
                texto que se almacenan en tu dispositivo.
              </p>

              <h3 className="mb-3 font-semibold text-gray-900 text-lg">
                Tipos de cookies que utilizamos:
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    <strong>Cookies esenciales:</strong> Necesarias para el
                    funcionamiento básico del sitio
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    <strong>Cookies de rendimiento:</strong> Nos ayudan a
                    entender cómo los visitantes usan el sitio
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    <strong>Cookies de funcionalidad:</strong> Permiten recordar
                    tus preferencias
                  </span>
                </li>
              </ul>

              <p className="mt-3 text-gray-600 text-sm">
                Podés configurar tu navegador para rechazar cookies, aunque esto
                puede afectar la funcionalidad del sitio.
              </p>
            </div>

            {/* Seguridad */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                6. Seguridad de los Datos
              </h2>
              <p className="text-gray-600">
                Implementamos medidas de seguridad apropiadas para proteger tu
                información personal contra acceso no autorizado, alteración,
                divulgación o destrucción. Sin embargo, ningún método de
                transmisión por Internet o almacenamiento electrónico es 100%
                seguro.
              </p>
            </div>

            {/* Retención de Datos */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                7. Retención de Datos
              </h2>
              <p className="text-gray-600">
                Conservamos tu información personal durante el tiempo necesario
                para cumplir con los propósitos descritos en esta política,
                salvo que la ley requiera o permita un período de retención más
                prolongado.
              </p>
            </div>

            {/* Derechos del Usuario */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                8. Tus Derechos
              </h2>
              <p className="mb-3 text-gray-600">
                De acuerdo con la Ley de Protección de Datos Personales (Ley N°
                25.326), tenés derecho a:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Acceder a tu información personal que tenemos almacenada
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>Solicitar la corrección de datos inexactos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Solicitar la eliminación de tu información personal
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Oponerte al procesamiento de tu información personal
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>Retirar tu consentimiento en cualquier momento</span>
                </li>
              </ul>
              <p className="mt-3 text-gray-600">
                Para ejercer estos derechos, podés contactarnos a través de los
                medios indicados al final de esta política.
              </p>
            </div>

            {/* Enlaces Externos */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                9. Enlaces a Sitios de Terceros
              </h2>
              <p className="text-gray-600">
                Nuestro sitio puede contener enlaces a sitios web de terceros.
                No somos responsables de las prácticas de privacidad de esos
                sitios. Te recomendamos leer las políticas de privacidad de cada
                sitio que visitás.
              </p>
            </div>

            {/* Menores */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                10. Privacidad de Menores
              </h2>
              <p className="text-gray-600">
                Nuestro sitio web no está dirigido a menores de 18 años. No
                recopilamos intencionalmente información personal de menores. Si
                descubrimos que hemos recopilado información de un menor, la
                eliminaremos de inmediato.
              </p>
            </div>

            {/* Cambios a la Política */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                11. Cambios a esta Política
              </h2>
              <p className="text-gray-600">
                Nos reservamos el derecho de actualizar esta política de
                privacidad en cualquier momento. Los cambios entrarán en vigor
                inmediatamente después de su publicación en el sitio. Te
                recomendamos revisar periódicamente esta política para estar
                informado sobre cómo protegemos tu información.
              </p>
            </div>

            {/* Agencia de Acceso a la Información */}
            <div className="bg-blue-50 p-6 border-blue-600 border-l-4 rounded">
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                Agencia de Acceso a la Información Pública
              </h2>
              <p className="mb-3 text-gray-600">
                La Agencia de Acceso a la Información Pública, en su carácter de
                Órgano de Control de la Ley N° 25.326, tiene la atribución de
                atender las denuncias y reclamos que se interpongan con relación
                al incumplimiento de las normas sobre protección de datos
                personales.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  • Sitio web:{" "}
                  <a
                    href="https://www.argentina.gob.ar/aaip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    www.argentina.gob.ar/aaip
                  </a>
                </li>
                <li>• Email: datospersonales@aaip.gob.ar</li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                12. Contacto
              </h2>
              <p className="mb-3 text-gray-600">
                Si tenés preguntas sobre esta política de privacidad o sobre
                cómo manejamos tu información personal, podés contactarnos:
              </p>
              <ul className="space-y-2 text-gray-600">
                {SITE_CONFIG.phones.map((phone, idx) => (
                  <li key={idx}>
                    • Teléfono {phone.name}:{" "}
                    <a
                      href={`tel:${phone.number}`}
                      className="font-medium text-red-600 hover:text-red-700"
                    >
                      {phone.number}
                    </a>
                  </li>
                ))}
                <li>
                  • Email:{" "}
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="font-medium text-red-600 hover:text-red-700"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li>
                  • Dirección: {SITE_CONFIG.address.city},{" "}
                  {SITE_CONFIG.address.country}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Component.displayName = "PrivacidadPage";
