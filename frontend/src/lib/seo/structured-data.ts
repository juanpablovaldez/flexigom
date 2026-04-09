import type { StructuredDataConfig } from "./types";
import { BUSINESS_SCHEMA_BASE, SITE_CONFIG } from "./constants";

export function createLocalBusinessSchema(): StructuredDataConfig {
  return BUSINESS_SCHEMA_BASE;
}

export function createProductSchema(product: {
  name: string;
  description?: string;
  price?: string;
  currency?: string;
  brand?: string;
  category?: string;
  images?: string[];
  availability?: string;
  condition?: string;
  sku?: string;
  gtin?: string;
}): StructuredDataConfig {
  const schema: StructuredDataConfig = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description || `${product.name} disponible en Flexigom Tucumán`,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: product.brand || "Flexigom",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Flexigom",
      url: SITE_CONFIG.url,
    },
  };

  if (product.images && product.images.length > 0) {
    schema.image = product.images.map((img) =>
      img.startsWith("http") ? img : `${SITE_CONFIG.url}${img}`,
    );
  }

  if (product.sku) {
    schema.sku = product.sku;
  }

  if (product.gtin) {
    schema.gtin = product.gtin;
  }

  if (product.price) {
    schema.offers = {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency || "ARS",
      availability: `https://schema.org/${product.availability || "InStock"}`,
      itemCondition: `https://schema.org/${product.condition || "NewCondition"}`,
      seller: {
        "@type": "LocalBusiness",
        name: SITE_CONFIG.name,
        telephone: SITE_CONFIG.phones.map((p) => p.number),
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE_CONFIG.address.city,
          addressRegion: SITE_CONFIG.address.province,
          addressCountry: SITE_CONFIG.address.countryCode,
        },
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "ARS",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
          },
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "AR",
          addressRegion: "Tucumán",
        },
      },
    };
  }

  return schema;
}

export function createBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>,
): StructuredDataConfig {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith("http")
        ? crumb.url
        : `${SITE_CONFIG.url}${crumb.url}`,
    })),
  };
}

export function createFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
): StructuredDataConfig {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createWebsiteSchema(): StructuredDataConfig {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description:
      "Especialistas en colchones y sommiers en Tucumán con más de 20 años de experiencia.",
    inLanguage: "es-AR",
    publisher: {
      "@type": "LocalBusiness",
      "@id": `${SITE_CONFIG.url}#business`,
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_CONFIG.url}/productos?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
  };
}

export function createOrganizationSchema(): StructuredDataConfig {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description:
      "Especialistas en colchones y sommiers con más de 20 años de experiencia en Tucumán, Argentina.",
    foundingDate: SITE_CONFIG.founded,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.phones.map((p) => p.number),
        contactType: "customer service",
        availableLanguage: "Spanish",
        areaServed: "AR",
        hoursAvailable: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:30",
            closes: "13:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "17:00",
            closes: "20:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "13:00",
          },
        ],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.province,
      addressCountry: SITE_CONFIG.address.countryCode,
    },
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
      ...SITE_CONFIG.phones.map((p) => `https://wa.me/${p.clean}`),
    ],
  };
}

export function createFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>,
): StructuredDataConfig {
  return createFAQSchema(faqs);
}
