# Ref: https://medium.com/geekculture/dockerizing-a-react-application-with-multi-stage-docker-build-4a5c6ca68166
# pull official base image
FROM node:18-buster-slim AS builder

# set working directory
WORKDIR /app


# copies package.json and package-lock.json to Docker environment
COPY package.json ./
COPY package-lock.json ./

# install app dependencies using npm (node packages)
RUN npm install

# Copies everything over to Docker environment
COPY . ./
# Builds the react application as static HTML files
RUN npm run build

# Pull the official nginx base
FROM nginx:1.22-alpine
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm -rf ./*
# Install envsubst (needed for runtime env injection)
RUN apk add --no-cache gettext
# Copies static resources from builder stage
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Runtime env template and startup script
COPY public/env.template.js /usr/share/nginx/html/env.template.js
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
