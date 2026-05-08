# Stage 1: Base (Dependencies)
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Development (The "Something Else" you need)
FROM base AS dev
COPY . .
# Vite needs --host to be reachable outside the container
CMD ["npm", "run", "dev", "--", "--host"]

# Stage 3: Build (Production binary/assets)
FROM base AS build
COPY . .
RUN npm run build

# Stage 4: Runtime (Caddy)
FROM caddy:2-alpine AS prod
COPY --from=build /app/dist/ /app/
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
