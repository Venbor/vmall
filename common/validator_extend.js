const validator = require('validator');

// 公共验证
validator.isDateFormat = function (str, format) {
  /* YYYY-MM-DD
   YYYY-MM-DD HH:mm:ss
   YYYY-MM-DD HH:mm
   HH:mm:ss */
  str += '';
  const regex = {
    YYYYMMDD: /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-9]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/,
    YYYYMMDDHHmmss: /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/,
    YYYYMMDDHHmm: /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))(\s)(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/,
    HHmmss: /^(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/,
    YYYYMM: /^\d{4}-(?:0[1-9]|1[0-2])$/,
  };

  if (!regex.hasOwnProperty(format)) {
    return false;
  }

  return regex[format].test(str);
};

// float min e.g., max e.l. digit e.l.
validator.isFloatFormat = function (str, options) {
  str += '';
  options = options || {};
  if (str === '' || str === '.') {
    return false;
  }

  const regex = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;

  function digitLen() {
    const len = (str.split('.')[1] || '').length;
    return (!options.hasOwnProperty('digit') || len <= options.digit);
  }

  function minMax() {
    return (!options.hasOwnProperty('min') || str >= options.min)
      && (!options.hasOwnProperty('max') || str <= options.max);
  }

  function neqZero() {
    if (options.hasOwnProperty('neq_zero')) {
      return options.neq_zero && str !== '0';
    }
    return true;
  }

  return regex.test(str) && minMax() && neqZero() && digitLen();
};

validator.isIntFormat = function (str, options) {
  return validator.isInt(`${str}`, options);
};

validator.isInt01 = function (str) {
  str += '';
  return validator.isInt(str, { min: 0, max: 1 });
};

validator.isInt11 = function (str) {
  const regex = /^\d{11}$/;
  return regex.test(str);
};

validator.isIntArray = function (array) {
  return array instanceof Array && array.length > 0 && (array.filter(f => validator.isIntFormat(f, { min: 1 }))).length > 0;
};

// rules [ field rule opt ]
validator.isArray = function (array, options = {}, rules = []) {

  function minMax() {
    return (!options.hasOwnProperty('min') || array.length >= options.min)
      && (!options.hasOwnProperty('max') || array.length <= options.max);
  }

  function filterRules(data) {
    let result = true;
    rules.forEach((r) => {
      const field = r.field ? data[r.field] : data;
      result = result && (r.required ? !validator.isNullOrEmpty(field) : result);
      result = result && (r.opt ? validator[r.rule](field, r.opt) : validator[r.rule](field));
    });
    return result;
  }

  function content() {
    if (array.length === 0 || rules.length === 0) {
      return true;
    }
    return (array.filter(f => filterRules(f))).length > 0;
  }

  return array instanceof Array && minMax() && content();
};

validator.isChineseName = function (str) {
  str += '';
  const regex = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
  return regex.test(str);
};

validator.isEnglishLetter = function (str) {
  str += '';
  const regex = /^[_a-zA-Z]+$/;
  return regex.test(str);
};

validator.isCommaSeparated = function (str) {
  const reg = /^([0-9]+[,])*([0-9]+)$/;
  return reg.test(str);
};

validator.isNullOrEmpty = function (str) {
  const isEmptyStr = str === undefined || str === null;
  return !isEmptyStr ? `${str}`.replace(/^\s+|\s+$/g, '').length === 0 : isEmptyStr;
};

// 返回false为超出范围
validator.isLengthCorrect = function (str, opt) {
  str = typeof str === 'string' ? str : '';
  opt = opt || {};

  const getByteLen = (val) => {
    let len = 0;
    for (let i = 0; i < val.length; i++) {
      const length = val.charCodeAt(i);
      len += (length >= 0 && length <= 128) ? 1 : 2;
    }
    return len;
  };

  const len = getByteLen(str);

  return (!opt.hasOwnProperty('min') || len >= opt.min)
    && (!opt.hasOwnProperty('max') || len <= opt.max);
};

validator.isMsgEventFile = function (str) {
  const reg = /^[A-Za-z0-9_]+msg_event.js$/;
  return reg.test(str);
};

// 数值计算精度转换
validator.numberCalcFormat = function (str, digit) {
  if (!validator.isFloatFormat(str) || !validator.isIntFormat(digit, { min: 1 })) {
    return str;
  }
  return Math.round(Number.parseFloat(`${str}`) * (10 * digit)) / (10 * digit);
};

// 业务验证

validator.isIdentifyCode = function (str) {
  str += '';
  const reg = /^\d{4}$/;
  return reg.test(str);
};

module.exports = exports = validator;
