# Build stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet

COPY . .

# Apply patch-package fixes (for @nestjs/typeorm compatibility)
RUN npm run postinstall || true

RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/patches ./patches 2>/dev/null || true

# Apply patches in production if they exist
RUN npm run postinstall || true

CMD ["npm", "run", "start:prod"]