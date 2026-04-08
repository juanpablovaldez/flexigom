import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  MessageCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionTitle } from "../components/section-title";
import type { LocationSectionProps, LocationSectionContent } from "../types";

const defaultContent: LocationSectionContent = {
  title: "Visítanos en Nuestra Tienda",
  subtitle:
    "Te esperamos para que puedas probar nuestros productos y recibir asesoramiento personalizado",
  address: {
    street: "Av. Mitre 299",
    city: "San Miguel de Tucumán",
    province: "Tucumán",
    country: "Argentina",
    fullAddress: "Av. Mitre 299, T4000, Tucumán, Argentina",
  },
  contact: {
    phone: "+54 9 381 582-4678",
    whatsapp: "+54 9 381 582-4678",
  },
  operatingHours: {
    weekdays: "Lunes a Viernes de 8:30 a 13 y de 17 a 20",
    saturday: "Sábados de 9 a 13",
    sunday: "Domingos cerrado",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.4963846681326!2d-65.21979342455953!3d-26.824159889509726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c6a8119869d%3A0x62dc1e3075ef59f2!2sFlexigom!5e0!3m2!1sen!2sar!4v1759696291650!5m2!1sen!2sar",
};

export function LocationSection({
  content,
  className,
}: LocationSectionProps = {}) {
  const locationContent = { ...defaultContent, ...content };

  return (
    <section id="location" className={cn("bg-gray-50 py-16", className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle
          title={locationContent.title}
          subtitle={locationContent.subtitle}
          className="mb-12 text-center"
        />

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white shadow-lg p-6 rounded-xl">
              <h3 className="mb-6 font-semibold text-gray-900 text-xl">
                Información de Contacto
              </h3>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPinIcon className="flex-shrink-0 mt-1 w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">Dirección</p>
                    <p className="text-gray-600 text-sm">
                      {locationContent.address.street}
                      <br />
                      {locationContent.address.city},{" "}
                      {locationContent.address.province}
                      <br />
                      {locationContent.address.country}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <PhoneIcon className="flex-shrink-0 mt-1 w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">Teléfono</p>
                    <a
                      href={`tel:${locationContent.contact.phone}`}
                      className="text-red-600 hover:text-red-700 text-sm transition-colors"
                    >
                      {locationContent.contact.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <MessageCircleIcon className="flex-shrink-0 mt-1 w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp</p>
                    <a
                      href={`https://wa.me/${locationContent.contact.whatsapp.replace(/[\s-+()]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 text-sm transition-colors"
                    >
                      {locationContent.contact.whatsapp}
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3">
                  <ClockIcon className="flex-shrink-0 mt-1 w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Horarios de Atención
                    </p>
                    <div className="text-gray-600 text-sm">
                      <p>{locationContent.operatingHours.weekdays}</p>
                      <p>{locationContent.operatingHours.saturday}</p>
                      <p>{locationContent.operatingHours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-red-600 shadow-lg p-6 rounded-xl text-white">
              <h4 className="mb-3 font-semibold text-lg">
                ¿Necesitas Direcciones?
              </h4>
              <p className="mb-4 text-white text-sm">
                Obtén direcciones paso a paso para llegar a nuestra tienda
                física.
              </p>
              <a
                href={`https://www.google.com/maps/dir//${encodeURIComponent(locationContent.address.fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg font-medium text-red-600 text-sm transition-colors"
              >
                <MapPinIcon className="w-4 h-4" />
                Cómo Llegar
              </a>
            </div>
          </div>

          {/* Google Maps */}
          <div className="bg-white shadow-lg rounded-xl h-full overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900 text-lg">
                Ubicación en el Mapa
              </h3>
            </div>
            <div className="relative h-full">
              <iframe
                src={locationContent.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: "none" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Flexigom"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
