
# Stage 1

FROM node:10-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

COPY . /app

RUN npm install

RUN ls /app

RUN npm run build

# # Stage 2

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/medjoin /usr/share/nginx/html
