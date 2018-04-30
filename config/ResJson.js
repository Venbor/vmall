// 定义返回数据类
class ResJson {
  constructor(errcode = 0, errmsg = '', resobj = '') {
    if (arguments.length === 1) {
      this.errcode = 0;
      this.errmsg = '操作成功';
      this.resobj = arguments[0];
      return;
    }
    this.errcode = errcode;
    this.errmsg = errmsg;
    this.resobj = resobj;
  }
}

module.exports = ResJson;
