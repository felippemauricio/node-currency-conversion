# Conversão Monetária API - Node 
[![Build Status](https://travis-ci.org/felippemauricio/node-currency-conversion.svg?branch=master)](https://travis-ci.org/felippemauricio/node-currency-conversion)
[![Dependencies](https://david-dm.org/felippemauricio/node-currency-conversion.svg)](https://david-dm.org/felippemauricio/node-currency-conversion)
[![devDependencies Status](https://david-dm.org/felippemauricio/node-currency-conversion/dev-status.svg)](https://david-dm.org/felippemauricio/node-currency-conversion?type=dev)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/fd5c63)](https://github.com/airbnb/javascript)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/felippemauricio/node-currency-conversion/pulls)

Esse projeto consiste em uma API desenvolvida em **node** que faz a converção monetária entre algumas moedas.

Até o momento, esse projeto aceita apenas as seguintes moedas:
- BRL - Real Brasileiro
- BTC - Bitcoin
- ETH - Ethereum
- EUR - Euro
- USD - Dollar Americano

![](https://e.rpp-noticias.io/normal/2017/08/02/021602_457141.jpg)

## O que você precisa instalar para trabalhar neste projeto?

- docker
- git
- make

## Como instalar as dependências?
```
make install
```

## Como rodar o projeto em ambiente de desenvolvimento?

```
make start
```

## Como rodar o lint?
```
make lint
```

## Como rodar os testes?

Esse código, rodará todos os testes unitários e os de sistema.

```
make test
```

Você pode também, rodar cada tipo de teste separadamente.

```
make test-unit    // Para testes unitários
make test-system  // Para testes de sistema
```

Existe ainda um outro tipo de teste que esse projeto aborda, o teste de estresse. Para roda-lo, é necessário que você inicie esta API no seu terminal, e em outra janela de terminal, que o seguinte código seja executado.

```
make test-stress
```

## Quais são os endpoints?

### Saúde da Api

  - get `/health`.

Response:
```
{
  "api": true,
  "integrations": {
    "cryptoCompare": true
  }
}
```

### Conversor de moedas

  - get `/currency-conversion?from=BTC&to=EUR&amount=123.45`.
  - get `/currency-conversion?from=BTC&to=EUR,BRL&amount=123.45`.

Response:
```
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

## Imagem de produção

A cada versão do código que é mergeada para a `master`, o sistema gera uma nova imagem docker via `Travis-CI`. Essa imagem está disponível no `Docker Hub`.

```
docker run -p 8080:3000 felippemauricio/challenge-bravo
```

## Produção

A cada versão do código que é mergeada para a `master`, o sistema faz o deploy da aplicação no `Heroku`, usando a imagem docker da aplicação.

Assim, o sistema está disponível no host `https://challenge-bravo.herokuapp.com`;

Exemplos de Requests:
```
get https://challenge-bravo.herokuapp.com/health
get https://challenge-bravo.herokuapp.com/currency-conversion?from=BTC&to=EUR&amount=123.45
```


## Informações importantes

- Para pegar a taxa de conversão entre as moedas, esse projeto utiliza a **CRYPTOCOMPARE**, que é uma API gratuita que fornece os valores de conversão entre as moedas.

- A cada request, as taxas de conversão são salvas em memória. Se em algum momento, algum request falhar, a idéia é utilizar a taxa de conversão da mesma moeda salva em memória, onde existe uma grande chance de estarmos retornando um valor atual para o usuário.


## Sugestões de melhorias

- Utilizar a memória mais vezes, em vez de apenas utiliza-la em casos de falha. Isto aumentaria significamente a performance da API.

- Formatar os valores retornados, por exemplo: `23.87653` -> `23.88`.


## Variáveis de Ambiente

Em todos os ambientes, você pode configurar as seguintes variáveis de ambiente:

| VARIÁVEL                     | DEFAULT                | DESCRIÇÃO                                               |
|------------------------------|:----------------------:|---------------------------------------------------------|
| CRYPTOCOMPARE_URL            |                        | Url para acessar a CryptoCompare API                    |
| CRYPTOCOMPARE_RETRY_DELAY    | 100                    | Delay entre uma requisição e sua retentativa            |
| CRYPTOCOMPARE_RETRY_TIMES    | 1                      | Retentativas em caso de falha                           |
| CRYPTOCOMPARE_TIMEOUT        | 3000                   | Timeout da requisição                                   |
| NODE_ENV                     | development            | Ambiente                                                |
| PORT                         | 3000                   | Porta em que a API irá ser executada                    |
