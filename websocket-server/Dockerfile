FROM node:20

WORKDIR /app

COPY ../package.json package-lock.json ./

RUN npm ci

COPY ./websocket-server /app

ENTRYPOINT ["node", "websocket-server/index.js"]