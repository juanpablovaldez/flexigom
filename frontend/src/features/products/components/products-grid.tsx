import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/features/home/components/product-card";
import { ProductsGridSkeleton } from "../skeletons/products-grid-skeleton";
import type { Product } from "@/types";

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function ProductsGrid({
  products,
  isLoading,
  hasActiveFilters,
  onClearFilters,
}: ProductsGridProps) {
  if (isLoading) {
    return <ProductsGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <p className="text-gray-500">
          No se encontraron productos con los filtros seleccionados
        </p>
        <div className="pt-4">
          <Button
            variant="outline"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="flex justify-center items-center gap-2 w-full"
          >
            <RefreshCcw className="size-4" />
            Limpiar filtros
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="gap-3 sm:gap-6 w-full grid grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
