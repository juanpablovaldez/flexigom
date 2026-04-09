import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

export function CartEmpty() {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 py-16 text-center">
      <div className="flex justify-center items-center bg-gray-100 rounded-full w-24 h-24">
        <ShoppingCart className="w-12 h-12 text-gray-400" />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Tu carrito está vacío</h3>
        <p className="text-muted-foreground text-sm">
          Descubre nuestros productos y comienza a agregar al carrito
        </p>
      </div>
      <Button asChild className="mt-4">
        <Link to="/productos">Ver Productos</Link>
      </Button>
    </div>
  );
}
