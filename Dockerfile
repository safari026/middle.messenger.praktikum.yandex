FROM node:16 as build

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000

CMD [ "node", "server.js" ]
