const validator = require('validator');
// 基础验证
/*
 isEmail(str [, options])  检查字符串是否是邮箱 ,options是一个对象默认为
 isMobilePhone(str, 'zh-CN') : 检查字符串是否是手机号，第二个参数表示地区
 isBoolean(str)  检查字符串是否是boolean值
 isNull(str)  检查字符串是否为空,(length为0)
 isIn(str, values) : 检查字符串是否在允许的值
 isLength(str, options) 检查字符串长度是否在范围内,options是个对象,包含最大值,最小值,比如{min:0,max:100}
 isInt(str [, options]) 检查字符串是否是整数,options是个对象,包含最大值,最小值,比如{min:0,max:100}
 isFloat(str [, options]) 检查字符串是否是浮点数, options是个对象,包含最大最小值,比如{min:0.5,max:10.5}
 isJSON(str)  检查字符串是否是有效的json格式
 isNumeric(str)  检查字符串是否只包含数字
 isLowercase(str)  检查字符串是否都是小写字母
 isUppercase(str)  检查字符串是否是大写
 isDate(str)  检查字符串是否是日期
 isWhitelisted(str, chars) 检查str是否都出现在chars中
 isURL(str [, options])  检查字符串是否是个URL
 */

// 扩展验证
// 验证是否为空（undefined、null、空格、空字符串）
validator.isNullOrEmpty = function (str) {
  const isEmptyStr = str === undefined || str === null;
  return !isEmptyStr ? `${str}`.replace(/^\s+|\s+$/g, '').length === 0 : isEmptyStr;
};
// 验证时间格式
validator.isDateFormat = function (str, format) {
  /*
   YYYYMM: YYYY-MM
   YYYYMMDD: YYYY-MM-DD
   YYYYMMDDHHmmss: YYYY-MM-DD HH:mm:ss
   YYYYMMDDHHmm: YYYY-MM-DD HH:mm
   HHmmss: HH:mm:ss
   */
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
// 验证浮点型
validator.isFloatFormat = function (str, options) {
  /*
   {min: 3} 允许最小值
   {max: 10}: 允许最大值
   {neq_zero: true}: 不能为0
   {digit: 2}: 验证小数点后位数
   */
  str += ''; // 转换为字符串
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
    return (!options.hasOwnProperty('min') || str >= options.min) &&
      (!options.hasOwnProperty('max') || str <= options.max);
  }

  function neqZero() {
    if (options.hasOwnProperty('neq_zero')) {
      return options.neq_zero && str !== '0';
    }
    return true;
  }

  return regex.test(str) && minMax() && neqZero() && digitLen();
};
// 验证为整型
validator.isIntFormat = function (str, options) {
  return validator.isInt(`${str}`, options);
};
// 验证值为0或1
validator.isInt01 = function (str) {
  str += '';
  return validator.isInt(str, { min: 0, max: 1 });
};
// 验证长度为11位（手机号长度）
validator.isInt11 = function (str) {
  const regex = /^\d{11}$/;
  return regex.test(str);
};
// 验证数组长度
validator.isArray = function (array, options = {}) {
  function minMax() {
    return (!options.hasOwnProperty('min') || array.length >= options.min) &&
      (!options.hasOwnProperty('max') || array.length <= options.max);
  }
  return array instanceof Array && minMax();
};
// 验证为中文
validator.isChineseName = function (str) {
  str += '';
  const regex = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
  return regex.test(str);
};
// 验证只能为英文和_等
validator.isEnglishLetter = function (str) {
  str += '';
  const regex = /^[_a-zA-Z]+$/;
  return regex.test(str);
};
// 数值计算精度转换
validator.numberCalcFormat = function (str, digit) {
  if (!validator.isFloatFormat(str) || !validator.isIntFormat(digit, { min: 1 })) {
    return str;
  }
  return Math.round(Number.parseFloat(`${str}`) * (10 ** digit)) / (10 ** digit);
};

module.exports = validator;
