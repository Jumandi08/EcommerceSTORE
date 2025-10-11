module.exports = {
  register({ strapi }) {
    // Trust proxy - this is crucial for detecting HTTPS behind reverse proxy
    strapi.server.app.proxy = true;

    // Add middleware to force HTTPS detection from proxy headers
    strapi.server.app.use((ctx, next) => {
      // Koa uses ctx.protocol which checks X-Forwarded-Proto when proxy=true
      // Force HTTPS detection
      if (ctx.request.headers['x-forwarded-proto'] === 'https') {
        ctx.request.secure = true;
        ctx.protocol = 'https';
      }
      return next();
    });
  },

  bootstrap({ strapi }) {},
};
