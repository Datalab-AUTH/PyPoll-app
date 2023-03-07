FROM node:16.14.0 as builder

WORKDIR /pypoll/spa

COPY . .

RUN npm install

RUN npm run build

FROM nginx:stable

COPY --from=builder /pypoll/spa /pypoll/spa

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]