# Step 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app

# Accept the API Key as a secret during build
ARG GEMINI_API_KEY
# Write it to .env.local so Vite can find it
RUN echo "VITE_GEMINI_API_KEY=$GEMINI_API_KEY" > .env.local

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the built files from Step 1 to Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copy our custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
