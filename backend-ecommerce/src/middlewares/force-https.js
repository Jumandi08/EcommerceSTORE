module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Force HTTPS detection from proxy headers
    const proto = ctx.request.headers['x-forwarded-proto'];
    if (proto === 'https') {
      ctx.request.secure = true;
      ctx.protocol = 'https';
    }
    await next();
  };
};
