# Use docker multi-stage builds to build the NestJS app
FROM node:18 AS builder


WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Build the application
RUN npm run build

# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:18-slim


WORKDIR /usr/src/app

RUN npm install pm2 -g


COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

COPY .env /usr/src/app/
COPY ecosystem.config.js /usr/src/app/

# Copy built assets from builder stage
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

# Define command to run the app using pm2
CMD ["pm2-runtime", "start", "dist/main.js", "ecosystem.config.js", "--env", "production"]