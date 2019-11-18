FROM node:12.8.1
WORKDIR /backend
COPY package.json /backend/package.json
RUN npm install
COPY . /backend

ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=3000

ENTRYPOINT node ./bin/www