import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
  register(app: StrapiApp) {
    app.addMenuLink({
      to: '/plugins/bulk-price-update',
      icon: () => <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>🏷️</span>,
      intlLabel: {
        id: 'bulk-price.plugin.name',
        defaultMessage: 'Actualización Masiva',
      },
      Component: async () => {
        return await import('./pages/BulkPriceUpdate');
      },
      permissions: [],
    });
  },
};
