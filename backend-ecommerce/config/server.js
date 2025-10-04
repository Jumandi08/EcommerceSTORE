module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // HTTP server configuration
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  proxy: env.bool('IS_PROXIED', true),
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
  // Admin panel configuration
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
      options: {
        expiresIn: '7d',
      },
    },
    cookies: {
      secure: env.bool('ADMIN_JWT_COOKIE_SECURE', true),
      signed: true,
      httpOnly: true,
    },
    refreshToken: {
      cookie: {
        secure: env.bool('ADMIN_REFRESH_TOKEN_COOKIE_SECURE', true),
        signed: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      },
    },
  },
  // HTTP timeout settings
  http: {
    responseTimeout: env.int('HTTP_RESPONSE_TIMEOUT', 30000),
    requestTimeout: env.int('HTTP_REQUEST_TIMEOUT', 30000),
  },
});
