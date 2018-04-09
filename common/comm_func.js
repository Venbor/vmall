// 快速转换promise对象
function promisify(fn, receiver) {
  return (...args) => new Promise((resolve, reject) => {
    fn.apply(receiver, [...args, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    }]);
  });
}
exports.promisify = promisify;
