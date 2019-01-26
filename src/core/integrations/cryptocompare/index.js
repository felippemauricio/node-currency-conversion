const fetch = require('node-fetch');
const retry = require('promise-fn-retry');
const { env, urlParser } = require('../../helpers');


const verifyAndRemoveExceededCoins = (res, to) => {
  const newRes = {};
  to.forEach((coin) => {
    newRes[coin] = res[coin];
  });
  return newRes;
};

const makeRequest = (from = '', to = []) => {
  const {
    CRYPTOCOMPARE_URL: url,
    CRYPTOCOMPARE_TIMEOUT: timeout,
  } = env;
  const urlParsed = urlParser({ url, from, to });
  const requestOptions = { method: 'GET', timeout: Number(timeout) };
  return () => fetch(urlParsed, requestOptions);
};

const request = (from = '', to = []) => {
  const {
    CRYPTOCOMPARE_RETRY_DELAY: delay,
    CRYPTOCOMPARE_RETRY_TIMES: times,
  } = env;
  const requestFn = makeRequest(from, to);
  return retry(requestFn, times, delay)
    .then(res => res.json())
    .then(res => verifyAndRemoveExceededCoins(res, to));
};


module.exports = {
  makeRequest,
  request,
};
