/**
 * product service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::product.product', ({ strapi }) => ({
  async bulkPriceUpdate(categoryId: number, adjustmentType: 'percentage' | 'fixed', action: 'increase' | 'decrease' | 'replace', value: number, productIds?: (number | string)[]) {
    if (value < 0) {
      throw new Error("El valor de ajuste no puede ser negativo.");
    }

    const filters: any = {
      categories: {
        id: categoryId
      }
    };

    if (productIds && productIds.length > 0) {
      // In Strapi 5, we should preferably use documentId if possible, but id also works in filters
      filters.documentId = { $in: productIds };
    }

    const products = await strapi.documents('api::product.product').findMany({
      filters,
      populate: ['categories']
    });

    let affectedCount = 0;

    const calculateNewPrice = (currentPrice: number) => {
      let newPrice = currentPrice;

      if (adjustmentType === 'percentage') {
        if (action === 'increase') {
          newPrice = currentPrice * (1 + (value / 100));
        } else if (action === 'decrease') {
          newPrice = currentPrice * (1 - (value / 100));
        }
      } else if (adjustmentType === 'fixed') {
        if (action === 'increase') {
          newPrice = currentPrice + value;
        } else if (action === 'decrease') {
          newPrice = currentPrice - value;
        } else if (action === 'replace') {
          newPrice = value;
        }
      }

      newPrice = Math.max(0, newPrice); // Prevent negative prices
      return Math.round(newPrice * 100) / 100; // Round to 2 decimals
    };

    for (const product of products) {
      const updateData: any = {
        price: calculateNewPrice(Number(product.price) || 0)
      };

      if (product.discount_price !== null && product.discount_price !== undefined) {
        updateData.discount_price = calculateNewPrice(Number(product.discount_price));
      }

      await strapi.documents('api::product.product').update({
        documentId: product.documentId,
        data: updateData,
        status: 'published' // Ensure changes stay published
      });
      affectedCount++;
    }

    return { affectedCount };
  }
}));
