# build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# runtime stage
FROM nginx:alpine

# install envsubst (from gettext package)
RUN apk add --no-cache gettext

# nginx config (includes /graphql proxy to backend service)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# app static files (Vite outDir is "build")
COPY --from=build /app/build /usr/share/nginx/html

# runtime env template
COPY public/env.template.js /usr/share/nginx/html/env.template.js

# startup script: generate env.js then start nginx
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
