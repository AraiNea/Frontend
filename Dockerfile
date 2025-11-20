# === Stage 1: Build ===
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# === Stage 2: Development ===
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
CMD ["npm", "run", "dev"]  # เรียกใช้ npm run dev
