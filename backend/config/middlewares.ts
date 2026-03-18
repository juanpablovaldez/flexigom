export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          "media-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      headers: [
        "Content-Type",
        "Authorization",
        "Origin",
        "Accept",
        "ngrok-skip-browser-warning",
      ],
      origin: [
        "http://localhost:5173",
        "http://localhost:1337",
        "https://flexigomtucuman.com",
        "https://www.flexigomtucuman.com",
        "https://flexigom-backoffice.up.railway.app",
        "https://flexigom.up.railway.app",
        ...(process.env.ALLOWED_ORIGINS
          ? process.env.ALLOWED_ORIGINS.split(",")
          : []),
      ],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
