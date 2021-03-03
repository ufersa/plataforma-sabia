FROM node:14-alpine

WORKDIR /plataforma-sabia/api

COPY ./packages/api/package*.json /plataforma-sabia/api/

RUN npm install --only=production

COPY ./packages/api/ /plataforma-sabia/api/

RUN npm run apidoc

RUN npm run algolia:index

CMD ["npm", "run", "start"]