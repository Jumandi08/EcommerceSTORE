'use strict';

/**
 * review router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

// Custom routes además de las rutas por defecto
module.exports = {
  routes: [
    // Rutas públicas
    {
      method: 'GET',
      path: '/reviews/product/:productId',
      handler: 'review.findByProduct',
      config: {
        auth: false
      }
    },
    {
      method: 'POST',
      path: '/reviews/:id/helpful',
      handler: 'review.markHelpful',
      config: {
        auth: false
      }
    },
    // Rutas autenticadas
    {
      method: 'POST',
      path: '/reviews',
      handler: 'review.create',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'PUT',
      path: '/reviews/:id',
      handler: 'review.update',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'DELETE',
      path: '/reviews/:id',
      handler: 'review.delete',
      config: {
        policies: [],
        middlewares: []
      }
    }
  ]
};
