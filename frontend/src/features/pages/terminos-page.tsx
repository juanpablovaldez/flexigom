import { SEOHead } from "@/components/seo";
import { createPageSEO } from "@/lib/seo";
import { FileText } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo/constants";

export function Component() {
  const seoConfig = createPageSEO({
    title: "Términos y Condiciones - Flexigom Tucumán",
    description:
      "Términos y condiciones de uso del sitio web de Flexigom. Información legal sobre compras, productos y servicios en Tucumán.",
    path: "/terminos",
    keywords: ["términos y condiciones", "políticas flexigom", "legal"],
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
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="font-bold text-gray-900 text-4xl md:text-5xl">
              Términos y Condiciones
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
                Bienvenido a Flexigom. Al acceder y utilizar este sitio web,
                aceptás los siguientes términos y condiciones de uso. Si no
                estás de acuerdo con estos términos, por favor no utilices
                nuestro sitio.
              </p>
            </div>

            {/* Uso del Sitio */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                2. Uso del Sitio Web
              </h2>
              <p className="mb-3 text-gray-600">
                El contenido de este sitio web es para tu información general y
                uso personal. Está sujeto a cambios sin previo aviso.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    El uso de este sitio web está sujeto a estos términos de
                    uso.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Al utilizar este sitio, aceptás cumplir con estos términos.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Nos reservamos el derecho de modificar estos términos en
                    cualquier momento.
                  </span>
                </li>
              </ul>
            </div>

            {/* Productos y Precios */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                3. Productos y Precios
              </h2>
              <p className="mb-3 text-gray-600">
                Nos esforzamos por proporcionar información precisa sobre
                nuestros productos y precios:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Los precios están expresados en Pesos Argentinos (ARS) y
                    pueden estar sujetos a cambios sin previo aviso.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Las imágenes de productos son ilustrativas. El color real
                    puede variar ligeramente.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    La disponibilidad de productos está sujeta a stock al
                    momento de la compra.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Nos reservamos el derecho de limitar las cantidades de
                    cualquier producto.
                  </span>
                </li>
              </ul>
            </div>

            {/* Compras */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                4. Proceso de Compra
              </h2>
              <p className="mb-3 text-gray-600">
                Al realizar una compra en Flexigom:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Toda compra debe ser confirmada telefónicamente o por
                    WhatsApp.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Los precios y disponibilidad se confirmarán al momento de la
                    compra.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Las formas de pago aceptadas serán informadas en cada
                    transacción.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Nos reservamos el derecho de rechazar cualquier pedido.
                  </span>
                </li>
              </ul>
            </div>

            {/* Entregas */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                5. Entregas
              </h2>
              <p className="mb-3 text-gray-600">Respecto a las entregas:</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Los tiempos de entrega son estimados y pueden variar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Las zonas de entrega y costos se informarán al momento de la
                    compra.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    El cliente debe inspeccionar el producto al momento de la
                    entrega.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    No nos hacemos responsables por demoras ajenas a nuestra
                    voluntad.
                  </span>
                </li>
              </ul>
            </div>

            {/* Garantías */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                6. Garantías
              </h2>
              <p className="text-gray-600">
                Todos nuestros productos cuentan con garantía según lo
                establecido por el fabricante y la legislación vigente. Para más
                información, consultá nuestra{" "}
                <a
                  href="/garantias"
                  className="font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  página de garantías
                </a>
                .
              </p>
            </div>

            {/* Responsabilidad */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                7. Limitación de Responsabilidad
              </h2>
              <p className="mb-3 text-gray-600">
                Flexigom no será responsable por:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Daños indirectos, especiales o consecuentes derivados del
                    uso de nuestros productos o servicios.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Interrupciones o errores en el funcionamiento del sitio web.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Pérdida de datos o información durante el uso del sitio.
                  </span>
                </li>
              </ul>
            </div>

            {/* Propiedad Intelectual */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                8. Propiedad Intelectual
              </h2>
              <p className="text-gray-600">
                Todo el contenido de este sitio web, incluyendo textos,
                gráficos, logotipos, imágenes y software, es propiedad de
                Flexigom o de sus proveedores de contenido y está protegido por
                las leyes de propiedad intelectual.
              </p>
            </div>

            {/* Links Externos */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                9. Enlaces a Sitios de Terceros
              </h2>
              <p className="text-gray-600">
                Este sitio puede contener enlaces a sitios web de terceros. No
                tenemos control sobre el contenido de esos sitios y no aceptamos
                responsabilidad por ellos o por cualquier pérdida o daño que
                pueda surgir de su uso.
              </p>
            </div>

            {/* Legislación */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                10. Legislación Aplicable
              </h2>
              <p className="text-gray-600">
                Estos términos y condiciones se rigen por las leyes de la
                República Argentina. Cualquier disputa relacionada con estos
                términos estará sujeta a la jurisdicción exclusiva de los
                tribunales de San Miguel de Tucumán, Provincia de Tucumán,
                Argentina.
              </p>
            </div>

            {/* Defensa al Consumidor */}
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                11. Derechos del Consumidor
              </h2>
              <p className="mb-3 text-gray-600">
                Como consumidor, tenés derechos protegidos por la Ley de Defensa
                del Consumidor (Ley N° 24.240). Para consultas o reclamos:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>
                    Dirección Nacional de Defensa del Consumidor:{" "}
                    <a
                      href="https://www.argentina.gob.ar/produccion/defensadelconsumidor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-blue-700"
                    >
                      www.argentina.gob.ar/defensadelconsumidor
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 text-red-600">•</span>
                  <span>Teléfono gratuito: 0800-666-1518</span>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="mb-4 font-bold text-gray-900 text-2xl">
                12. Contacto
              </h2>
              <p className="mb-3 text-gray-600">
                Si tenés preguntas sobre estos términos y condiciones, podés
                contactarnos:
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

Component.displayName = "TerminosPage";
