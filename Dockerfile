FROM node:12.16.2-alpine3.11

COPY . /sarmirim-backend
WORKDIR /sarmirim-backend
RUN npm install

ENTRYPOINT npm run server
