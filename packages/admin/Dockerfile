FROM node:14-alpine as build

WORKDIR /plataforma-sabia/admin

COPY ./packages/admin/package*.json /plataforma-sabia/admin/

RUN npm install

COPY ./packages/admin/ /plataforma-sabia/admin/

RUN npm run build

FROM nginx:alpine

COPY --from=build /plataforma-sabia/admin/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]