/**
 * Payment Pending Page
 * Shown when payment is being processed or pending approval
 */

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Clock, Package, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCartStore } from "@/features/cart/store/cart-store";

export function PaymentPendingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);

  // Get payment info from URL params
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const externalReference = searchParams.get("external_reference");
  const merchantOrderId = searchParams.get("merchant_order_id");

  // Clear cart when payment is pending (order is placed)
  useEffect(() => {
    if (status === "pending" || status === "in_process") {
      clearCart();
    }
  }, [status, clearCart]);

  return (
    <div className="mx-auto px-4 py-12 container">
      <div className="mx-auto max-w-2xl">
        <Card className="p-8 text-center">
          {/* Pending Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex justify-center items-center bg-yellow-100 rounded-full w-20 h-20">
              <Clock className="w-12 h-12 text-yellow-600" />
            </div>
          </div>

          {/* Pending Message */}
          <h1 className="mb-4 font-bold text-3xl text-yellow-600">
            Pago Pendiente
          </h1>

          <p className="mb-6 text-lg text-muted-foreground">
            Tu pago está siendo procesado. Te notificaremos cuando se confirme.
          </p>

          {/* Information Alert */}
          <Alert className="mb-8 border-yellow-200 bg-yellow-50">
            <AlertDescription className="flex items-start gap-3 text-left text-yellow-800">
              <Mail className="flex-shrink-0 mt-0.5 w-5 h-5" />
              <span>
                Recibirás un correo electrónico cuando tu pago sea confirmado.
                Esto puede tomar unos minutos o días dependiendo del método de
                pago.
              </span>
            </AlertDescription>
          </Alert>

          {/* Order Details */}
          <div className="mb-8 space-y-3 text-left">
            {externalReference && (
              <div className="flex justify-between items-center border-b py-3">
                <span className="font-medium text-sm">Número de Orden:</span>
                <span className="font-mono text-sm">{externalReference}</span>
              </div>
            )}
            {paymentId && (
              <div className="flex justify-between items-center border-b py-3">
                <span className="font-medium text-sm">ID de Pago:</span>
                <span className="font-mono text-sm">{paymentId}</span>
              </div>
            )}
            {merchantOrderId && (
              <div className="flex justify-between items-center border-b py-3">
                <span className="font-medium text-sm">
                  ID de Orden MercadoPago:
                </span>
                <span className="font-mono text-sm">{merchantOrderId}</span>
              </div>
            )}
            {status && (
              <div className="flex justify-between items-center border-b py-3">
                <span className="font-medium text-sm">Estado:</span>
                <span className="rounded-full bg-yellow-100 px-3 py-1 font-medium text-yellow-700 text-xs uppercase">
                  {status === "pending" ? "Pendiente" : "En Proceso"}
                </span>
              </div>
            )}
          </div>

          {/* What happens next */}
          <div className="bg-blue-50 mb-8 p-6 rounded-lg text-left">
            <div className="flex items-start gap-3">
              <Package className="flex-shrink-0 mt-1 w-5 h-5 text-blue-600" />
              <div>
                <h3 className="mb-3 font-semibold text-blue-900">
                  ¿Qué sucede ahora?
                </h3>
                <ul className="space-y-2 text-blue-800 text-sm list-disc list-inside">
                  <li>
                    Estamos esperando la confirmación de tu pago (esto puede
                    tomar unos minutos)
                  </li>
                  <li>Te enviaremos un correo cuando el pago sea confirmado</li>
                  <li>
                    Una vez confirmado, procesaremos tu pedido inmediatamente
                  </li>
                  <li>Puedes usar el número de orden para hacer seguimiento</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => navigate("/productos")}
              variant="outline"
              className="flex-1"
            >
              <Package className="mr-2 w-4 h-4" />
              Ver Productos
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700"
            >
              <Home className="mr-2 w-4 h-4" />
              Volver al Inicio
            </Button>
          </div>

          {/* Support Link */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-muted-foreground text-sm">
              ¿Tienes alguna duda?{" "}
              <button
                onClick={() => navigate("/contacto")}
                className="font-medium text-blue-600 hover:underline"
              >
                Contáctanos
              </button>{" "}
              y te ayudaremos con el seguimiento de tu pedido.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export const Component = PaymentPendingPage;
