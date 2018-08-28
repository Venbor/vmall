const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const log4js = require('log4js');
const auth = require('./config/auth.js');
const config = require('./config/config_web');
const mountRoute = require('./routes_mount.js');
const ResJson = require('./config/ResJson');
// const session = require('express-session');

const app = express();
const router = express.Router();

// scoket连接
// const scoketClient = require('./config/webScoket.js');
// scoketClient(require('socket.io')(app));


// 设置模板引擎为html
app.set('views', path.resolve(__dirname, ''));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

// 启用模板缓存。
app.set('view cache', true);

// 使用bodyParser中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 使用cookie中间件
app.use(cookieParser(config.cookieSecret));

// 使用session中间件
// app.use(session({
//   name: config.sessionName,
//   secret: config.sessionSecret,
//   cookie: { maxAge: 1000 * 60 * 60 },
//   rolling: true,
//   resave: true,
//   saveUninitialized: false,
// }));

// Gzip压缩功能(效率优化)
app.use(compression());

// 日志管理
log4js.configure(config.loggerConfig);
global.logger = log4js.getLogger();
// global.logger.debug('DEBUG<div>debug开启</div>');

// 静态化vue打包文件
app.use('/static', express.static(path.resolve(__dirname, './static')));
// 静态化API接口文件
app.use('/apidoc', express.static(path.resolve(__dirname, './apidoc')));
// 读取日志文件
app.get('/logs', (req, res) => { res.render('logs'); });
// api接口路由
app.use('/api', auth.userAuth, mountRoute(router));

// 读取根目录index文件并渲染
// app.get('*', auth.userWechatLogin, (req, res) => { res.render('index'); });
app.get('*', (req, res) => { res.render('index'); });

// 接口错误处理
app.use((err, req, res, next) => {
  res.status(500);
  res.send(new ResJson(1, err));
  // res.send(new ResJson(1, '系统错误,我们会尽快修复'));
  next();
});

// 启动 Web 服务
app.listen(config.sitePort, () => {
  console.warn(`listening on port ${config.sitePort} in mode`);
});
