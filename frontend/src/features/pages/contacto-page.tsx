import { SEOHead } from "@/components/seo";
import { createPageSEO, createLocalBusinessSchema } from "@/lib/seo";
import {
  PhoneIcon,
  MessageCircleIcon,
  MapPinIcon,
  ClockIcon,
  MailIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/seo/constants";

export function Component() {
  const seoConfig = createPageSEO({
    title: "Contacto - Flexigom Tucumán",
    description:
      "Contactá a Flexigom en Tucumán. Teléfono, WhatsApp, dirección y horarios de atención. Estamos para ayudarte a encontrar el mejor descanso.",
    path: "/contacto",
    keywords: [
      "contacto flexigom",
      "teléfono flexigom tucumán",
      "dirección flexigom",
      "horarios flexigom",
      "whatsapp colchonería tucumán",
    ],
  });

  const structuredData = [createLocalBusinessSchema()];

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
              Contacto
            </h1>
            <p className="mt-4 text-gray-600 text-lg md:text-xl">
              Estamos para ayudarte. Comunicate con nosotros por el medio que
              prefieras
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
            {/* Teléfonos */}
            <div className="bg-white shadow-md hover:shadow-xl p-6 md:p-8 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <PhoneIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Teléfonos
                </h3>
              </div>
              <p className="mb-4 text-gray-600 text-sm">
                Llamanos de lunes a sábados en nuestro horario de atención
              </p>
              <div className="flex flex-col gap-3">
                {SITE_CONFIG.phones.map((phone, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-medium text-gray-500 text-xs uppercase tracking-wider">
                      {phone.name}
                    </span>
                    <a
                      href={`tel:${phone.number}`}
                      className="font-medium text-red-600 hover:text-red-700 text-lg transition-colors"
                    >
                      {phone.number}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApps */}
            <div className="bg-white shadow-md hover:shadow-xl p-6 md:p-8 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <MessageCircleIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  WhatsApp
                </h3>
              </div>
              <p className="mb-4 text-gray-600 text-sm">
                Escribinos directamente por WhatsApp para consultas rápidas
              </p>
              <div className="flex flex-col gap-3">
                {SITE_CONFIG.phones.map((phone, idx) => (
                  <Button
                    key={idx}
                    asChild
                    className="justify-start bg-red-600 hover:bg-red-700 w-full"
                  >
                    <a
                      href={`https://wa.me/${phone.clean}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircleIcon className="mr-2 w-4 h-4" />
                      Contactar a {phone.name}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="bg-white shadow-md hover:shadow-xl p-6 md:p-8 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <MailIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">Email</h3>
              </div>
              <p className="mb-4 text-gray-600 text-sm">
                Envianos un correo electrónico y te responderemos a la brevedad
              </p>
              <a
                href="mailto:flexituc@gmail.com"
                className="font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                flexituc@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación y Horarios */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="gap-12 grid md:grid-cols-2">
            {/* Dirección */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-600 p-3 rounded-full">
                  <MapPinIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-bold text-gray-900 text-2xl">
                  Nuestra Ubicación
                </h2>
              </div>
              <div className="bg-white shadow-md hover:shadow-lg p-6 md:p-8 rounded-xl transition-all duration-300">
                <p className="mb-2 font-medium text-gray-900">Flexigom</p>
                <p className="mb-4 text-gray-600">
                  Tucumán, Argentina
                  <br />
                  San Miguel de Tucumán
                </p>
                <p className="text-gray-600 text-sm">
                  Visitanos en nuestra sucursal para ver todos nuestros
                  productos y recibir asesoramiento personalizado.
                </p>
              </div>
            </div>

            {/* Horarios */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-600 p-3 rounded-full">
                  <ClockIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-bold text-gray-900 text-2xl">
                  Horarios de Atención
                </h2>
              </div>
              <div className="bg-white shadow-md hover:shadow-lg p-6 md:p-8 rounded-xl transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-gray-200 border-b">
                    <span className="font-medium text-gray-900">
                      Lunes a Viernes
                    </span>
                    <span className="text-gray-600">8:30 - 13:00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-gray-200 border-b">
                    <span className="font-medium text-gray-900">
                      Lunes a Viernes
                    </span>
                    <span className="text-gray-600">17:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-gray-200 border-b">
                    <span className="font-medium text-gray-900">Sábados</span>
                    <span className="text-gray-600">9:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-gray-200 border-b">
                    <span className="font-medium text-gray-900">Sábados</span>
                    <span className="text-gray-600">17:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Domingos</span>
                    <span className="font-medium text-red-600">Cerrado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 font-bold text-white text-3xl md:text-4xl">
              ¿Tenés alguna consulta?
            </h2>
            <p className="mb-8 text-gray-300 text-lg">
              Nuestro equipo está listo para ayudarte a encontrar el producto
              perfecto para tu descanso
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                {SITE_CONFIG.phones.map((phone, idx) => (
                  <Button
                    key={`call-${idx}`}
                    asChild
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 px-8 py-6 w-full sm:w-auto h-auto text-lg"
                  >
                    <a href={`tel:${phone.number}`}>
                      <PhoneIcon className="mr-2 w-5 h-5" />
                      Llamar a {phone.name}
                    </a>
                  </Button>
                ))}
              </div>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                {SITE_CONFIG.phones.map((phone, idx) => (
                  <Button
                    key={`wa-${idx}`}
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-transparent hover:bg-white/10 px-8 py-6 border-2 border-white w-full sm:w-auto h-auto text-white hover:text-white text-lg"
                  >
                    <a
                      href={`https://wa.me/${phone.clean}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircleIcon className="mr-2 w-5 h-5" />
                      WhatsApp {phone.name}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Component.displayName = "ContactoPage";
