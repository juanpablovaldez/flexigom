import { cn } from "@/lib/utils";
import { SectionTitle } from "../components/section-title";
import { ProductCard } from "../components/product-card";
import { useFeaturedProductsBySection } from "../hooks/use-featured-products";
import type { FeaturedProductsSectionProps } from "../types";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { useNavigate } from "react-router";
import { FeaturedProductsSkeleton } from "@/features/products/skeletons/featured-products-skeleton";

export function FeaturedProductsSection({
  section = "homepage",
  className,
}: FeaturedProductsSectionProps = {}) {
  const navigate = useNavigate();

  const {
    data: featuredProducts,
    isLoading,
    error,
  } = useFeaturedProductsBySection(section);

  const displayProducts = featuredProducts?.[0]?.products.slice(0, 6);

  const sectionContent = {
    title: "Productos Destacados",
    subtitle:
      "Descubre nuestros productos más populares y con ofertas especiales",
  };

  if (error) {
    return (
      <section className={cn("bg-gray-50 py-12 md:py-16", className)}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionTitle
            title="Productos Destacados"
            subtitle="No pudimos cargar los productos destacados en este momento"
            className="mb-12 md:mb-16"
          />
          <div className="text-gray-500 text-center">
            <p>
              Ocurrió un error al cargar los productos destacados. Por favor,
              inténtalo nuevamente.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={cn("bg-gray-50 py-12 md:py-16", className)}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionTitle
            title="Productos Destacados"
            subtitle="Descubre nuestros productos más populares y con ofertas especiales"
            className="mb-12 md:mb-16"
          />
          <FeaturedProductsSkeleton count={3} />
        </div>
      </section>
    );
  }

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className={cn("bg-gray-50 py-12 md:py-16", className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle
          title={sectionContent.title}
          subtitle={sectionContent.subtitle}
          className="mb-12 md:mb-16"
        />

        {/* 6-Product Grid Layout */}
        <div className="gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mb-12 max-w-6xl">
          {displayProducts?.map((product: Product, index) => (
            <ProductCard
              key={product?.id || product?.documentId || `product-${index}`}
              product={product}
            />
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/productos")}
            size="lg"
            className="bg-red-600 hover:bg-red-700 px-8 py-4 font-semibold text-white text-lg hover:cursor-pointer"
          >
            Ver más productos
          </Button>
        </div>
      </div>
    </section>
  );
}
