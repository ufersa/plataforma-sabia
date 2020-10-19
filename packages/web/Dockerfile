FROM node:12-alpine

WORKDIR /plataforma-sabia/web

COPY package*.json /plataforma-sabia/web/

RUN npm install

COPY . /plataforma-sabia/web/

RUN npm run build

CMD ["npm", "run", "start"]