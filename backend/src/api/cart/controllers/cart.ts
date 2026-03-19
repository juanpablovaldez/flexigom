// @ts-nocheck
import { factories } from '@strapi/strapi';
import crypto from 'crypto';

const fetchFullCart = async (strapi, guestToken) => {
  const carts = await strapi.documents('api::cart.cart').findMany({
    filters: { guestToken },
    populate: ['items']
  });

  if (!carts || carts.length === 0) return null;
  const cart = carts[0];

  if (!cart.items || cart.items.length === 0) return cart;

  const productIds = cart.items.map(i => i.productId);
  const products = await strapi.documents('api::product.product').findMany({
    filters: { documentId: { $in: productIds } },
    populate: ['images', 'categories']
  });

  cart.items = cart.items.map(item => ({
    ...item,
    // Provide full product structure expected by frontend
    product: products.find(p => p.documentId === item.productId)
  }));

  // Sort items by creation to maintain order
  cart.items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return cart;
};

export default factories.createCoreController('api::cart.cart', ({ strapi }) => ({
  
  // Create a new cart and assign cookie
  async createCart(ctx) {
    const existingToken = ctx.cookies.get('guest_cart_token');
    
    // If client already has a token, try to find existing cart
    if (existingToken) {
      const existingCart = await fetchFullCart(strapi, existingToken);
      if (existingCart) {
        return ctx.send({ data: existingCart });
      }
    }

    const guestToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const cart = await strapi.documents('api::cart.cart').create({
      data: { guestToken, expiresAt, items: [] },
    });

    ctx.cookies.set('guest_cart_token', guestToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
      sameSite: 'lax',
    });

    return ctx.send({ data: cart });
  },

  // Get current active cart
  async getMyCart(ctx) {
    const guestToken = ctx.cookies.get('guest_cart_token');
    if (!guestToken) return ctx.send({ data: { items: [] } });

    const cart = await fetchFullCart(strapi, guestToken);
    
    if (cart) {
      return ctx.send({ data: cart });
    }

    ctx.cookies.set('guest_cart_token', '', { maxAge: 0 });
    return ctx.send({ data: { items: [] } });
  },

  // Add an item to the cart
  async addItem(ctx) {
    let guestToken = ctx.cookies.get('guest_cart_token');
    
    if (!guestToken) {
      guestToken = crypto.randomUUID();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);
      await strapi.documents('api::cart.cart').create({
        data: { guestToken, expiresAt, items: [] },
      });
      ctx.cookies.set('guest_cart_token', guestToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
        sameSite: 'lax',
      });
    }

    const { productId, quantity = 1, composition, measurement } = ctx.request.body;

    const carts = await strapi.documents('api::cart.cart').findMany({
      filters: { guestToken },
      populate: ['items']
    });

    if (!carts || carts.length === 0) return ctx.badRequest('Cart does not exist.');

    const cart = carts[0];

    const products = await strapi.documents('api::product.product').findMany({
      filters: { documentId: productId },
    });

    if (!products || products.length === 0) return ctx.badRequest('Product not found.');
    
    const product = products[0];
    const price = product.discount_price > 0 && product.discount_price < product.price 
      ? product.discount_price 
      : product.price;

    const existingItem = cart.items.find(
      (item) => item.productId === productId && 
                item.composition === composition && 
                item.measurement === measurement
    );

    if (existingItem) {
      const newQuantity = Math.min(existingItem.quantity + quantity, product.stock || 999);
      await strapi.documents('api::cart-item.cart-item').update({
        documentId: existingItem.documentId,
        data: { quantity: newQuantity }
      });
    } else {
      await strapi.documents('api::cart-item.cart-item').create({
        data: {
          cart: cart.documentId,
          productId: product.documentId,
          name: product.name,
          price: price,
          quantity: Math.min(quantity, product.stock || 999),
          composition,
          measurement,
        }
      });
    }

    // Return the updated full cart
    const updatedCart = await fetchFullCart(strapi, guestToken);
    return ctx.send({ data: updatedCart, message: 'Item added' });
  },

  // Update item quantity
  async updateItem(ctx) {
    const guestToken = ctx.cookies.get('guest_cart_token');
    const { itemId } = ctx.params;
    const { quantity } = ctx.request.body;

    if (!guestToken) return ctx.unauthorized();

    const item = await strapi.documents('api::cart-item.cart-item').findOne({
      documentId: itemId,
      populate: ['cart']
    });

    if (!item || item.cart?.guestToken !== guestToken) {
      return ctx.notFound();
    }

    if (quantity <= 0) {
      await strapi.documents('api::cart-item.cart-item').delete({ documentId: itemId });
    } else {
      await strapi.documents('api::cart-item.cart-item').update({
        documentId: itemId,
        data: { quantity }
      });
    }

    const updatedCart = await fetchFullCart(strapi, guestToken);
    return ctx.send({ data: updatedCart });
  },

  // Remove an item entirely
  async removeItem(ctx) {
    const guestToken = ctx.cookies.get('guest_cart_token');
    const { itemId } = ctx.params;

    if (!guestToken) return ctx.unauthorized();

    const item = await strapi.documents('api::cart-item.cart-item').findOne({
      documentId: itemId,
      populate: ['cart']
    });

    if (!item || item.cart?.guestToken !== guestToken) {
      return ctx.notFound();
    }

    await strapi.documents('api::cart-item.cart-item').delete({ documentId: itemId });
    
    const updatedCart = await fetchFullCart(strapi, guestToken);
    return ctx.send({ data: updatedCart });
  },

  // Clear all items in cart
  async clearCart(ctx) {
    const guestToken = ctx.cookies.get('guest_cart_token');
    if (!guestToken) return ctx.unauthorized();

    const carts = await strapi.documents('api::cart.cart').findMany({
      filters: { guestToken },
      populate: ['items']
    });

    if (!carts || carts.length === 0) return ctx.notFound();

    const cart = carts[0];
    
    for (const item of cart.items) {
      await strapi.documents('api::cart-item.cart-item').delete({
        documentId: item.documentId
      });
    }

    const updatedCart = await fetchFullCart(strapi, guestToken);
    return ctx.send({ data: updatedCart });
  }

}));
