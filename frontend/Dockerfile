FROM node:18-alpine AS build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
ARG VITE_API_URL
ENV VITE_API_URL $VITE_API_URL
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
