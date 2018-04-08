const validator = require('../common/validator_extend');
const RetJson = require('../config/RetJson');
// 逻辑层
// const accountBusiness = require('../model/business/account_business');
/**
 *
 * @api {POST} /signin 登录
 * @apiParam  {String} userName 登录账号或工号
 * @apiParam  {String} password 密码
 * @apiParamExample  {Object} 请求示例:
 {
   userName : 15176700000,
   password : 12345
 }
 *
 * */
const signIn = {
  url: '/sigin',
  method: 'get',
  middlewares: [],
  routeDesc: '登录',
  handle(req, res) {
    res.send('success');
  },
  //     const userName = req.body.userName;
  //     const password = req.body.password;
  //     if (!(validator.isLength(`${userName}`, 2) && validator.isLength(`${password}`, 2))) {
  //         res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SIGN_IN_INPUT_ERROR, null));
  //         return;
  //     }
  //     httpHandler.httpApiPostInvoke('USERCENTER', 'userlogin', {}, req.body, (err, httpResult) => {
  //         if (err) {
  //             global.context.logger.error(
  //                 userName,
  //                 'HTTP',
  //                 'signIn',
  //                 '用户登录错误：',
  //                 err);
  //             res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, null));
  //             return;
  //         }

  //         if (httpResult.errcode !== 0) {
  //             res.send(httpResult);
  //             return;
  //         }

  //         res.clearCookie(staticConfig.cookieSecret, { path: '/' });
  //         auth.genSession(httpResult.retobj.userID, res);

  //         res.locals.currentUser = req.session.currentUser = httpResult.retobj;

  //         const retobj = { userName: httpResult.retobj.userName, realName: httpResult.retobj.realName };
  //         res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, retobj));
  //     });
  // },
};

module.exports = [signIn];
