const redis = require('redis');
const config = require('../config/config_web');

const redisClient = redis.createClient(config.redisConfig.port, config.redisConfig.host);
module.exports = redisClient