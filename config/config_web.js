module.exports = {
  sitePort: 6050, // 端口
  isCsrf: true, // 是否开启CSRF验证
  ignoreCsrfs: [], // 忽略CSRF验证的请求地址数组 
  cookieSecret: 'mycookie', // cookie签名
  sessionName: 'session_key', // session键值
  sessionSecret: 'vamll', // session签名
  // mysql配置
  mysqlConfig: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'vmall_db',
    port: 3306,
  },
  // redis配置
  redisConfig: {
    host: '127.0.0.1',
    port: 6379,
    pass: '',
  },
  // 日志配置
  loggerConfig: {
    categories: {
      default: {
        appenders: ['appdebug'],
        level: 'debug', // 日志分级
      },
    },
    appenders: {
      appdebug: {
        category: 'vmall', // 日志分类
        type: 'File', // 输出日志方式
        filename: 'assets/logs/vmall-debug.log',
      },
    }
  },
  // 微信配置
  wechatConfig: {
    token: '',
    appID: 'wx2421b1c4370ec43b',
    appSecret: '1',
    mchID: '10000100',
    partnerKey: 'w11211112222222212122134135674r5',
    spbillCreateIP: '127.0.0.1',
    notifyUrl: 'test.szchumeng.com',
    timeExpire: 3600,
  },

  // // 七牛云存储
  // qiniu: {
  //     accessKey: 'PTMAV5XHd0m7vXNscrj0zTSXNr6_-oiRWVGdNLFM',
  //     secretKey: 'LCK52jNsvecZEhvJp0-At3pdoIi3XhtPojv8wptq',
  //     bucketName: 'cmts1',
  //     qiniuDomain: 'http://ozqzt3npb.bkt.clouddn.com/',
  // },


  // redisPrename: {
  //     propertymap: 'SYSPROPERTYMAP',
  //     oauthToken: 'collectToken',
  // },

  // socketConfig: {
  //     host: 'http://127.0.0.1:6086',
  // },


};
