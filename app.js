const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const compression = require('compression')
const log4js = require('log4js');
const config = require('./config/config_site');
const app = express();

// 设置模板引擎为html
app.set('views', path.resolve(__dirname, ''));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

//启用模板缓存。
app.set('view cache', true);

//使用bodyParser中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//使用session中间件
app.use(session({
    name: config.sessionName,
    secret: config.sessionSecret,
    cookie: { maxAge: 1000 * 60 * 60 },
    rolling: true,
    resave: true,
    saveUninitialized: false,
}))
//Gzip压缩功能(效率优化)
app.use(compression())

//日志管理
log4js.configure(config.loggerConfig);
global.logger = log4js.getLogger();
global.logger.debug('test','debug');

// 静态化文件
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/logs', express.static(path.resolve(__dirname, 'logs')));

// 对外api接口路由
app.use('/', require('./routes_api'));

// 启动 Web 服务
app.listen(config.sitePort, () => {
    console.warn(`listening on port ${config.sitePort} in mode`);
});
