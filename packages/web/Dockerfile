FROM node:12-alpine

WORKDIR /plataforma-sabia/web

COPY ./packages/web/package*.json /plataforma-sabia/web/

RUN npm install

COPY ./packages/web/ /plataforma-sabia/web/

RUN npm run build

CMD ["npm", "run", "start"]