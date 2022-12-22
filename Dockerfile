FROM node:18.12.1-alpine
WORKDIR /next/src/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install