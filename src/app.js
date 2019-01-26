const compression = require('compression');
const app = require('express')();
const addRequestId = require('express-request-id');
const helmet = require('helmet');
const morgan = require('morgan');
const { env, register } = require('./core/helpers');
const routers = require('./core/routers');


const undefinedRouter = (_req, res) => {
  res.sendStatus(404);
};

const morganConfig = morgan('dev', {
  skip: () => env.NODE_ENV !== 'development',
});


register(
  [addRequestId()],
  [compression()],
  [helmet()],
  [morganConfig],
  [routers],
  [undefinedRouter],
)(app);


module.exports = app;
