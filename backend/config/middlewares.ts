export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
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
