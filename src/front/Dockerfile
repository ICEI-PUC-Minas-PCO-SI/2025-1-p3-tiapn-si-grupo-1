# Etapa 1: build do projeto
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: servir com Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# (Opcional: fallback para SPA)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3005
CMD ["nginx", "-g", "daemon off;"]
