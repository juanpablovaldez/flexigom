export const SITE_CONFIG = {
  name: "Flexigom",
  domain: "flexigomtucuman.com",
  url: "https://flexigomtucuman.com",
  phones: [
    { name: "Jessica", number: "+54 9 381 582-4678", clean: "5493815824678" },
    { name: "Martín", number: "+54 9 381 527-7935", clean: "5493815277935" },
  ],
  email: "flexituc@gmail.com",
  address: {
    street: "Tucumán",
    city: "San Miguel de Tucumán",
    province: "Tucumán",
    country: "Argentina",
    countryCode: "AR",
  },
  businessHours: {
    weekdays: "Mo-Fr 08:30-13:00,17:00-20:00",
    saturday: "Sa 09:00-13:00",
    sunday: "Su closed",
  },
  // Coordinates for San Miguel de Tucumán center
  coordinates: {
    latitude: -26.8241,
    longitude: -65.2226,
  },
  social: {
    facebook: "https://facebook.com/flexigom",
    instagram: "https://instagram.com/flexigom",
  },
  founded: "2004", // 20+ years ago
};

export const KEYWORDS = {
  primary: [
    "colchones Tucumán",
    "sommiers Tucumán",
    "colchonería Flexigom",
    "tienda de colchones San Miguel de Tucumán",
  ],
  secondary: [
    "colchones argentina",
    "sommiers argentina",
    "almohadas Tucumán",
    "descanso Tucumán",
    "muebles dormitorio Tucumán",
    "colchones ortopédicos",
    "colchones memoria",
    "colchones resortes",
  ],
  longtail: [
    "donde comprar colchones en Tucumán",
    "mejores colchones Tucumán",
    "colchones baratos Tucumán",
    "sommiers 2 plazas Tucumán",
    "colchones 1 plaza Tucumán",
  ],
};

export const DEFAULT_SEO = {
  title: "Flexigom - Colchones y Sommiers en Tucumán | 20+ Años de Calidad",
  description:
    "Especialistas en colchones y sommiers en Tucumán. Más de 20 años brindando el mejor descanso a familias argentinas. Entrega en San Miguel de Tucumán.",
  keywords: [...KEYWORDS.primary, ...KEYWORDS.secondary].join(", "),
  siteName: "Flexigom",
  locale: "es_AR",
  type: "website" as const,
  image: "/og-image.jpg",
};

export const BUSINESS_SCHEMA_BASE = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_CONFIG.url}#business`,
  name: SITE_CONFIG.name,
  description:
    "Especialistas en colchones y sommiers con más de 20 años de experiencia en Tucumán, Argentina.",
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.phones.map((p) => p.number),
  email: SITE_CONFIG.email,
  foundingDate: SITE_CONFIG.founded,
  priceRange: "$$",
  currenciesAccepted: "ARS",
  paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address.street,
    addressLocality: SITE_CONFIG.address.city,
    addressRegion: SITE_CONFIG.address.province,
    addressCountry: SITE_CONFIG.address.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE_CONFIG.coordinates.latitude,
    longitude: SITE_CONFIG.coordinates.longitude,
  },
  openingHours: [
    SITE_CONFIG.businessHours.weekdays,
    SITE_CONFIG.businessHours.saturday,
  ],
  areaServed: [
    {
      "@type": "City",
      name: "San Miguel de Tucumán",
    },
    {
      "@type": "State",
      name: "Tucumán",
    },
    {
      "@type": "Country",
      name: "Argentina",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Productos de Descanso",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Colchones",
          description:
            "Colchones de alta calidad en diferentes medidas y materiales",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Sommiers",
          description: "Sommiers y bases para colchones en todas las medidas",
        },
      },
    ],
  },
  image: [
    `${SITE_CONFIG.url}/og-image.jpg`,
    `${SITE_CONFIG.url}/woman-sleeping.webp`,
  ],
  sameAs: [
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.instagram,
    ...SITE_CONFIG.phones.map((p) => `https://wa.me/${p.clean}`),
  ],
};
