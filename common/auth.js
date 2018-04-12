// const url = require('url');
const RetJson = require('../config/RetJson');
const wechatApi = require('../common/wechat_api.js');
// const accountBusiness = require('../model/business/account_business');

// 1.直接跳过
function routeNext(req, res, next) {
  next();
}
exports.routeNext = routeNext;

// 2.验证登录
function userRequired(req, res, next) {
  if (!req.session || !req.session.currentUser) {
    res.status(403).send(new RetJson(0, '您还未登录系统，请先登录'));
    return;
  }
  res.locals.currentUser = req.session.currentUser;
  next();
}
exports.userRequired = userRequired;

// 3.验证微信登录
function userWechatLogin(req, res, next) {
  // 已经登录
  if (req.session && req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
    next();
    return;
  }
  const code = req.query.code;
  const state = req.query.state;
  // 未授权,跳转授权页面
  if (!code || state !== 'base5') {
    wechatApi.getUserCode(req, res, 'base5');
    return;
  }
  // 获取网页授权token
  wechatApi.getAccessToken(code, (data) => {
    if (!data || data.errcode) {
      res.send('获取授权accessToken失败');
      global.logger.info('获取授权accessToken失败', `errmsg: ${data.errmsg}`);
      return;
    }
    data = JSON.parse(data);
    const accessToken = data.access_token || '';
    const openid = data.openid || '';
    // const refreshToken = data.refresh_token || '';
    // 获取用户信息
    wechatApi.getUserInfo(accessToken, openid, (oauthUser) => {
      if (!oauthUser || oauthUser.errcode) {
        res.send(`获取用户信息失败, ${oauthUser}`);
        global.logger.info('获取授权accessToken失败', `errmsg: ${data.errmsg}`);
        return;
      }
      res.send(oauthUser);
      oauthUser = JSON.parse(oauthUser);
      // const queryParams = {
      //   unionID: oauthUser.unionid,
      //   openID: oauthUser.openid,
      //   nickname: oauthUser.nickname,
      //   headImgUrl: oauthUser.headimgurl,
      // };
      // accountBusiness.insertUserWechatLogic(queryParams, () => {});
    });
  });
}
exports.userWechatLogin = userWechatLogin;

// 根据code获取用户信息
// OAuthApi.getAccessToken(code, function (err, result) {
//   global.loggerInfo.info('result', result);
//   const oauthUser = result || {};
//   if (oauthUser.hasOwnProperty('openid')) {
//     res.send(`未从腾讯微信服务器获取到OPENID: ${JSON.stringify(oauthUser)}`);
//     return;
//   }
//   OAuthApi.getUser(oauthUser, (err1, result1) => {
//     global.loggerInfo.info('result1', result1);
//   })
//   // const queryParams = {
//   //   unionID: oauthUser.unionid,
//   //   openID: oauthUser.openid,
//   //   nickname: oauthUser.nickname,
//   //   headImgUrl: oauthUser.headimgurl,
//   // };

//   next();
//   // 插入数据库
//   // yield cb2 => accountBusiness.insertUserWechatLogic(queryParams, cb2);
//   // 取出数据
//   // const wechatResult = yield cb3 => accountBusiness.getUserWechatDataLogic(queryParams, cb3);
//   // if (!wechatResult) {
//   //   next();
//   //   return;
//   // }
//   // 写入session
//   //     const currentWechat = {
//   //   wechatID: wechatResult.wechatID,
//   //   openID: queryParams.openID,
//   //   nickname: queryParams.nickname,
//   //   headImgUrl: queryParams.headImgUrl,
//   //   systemName: queryParams.systemName,
//   // };
//   // res.locals.currentWechat = req.session.currentWechat = currentWechat;
// });
