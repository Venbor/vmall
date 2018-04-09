const url = require('url');
const RetJson = require('./RetJson');
const OAuth = require('wechat-oauth');
const config = require('./config_web.js');

// 用于获取token方法
const getOauthToken = (openID, callback) => {
  // const redisKey = staticConfig.redisPrename.oauthToken + openID;
  // global.context.redisData.getRedisValue(redisKey, (err, token) => { callback(err, JSON.parse(token || '{}')); });
};
// 用于保存token方法
const setOauthToken = (openID, token, callback) => {
  // global.context.redisData.setRedisValue(staticConfig.redisPrename.oauthToken + openID, token, 120, callback);
};
// 根据公众平台上appid和appsecret创建OAuth接口的构造函数
const OAuthApi = new OAuth(config.wechatConfig.appID, config.wechatConfig.appSecret, getOauthToken, setOauthToken);

// 验证登录
function userRequired(req, res, next) {
  if (!req.session || !req.session.currentUser) {
    res.status(403).send(new RetJson(0, '您还未登录系统，请先登录'));
    return;
  }
  res.locals.currentUser = req.session.currentUser;
  next();
}
exports.userRequired = userRequired;

// 验证微信登录
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
  if (!code) {
    const redirectUrl = url.format({ protocol: req.protocol, host: req.headers.host }) + req.originalUrl; // 授权后需要跳转地址
    const oauthUrl = OAuthApi.getAuthorizeURL(redirectUrl, 'base5', 'snsapi_userinfo'); // snsapi_userinfo为弹出授权
    res.redirect(oauthUrl); // 跳转授权url页面
    return;
  }
  // 确认是否授权成功
  if (!code || state !== 'base5') {
    next();
    return;
  }
  // 根据code获取用户信息
  OAuthApi.getUserByCode(code, function (err, result) {
    const oauthUser = result || {};
    if (oauthUser.hasOwnProperty('openid')) {
      throw new Error(`未从腾讯微信服务器获取到OPENID: ${JSON.stringify(oauthUser)}`);
    }
    const queryParams = {
      unionID: oauthUser.unionid,
      openID: oauthUser.openid,
      nickname: oauthUser.nickname,
      headImgUrl: oauthUser.headimgurl,
    };
    // 插入数据库
    // yield cb2 => accountBusiness.insertUserWechatLogic(queryParams, cb2);
    // 取出数据
    // const wechatResult = yield cb3 => accountBusiness.getUserWechatDataLogic(queryParams, cb3);
    // if (!wechatResult) {
    //   next();
    //   return;
    // }
    // 写入session
  //     const currentWechat = {
  //   wechatID: wechatResult.wechatID,
  //   openID: queryParams.openID,
  //   nickname: queryParams.nickname,
  //   headImgUrl: queryParams.headImgUrl,
  //   systemName: queryParams.systemName,
  // };
  // res.locals.currentWechat = req.session.currentWechat = currentWechat;
  });
}

// 跳过验证
function routeNext(req, res, next) {
  next();
}
exports.routeNext = routeNext;
