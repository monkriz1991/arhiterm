# Stage 1 - build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN  npm install
COPY . .
RUN npm run build

# Stage 2 - production
FROM node:18-alpine AS final
WORKDIR /app
ADD package.json .
ADD nuxt.config.js .
COPY --from=builder /app/.nuxt ./.nuxt
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/static ./static
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3003
EXPOSE 3003

# Stage 2 - production
RUN npm install pm2 -g

CMD ["pm2", "start"]
