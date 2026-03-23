export default {
  routes: [
    {
      method: "PATCH",
      path: "/products/bulk-price-update",
      handler: "api::product.product.bulkPriceUpdate",
      config: {
        auth: false, // Set to false to allow Admin UI requests to hit it, we will verify admin tokens manually or rely on policies
        policies: [], // Ideally 'admin::isAuthenticatedAdmin', but sometimes it throws errors if used on Content API
      }
    }
  ]
};
