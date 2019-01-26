module.exports = {
  apps: [{
    name: 'currency-conversion',
    script: 'server.js',
    instances: 'max',
    autorestart: true,
    env_production: {
      CRYPTOCOMPARE_URL: 'https://min-api.cryptocompare.com/data/price?fsym={{from}}&tsyms={{to}}',
      CRYPTOCOMPARE_RETRY_DELAY: 100,
      CRYPTOCOMPARE_RETRY_TIMES: 1,
      CRYPTOCOMPARE_TIMEOUT: 3000,
      MEMORY_CACHE_TTL: 3600000,
      NODE_ENV: 'production',
    },
  }],
};
