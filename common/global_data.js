/**
 * Created by Administrator on 2017/3/17.
 */

const redis = require('redis');
const idgen = require('node-idgen');
const WechatAPI = require('wechat-api');
const logger = require('./logger');
const config = require('../../config/config_site');
const staticConfig = require('../../config/config_static');
const basicBusiness = require('../../business/basic_business');

exports.idGenerator = new idgen.IdGenerator();

const log = {};
// ...args: key, logType, module, logContent`
['trace', 'debug', 'info', 'warn', 'error', 'fatal'].forEach((method) => {
  log[method] = (...args) => {
    (logger[method]).apply(logger, ['%s#%s#%s#%s#%s', config.logSource, ...args]);
  };
});

exports.logger = log;

const redisClient = redis.createClient(staticConfig.redisConfig.port, staticConfig.redisConfig.host, { auth_pass: staticConfig.redisConfig.pass });
redisClient.on('error', err => log.error('', 'REDIS', 'redisClient', 'redis 出错:', err));

exports.redisData = new (require('./redis_data'))(redisClient);

exports.getPropertymapKeyVal = (codes, cb1) => basicBusiness.getPropertymapKeyValLogic(codes, cb1);
exports.getPropertymapNameKey = (codes, cb2) => basicBusiness.getPropertymapNameKeyLogic(codes, cb2);

exports.apiTokenConfig = config.apiTokenConfig;

// wechat api 多进程管理token，后期可用co-wechat-api库改写为ES6
const wechatAPI = new WechatAPI(staticConfig.wechatBaseConfig.appID, staticConfig.wechatBaseConfig.appSecret, (callback) => {
  exports.redisData.getRedisValue(staticConfig.wechatBaseConfig.originalID, (err, token) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, JSON.parse(token || '{}'));
  });
}, (token, callback) => {
  exports.redisData.setRedisValue(staticConfig.wechatBaseConfig.originalID, token, callback);
});

// wechat api 多进程管理jsTicketToken
function getJsTicketToken(jsTicketType, callback) {
  exports.redisData.getRedisValue(jsTicketType + staticConfig.wechatBaseConfig.originalID, (err, jsTicket) => {
    if (err) {
      callback(err);
      return;
    }
    callback(undefined, JSON.parse(jsTicket || '{}'));
  });
}

function saveJsTicketToken(jsTicketType, jsTicketToken, callback) {
  exports.redisData.setRedisValue(jsTicketType + staticConfig.wechatBaseConfig.originalID, jsTicketToken, callback);
}

wechatAPI.registerTicketHandle(getJsTicketToken, saveJsTicketToken);

exports.wechatAPI = wechatAPI;

const socketClient = (require('socket.io-client')).connect(staticConfig.socketConfig.host);
exports.socketServer = new (require('./socket_server'))(socketClient);
