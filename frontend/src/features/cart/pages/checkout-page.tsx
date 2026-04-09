import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { useCart } from "../hooks/use-cart";
import { useCheckoutStore } from "../store/checkout-store";
import { CheckoutStepper } from "../components/checkout-stepper";
import { ShippingForm } from "../components/shipping-form";
import { PaymentForm } from "../components/payment-form";
import { OrderSummary } from "../components/order-summary";
import { OrderConfirmation } from "../components/order-confirmation";
import { CheckoutStep } from "../types";
import type { ShippingFormData } from "../types/shipping-types";
import { toast } from "sonner";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { isEmpty } = useCart();
  const currentStep = useCheckoutStore((state) => state.currentStep);
  const formData = useCheckoutStore((state) => state.formData);
  const isProcessing = useCheckoutStore((state) => state.isProcessing);
  const orderId = useCheckoutStore((state) => state.orderId);
  const error = useCheckoutStore((state) => state.error);

  const updateShippingData = useCheckoutStore(
    (state) => state.updateShippingData,
  );
  const updatePaymentData = useCheckoutStore(
    (state) => state.updatePaymentData,
  );
  const nextStep = useCheckoutStore((state) => state.nextStep);
  const previousStep = useCheckoutStore((state) => state.previousStep);
  const submitOrder = useCheckoutStore((state) => state.submitOrder);
  const resetCheckout = useCheckoutStore((state) => state.resetCheckout);

  // Redirect if cart is empty
  useEffect(() => {
    if (isEmpty && currentStep !== CheckoutStep.CONFIRMATION) {
      toast.error("Tu carrito está vacío");
      navigate("/productos");
    }
  }, [isEmpty, currentStep, navigate]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Reset checkout when leaving confirmation page
  useEffect(() => {
    return () => {
      if (currentStep === CheckoutStep.CONFIRMATION) {
        resetCheckout();
      }
    };
  }, [currentStep, resetCheckout]);

  const handleShippingSubmit = (data: ShippingFormData) => {
    updateShippingData(data);
    nextStep();
  };

  const handlePaymentSubmit = (data: typeof formData.payment) => {
    if (data) {
      updatePaymentData(data);
      nextStep();
    }
  };

  const handleOrderSubmit = async () => {
    await submitOrder();
  };

  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        {currentStep !== CheckoutStep.CONFIRMATION && (
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-bold text-3xl">Finalizar Compra</h1>
            <p className="text-muted-foreground">
              Completa los siguientes pasos para confirmar tu pedido
            </p>
          </div>
        )}

        {/* Stepper */}
        {currentStep !== CheckoutStep.CONFIRMATION && (
          <div className="mb-8">
            <CheckoutStepper currentStep={currentStep} />
          </div>
        )}

        {/* Step Content */}
        <Card className="p-6 md:p-8">
          {currentStep === CheckoutStep.SHIPPING && (
            <div>
              <h2 className="mb-6 font-semibold text-2xl">
                Información de Envío
              </h2>
              <ShippingForm
                initialData={formData.shipping}
                onSubmit={handleShippingSubmit}
                onBack={() => navigate("/productos")}
              />
            </div>
          )}

          {currentStep === CheckoutStep.PAYMENT && (
            <div>
              <h2 className="mb-6 font-semibold text-2xl">Método de Pago</h2>
              <PaymentForm
                initialData={formData.payment}
                onSubmit={handlePaymentSubmit}
                onBack={previousStep}
              />
            </div>
          )}

          {currentStep === CheckoutStep.REVIEW &&
            formData.shipping &&
            formData.payment && (
              <div>
                <h2 className="mb-6 font-semibold text-2xl">
                  Revisar y Confirmar
                </h2>
                <OrderSummary
                  shippingData={formData.shipping}
                  paymentData={formData.payment}
                  onSubmit={handleOrderSubmit}
                  onBack={previousStep}
                  isProcessing={isProcessing}
                />
              </div>
            )}

          {currentStep === CheckoutStep.CONFIRMATION &&
            orderId &&
            formData.shipping && (
              <OrderConfirmation
                orderId={orderId}
                email={formData.shipping.email}
              />
            )}
        </Card>
      </div>
    </div>
  );
}

export const Component = CheckoutPage;
