FROM node:16.14.0 as builder

WORKDIR /pypoll/spa

COPY . .

RUN npm install

RUN npm run build

FROM nginx:stable

COPY --from=builder /pypoll/spa/build /usr/share/nginx/html

EXPOSE 80
