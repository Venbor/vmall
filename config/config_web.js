module.exports = {
  sitePort: 8080, // 端口
  isCsrf: false, // 是否开启CSRF验证
  ignoreCsrfs: [], // 忽略CSRF验证的请求地址数组 
  cookieSecret: 'mycookie', // cookie签名
  sessionName: 'session_key', // session键值
  sessionSecret: 'vamll', // session签名
  // mysql配置
  mysqlConfig: {
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'linwb_db',
    // port: 3306,
    // 远程
    host: '103.213.250.157',
    user: 'outroot',
    password: 'root2018',
    database: 'linwb_db',
    port: 3306,
  },
  // 日志配置
  loggerConfig: {
    categories: {
      default: {
        appenders: ['appdebug'],
        level: 'debug', // 日志分级
      },
    },
    // 日志出口配置
    appenders: {
      appdebug: {
        category: 'linwb', // 日志分类
        type: 'file', // 输出日志方式
        filename: 'dist/debug.log',
      },
    }
  },
  // 微信配置
  wechatConfig: {
    token: '',
    appID: 'wxedfcac81e30bb19f',
    appSecret: '195909e14a91bc9abbdce019d0d76d27',
    mchID: '10000100',
    partnerKey: 'w11211112222222212122134135674r5',
    spbillCreateIP: '127.0.0.1',
    notifyUrl: 'test.szchumeng.com',
    timeExpire: 3600,
  },

  // 七牛云存储
  qiniu: {
    accessKey: 'lLwJd3cfmBNIScBgm0wW_4npKHiMw8MnCnuKeuh3',
    secretKey: 'kuMSInea291K6PMP3-mMizCp2IF5RldV28p3jABw',
    bucketName: 'vmall',
    qiniuDomain: 'http://p7jp82f9z.bkt.clouddn.com/',
  },
  // socketConfig: {
  //     host: 'http://127.0.0.1:6086',
  // },
};
