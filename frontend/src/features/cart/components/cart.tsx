import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/use-cart";
import { CartItemComponent } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { CartEmpty } from "./cart-empty";
import { Link } from "react-router";
import { useState } from "react";

interface CartProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Shopping cart component with drawer/sheet UI
 * Displays cart items, summary, and checkout button
 * Persists to localStorage via Zustand store
 */
export function Cart({ open, onOpenChange }: CartProps) {
  const { items, isEmpty, subtotal, total } = useCart();
  const [isOpen, setIsOpen] = useState(open ?? false);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <Sheet open={open ?? isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="flex flex-col p-0 w-full sm:max-w-lg">
        <SheetHeader className="border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <SheetTitle>Carrito de Compras</SheetTitle>
          </div>
          <SheetDescription>
            {isEmpty
              ? "No hay productos en tu carrito"
              : `${items.length} ${items.length === 1 ? "producto" : "productos"} en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        {isEmpty ? (
          <CartEmpty />
        ) : (
          <>
            {/* Cart Items - Scrollable */}
            <div className="flex-1 px-4 overflow-y-auto">
              <div className="space-y-2">
                {items.map((item) => (
                  <CartItemComponent
                    key={item.product.documentId}
                    item={item}
                  />
                ))}
              </div>
            </div>

            {/* Cart Summary and Actions */}
            <SheetFooter className="border-t">
              <div className="space-y-4 w-full">
                <CartSummary subtotal={subtotal} total={total} />

                <Button
                  asChild
                  className="bg-red-600 hover:bg-red-700 w-full h-12 font-medium text-white"
                  onClick={() => handleOpenChange(false)}
                >
                  <Link to="/finalizar-compra">Proceder al Pago</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOpenChange(false)}
                >
                  <Link to="/productos">Seguir Comprando</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
