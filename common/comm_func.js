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
      if (!error && response.statusCode === 200) {
        cb(body);
      } else {
        global.logger.debug('requestGET', `errmsg：${error}`);
        cb(undefined);
      }
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
      if (!error && response.statusCode === 200) {
        cb(body);
      } else {
        global.logger.debug('requestPOST', `errmsg：${error}`);
        cb(undefined);
      }
    });
  },
};
