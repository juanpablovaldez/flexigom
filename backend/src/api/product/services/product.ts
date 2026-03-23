/**
 * product service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::product.product', ({ strapi }) => ({
  async bulkPriceUpdate(categoryId: number, adjustmentType: 'percentage' | 'fixed', action: 'increase' | 'decrease' | 'replace', value: number) {
    if (value < 0) {
      throw new Error("El valor de ajuste no puede ser negativo.");
    }

    const products = await strapi.db.query('api::product.product').findMany({
      where: {
        categories: {
          id: categoryId
        }
      },
      populate: ['categories']
    });

    let affectedCount = 0;

    for (const product of products) {
      let currentPrice = Number(product.price);
      if (isNaN(currentPrice)) currentPrice = 0;
      
      let newPrice = currentPrice;

      if (adjustmentType === 'percentage') {
        if (action === 'increase') {
          newPrice = currentPrice * (1 + (value / 100));
        } else if (action === 'decrease') {
          newPrice = currentPrice * (1 - (value / 100));
        } else if (action === 'replace') {
          throw new Error("No se puede reemplazar un precio con un porcentaje.");
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
      newPrice = Math.round(newPrice * 100) / 100; // Round to 2 decimals

      await strapi.db.query('api::product.product').update({
        where: { id: product.id },
        data: { price: newPrice }
      });
      affectedCount++;
    }

    return { affectedCount };
  }
}));
