import { cn, getImageUrl, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import type { Product } from "@/types";
import { Link } from "react-router";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const imageUrl = getImageUrl(product.images?.[0]?.url);
  const price = Number(product.price) || 0;
  const discountPrice = Number(product.discount_price) || 0;
  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <Link
      to={`/products/product/${product.documentId || "producto"}`}
      className={cn(
        "group flex flex-col bg-white shadow-md hover:shadow-xl border border-gray-100 rounded-xl h-full overflow-hidden transition-all duration-300",
        className,
      )}
    >
      <div className="relative flex justify-center items-center bg-gray-100 aspect-square overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={
              product.images?.[0]?.alternativeText ||
              `Imagen de ${product.name}`
            }
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <img src="/flexigom.png" alt={product.name} className="w-2/3 h-auto opacity-50" />
        )}

        {hasDiscount && (
          <Badge
            variant="destructive"
            className="top-2 right-2 absolute bg-red-600 hover:bg-red-700 font-bold text-white text-[10px] sm:text-xs px-1.5 py-0 sm:px-2.5 sm:py-0.5"
          >
            -{discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-col flex-1 p-3 sm:p-5 gap-2 sm:gap-4">
        <div className="flex-1 flex flex-col gap-1 sm:gap-3">
          <h3 className="font-bold text-gray-900 text-sm sm:text-lg line-clamp-2 leading-tight">
            {product.name || "Producto sin nombre"}
          </h3>

          {/* Brand, category, composition and measurement tags */}
          <div className="hidden sm:flex flex-wrap gap-1">
            {product.brand && (
              <Badge variant="destructive" className="text-xs">
                {product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}
              </Badge>
            )}
            {product.categories?.[0]?.name && (
              <Badge variant="outline" className="text-xs">
                {product.categories[0].name}
              </Badge>
            )}
            {product.composition && (
              <Badge variant="secondary" className="text-xs">
                {product.composition}
              </Badge>
            )}
            {product.measurement && (
              <Badge variant="default" className="text-xs capitalize">
                {product.measurement}
              </Badge>
            )}
          </div>

          {/* Star rating */}
          {product.rating && (
            <div className="hidden sm:block">
              <StarRating
                rating={product.rating}
                reviewCount={product.reviewCount}
                size="sm"
              />
            </div>
          )}

          <div className="space-y-0.5 sm:space-y-1 mt-auto">
            {hasDiscount ? (
              <>
                <div className="flex flex-row flex-wrap items-center gap-1.5 sm:space-x-3">
                  <span className="font-bold text-red-600 text-base sm:text-2xl leading-none">
                    {formatPrice(discountPrice)}
                  </span>
                  <span className="text-gray-400 text-xs sm:text-sm line-through leading-none">
                    {formatPrice(price)}
                  </span>
                </div>
                <div className="font-medium text-green-600 text-[10px] sm:text-sm hidden sm:block mt-1">
                  Ahorras {formatPrice(price - discountPrice)}
                </div>
              </>
            ) : (
              <span className="font-bold text-gray-900 text-base sm:text-xl leading-none">
                {formatPrice(price)}
              </span>
            )}
          </div>

          {product.description &&
            Array.isArray(product.description) &&
            product.description.length > 0 && (
              <div className="hidden sm:block mt-2">
                <p className="overflow-hidden text-gray-600 text-sm break-words line-clamp-2 leading-relaxed">
                  {product.description[0]?.children
                    ?.map((child) => child.text || "")
                    .join("") || ""}
                </p>
              </div>
            )}
        </div>

        <div className="flex bg-red-600 group-hover:bg-red-700 mt-2 w-full font-medium text-white items-center justify-center h-8 sm:h-10 rounded-md transition-colors text-xs sm:text-sm">
          Ver Producto
        </div>
      </div>
    </Link>
  );
}
