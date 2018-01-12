/**
 * Created by Administrator on 2017/3/17.
 */

const log4js = require('log4js');
const loggerConfig = require('../../config/config_static').loggerConfig;

log4js.configure(loggerConfig);
const logger = log4js.getLogger();

module.exports = logger;
