'use strict';

/**
 * review controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::review.review', ({ strapi }) => ({
  // Crear una nueva review (requiere autenticación)
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in to create a review');
    }

    const { rating, comment, product } = ctx.request.body.data;

    // Validaciones
    if (!rating || !comment || !product) {
      return ctx.badRequest('Rating, comment and product are required');
    }

    if (rating < 1 || rating > 5) {
      return ctx.badRequest('Rating must be between 1 and 5');
    }

    // Verificar si el usuario ya ha comentado este producto
    const existingReview = await strapi.db.query('api::review.review').findOne({
      where: {
        user: { id: user.id },
        product: { id: product }
      }
    });

    if (existingReview) {
      return ctx.badRequest('You have already reviewed this product');
    }

    // Verificar si el usuario ha comprado el producto (opcional)
    // Aquí podrías verificar si existe una orden con este producto
    let hasOrderedProduct = false;
    try {
      const orders = await strapi.db.query('api::order.order').findMany({
        where: {
          user: { id: user.id }
        },
        populate: ['products']
      });

      hasOrderedProduct = orders.some(order =>
        order.products && order.products.some(p => p.id === product || p === product)
      );
    } catch (error) {
      // Si falla la verificación de orden, simplemente marca como no verificado
      hasOrderedProduct = false;
    }

    // Crear la review
    const review = await strapi.entityService.create('api::review.review', {
      data: {
        rating,
        comment,
        product,
        user: user.id,
        verified: hasOrderedProduct ? true : false, // Verificado si ha comprado
        helpful: 0
      },
      populate: ['user', 'product']
    });

    return ctx.send({ data: review });
  },

  // Obtener reviews por producto
  async findByProduct(ctx) {
    const { productId } = ctx.params;

    if (!productId) {
      return ctx.badRequest('Product ID is required');
    }

    const reviews = await strapi.entityService.findMany('api::review.review', {
      filters: {
        product: productId
      },
      populate: ['user'],
      sort: { createdAt: 'desc' }
    });

    // Calcular estadísticas
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length,
    };

    return ctx.send({
      data: reviews,
      meta: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution
      }
    });
  },

  // Marcar review como útil
  async markHelpful(ctx) {
    const { id } = ctx.params;

    const review = await strapi.entityService.findOne('api::review.review', id);

    if (!review) {
      return ctx.notFound('Review not found');
    }

    const updatedReview = await strapi.entityService.update('api::review.review', id, {
      data: {
        helpful: review.helpful + 1
      },
      populate: ['user', 'product']
    });

    return ctx.send({ data: updatedReview });
  },

  // Actualizar propia review
  async update(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;

    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    const review = await strapi.entityService.findOne('api::review.review', id, {
      populate: ['user']
    });

    if (!review) {
      return ctx.notFound('Review not found');
    }

    if (review.user.id !== user.id) {
      return ctx.forbidden('You can only update your own reviews');
    }

    const { rating, comment } = ctx.request.body.data;

    const updatedReview = await strapi.entityService.update('api::review.review', id, {
      data: {
        rating: rating || review.rating,
        comment: comment || review.comment
      },
      populate: ['user', 'product']
    });

    return ctx.send({ data: updatedReview });
  },

  // Eliminar propia review
  async delete(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;

    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    const review = await strapi.entityService.findOne('api::review.review', id, {
      populate: ['user']
    });

    if (!review) {
      return ctx.notFound('Review not found');
    }

    if (review.user.id !== user.id) {
      return ctx.forbidden('You can only delete your own reviews');
    }

    await strapi.entityService.delete('api::review.review', id);

    return ctx.send({ data: { message: 'Review deleted successfully' } });
  }
}));
