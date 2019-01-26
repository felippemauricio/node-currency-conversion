class ExpiredCacheException extends Error {
  constructor(value, time, message = 'Expired Cache') {
    super();
    Object.assign(this, {
      message,
      value,
      time,
    });
  }
}


module.exports = ExpiredCacheException;
