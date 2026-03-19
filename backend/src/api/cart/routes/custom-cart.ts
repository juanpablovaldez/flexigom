export default {
  routes: [
    {
      method: 'POST',
      path: '/cart',
      handler: 'api::cart.cart.createCart',
      config: { policies: [], auth: false },
    },
    {
      method: 'GET',
      path: '/cart/my-cart',
      handler: 'api::cart.cart.getMyCart',
      config: { policies: [], auth: false },
    },
    {
      method: 'POST',
      path: '/cart/items',
      handler: 'api::cart.cart.addItem',
      config: { policies: [], auth: false },
    },
    {
      method: 'PATCH',
      path: '/cart/items/:itemId',
      handler: 'api::cart.cart.updateItem',
      config: { policies: [], auth: false },
    },
    {
      method: 'DELETE',
      path: '/cart/items/:itemId',
      handler: 'api::cart.cart.removeItem',
      config: { policies: [], auth: false },
    },
    {
      method: 'DELETE',
      path: '/cart',
      handler: 'api::cart.cart.clearCart',
      config: { policies: [], auth: false },
    }
  ]
};
