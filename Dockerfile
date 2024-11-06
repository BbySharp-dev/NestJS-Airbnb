FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start:prod"]
