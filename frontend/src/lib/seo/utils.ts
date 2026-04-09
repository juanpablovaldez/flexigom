import type {
  SEOConfig,
  OpenGraphConfig,
  TwitterConfig,
  ProductPageSEO,
  CategoryPageSEO,
} from "./types";
import { DEFAULT_SEO, SITE_CONFIG, KEYWORDS } from "./constants";

export function createSEOConfig(config: Partial<SEOConfig>): SEOConfig {
  return {
    title: config.title || DEFAULT_SEO.title,
    description: config.description || DEFAULT_SEO.description,
    keywords: config.keywords || DEFAULT_SEO.keywords,
    canonical: config.canonical || SITE_CONFIG.url,
    noindex: config.noindex || false,
    openGraph: createOpenGraphConfig(config.openGraph),
    twitter: createTwitterConfig(config.twitter),
    structuredData: config.structuredData,
  };
}

export function createOpenGraphConfig(
  config?: Partial<OpenGraphConfig>,
): OpenGraphConfig {
  return {
    title: config?.title || DEFAULT_SEO.title,
    description: config?.description || DEFAULT_SEO.description,
    type: config?.type || DEFAULT_SEO.type,
    image: config?.image || `${SITE_CONFIG.url}${DEFAULT_SEO.image}`,
    url: config?.url || SITE_CONFIG.url,
    siteName: config?.siteName || DEFAULT_SEO.siteName,
    locale: config?.locale || DEFAULT_SEO.locale,
    ...config,
  };
}

export function createTwitterConfig(
  config?: Partial<TwitterConfig>,
): TwitterConfig {
  return {
    card: config?.card || "summary_large_image",
    site: config?.site || "@flexigom",
    title: config?.title || DEFAULT_SEO.title,
    description: config?.description || DEFAULT_SEO.description,
    image: config?.image || `${SITE_CONFIG.url}${DEFAULT_SEO.image}`,
    ...config,
  };
}

export function createProductSEO(product: {
  name: string;
  description?: string;
  price?: string;
  brand?: string;
  category?: string;
  images?: string[];
  documentId?: string;
  slug?: string;
}): ProductPageSEO {
  const title = `${product.name} - ${product.category || "Producto"} | Flexigom Tucumán`;
  const description = product.description
    ? `${product.description} Disponible en Flexigom, tu tienda de confianza en Tucumán. ${product.price ? `Precio: ${product.price}.` : ""} Más de 20 años de experiencia.`
    : `${product.name} disponible en Flexigom Tucumán. Especialistas en productos de descanso con más de 20 años de experiencia.`;

  const keywords = [
    product.name,
    product.category || "producto",
    product.brand || "",
    ...KEYWORDS.primary,
    "comprar en Tucumán",
  ]
    .filter(Boolean)
    .join(", ");

  const canonical = product.slug
    ? `${SITE_CONFIG.url}/productos/${product.slug}`
    : `${SITE_CONFIG.url}/productos`;

  const mainImage = product.images?.[0] || DEFAULT_SEO.image;

  return {
    title,
    description,
    keywords,
    canonical,
    productName: product.name,
    productPrice: product.price,
    productBrand: product.brand,
    productAvailability: "InStock",
    productImages: product.images,
    openGraph: createOpenGraphConfig({
      title,
      description,
      type: "product",
      image: mainImage.startsWith("http")
        ? mainImage
        : `${SITE_CONFIG.url}${mainImage}`,
      url: canonical,
    }),
    twitter: createTwitterConfig({
      title,
      description,
      image: mainImage.startsWith("http")
        ? mainImage
        : `${SITE_CONFIG.url}${mainImage}`,
    }),
  };
}

export function createCategorySEO(category: {
  name: string;
  description?: string;
  productCount?: number;
  slug?: string;
}): CategoryPageSEO {
  const title = `${category.name} en Tucumán - Flexigom | Especialistas en Descanso`;
  const description = category.description
    ? `${category.description} En Flexigom encontrarás los mejores ${category.name.toLowerCase()} en Tucumán. ${category.productCount ? `${category.productCount} productos disponibles.` : ""} Más de 20 años de experiencia.`
    : `Descubrí nuestra selección de ${category.name.toLowerCase()} en Tucumán. Flexigom, especialistas en productos de descanso con más de 20 años de experiencia.`;

  const keywords = [
    `${category.name.toLowerCase()} Tucumán`,
    `comprar ${category.name.toLowerCase()}`,
    `tienda ${category.name.toLowerCase()} Tucumán`,
    ...KEYWORDS.primary,
  ].join(", ");

  const canonical = category.slug
    ? `${SITE_CONFIG.url}/productos?category=${category.slug}`
    : `${SITE_CONFIG.url}/productos`;

  return {
    title,
    description,
    keywords,
    canonical,
    categoryName: category.name,
    productCount: category.productCount,
    openGraph: createOpenGraphConfig({
      title,
      description,
      type: "website",
      url: canonical,
    }),
    twitter: createTwitterConfig({
      title,
      description,
    }),
  };
}

export function createHomeSEO(): SEOConfig {
  return createSEOConfig({
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    keywords: DEFAULT_SEO.keywords,
    canonical: SITE_CONFIG.url,
    openGraph: createOpenGraphConfig({
      url: SITE_CONFIG.url,
    }),
    twitter: createTwitterConfig({}),
  });
}

export function createPageSEO(pageConfig: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): SEOConfig {
  const title = `${pageConfig.title} | Flexigom Tucumán`;
  const description = `${pageConfig.description} Flexigom, especialistas en productos de descanso en Tucumán con más de 20 años de experiencia.`;

  const keywordsSet = new Set([
    ...(pageConfig.keywords || []),
    ...KEYWORDS.primary,
  ]);
  const keywords = Array.from(keywordsSet).join(", ");

  const canonical = pageConfig.path
    ? `${SITE_CONFIG.url}${pageConfig.path}`
    : SITE_CONFIG.url;

  return createSEOConfig({
    title,
    description,
    keywords,
    canonical,
    openGraph: createOpenGraphConfig({
      title,
      description,
      url: canonical,
    }),
    twitter: createTwitterConfig({
      title,
      description,
    }),
  });
}
