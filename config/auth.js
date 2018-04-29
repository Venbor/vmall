const FailJson = require('./ResJson').FailJson;
const wechatApi = require('../common/wechat_api.js');
const accountBusiness = require('../business/account_business');
const common = require('../common/comm_func.js');

// 1.直接跳过
exports.routeNext = function(req, res, next) {
  next();
};

// 2.验证登录
exports.userRequired = function(req, res, next) {
  if (!req.session || !req.session.currentUser) {
    res.status(403).send(new FailJson('您还未登录系统，请先登录'));
    return;
  }
  res.locals.currentUser = req.session.currentUser;
  next();
};

// 3.验证微信登录
exports.userWechatLogin = async function(req, res, next) {
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
  try {
    // 获取网页授权token
    let tokenData = await common.promisify(wechatApi.getAccessToken)(code);
    tokenData = JSON.parse(tokenData);
    if (!tokenData || tokenData.errcode || !tokenData.hasOwnProperty('openid')) {
      res.send(new FailJson('获取网页授权token失败'));
      global.logger.debug('获取网页授权token失败', `errmsg: ${json.stringify(tokenData)}`);
      return;
    }
    // 获取用户信息
    let userData = await common.promisify(wechatApi.getUserInfo)(tokenData.access_token, tokenData.openid);
    userData = JSON.parse(userData);
    if (!userData || userData.errcode || !userData.hasOwnProperty('openid')) {
      res.send(new FailJson('获取用户信息失败'));
      global.logger.debug('获取用户信息失败', `errmsg: ${json.stringify(userData)}`);
      return;
    }
    // 插入/更新用户信息
    const queryParams = {
      unionID: userData.unionid,
      openID: userData.openid,
      nickname: userData.nickname,
      headImgUrl: userData.headimgurl,
    };
    const insertResult = await common.promisify(accountBusiness.insertUserWechatLogic)(queryParams);
    // 成功后登陆系统
    if (insertResult) {
      res.locals.currentUser = req.session.currentUser = queryParams;
      next();
    }
  } catch (err) {
    next(err);
  }
};
