import { useState, useCallback, forwardRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Search, Clock, X, ShoppingBag } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductSearch } from "@/features/products/hooks/use-product-search";
import {
  cn,
  formatPrice,
  getImageUrl,
  getKeyboardShortcut,
  isShortcutPressed,
  validateSearchInput,
  createSecureDisplayTerm,
  showSearchValidationError,
  sanitizeUrlParameter,
} from "@/lib/utils";
import type { Product } from "@/types";

interface SearchProductsBarProps {
  placeholder?: string;
  onProductSelect?: (product: Product) => void;
  onSearch?: (query: string) => void;
  variant?: "default" | "dialog" | "popover";
  maxResults?: number;
  showRecentSearches?: boolean;
  className?: string;
  trigger?: React.ReactNode;
}

const SearchProductsBar = forwardRef<HTMLDivElement, SearchProductsBarProps>(
  (
    {
      placeholder = "Buscar productos...",
      onProductSelect,
      onSearch,
      variant = "default",
      maxResults = 8,
      showRecentSearches = true,
      className,
      trigger,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (isShortcutPressed(e, "k")) {
          e.preventDefault();
          setIsOpen(true);
        }
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const {
      query,
      setQuery: setQueryOriginal,
      products,
      isLoading,
      recentSearches,
      addToRecentSearches,
      clearRecentSearches,
      clearSearch,
    } = useProductSearch({
      maxResults,
      enabled: true, // Always enabled, the hook will handle when to actually search
    });

    // Secure query setter with validation
    const setQuery = useCallback(
      (newQuery: string) => {
        // Validate input
        const validation = validateSearchInput(newQuery);
        if (!validation.isValid && newQuery.length > 0) {
          showSearchValidationError(validation.error || "Invalid input");
          return;
        }

        // Set the sanitized query
        setQueryOriginal(validation.sanitized);
      },
      [setQueryOriginal],
    );

    const handleProductSelect = useCallback(
      (product: Product) => {
        if (onProductSelect) {
          onProductSelect(product);
        } else {
          navigate(`/productos/${product.slug}`);
        }
        addToRecentSearches(query);
        setIsOpen(false);
        clearSearch();
      },
      [onProductSelect, navigate, addToRecentSearches, query, clearSearch],
    );

    const handleSearchSubmit = useCallback(
      (searchQuery: string) => {
        const validation = validateSearchInput(searchQuery);
        if (!validation.isValid) {
          showSearchValidationError(validation.error || "Invalid search term");
          return;
        }

        const sanitizedQuery = validation.sanitized;
        if (sanitizedQuery.trim()) {
          addToRecentSearches(sanitizedQuery);
          if (onSearch) {
            onSearch(sanitizedQuery);
          } else {
            const safeParam = sanitizeUrlParameter(sanitizedQuery);
            navigate(`/products?search=${safeParam}`);
          }
          setIsOpen(false);
          clearSearch();
        }
      },
      [addToRecentSearches, onSearch, navigate, clearSearch],
    );

    const handleRecentSearchSelect = useCallback(
      (recentSearch: string) => {
        setQuery(recentSearch);
        handleSearchSubmit(recentSearch);
      },
      [setQuery, handleSearchSubmit],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (query.trim()) {
            handleSearchSubmit(query);
          }
        }
      },
      [query, handleSearchSubmit],
    );

    if (variant === "dialog") {
      return (
        <>
          {trigger ? (
            <div onClick={() => setIsOpen(true)}>{trigger}</div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsOpen(true)}
              className={cn(
                "group relative justify-start hover:bg-gray-50 shadow-sm border-gray-300 hover:border-gray-400 w-full md:w-72 lg:w-80 xl:w-96 h-12 font-medium text-gray-600 text-base transition-all duration-200",
                className,
              )}
            >
              <div className="flex items-center w-full">
                <Search className="mr-3 w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                <span className="flex-1 text-left">Buscar productos...</span>
                <kbd className="hidden sm:inline-flex items-center gap-1 bg-gray-100 px-2 py-1 border rounded font-mono text-gray-600 text-xs">
                  <span className="text-xs">
                    {getKeyboardShortcut().symbol}
                  </span>
                  {getKeyboardShortcut().key}
                </kbd>
              </div>
            </Button>
          )}

          <CommandDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title="Buscar Productos"
            description="Encuentra productos por nombre, marca o categoría"
            className="w-[90vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl h-[75vh] [&_[data-slot=command]]:h-full max-h-[700px]"
          >
            <div className="px-1 py-1">
              <CommandInput
                placeholder={placeholder}
                value={query}
                onValueChange={setQuery}
                onKeyDown={handleKeyDown}
                className="px-4 rounded-none focus:ring-0 h-12 text-base text-left"
              />
            </div>
            <CommandList className="flex-1 px-2 max-h-none overflow-auto">
              {isLoading && (
                <CommandGroup>
                  <div className="px-4 py-6">
                    <div className="space-y-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-6 p-6 animate-pulse"
                        >
                          <Skeleton className="rounded-lg w-20 h-20" />
                          <div className="flex-1 space-y-3">
                            <Skeleton className="w-3/4 h-5" />
                            <Skeleton className="w-1/2 h-4" />
                            <div className="flex gap-3">
                              <Skeleton className="rounded-full w-20 h-6" />
                              <Skeleton className="w-16 h-4" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CommandGroup>
              )}
              <CommandEmpty>
                {isLoading ? (
                  <div className="py-8">
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-4 animate-pulse"
                        >
                          <Skeleton className="rounded-lg w-16 h-16" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="w-3/4 h-4" />
                            <Skeleton className="w-1/2 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="px-6 py-12 text-center">
                    {query.trim() ? (
                      <div className="space-y-6">
                        <div className="flex justify-center items-center bg-gray-100 mx-auto rounded-full w-20 h-20">
                          <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900 text-xl">
                            No encontramos productos
                          </h3>
                          <p className="mx-auto max-w-md text-gray-600 text-base">
                            No hay productos que coincidan con "
                            {createSecureDisplayTerm(query)}". Intenta con otros
                            términos o navega por categorías.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleSearchSubmit(query)}
                          className="px-6 py-3 text-base"
                        >
                          <Search className="mr-3 w-5 h-5" />
                          Ver todos los productos
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex justify-center items-center bg-gray-100 mx-auto rounded-full w-20 h-20">
                          <ShoppingBag className="w-10 h-10 text-gray-500" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900 text-xl">
                            Busca tus productos favoritos
                          </h3>
                          <p className="mx-auto max-w-md text-gray-600 text-base">
                            Encuentra colchones y sommiers escribiendo el nombre
                            del producto, marca o línea.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CommandEmpty>

              {products.length > 0 && (
                <CommandGroup className="px-6 py-4" heading="Productos">
                  {products.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={`${product.name} ${product.brand} ${product.categories?.map((c) => c.name).join(" ")}`}
                      onSelect={() => handleProductSelect(product)}
                      className="flex items-center gap-6 hover:bg-gray-50/80 mx-2 my-2 p-5 border border-transparent hover:border-gray-200 rounded-lg transition-colors duration-150"
                    >
                      <div className="relative">
                        <img
                          src={
                            getImageUrl(product.images?.[0]?.url) ||
                            "/placeholder-product.jpg"
                          }
                          alt={product.name}
                          className="shadow-sm border border-gray-100 rounded-lg w-20 h-20 object-cover"
                          loading="lazy"
                        />
                        {product.discount_price && (
                          <div className="-top-1 -right-1 absolute bg-red-500 px-1.5 py-0.5 rounded-full font-medium text-white text-xs">
                            {Math.round(
                              ((product.price - product.discount_price) /
                                product.price) *
                                100,
                            )}
                            %
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-base truncate leading-tight">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-red-600 text-xl">
                            {formatPrice(
                              product.discount_price || product.price,
                            )}
                          </span>
                          {product.discount_price && (
                            <span className="text-gray-500 text-sm line-through">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {product.categories.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {product.categories[0].name}
                            </Badge>
                          )}
                          {product.brand && (
                            <span className="font-medium text-gray-500 text-xs">
                              {product.brand}
                            </span>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                  {query.trim() && (
                    <>
                      <CommandSeparator />
                      <CommandItem
                        value={`ver todos los resultados para ${createSecureDisplayTerm(query)}`}
                        onSelect={() => handleSearchSubmit(query)}
                        className="bg-gray-50 hover:bg-gray-100 mx-1 my-1 p-3 border border-gray-200 rounded-lg text-gray-800"
                      >
                        <Search className="mr-2 w-4 h-4 text-gray-600" />
                        <span className="font-medium">
                          Ver todos los resultados para "
                          {createSecureDisplayTerm(query)}"
                        </span>
                      </CommandItem>
                    </>
                  )}
                </CommandGroup>
              )}

              {showRecentSearches &&
                recentSearches.length > 0 &&
                !query.trim() && (
                  <CommandGroup heading="Búsquedas recientes">
                    {recentSearches.map((recentSearch, index) => (
                      <CommandItem
                        key={index}
                        value={recentSearch}
                        onSelect={() => handleRecentSearchSelect(recentSearch)}
                        className="hover:bg-gray-50 mx-1 my-1 p-3 rounded-lg transition-colors"
                      >
                        <Clock className="mr-3 w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{recentSearch}</span>
                      </CommandItem>
                    ))}
                    <CommandSeparator />
                    <CommandItem
                      value="limpiar búsquedas recientes"
                      onSelect={clearRecentSearches}
                      className="hover:bg-red-50 mx-1 my-1 p-3 rounded-lg transition-colors"
                    >
                      <X className="mr-3 w-4 h-4" />
                      <span className="text-sm">
                        Limpiar búsquedas recientes
                      </span>
                    </CommandItem>
                  </CommandGroup>
                )}
            </CommandList>
          </CommandDialog>
        </>
      );
    }

    // Default inline variant
    return (
      <div ref={ref} className={cn("relative", className)}>
        <Command className="shadow-md border rounded-lg">
          <CommandInput
            placeholder={placeholder}
            value={query}
            onValueChange={setQuery}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
          />
          {isOpen && (
            <CommandList className="top-full right-0 left-0 z-50 absolute bg-popover shadow-md mt-1 p-1 border rounded-md max-h-96 overflow-auto text-popover-foreground">
              <CommandEmpty>
                {isLoading ? (
                  <div className="py-8">
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-4 animate-pulse"
                        >
                          <Skeleton className="rounded-lg w-16 h-16" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="w-3/4 h-4" />
                            <Skeleton className="w-1/2 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    {query.trim() ? (
                      <div className="space-y-4">
                        <div className="flex justify-center items-center bg-gray-100 mx-auto rounded-full w-16 h-16">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900 text-lg">
                            No encontramos productos
                          </h3>
                          <p className="mx-auto max-w-sm text-gray-600 text-sm">
                            No hay productos que coincidan con "
                            {createSecureDisplayTerm(query)}". Intenta con otros
                            términos o navega por categorías.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleSearchSubmit(query)}
                          className="bg-red-600 hover:bg-red-700 mt-4 border-red-600 text-white"
                        >
                          <Search className="mr-2 w-4 h-4" />
                          Ver todos los productos
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex justify-center items-center bg-gray-100 mx-auto rounded-full w-20 h-20">
                          <ShoppingBag className="w-10 h-10 text-gray-500" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900 text-xl">
                            Busca tus productos favoritos
                          </h3>
                          <p className="mx-auto max-w-md text-gray-600 text-base">
                            Encuentra colchones y almohadas escribiendo el
                            nombre del producto, marca o categoría.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CommandEmpty>

              {products.length > 0 && (
                <CommandGroup heading="Productos">
                  {products.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={`${product.name} ${product.brand} ${product.categories?.map((c) => c.name).join(" ")}`}
                      onSelect={() => handleProductSelect(product)}
                      className="flex items-center gap-4 hover:bg-gray-50/80 mx-1 my-1 p-4 border border-transparent hover:border-gray-200 rounded-lg transition-colors duration-150"
                    >
                      <div className="relative">
                        <img
                          src={
                            getImageUrl(product.images?.[0]?.url) ||
                            "/placeholder-product.jpg"
                          }
                          alt={product.name}
                          className="shadow-sm border border-gray-100 rounded-lg w-20 h-20 object-cover"
                          loading="lazy"
                        />
                        {product.discount_price && (
                          <div className="-top-1 -right-1 absolute bg-red-500 px-1.5 py-0.5 rounded-full font-medium text-white text-xs">
                            {Math.round(
                              ((product.price - product.discount_price) /
                                product.price) *
                                100,
                            )}
                            %
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-base truncate leading-tight">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-red-600 text-xl">
                            {formatPrice(
                              product.discount_price || product.price,
                            )}
                          </span>
                          {product.discount_price && (
                            <span className="text-gray-500 text-sm line-through">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {product.categories.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {product.categories[0].name}
                            </Badge>
                          )}
                          {product.brand && (
                            <span className="font-medium text-gray-500 text-xs">
                              {product.brand}
                            </span>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                  {query.trim() && (
                    <>
                      <CommandSeparator />
                      <CommandItem
                        value={`ver todos los resultados para ${createSecureDisplayTerm(query)}`}
                        onSelect={() => handleSearchSubmit(query)}
                        className="bg-gray-50 hover:bg-gray-100 mx-1 my-1 p-3 border border-gray-200 rounded-lg text-gray-800"
                      >
                        <Search className="mr-2 w-4 h-4 text-gray-600" />
                        <span className="font-medium">
                          Ver todos los resultados para "
                          {createSecureDisplayTerm(query)}"
                        </span>
                      </CommandItem>
                    </>
                  )}
                </CommandGroup>
              )}

              {showRecentSearches &&
                recentSearches.length > 0 &&
                !query.trim() && (
                  <CommandGroup heading="Búsquedas recientes">
                    {recentSearches.map((recentSearch, index) => (
                      <CommandItem
                        key={index}
                        value={recentSearch}
                        onSelect={() => handleRecentSearchSelect(recentSearch)}
                        className="hover:bg-gray-50 mx-1 my-1 p-3 rounded-lg transition-colors"
                      >
                        <Clock className="mr-3 w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{recentSearch}</span>
                      </CommandItem>
                    ))}
                    <CommandSeparator />
                    <CommandItem
                      value="limpiar búsquedas recientes"
                      onSelect={clearRecentSearches}
                      className="hover:bg-red-50 mx-1 my-1 p-3 rounded-lg text-red-600 hover:text-red-700 transition-colors"
                    >
                      <X className="mr-3 w-4 h-4" />
                      <span className="text-sm">
                        Limpiar búsquedas recientes
                      </span>
                    </CommandItem>
                  </CommandGroup>
                )}
            </CommandList>
          )}
        </Command>

        {/* Overlay to close search when clicking outside */}
        {isOpen && (
          <div
            className="z-40 fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  },
);

SearchProductsBar.displayName = "SearchProductsBar";

export { SearchProductsBar };
export type { SearchProductsBarProps };
