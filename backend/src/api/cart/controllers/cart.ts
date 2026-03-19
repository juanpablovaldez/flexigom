// @ts-nocheck
import { factories } from '@strapi/strapi';
import crypto from 'crypto';

const fetchFullCart = async (strapi, guestToken) => {
  try {
    const carts = await strapi.documents('api::cart.cart').findMany({
      filters: { guestToken },
      populate: ['items']
    });

    if (!carts || carts.length === 0) return null;
    const cart = carts[0];

    // Ensure items is always an array
    if (!cart.items || cart.items.length === 0) {
      cart.items = [];
      return cart;
    }

    const productIds = cart.items.map(i => i.productId).filter(Boolean);
    
    if (productIds.length === 0) return cart;

    const products = await strapi.documents('api::product.product').findMany({
      filters: { documentId: { $in: productIds } },
      populate: ['images', 'categories']
    });

    cart.items = cart.items.map(item => ({
      ...item,
      product: products.find(p => p.documentId === item.productId)
    }));

    cart.items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return cart;
  } catch (error) {
    console.error(`[Cart Controller] Error in fetchFullCart:`, error);
    throw error;
  }
};

export default factories.createCoreController('api::cart.cart', ({ strapi }) => ({
  
  // Create a new cart and assign cookie
  async createCart(ctx) {
    try {
      const existingToken = ctx.cookies.get('guest_cart_token');
      
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
        secure: ctx.request.secure,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
        sameSite: 'lax',
      });

      return ctx.send({ data: cart });
    } catch (error) {
      console.error(`[Cart Controller] Error in createCart:`, error);
      return ctx.internalServerError('Error creating cart');
    }
  },

  // Get current active cart
  async getMyCart(ctx) {
    try {
      const guestToken = ctx.cookies.get('guest_cart_token');
      if (!guestToken) return ctx.send({ data: { items: [] } });

      const cart = await fetchFullCart(strapi, guestToken);
      
      if (cart) {
        return ctx.send({ data: cart });
      }

      ctx.cookies.set('guest_cart_token', '', { maxAge: 0 });
      return ctx.send({ data: { items: [] } });
    } catch (error) {
      console.error(`[Cart Controller] Error in getMyCart:`, error);
      return ctx.internalServerError('Error fetching cart');
    }
  },

  // Add an item to the cart
  async addItem(ctx) {
    try {
      let guestToken = ctx.cookies.get('guest_cart_token');
      const { productId, quantity = 1, composition, measurement } = ctx.request.body;
      
      console.log(`[Cart Controller] addItem called:`, { guestToken, productId, quantity, composition, measurement });

      if (!productId) {
        return ctx.badRequest('Product ID is required');
      }

      if (!guestToken) {
        guestToken = crypto.randomUUID();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);
        await strapi.documents('api::cart.cart').create({
          data: { guestToken, expiresAt, items: [] },
        });
        ctx.cookies.set('guest_cart_token', guestToken, {
          httpOnly: true,
          secure: ctx.request.secure,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: '/',
          sameSite: 'lax',
        });
        console.log(`[Cart Controller] New guest cart created:`, guestToken);
      }

      const carts = await strapi.documents('api::cart.cart').findMany({
        filters: { guestToken },
        populate: ['items']
      });

      if (!carts || carts.length === 0) {
        console.error(`[Cart Controller] Cart not found for token:`, guestToken);
        return ctx.badRequest('Cart does not exist.');
      }

      const cart = carts[0];

      const products = await strapi.documents('api::product.product').findMany({
        filters: { documentId: productId },
      });

      if (!products || products.length === 0) {
        console.error(`[Cart Controller] Product not found:`, productId);
        return ctx.badRequest('Product not found.');
      }
      
      const product = products[0];
      
      // Defensive calculation of price
      const basePrice = Number(product.price) || 0;
      const discountPrice = Number(product.discount_price) || 0;
      const price = (discountPrice > 0 && discountPrice < basePrice) ? discountPrice : basePrice;

      if (price <= 0) {
        console.warn(`[Cart Controller] Product price is zero or invalid:`, { productId, price });
      }

      const items = cart.items || [];
      const existingItem = items.find(
        (item) => item.productId === productId && 
                  item.composition === composition && 
                  item.measurement === measurement
      );

      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, product.stock || 999);
        console.log(`[Cart Controller] Updating existing item:`, { itemId: existingItem.documentId, newQuantity });
        await strapi.documents('api::cart-item.cart-item').update({
          documentId: existingItem.documentId,
          data: { quantity: newQuantity }
        });
      } else {
        console.log(`[Cart Controller] Creating new cart item for product:`, product.name);
        await strapi.documents('api::cart-item.cart-item').create({
          data: {
            cart: cart.documentId,
            productId: product.documentId,
            name: product.name || 'Producto',
            price: price,
            quantity: Math.min(quantity, product.stock || 999),
            composition: composition || null,
            measurement: measurement || null,
          }
        });
      }

      const updatedCart = await fetchFullCart(strapi, guestToken);
      return ctx.send({ data: updatedCart, message: 'Item added' });
    } catch (error) {
      console.error(`[Cart Controller] Error in addItem:`, error);
      return ctx.internalServerError(`Internal server error: ${error.message}`);
    }
  },

  // Update item quantity
  async updateItem(ctx) {
    try {
      const guestToken = ctx.cookies.get('guest_cart_token');
      const { itemId } = ctx.params;
      const { quantity } = ctx.request.body;

      console.log(`[Cart Controller] updateItem called:`, { guestToken, itemId, quantity });

      if (!guestToken) return ctx.unauthorized();

      const item = await strapi.documents('api::cart-item.cart-item').findOne({
        documentId: itemId,
        populate: ['cart']
      });

      if (!item || item.cart?.guestToken !== guestToken) {
        console.error(`[Cart Controller] Item not found or unauthorized:`, { itemId, guestToken });
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
    } catch (error) {
      console.error(`[Cart Controller] Error in updateItem:`, error);
      return ctx.internalServerError(`Internal server error: ${error.message}`);
    }
  },

  // Remove an item entirely
  async removeItem(ctx) {
    try {
      const guestToken = ctx.cookies.get('guest_cart_token');
      const { itemId } = ctx.params;

      console.log(`[Cart Controller] removeItem called:`, { guestToken, itemId });

      if (!guestToken) return ctx.unauthorized();

      const item = await strapi.documents('api::cart-item.cart-item').findOne({
        documentId: itemId,
        populate: ['cart']
      });

      if (!item || item.cart?.guestToken !== guestToken) {
        console.error(`[Cart Controller] Item not found or unauthorized:`, { itemId, guestToken });
        return ctx.notFound();
      }

      await strapi.documents('api::cart-item.cart-item').delete({ documentId: itemId });
      
      const updatedCart = await fetchFullCart(strapi, guestToken);
      return ctx.send({ data: updatedCart });
    } catch (error) {
      console.error(`[Cart Controller] Error in removeItem:`, error);
      return ctx.internalServerError(`Internal server error: ${error.message}`);
    }
  },

  // Clear all items in cart
  async clearCart(ctx) {
    try {
      const guestToken = ctx.cookies.get('guest_cart_token');
      console.log(`[Cart Controller] clearCart called:`, { guestToken });

      if (!guestToken) return ctx.unauthorized();

      const carts = await strapi.documents('api::cart.cart').findMany({
        filters: { guestToken },
        populate: ['items']
      });

      if (!carts || carts.length === 0) return ctx.notFound();

      const cart = carts[0];
      
      const items = cart.items || [];
      for (const item of items) {
        await strapi.documents('api::cart-item.cart-item').delete({
          documentId: item.documentId
        });
      }

      const updatedCart = await fetchFullCart(strapi, guestToken);
      return ctx.send({ data: updatedCart });
    } catch (error) {
      console.error(`[Cart Controller] Error in clearCart:`, error);
      return ctx.internalServerError(`Internal server error: ${error.message}`);
    }
  }

}));
