// 定义返回数据类
class ResJson {
  constructor(errcode = 0, errmsg = '', retobj = '') {
    if (arguments.length === 1) {
      this.errcode = 0;
      this.errmsg = '操作成功';
      this.retobj = arguments[0];
      return;
    }
    this.errcode = errcode;
    this.errmsg = errmsg;
    this.retobj = retobj;
  }
}

module.exports = ResJson;
