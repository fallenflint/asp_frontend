FROM node:alpine AS builder

ENV NODE_ENV production

WORKDIR /app

COPY ./frontend/package.json ./
RUN npm install

COPY frontend .

RUN npm run build

FROM nginx

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf