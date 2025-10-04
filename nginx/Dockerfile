FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf.template

# Install envsubst for environment variable substitution
RUN apk add --no-cache gettext

# Create directory for certbot
RUN mkdir -p /var/www/certbot

# Expose ports
EXPOSE 80 443

# Start nginx with environment variable substitution
CMD envsubst '$$DOMAIN' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
