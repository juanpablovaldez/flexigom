import { useQuery } from "@tanstack/react-query";
import { BannerServices } from "../services/promotion-banner";

export function usePromotionBanner() {
  return useQuery({
    queryKey: ["promotion-banner"],
    queryFn: BannerServices.getBanner,
    staleTime: 5 * 60 * 1000,
  });
}
