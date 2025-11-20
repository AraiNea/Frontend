# === Stage 1: Build ===
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy all files to the container
COPY . .

# Build the app (Optional if you still want to build it before serving)
RUN npm run build


# === Stage 2: Development ===
FROM node:20-alpine

WORKDIR /app

# Copy files from the build stage
COPY --from=build /app /app

# Expose the port that the dev server will run on
EXPOSE 3000

# Run npm in development mode
CMD ["npm", "run", "dev"]  # รัน dev server ในโหมด development
