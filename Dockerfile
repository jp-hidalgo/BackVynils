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

# Copy package files
COPY package*.json ./

# Install only production dependencies (faster, smaller image)
RUN npm install --omit=dev --ignore-scripts || npm install --production --ignore-scripts

# Copy built application
COPY --from=builder /usr/src/app/dist ./dist

# Copy the patched @nestjs/typeorm package from builder stage
COPY --from=builder /usr/src/app/node_modules/@nestjs/typeorm ./node_modules/@nestjs/typeorm

CMD ["node", "dist/main"]