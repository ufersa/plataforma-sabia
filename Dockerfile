FROM tarampampam/node:12.18-alpine

WORKDIR /app

COPY package*.json lerna.json /app/
RUN npm install

COPY . /app/
RUN npm run postinstall

CMD ["npm", "start"]