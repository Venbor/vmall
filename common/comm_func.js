const request = require('request');


module.exports = {
  // 快速转换promise对象
  promisify: function (fn, receiver) {
    return (...args) => new Promise((resolve, reject) => {
      fn.apply(receiver, [...args, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      }]);
    });
  },
  // 错误处理函数
  handlerError: function (middleware) {
    return async (req, res, next) => {
      try {
        await middleware(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  },
  // request GET请求封装
  requestGET: function (url, data, cb) {
    if (typeof data === 'function') {
      cb = data;
      data = {};
    }
    request({
      url: url,
      method: 'GET',
      qs: data,
    }, (error, response, body) => {
      cb(error, body);
    });
  },
  // request POST请求封装
  requestPOST: function (url, data, cb) {
    if (typeof data === 'function') {
      cb = data;
      data = {};
    }
    request({
      url: url,
      method: 'POST',
      body: data,
    }, (error, response, body) => {
      cb(error, body);
    });
  },
};
