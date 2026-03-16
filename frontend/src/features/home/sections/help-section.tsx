import { PhoneIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/seo/constants";
import { cn } from "@/lib/utils";
import type {
  HelpSectionProps,
  HelpSectionContent,
} from "@/features/home/types";

const defaultContent: HelpSectionContent = {
  title: "¿Necesitas Ayuda con tu Compra?",
  subtitle:
    "Nuestros asesores especializados están listos para ayudarte a encontrar el producto perfecto para tu descanso",
  operatingHours:
    "Horarios de atención: Lunes a Viernes 8:30 - 13:00hs y 17:00 - 20:00hs, Sábados 9:00 - 13:00hs",
  buttons: [
    ...SITE_CONFIG.phones.map((phone) => ({
      text: `WhatsApp ${phone.name}`,
      href: `https://wa.me/${phone.clean}?text=¡Hola! Vengo de parte del ECommerce y me gustaría recibir más información sobre sus productos.`,
      icon: <MessageCircleIcon className="w-5 h-5" />,
      variant: "secondary" as const,
    })),
    {
      text: "Llamar",
      href: "/contacto",
      icon: <PhoneIcon className="w-5 h-5" />,
      variant: "primary" as const,
    },
  ],
};

export function HelpSection({ content, className }: HelpSectionProps = {}) {
  const helpContent = { ...defaultContent, ...content };

  return (
    <section id="help" className={cn("bg-red-600 py-16", className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="space-y-8 text-center">
          {/* Title */}
          <h2 className="font-bold text-white text-3xl md:text-4xl lg:text-5xl">
            {helpContent.title}
          </h2>

          {/* Subtitle */}
          <p className="mx-auto max-w-3xl text-white text-lg md:text-xl leading-relaxed">
            {helpContent.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {helpContent.buttons.map((button, index) => (
              <Button
                key={index}
                asChild
                size="lg"
                className={cn(
                  "px-6 py-4 h-auto font-semibold text-base md:text-lg transition-all duration-200",
                  button.variant === "primary"
                    ? "bg-white hover:bg-gray-100 text-red-600 hover:text-red-700"
                    : "bg-transparent hover:bg-white/10 border-2 border-white text-white hover:text-white",
                )}
                variant={button.variant === "primary" ? "default" : "outline"}
              >
                <a
                  href={button.href}
                  className="flex items-center gap-2"
                  target={button.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    button.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {button.icon}
                  {button.text}
                </a>
              </Button>
            ))}
          </div>

          {/* Operating Hours */}
          {helpContent.operatingHours && (
            <p className="mt-6 text-white/90 text-sm md:text-base">
              {helpContent.operatingHours}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
