FROM node:11.7.0-alpine
MAINTAINER Felippe Maurício

ENV CRYPTOCOMPARE_URL https://min-api.cryptocompare.com/data/price?fsym={{from}}&tsyms={{to}}
ENV CRYPTOCOMPARE_RETRY_DELAY 100
ENV CRYPTOCOMPARE_RETRY_TIMES 1
ENV CRYPTOCOMPARE_TIMEOUT 3000
ENV MEMORY_CACHE_TTL 3600000
ENV NODE_ENV production
ENV PORT 3000

COPY . /var/application/current
WORKDIR /var/application/current

RUN yarn install

EXPOSE 3000

CMD ["npm", "start"]
