import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { SectionTitle } from "../components/section-title";
import { CategoryCard } from "../components/category-card";
import { useCategories } from "../hooks/use-categories";
import type { CategoriesSectionProps, CategoryItem } from "../types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CategoriesSkeleton } from "@/features/products/skeletons/categories-skeleton";

interface DotIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
  onDotClick: (index: number) => void;
}

function DotIndicators({
  totalSlides,
  currentSlide,
  onDotClick,
}: DotIndicatorsProps) {
  return (
    <div className="flex justify-center gap-3 mt-8">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "rounded-full w-3 h-3 transition-all duration-300 cursor-pointer",
            currentSlide === index
              ? "bg-red-600 w-8"
              : "bg-gray-300 hover:bg-gray-400",
          )}
          onClick={() => onDotClick(index)}
          aria-label={`Go to category ${index + 1}`}
        />
      ))}
    </div>
  );
}

export function CategoriesSection({
  content,
  className,
}: CategoriesSectionProps = {}) {
  const { data: categories, isLoading, error } = useCategories();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const sectionContent = {
    title: "Nuestras Categorías",
    subtitle: "Explora nuestra amplia gama de productos para el descanso",
    categories: categories || [],
    ...content,
  };

  const shouldShowCarousel = sectionContent.categories.length > 3;

  useEffect(() => {
    if (!api || !shouldShowCarousel) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, shouldShowCarousel]);

  const scrollToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  const renderCategories = (categories: CategoryItem[]) => {
    if (shouldShowCarousel) {
      return (
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            orientation="horizontal"
            className="mx-auto w-full max-w-sm md:max-w-xl xl:max-w-6xl"
            setApi={setApi}
          >
            <CarouselContent className="-ml-1">
              {categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="pl-6 basis-full md:basis-1/2 xl:basis-1/3"
                >
                  <CategoryCard category={category} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          <DotIndicators
            totalSlides={count}
            currentSlide={current - 1}
            onDotClick={scrollToSlide}
          />
        </div>
      );
    }

    return (
      <div className="gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    );
  };

  if (error) {
    return (
      <section className={cn("bg-white py-12 md:py-16", className)}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionTitle
            title="Nuestras Categorías"
            subtitle="No pudimos cargar las categorías en este momento"
            className="mb-12 md:mb-16"
          />
          <div className="text-gray-500 text-center">
            <p>
              Ocurrió un error al cargar las categorías. Por favor, inténtalo
              nuevamente.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={cn("bg-white py-12 md:py-16", className)}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionTitle
            title="Nuestras Categorías"
            subtitle="Explora nuestra amplia gama de productos para el descanso"
            className="mb-12 md:mb-16"
          />
          <CategoriesSkeleton />
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className={cn("bg-white py-12 md:py-16", className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle
          title={sectionContent.title}
          subtitle={sectionContent.subtitle}
          className="mb-12 md:mb-16"
        />

        {renderCategories(sectionContent.categories)}
      </div>
    </section>
  );
}
