FROM node:11.7.0-alpine
MAINTAINER Felippe Maurício

COPY . /var/application/current
WORKDIR /var/application/current

RUN yarn install

EXPOSE 3000

CMD ["npm", "start"]
