FROM node:12-alpine as build

WORKDIR /plataforma-sabia/admin

COPY ./packages/admin/package*.json /plataforma-sabia/admin/

RUN npm install

COPY ./packages/admin/ /plataforma-sabia/admin/

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

FROM nginx:alpine

COPY --from=build /plataforma-sabia/admin/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]