import { useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SITE_CONFIG } from "@/lib/seo/constants";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "¿Cuál es el tiempo de entrega de los productos?",
    answer:
      "El tiempo de entrega varía según tu ubicación. En Capital Federal y GBA, entregamos en 24-48 horas. Para el interior del país, el tiempo de entrega es de 3-7 días hábiles. Te enviaremos un código de seguimiento para que puedas rastrear tu pedido.",
    category: "Envíos",
  },
  {
    id: 2,
    question: "¿Ofrecen garantía en sus productos?",
    answer:
      "Sí, todos nuestros colchones y sommiers tienen garantía. Los colchones premium tienen 5 años de garantía, los colchones estándar 3 años, y los sommiers 2 años. La garantía cubre defectos de fabricación y hundimientos superiores a 2.5cm.",
    category: "Garantía",
  },
  {
    id: 3,
    question: "¿Puedo cambiar o devolver un producto?",
    answer:
      "Tienes 30 días para cambiar o devolver tu producto si no estás satisfecho. El producto debe estar en perfectas condiciones y con su embalaje original. Los gastos de envío para devoluciones corren por cuenta del cliente, excepto si el producto tiene defectos de fábrica.",
    category: "Devoluciones",
  },
  {
    id: 4,
    question: "¿Cómo puedo saber qué medida de colchón necesito?",
    answer:
      "Las medidas estándar son: 1 Plaza (80x190cm), 2 Plazas (140x190cm), Queen (160x200cm), y King (180x200cm). Si tienes una cama con medidas especiales, podemos fabricar colchones a medida. Contáctanos para más información sobre medidas personalizadas.",
    category: "Productos",
  },
  {
    id: 5,
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos todos los métodos de pago a través de Mercado Pago: tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, y dinero en cuenta de Mercado Pago. También puedes pagar por transferencia bancaria directa.",
    category: "Pagos",
  },
  {
    id: 6,
    question: "¿Hacen entrega e instalación a domicilio?",
    answer:
      "Sí, ofrecemos servicio de entrega a domicilio sin costo adicional en compras superiores a $50.000. Nuestro equipo puede ayudarte a ubicar el colchón en tu habitación. Para sommiers y bases, también ofrecemos servicio de armado por un costo adicional.",
    category: "Envíos",
  },
  {
    id: 7,
    question: "¿Cómo elijo la firmeza correcta para mi colchón?",
    answer:
      "La firmeza depende de tu peso, posición para dormir y preferencias personales. Suave: ideal para personas de peso ligero y quienes duermen de lado. Medio: la opción más popular, adecuada para la mayoría. Firme: recomendado para personas de mayor peso y quienes duermen boca arriba o boca abajo.",
    category: "Productos",
  },
  {
    id: 8,
    question: "¿Puedo financiar mi compra?",
    answer:
      "Sí, a través de Mercado Pago puedes financiar tu compra en hasta 12 cuotas sin interés con tarjetas de crédito participantes. También ofrecemos planes de financiación especiales en compras superiores a $100.000. Consulta las condiciones al momento de la compra.",
    category: "Pagos",
  },
];

export function SupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = [
    "Todos",
    "Envíos",
    "Garantía",
    "Devoluciones",
    "Productos",
    "Pagos",
  ];

  const filteredFAQs =
    selectedCategory === "Todos"
      ? faqData
      : faqData.filter((faq) => faq.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
          Centro de Ayuda
        </h1>
        <p className="mx-auto max-w-3xl text-gray-600 text-xl">
          Estamos aquí para ayudarte. Encuentra respuestas a tus preguntas o
          contáctanos directamente.
        </p>
      </div>

      {/* Contact Options */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-16">
        {/* Phone */}
        <Card className="border-2 border-gray-200 hover:border-red-200 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center items-center bg-red-100 mx-auto mb-4 rounded-full w-16 h-16">
              <Phone className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="mb-2 font-bold text-gray-900 text-xl">Teléfonos</h3>
            <div className="flex flex-col gap-2 mb-4">
              {SITE_CONFIG.phones.map((phone, idx) => (
                <p key={idx} className="font-bold text-red-600 text-lg">
                  {phone.number} ({phone.name})
                </p>
              ))}
            </div>
            <p className="mb-2 text-gray-600 text-base">
              Lunes a Viernes: 8:30 a 13 y de 17 a 20
            </p>
            <p className="mb-6 text-gray-600 text-base">Sábados: 9 a 13</p>
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 py-3 w-full h-auto text-lg"
            >
              <a href={`tel:${SITE_CONFIG.phones[0].number}`}>
                <Phone className="mr-2 w-5 h-5" />
                Llamar Ahora
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Email */}
        <Card className="border-2 border-gray-200 hover:border-blue-200 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center items-center bg-blue-100 mx-auto mb-4 rounded-full w-16 h-16">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="mb-2 font-bold text-gray-900 text-xl">Email</h3>
            <p className="mb-2 font-semibold text-blue-600 text-lg">
              {SITE_CONFIG.email}
            </p>
            <p className="mb-4 text-gray-600 text-base">
              Respuesta en 24 horas
            </p>
            <p className="mb-6 text-gray-600 text-base">Lunes a Viernes</p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent hover:bg-blue-50 py-3 border-2 border-blue-200 w-full h-auto text-blue-600 text-lg"
            >
              <a href={`mailto:${SITE_CONFIG.email}`}>
                <Mail className="mr-2 w-5 h-5" />
                Enviar Email
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Live Chat */}
        <Card className="border-2 border-gray-200 hover:border-green-200 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center items-center bg-green-100 mx-auto mb-4 rounded-full w-16 h-16">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="mb-2 font-bold text-gray-900 text-xl">
              Chat en Vivo
            </h3>
            <p className="mb-2 text-gray-600 text-base">Asistencia inmediata</p>
            <p className="mb-4 text-gray-600 text-base">
              Lunes a Viernes: 9:00 - 18:00
            </p>
            <div className="flex justify-center items-center space-x-2 mb-6">
              <div className="bg-green-500 rounded-full w-3 h-3 animate-pulse"></div>
              <span className="font-medium text-green-600 text-sm">
                En línea
              </span>
            </div>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 py-3 w-full h-auto text-lg"
              onClick={() => alert("Chat en vivo se abrirá aquí")}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Iniciar Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Store Information */}
      <Card className="mb-16 border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center font-bold text-gray-900 text-2xl">
            <MapPin className="mr-2 w-6 h-6" />
            Información de la Tienda
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-8 grid grid-cols-1 md:grid-cols-2">
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 text-xl">
              Dirección
            </h3>
            <p className="mb-2 text-gray-700 text-lg">
              {SITE_CONFIG.address.street}
            </p>
            <p className="mb-2 text-gray-700 text-lg">
              {SITE_CONFIG.address.city}, {SITE_CONFIG.address.province}
            </p>
            <p className="mb-4 text-gray-700 text-lg">
              {SITE_CONFIG.address.country}
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent py-3 border-2 h-auto text-base"
            >
              <a
                href="https://www.google.com/maps/dir//Av.+Mitre+299,+T4000+San+Miguel+de+Tucum%C3%A1n,+Tucum%C3%A1n,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en Google Maps
              </a>
            </Button>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 text-xl">
              Horarios de Atención
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 text-lg">
                  Lunes a Viernes: 8:30 A 13 y de 17 a 20
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 text-lg">Sábados: 9 a 13</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 text-lg">Domingos: Cerrado</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div>
        <div className="mb-8 text-center">
          <h2 className="mb-4 font-bold text-gray-900 text-3xl">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-600 text-lg">
            Encuentra respuestas rápidas a las consultas más comunes
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="lg"
              className={`text-base py-3 h-auto ${
                selectedCategory === category
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-transparent border-2 border-gray-300 hover:border-red-600"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <Card key={faq.id} className="border-2 border-gray-200">
              <Collapsible
                open={openFAQ === faq.id}
                onOpenChange={() => toggleFAQ(faq.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <CardTitle className="font-semibold text-gray-900 text-lg md:text-xl text-left leading-tight">
                        {faq.question}
                      </CardTitle>
                      {openFAQ === faq.id ? (
                        <ChevronUp className="flex-shrink-0 ml-4 w-6 h-6 text-gray-600" />
                      ) : (
                        <ChevronDown className="flex-shrink-0 ml-4 w-6 h-6 text-gray-600" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="pt-6 border-gray-200 border-t">
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>

      {/* Still Need Help */}
      <div className="bg-gray-50 mt-16 p-8 rounded-2xl text-center">
        <h3 className="mb-4 font-bold text-gray-900 text-2xl">
          ¿Aún necesitas ayuda?
        </h3>
        <p className="mb-6 text-gray-600 text-lg">
          Nuestro equipo de atención al cliente está listo para ayudarte con
          cualquier consulta adicional.
        </p>
        <div className="flex sm:flex-row flex-col justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-700 px-8 py-4 h-auto text-lg"
          >
            <a href={`tel:${SITE_CONFIG.phones[0].number}`}>
              <Phone className="mr-2 w-5 h-5" />
              Llamar Ahora
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent px-8 py-4 border-2 h-auto text-lg"
          >
            <a
              href={`https://wa.me/${SITE_CONFIG.phones[0].clean}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Escribir por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
