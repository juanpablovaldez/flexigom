import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { ProductFilters } from "@/types";
import {
  DEFAULT_FILTERS,
  DEFAULT_PRICE_RANGE,
} from "../constants/products-constants";

// Helper function to parse URL parameters into filters
function parseFiltersFromURL(searchParams: URLSearchParams): ProductFilters {
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");
  const compositionParam = searchParams.get("composition");
  const measurementParam = searchParams.get("measurement");
  const searchParam = searchParams.get("search");
  const sortParam = searchParams.get("sort");
  const pageParam = searchParams.get("page");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  return {
    ...DEFAULT_FILTERS,
    categories: categoryParam ? [categoryParam] : undefined,
    brands: brandParam ? brandParam.split(",") : undefined,
    compositions: compositionParam ? compositionParam.split(",") : undefined,
    measurements: measurementParam ? measurementParam.split(",") : undefined,
    search: searchParam || undefined,
    sortBy: (sortParam as ProductFilters["sortBy"]) || DEFAULT_FILTERS.sortBy,
    page: pageParam ? parseInt(pageParam, 10) : DEFAULT_FILTERS.page,
    priceRange:
      minPriceParam && maxPriceParam
        ? {
            min: parseInt(minPriceParam, 10),
            max: parseInt(maxPriceParam, 10),
          }
        : DEFAULT_FILTERS.priceRange,
  };
}

// Helper function to create URLSearchParams from filters
function createURLFromFilters(filters: ProductFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.categories?.length) {
    params.set("category", filters.categories[0]);
  }
  if (filters.brands?.length) {
    params.set("brand", filters.brands.join(","));
  }
  if (filters.compositions?.length) {
    params.set("composition", filters.compositions.join(","));
  }
  if (filters.measurements?.length) {
    params.set("measurement", filters.measurements.join(","));
  }
  if (filters.search) {
    params.set("search", filters.search);
  }
  if (filters.sortBy && filters.sortBy !== DEFAULT_FILTERS.sortBy) {
    params.set("sort", filters.sortBy);
  }
  if (filters.page && filters.page !== DEFAULT_FILTERS.page) {
    params.set("page", filters.page.toString());
  }
  if (
    filters.priceRange &&
    (filters.priceRange.min !== DEFAULT_PRICE_RANGE[0] ||
      filters.priceRange.max !== DEFAULT_PRICE_RANGE[1])
  ) {
    params.set("minPrice", filters.priceRange.min.toString());
    params.set("maxPrice", filters.priceRange.max.toString());
  }

  return params;
}

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Derive filters directly from URL parameters (always in sync)
  const filters = useMemo(
    () => parseFiltersFromURL(searchParams),
    [searchParams],
  );

  // Use URL price range directly or fall back to defaults
  const tempPriceRange = useMemo(() => {
    if (filters.priceRange) {
      return [filters.priceRange.min, filters.priceRange.max];
    }
    return DEFAULT_PRICE_RANGE;
  }, [filters.priceRange]);

  const [localTempPriceRange, setLocalTempPriceRange] =
    useState<number[]>(tempPriceRange);

  // Update URL when filters change
  const updateURL = (newFilters: ProductFilters) => {
    const params = createURLFromFilters(newFilters);
    setSearchParams(params, { replace: true });
  };

  const handleBrandFilter = (brand: string, checked: boolean) => {
    const newFilters = {
      ...filters,
      brands: checked
        ? [...(filters.brands || []), brand]
        : (filters.brands || []).filter((b) => b !== brand),
      page: 1,
    };
    updateURL(newFilters);
  };

  const handleCompositionFilter = (composition: string, checked: boolean) => {
    const newFilters = {
      ...filters,
      compositions: checked
        ? [...(filters.compositions || []), composition]
        : (filters.compositions || []).filter((c) => c !== composition),
      page: 1,
    };
    updateURL(newFilters);
  };

  const handleMeasurementFilter = (measurement: string, checked: boolean) => {
    const newFilters = {
      ...filters,
      measurements: checked
        ? [...(filters.measurements || []), measurement]
        : (filters.measurements || []).filter((m) => m !== measurement),
      page: 1,
    };
    updateURL(newFilters);
  };

  const handleCategoryFilter = (category: string, checked: boolean) => {
    const newFilters = {
      ...filters,
      categories: checked
        ? [...(filters.categories || []), category]
        : (filters.categories || []).filter((c) => c !== category),
      page: 1,
    };
    updateURL(newFilters);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setLocalTempPriceRange(values);
    const newFilters = {
      ...filters,
      priceRange: { min: values[0], max: values[1] },
      page: 1,
    };
    updateURL(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = {
      ...filters,
      sortBy: sortBy as ProductFilters["sortBy"],
      page: 1,
    };
    updateURL(newFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = {
      ...filters,
      page,
    };
    updateURL(newFilters);

    // Scroll to the very top of the page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleSearchFilter = (search: string) => {
    const newFilters = {
      ...filters,
      search: search.trim() || undefined,
      page: 1,
    };
    updateURL(newFilters);
  };

  const clearFilters = () => {
    setLocalTempPriceRange(DEFAULT_PRICE_RANGE);
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters = () => {
    return (
      (filters.brands && filters.brands.length > 0) ||
      (filters.compositions && filters.compositions.length > 0) ||
      (filters.measurements && filters.measurements.length > 0) ||
      (filters.categories && filters.categories.length > 0) ||
      (filters.search && filters.search.trim().length > 0) ||
      (filters.priceRange &&
        (filters.priceRange.min !== DEFAULT_PRICE_RANGE[0] ||
          filters.priceRange.max !== DEFAULT_PRICE_RANGE[1]))
    );
  };

  return {
    filters,
    tempPriceRange: localTempPriceRange,
    setTempPriceRange: setLocalTempPriceRange,
    handleBrandFilter,
    handleCompositionFilter,
    handleMeasurementFilter,
    handleCategoryFilter,
    handleSearchFilter,
    handlePriceRangeChange,
    handleSortChange,
    handlePageChange,
    clearFilters,
    hasActiveFilters,
  };
}
