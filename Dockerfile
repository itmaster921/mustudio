FROM node:latest

MAINTAINER hic2h

LABEL "version"="0.2.0"

RUN npm  install -g node-gyp webpack gulp

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_PATH=/usr/local/lib/node_modules/:/usr/local/lib NODE_ENV=production
ENV MONGODB_URI=mongodb://mustudio:mustudio000@ds139362.mlab.com:39362/mustudio-dev

COPY ./dist/ /usr/src/app
RUN npm install --production

CMD [ "npm", "start" ]

EXPOSE 8080