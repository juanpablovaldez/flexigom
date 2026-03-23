/**
 * product controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async bulkPriceUpdate(ctx: any) {
    try {
      const { categoryId, adjustmentType, action, value, productIds } = ctx.request.body;

      if (!categoryId || !adjustmentType || !action || value === undefined) {
        return ctx.badRequest('Faltan parámetros requeridos.');
      }

      const adminUser = ctx.state.user;

      const { affectedCount } = await strapi
        .service('api::product.product')
        .bulkPriceUpdate(categoryId, adjustmentType, action, Number(value), productIds);

      strapi.log.info(`Bulk price update - User: ${adminUser?.email || 'Unknown Admin'} | Category: ${categoryId} | Type: ${adjustmentType} | Action: ${action} | Value: ${value} | Affected: ${affectedCount}`);

      return ctx.send({ message: 'Precios actualizados masivamente', affectedCount });
    } catch (err) {
      return ctx.badRequest(err instanceof Error ? err.message : 'Error desconocido');
    }
  }
}));
