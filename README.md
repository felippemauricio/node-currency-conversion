# Currency Conversion - Node
[![Build Status](https://travis-ci.org/felippemauricio/node-currency-conversion.svg?branch=master)](https://travis-ci.org/felippemauricio/node-currency-conversion)
[![Dependencies](https://david-dm.org/felippemauricio/node-currency-conversion.svg)](https://david-dm.org/felippemauricio/node-currency-conversion)
[![devDependencies Status](https://david-dm.org/felippemauricio/node-currency-conversion/dev-status.svg)](https://david-dm.org/felippemauricio/node-currency-conversion?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/felippemauricio/node-currency-conversion/badge.svg?branch=master)](https://coveralls.io/github/felippemauricio/node-currency-conversion?branch=master)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/fd5c63)](https://github.com/airbnb/javascript)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/felippemauricio/node-currency-conversion/pulls)

This project consists of an API developed in node that does the currency conversion between some coins.

To date, this only accepts the following currencys:
- BRL - Brazilian Real;
- BTC - Bitcoin;
- ETH - Ethereum;
- EUR - Euro;
- USD - American Dollar;

![](https://raw.githubusercontent.com/felippemauricio/node-currency-conversion/master/docs/images/money.jpg)

## What do you need?

- docker
- git
- make

## How to install?
```sh
make install
```

## How to start?

```sh
make start
```

## How to run the lint?
```sh
make lint
```

## How to run the tests?

```javascript
make test // All tests

// or

make test:unit    // Unit tests
make test:system  // System tests
```

## Architecture

![](https://raw.githubusercontent.com/felippemauricio/node-currency-conversion/master/docs/images/architecture.jpg)


## Endpoints

### Healthcheck

  - get `/health`.

Response:
```javascript
{
  "api": true,
  "integrations": {
    "cryptoCompare": true
  }
}
```

### Currency converter

  - get `/currency-conversion?from=BTC&to=EUR&amount=123.45`.
  - get `/currency-conversion?from=BTC&to=EUR,BRL&amount=123.45`.

Response:
```javascript
{
  "amount": 123.45,
  "base": "BTC",
  "date": "2018-10-07",
  "rates": {
    "EUR": 5711.39
  },
  "converted": {
    "EUR": 705071.0955
  }
}
```

## Download the docker image

Each version of the code that is merged to `master`, the system generates a new image of docker using `Travis-CI`. This image is available on the `Docker Hub` and you can run using the following command.

```sh
docker run -p 8080:3000 felippemauricio/challenge-bravo
```

## Production

Each version of the code that is merged to `master`, the system makes the deploy on `Heroku` using the docker image. So, you can access using the `https://challenge-bravo.herokuapp.com` host.

### Examples

- get health
```sh
curl https://challenge-bravo.herokuapp.com/health
```
- get currency conversion
```sh
curl https://challenge-bravo.herokuapp.com/currency-conversion?from=BTC&to=EUR&amount=123.45
```

## Enviroment vars

| VARIABLE                     | DEFAULT                | DESCRIPTION                                             |
|------------------------------|:----------------------:|---------------------------------------------------------|
| CRYPTOCOMPARE_URL            |                        | Url to make requests to CryptoCompare API               |
| CRYPTOCOMPARE_RETRY_DELAY    | 100                    | Delay into CryptoCompare API request                    |
| CRYPTOCOMPARE_RETRY_TIMES    | 1                      | Retry strategy to fail requests                         |
| CRYPTOCOMPARE_TIMEOUT        | 3000                   | Timeout into CryptoCompare API request                  |
| MEMORY_CACHE_TTL             | 3600000 (1 hour)       | Memory cache ttl (ms)                                   |
| NODE_ENV                     | development            | Current Enviroment                                      |
| PORT                         | 3000                   | Port to start server                                    |
