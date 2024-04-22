FROM node:20

WORKDIR /app

COPY websocket-server/package.json websocket-server/package-lock.json ./

RUN npm ci

COPY websocket-server/ /app


ENV PORT 3000
EXPOSE 3000

ENTRYPOINT ["node", "index.js"]