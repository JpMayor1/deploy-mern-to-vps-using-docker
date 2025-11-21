# Step 1 — Dockerize MERN Application

## Backend Dockerfile

```Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Production Image ----------
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm ci --omit=dev

EXPOSE <backend_port>

CMD ["node", "dist/index.js"]
```

## Frontend Dockerfile

```Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Nginx Serve Static ----------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE <frontend_port>

CMD ["nginx", "-g", "daemon off;"]
```

## Build Images

```bash
docker build -t <username>/<backend-image>:latest ./backend
docker build -t <username>/<frontend-image>:latest ./frontend
```
