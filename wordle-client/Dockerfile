# Stage 1
FROM node:20.11.1 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod