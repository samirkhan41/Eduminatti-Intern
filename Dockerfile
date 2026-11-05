# Multi-stage production build for Eduminatti Full-Stack Platform
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm run install:all

# Copy source code and build frontend
COPY . .
RUN npm run build:frontend

# Production runner stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5001

# Copy backend files and production dependencies only
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist

EXPOSE 5001

CMD ["node", "backend/server.js"]
