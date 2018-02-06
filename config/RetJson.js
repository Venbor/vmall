// 定义返回数据类
class RetJson {
    constructor(errcode = 0, errmsg = '', retobj = '') {
        this.errcode = errcode;
        this.errmsg = errmsg;
        this.retobj = retobj;
    }
}
module.exports = RetJson;