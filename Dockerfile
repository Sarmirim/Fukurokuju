FROM node:alpine

COPY . /Fukurokuju
WORKDIR /Fukurokuju
RUN npm init --yes && npm install 

ENTRYPOINT npm run server
