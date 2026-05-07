FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY vite.config.js ./
COPY index.html ./
COPY public/ ./public/
COPY src/ ./src/

RUN npm run build

FROM caddy:2-alpine

COPY --from=build /app/dist/ /app/
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
EXPOSE 443
