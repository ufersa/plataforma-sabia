FROM node:12-alpine

WORKDIR /plataforma-sabia/api

COPY ./packages/api/package*.json /plataforma-sabia/api/

RUN npm install --only=production

COPY ./packages/api/ /plataforma-sabia/api/

CMD ["npm", "run", "start"]