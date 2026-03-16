import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail, Package } from "lucide-react";
import { Link } from "react-router";
import { SITE_CONFIG } from "@/lib/seo/constants";

interface OrderConfirmationProps {
  orderId: string;
  email: string;
}

export function OrderConfirmation({ orderId, email }: OrderConfirmationProps) {
  return (
    <div className="space-y-6 mx-auto max-w-2xl text-center">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="flex justify-center items-center bg-green-100 rounded-full w-24 h-24">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-2">
        <h2 className="font-bold text-gray-900 text-3xl">
          ¡Pedido Confirmado!
        </h2>
        <p className="text-muted-foreground">
          Gracias por tu compra. Tu pedido ha sido recibido y está siendo
          procesado.
        </p>
      </div>

      {/* Order Details Card */}
      <Card className="p-6 text-left">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Package className="flex-shrink-0 mt-1 w-5 h-5 text-gray-600" />
            <div className="flex-1">
              <p className="font-medium text-sm">Número de Pedido</p>
              <p className="font-mono text-primary text-lg">{orderId}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="flex-shrink-0 mt-1 w-5 h-5 text-gray-600" />
            <div className="flex-1">
              <p className="font-medium text-sm">Confirmación enviada a</p>
              <p className="text-muted-foreground text-sm">{email}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* What's Next */}
      <Card className="bg-blue-50 p-6 border-blue-200 text-left">
        <h3 className="mb-3 font-semibold text-lg">¿Qué sigue?</h3>
        <ol className="space-y-2 text-muted-foreground text-sm list-decimal list-inside">
          <li>
            Recibirás un email de confirmación con los detalles del pedido
          </li>
          <li>Nos pondremos en contacto contigo para coordinar la entrega</li>
          <li>Prepararemos tu pedido con el mayor cuidado</li>
          <li>Te notificaremos cuando esté en camino</li>
        </ol>
      </Card>

      {/* Actions */}
      <div className="flex sm:flex-row flex-col sm:justify-center gap-3">
        <Button
          asChild
          variant="default"
          className="bg-red-600 hover:bg-red-700"
        >
          <Link to="/products">Seguir Comprando</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">Volver al Inicio</Link>
        </Button>
      </div>

      {/* Support */}
      <p className="text-muted-foreground text-xs">
        ¿Necesitas ayuda? Contáctanos por WhatsApp al{" "}
        {SITE_CONFIG.phones.map((p, i) => (
          <span key={i}>
            <a
              href={`https://wa.me/${p.clean}`}
              className="font-medium hover:text-foreground underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.number} ({p.name})
            </a>
            {i < SITE_CONFIG.phones.length - 1 ? " o al " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}
