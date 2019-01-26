const app = require('./src/app');
const { env } = require('./src/core/helpers');


const server = app.listen(env.PORT, () => {
  const { port } = server.address();
  console.log(`CURRENCY-CONVERSION STARTED ON PORT: ${port}!`); // eslint-disable-line no-console
});
