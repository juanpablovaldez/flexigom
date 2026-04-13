import { Skeleton } from "@/components/ui/skeleton";
import { usePromotionBanner } from "../hooks/use-promotion-banner";

export function PromotionBanner() {
  // Obtenemos la respuesta del hook
  const { data: responseData, isLoading, error } = usePromotionBanner();

  if (isLoading) {
    return <Skeleton className="h-12 w-full" />;
  }

  // Extraemos el objeto real del banner desde el array de Strapi
  // Ajusta "responseData.data[0]" o "responseData[0]" según lo que retorne exactamente tu hook
  const banner = responseData && responseData ? responseData : null;
  // (Si tu hook devuelve la respuesta cruda de axios/fetch, usa: responseData?.data?.[0])

  // Ahora "banner" es un objeto y podemos leer ".isActive"
  if (error || !banner || !banner.isActive) {
    return null;
  }

  return (
    <div className="bg-primary text-primary-foreground p-2 text-center text-sm h-full">
      <p>
        <span className="font-bold">{banner.title}</span> - {banner.description}
        {banner.discount > 0 && ` (${banner.discount}% OFF)`}
        {" "}
        <a href={banner.ctaUrl} className="underline hover:no-underline">
          {banner.ctaText}
        </a>
      </p>
    </div>
  );
}