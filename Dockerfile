FROM node:20

WORKDIR /app

COPY websocket-server/package.json websocket-server/package-lock.json ./

RUN npm ci

COPY websocket-server/ /app

ENTRYPOINT ["node", "index.js"]