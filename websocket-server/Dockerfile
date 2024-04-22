FROM node:20

WORKDIR /app

COPY ../package.json package-lock.json ./

RUN npm ci

ENTRYPOINT ["node", "index.js"]