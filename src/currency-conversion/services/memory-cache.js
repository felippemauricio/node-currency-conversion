const { date, env, memoryCache } = require('../../core/helpers');
const ExpiredCacheException = require('../exceptions/expired-cache-exception');
const UnknownValueException = require('../exceptions/unknown-value-exception');


const isValidCache = (time, ttl) => {
  const validTime = time + ttl;
  const currentTime = date.getCurrentTime();
  return currentTime <= validTime;
};

const handleRunPromise = async (promiseFn, key, args, readError) => {
  try {
    const value = await promiseFn(...args);
    memoryCache.set(key, {
      value,
      time: date.getCurrentTime(),
    });
    return value;
  } catch (_) {
    if (readError instanceof ExpiredCacheException) {
      return readError.value;
    }
    throw new UnknownValueException();
  }
};

const memoryCacheFn = promiseFn => (...args) => {
  const {
    MEMORY_CACHE_TTL: memoryCacheTtl,
  } = env;
  const key = JSON.stringify(args);
  try {
    const { value, time } = memoryCache.get(key);
    if (!isValidCache(time, memoryCacheTtl)) {
      throw new ExpiredCacheException(
        value,
        time,
      );
    }
    return value;
  } catch (err) {
    return handleRunPromise(promiseFn, key, args, err);
  }
};


module.exports = memoryCacheFn;
