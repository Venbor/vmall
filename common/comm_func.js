const axios = require('axios');
const jwt = require('jsonwebtoken');
const validator = require('./validator_extend');

// token参数详解
// 生成token: const token = jwt.sign({key: value}, 'secret', { expiresIn: 60 * 60 }); //一个小时的有效期
// 解码token: jwt.verify(token, 'secret', function(err, decoded) { console.log(decoded.key) }); // value

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
    return async(req, res, next) => {
      try {
        await middleware(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  },
  // 生成TOKEN
  signToken: function (obj) {
    const token = jwt.sign(obj, 'mysecret', { expiresIn: 60 * 60 * 24 * 3 }); // 三天有效期
    return token;
  },
  // 检验TOKEN
  verifyToken: function (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, 'mysecret', (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
  },
  // GET请求封装
  requestGET: async function (url, data) {
    try {
      const result = await axios.get(url, { params: data });
      return result.data;
    } catch (err) {
      return {};
    }
  },
  // POST请求封装
  requestPOST: async function (url, data) {
    try {
      const result = await axios.post(url, data);
      return result.data;
    } catch (err) {
      return {};
    }
  },
  // 表单验证
  checkData: function (requestData, models) {
    /**
     * 表单验证
     * @param requestData{object} 需要请求的数据对象
     * @param models{object} 验证规则模型：{title:属性名，required：是否必填，rule:[{name: 规则名，opt: 规则方法参数，msg：提示}]}
     * @return {array} 返回验证失败的对象数组：[{ field: 'username', errmsg: '用户名不能为空' }]
     * @example
     const result = this.$checkData(this.form, {
      username: { title: '用户名', required: true, rule: [{ name: 'isIntFormat', opt: { min: 6 }, msg: '不能大于6个字符' }] },
      password: { title: '密码', required: true },
    })
     if (result.length > 0) {
      this.$message.error(result[0].errmsg);
      return;
    }
     */
    let errModels = [];
    // 检测必填项(required为true时，提交对象是null、undefined,空字符串时，则返回错误结果)
    const propertys = Object.getOwnPropertyNames(models); // 全部需要验证的属性数组
    const requirePropertyList = propertys.filter(f => models[f].required && validator.isNullOrEmpty(requestData[f]));
    if (requirePropertyList.length > 0) {
      errModels = requirePropertyList.map(t => ({ field: t, errmsg: `${models[t].title}不能为空` }));
    }
    // 验证rule规则检测数据准确性
    let rulePropertyList = propertys.filter(f => (models[f].rule || []).length > 0); // 含有规则的验证属性数组
    rulePropertyList = rulePropertyList.filter(t => !requirePropertyList.includes(t)); // 过滤掉报不能为空的项
    rulePropertyList.forEach((f) => {
      const ruleList = models[f].rule.filter(t => !validator[t.name](requestData[f], t.opt)); // 某一属相不满足的规则数组
      // 存在错误时
      if (ruleList.length > 0) {
        const msgList = ruleList.map(t => t.msg).join(',且');
        const errRuleModels = { field: f, errmsg: `${models[f].title}${msgList}` };
        errModels.push(errRuleModels);
      }
    });
    return errModels;
  },
};
