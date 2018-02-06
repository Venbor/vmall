module.exports = {
    sitePort: 6050,  // 端口
    sessionName: 'session_key',  // session键值
    sessionSecret: 'vamll',  // session签名
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
    // redisPrename: {
    //     propertymap: 'SYSPROPERTYMAP',
    //     oauthToken: 'collectToken',
    // },

    // socketConfig: {
    //     host: 'http://127.0.0.1:6086',
    // },

    // wechatBaseConfig: {
    //     appID: '',
    //     appSecret: '',
    //     originalID: '',
    //     systemName: '',
    // },
    // // 七牛云存储
    // qiniu: {
    //     accessKey: 'PTMAV5XHd0m7vXNscrj0zTSXNr6_-oiRWVGdNLFM',
    //     secretKey: 'LCK52jNsvecZEhvJp0-At3pdoIi3XhtPojv8wptq',
    //     bucketName: 'cmts1',
    //     qiniuDomain: 'http://ozqzt3npb.bkt.clouddn.com/',
    // },
};

