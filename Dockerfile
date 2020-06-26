FROM node:alpine

COPY . /sarmirim-backend
WORKDIR /sarmirim-backend
RUN npm init --yes && npm install 

ENTRYPOINT npm run server
