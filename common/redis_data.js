
class RedisData {
  constructor(redisClient) {
    this.redisClient = redisClient;
  }

  getRedisValue(redisKey, callback) {
    this.redisClient.get(redisKey, callback);
  }

  setRedisValue(redisKey, redisValue, expirationSecond, callback) {
    if (typeof expirationSecond === 'function') {
      callback = expirationSecond;
      expirationSecond = 0;
    }

    callback = callback || function () {};

    redisValue = typeof redisValue === 'string' ? redisValue : JSON.stringify(redisValue);
    this.redisClient.set(redisKey, redisValue, callback);

    if (expirationSecond !== 0) {
      this.redisClient.expire(redisKey, expirationSecond);
    }
  }
}

module.exports = RedisData;
