import { SEOHead } from "@/components/seo";
import { createPageSEO, createFAQPageSchema } from "@/lib/seo";
import { useFAQs } from "@/features/home/hooks/use-faqs";
import { FAQList } from "@/features/home/components/faq-list";
import { FAQsSkeleton } from "@/features/products/skeletons/faqs-skeleton";
import { AlertCircle } from "lucide-react";

function FAQError() {
  return (
    <div className="bg-gray-50 shadow-md mx-auto p-8 rounded-lg max-w-2xl text-center">
      <AlertCircle className="mx-auto mb-4 w-12 h-12 text-red-600" />
      <h3 className="mb-2 font-semibold text-gray-900 text-xl">
        Error al cargar las preguntas frecuentes
      </h3>
      <p className="mb-4 text-gray-600">
        No se pudieron cargar las preguntas frecuentes en este momento.
      </p>
      <p className="text-gray-500 text-sm">
        Por favor, intenta nuevamente más tarde o contactanos directamente.
      </p>
    </div>
  );
}

export function Component() {
  const { data: faqs, isLoading, isError } = useFAQs();

  const seoConfig = createPageSEO({
    title: "Preguntas Frecuentes - FAQ Flexigom Tucumán",
    description:
      "Preguntas frecuentes sobre colchones, sommiers, garantías, entregas y más. Resolvé todas tus dudas sobre productos y servicios de Flexigom en Tucumán.",
    path: "/faq",
    keywords: [
      "preguntas frecuentes colchones",
      "faq flexigom",
      "dudas colchones tucumán",
      "consultas sommiers",
      "garantía colchones",
    ],
  });

  // Create FAQ schema if we have FAQs
  const structuredData = faqs?.length ? [createFAQPageSchema(faqs)] : undefined;

  return (
    <>
      <SEOHead
        config={{
          ...seoConfig,
          structuredData,
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-bold text-gray-900 text-4xl md:text-5xl">
              Preguntas Frecuentes
            </h1>
            <p className="mt-4 text-gray-600 text-lg md:text-xl">
              Resolvemos todas tus dudas sobre nuestros productos y servicios
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="md:pb-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-4xl">
            {isLoading ? (
              <FAQsSkeleton />
            ) : isError ? (
              <FAQError />
            ) : faqs && faqs.length > 0 ? (
              <>
                <div className="mb-8 text-center">
                  <p className="text-gray-600">
                    Encontrá respuestas a las consultas más comunes de nuestros
                    clientes. Si no encontrás lo que buscás, no dudes en{" "}
                    <a
                      href="/contacto"
                      className="font-medium text-red-600 hover:text-red-700 transition-colors"
                    >
                      contactarnos
                    </a>
                    .
                  </p>
                </div>
                <FAQList faqs={faqs} />
              </>
            ) : (
              <div className="bg-gray-50 shadow-md mx-auto p-8 rounded-xl max-w-2xl text-center">
                <p className="mb-4 text-gray-600 text-lg">
                  No hay preguntas frecuentes disponibles en este momento.
                </p>
                <p className="text-gray-500 text-sm">
                  Si tenés alguna consulta, no dudes en{" "}
                  <a
                    href="/contacto"
                    className="font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    contactarnos
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-bold text-white text-2xl md:text-3xl">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="mb-8 text-gray-300 text-lg">
              Nuestro equipo está disponible para responder todas tus consultas
              de manera personalizada
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <a
                href="/contacto"
                className="inline-flex justify-center items-center bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-medium text-white text-lg transition-colors"
              >
                Ir a Contacto
              </a>
              <a
                href="https://wa.me/5493815277935"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center hover:bg-white/10 px-8 py-4 border-2 border-white rounded-lg font-medium text-white text-lg transition-colors"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Component.displayName = "FAQPage";
