module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://market-assets.strapi.io'],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '256mb', // Para datos de formularios
      jsonLimit: '256mb', // Para JSON
      textLimit: '256mb', // Para texto
      formidable: {
        maxFileSize: 256 * 1024 * 1024, // 256 MB en bytes para archivos
      },
    },
  },
  {
    name: 'global::force-https',
    config: {},
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
