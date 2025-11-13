# === Stage 1: Build ===
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY . .
RUN npm run build


# === Stage 2: Nginx serve ===
FROM nginx:alpine

# Copy build files
COPY --from=build /app/dist /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# FROM node:20-alpine
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build
# EXPOSE 3000
# CMD [ "npm", "run", "dev" ]
