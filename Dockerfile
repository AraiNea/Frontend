# === Stage 1: Build the application ====
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY . .
RUN npm run build

# === Stage 2: Serve the application with Node.js using 'serve' ===
FROM node:20-alpine

# Install serve globally
RUN npm install -g serve

# Set the working directory to the build folder
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist /app/dist

# Expose the port that 'serve' will run on
EXPOSE 3000

# Start the app with 'serve'
CMD ["serve", "-s", "dist", "-l", "3000"]
