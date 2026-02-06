# --- Stage 1: The Builder ---
# We use Node to install dependencies and build the app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Stage 2: The Server ---
# We use Nginx (very light) to serve the static files
FROM nginx:alpine
# We copy ONLY the built files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]