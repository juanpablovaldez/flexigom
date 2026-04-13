import api from "@/lib/api";
import { type StrapiResponse } from "@/types";
import type { PromotionBanner } from "../types";


export const BannerServices = {
    async getBanner(): Promise<PromotionBanner> {
        const response = await api.get<StrapiResponse<PromotionBanner>>("/banner",
            {
                params: {
                    populate: ["image"],
                    filters: {
                        isActive: true,
                    },
                },
            }
        );
        return response.data.data;
    },
};