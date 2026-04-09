/**
 * Payment Failure Page
 * Shown when payment fails or is rejected by MercadoPago
 */

import { useNavigate, useSearchParams } from "react-router";
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function PaymentFailurePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get payment info from URL params
  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");

  // Common failure reasons
  const getFailureReason = () => {
    const statusDetail = searchParams.get("status_detail");

    const reasons: Record<string, string> = {
      cc_rejected_bad_filled_card_number:
        "Número de tarjeta incorrecto. Verifica los datos.",
      cc_rejected_bad_filled_date:
        "Fecha de vencimiento incorrecta. Verifica los datos.",
      cc_rejected_bad_filled_security_code:
        "Código de seguridad incorrecto. Verifica los datos.",
      cc_rejected_blacklist:
        "La tarjeta fue rechazada. Intenta con otra tarjeta.",
      cc_rejected_call_for_authorize:
        "Debes autorizar el pago con tu banco. Contacta a tu banco.",
      cc_rejected_card_disabled:
        "La tarjeta está deshabilitada. Contacta a tu banco.",
      cc_rejected_insufficient_amount:
        "Fondos insuficientes. Intenta con otra tarjeta.",
      cc_rejected_max_attempts:
        "Superaste el límite de intentos. Intenta más tarde.",
    };

    return statusDetail && reasons[statusDetail]
      ? reasons[statusDetail]
      : "El pago no pudo ser procesado. Por favor, intenta nuevamente.";
  };

  return (
    <div className="mx-auto px-4 py-12 container">
      <div className="mx-auto max-w-2xl">
        <Card className="p-8 text-center">
          {/* Failure Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex justify-center items-center bg-red-100 rounded-full w-20 h-20">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Failure Message */}
          <h1 className="mb-4 font-bold text-3xl text-red-600">
            Pago Rechazado
          </h1>

          <p className="mb-6 text-lg text-muted-foreground">
            No pudimos procesar tu pago. No te preocupes, tu pedido está
            guardado.
          </p>

          {/* Failure Reason */}
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertDescription className="flex items-start gap-3 text-left text-red-800">
              <HelpCircle className="flex-shrink-0 mt-0.5 w-5 h-5" />
              <span>{getFailureReason()}</span>
            </AlertDescription>
          </Alert>

          {/* Order Reference */}
          {externalReference && (
            <div className="mb-8 text-left">
              <div className="flex justify-between items-center border-b py-3">
                <span className="font-medium text-sm">
                  Número de Referencia:
                </span>
                <span className="font-mono text-sm">{externalReference}</span>
              </div>
              {paymentId && (
                <div className="flex justify-between items-center border-b py-3">
                  <span className="font-medium text-sm">ID de Intento:</span>
                  <span className="font-mono text-sm">{paymentId}</span>
                </div>
              )}
            </div>
          )}

          {/* What to do next */}
          <div className="bg-blue-50 mb-8 p-6 rounded-lg text-left">
            <h3 className="mb-3 font-semibold text-blue-900">
              ¿Qué puedes hacer?
            </h3>
            <ul className="space-y-2 text-blue-800 text-sm list-disc list-inside">
              <li>Verifica que los datos de tu tarjeta sean correctos</li>
              <li>Asegúrate de tener fondos suficientes</li>
              <li>Intenta con otra tarjeta o método de pago</li>
              <li>Contacta a tu banco si el problema persiste</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => navigate("/finalizar-compra")}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="mr-2 w-4 h-4" />
              Intentar Nuevamente
            </Button>
            <Button
              onClick={() => navigate("/productos")}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Volver a Comprar
            </Button>
          </div>

          {/* Support Link */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-muted-foreground text-sm">
              ¿Necesitas ayuda?{" "}
              <button
                onClick={() => navigate("/contacto")}
                className="font-medium text-blue-600 hover:underline"
              >
                Contáctanos
              </button>{" "}
              y te ayudaremos a completar tu compra.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export const Component = PaymentFailurePage;
