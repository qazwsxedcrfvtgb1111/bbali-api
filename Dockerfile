FROM node:10

WORKDIR /usr/src

RUN chown -R node:node /usr/src

USER node

COPY package*.json ./

RUN ["npm", "install"]

EXPOSE 8080
