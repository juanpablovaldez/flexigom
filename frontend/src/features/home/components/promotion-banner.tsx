import { Skeleton } from "@/components/ui/skeleton";
import { usePromotionBanner } from "../hooks/use-promotion-banner";

export function PromotionBanner() {
  const { data: banner, isLoading, error } = usePromotionBanner();

  if (isLoading) {
    return <Skeleton className="h-12 w-full" />;
  }

  if (error || !banner || !banner.isActive) {
    return null;
  }

  return (
    // TODO: Write HTML structure for the banner using the `banner` data
    <div className="bg-primary text-primary-foreground p-2 text-center text-sm">
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
