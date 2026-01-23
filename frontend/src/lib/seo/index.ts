export type {
  SEOConfig,
  OpenGraphConfig,
  TwitterConfig,
  StructuredDataConfig,
  ProductPageSEO,
  CategoryPageSEO,
  LocalBusinessSchema,
} from "./types";

// Constants
export {
  SITE_CONFIG,
  DEFAULT_SEO,
  KEYWORDS,
  BUSINESS_SCHEMA_BASE,
} from "./constants";

// Utils
export {
  createSEOConfig,
  createOpenGraphConfig,
  createTwitterConfig,
  createProductSEO,
  createCategorySEO,
  createHomeSEO,
  createPageSEO,
} from "./utils";

// Structured Data
export {
  createLocalBusinessSchema,
  createProductSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createFAQPageSchema,
  createWebsiteSchema,
  createOrganizationSchema,
} from "./structured-data";
