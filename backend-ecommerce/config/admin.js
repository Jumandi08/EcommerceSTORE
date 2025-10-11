module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    options: {
      expiresIn: '7d',
    },
    events: {
      onConnectionSuccess(e) {
        console.log(e.user.username, 'successfully logged in to the admin panel');
      },
      onConnectionError(e) {
        console.error('Authentication error:', e.error.message, e.provider);
      },
    },
    sessions: {
      cookie: {
        secure: env.bool('ADMIN_COOKIE_SECURE', false),
        sameSite: 'lax',
      },
    },
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  url: '/admin',
});
