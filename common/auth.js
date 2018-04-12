// const url = require('url');
const RetJson = require('../config/RetJson');
const wechatApi = require('./wechat_api.js');
const accountBusiness = require('../business/account_business');
const common = require('./comm_func.js');

// 1.直接跳过
exports.routeNext = function (req, res, next) {
  next();
};

// 2.验证登录
exports.userRequired = function (req, res, next) {
  if (!req.session || !req.session.currentUser) {
    res.status(403).send(new RetJson(0, '您还未登录系统，请先登录'));
    return;
  }
  res.locals.currentUser = req.session.currentUser;
  next();
};

// 3.验证微信登录
exports.userWechatLogin = async function (req, res, next) {
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
    let tokenData = await common.promisify(wechatApi.getAccessToken)(code); // 封装Promise方法
    tokenData = JSON.parse(tokenData);
    if (!tokenData || tokenData.errcode || !tokenData.hasOwnProperty('openid')) {
      res.send('获取网页授权token失败');
      global.logger.debug('获取网页授权token失败', `errmsg: ${tokenData}`);
      return;
    }
    // 获取用户信息
    let userData = await common.promisify(wechatApi.getUserInfo)(tokenData.access_token, tokenData.openid); // 封装Promise方法
    userData = JSON.parse(userData);
    if (!userData || userData.errcode || !userData.hasOwnProperty('openid')) {
      res.send('获取用户信息失败');
      global.logger.debug('获取用户信息失败', `errmsg: ${userData}`);
      return;
    }
    // 插入用户信息
    const queryParams = {
      unionID: userData.unionid,
      openID: userData.openid,
      nickname: userData.nickname,
      headImgUrl: userData.headimgurl,
    };
    const insertUserWechatLogic = common.promisify(accountBusiness.insertUserWechatLogic); // 封装Promise方法
    const insertResult = await insertUserWechatLogic(queryParams);
    if (insertResult) {
      res.locals.currentUser = req.session.currentUser = queryParams;
      next();
    }
    // 获取用户信息
  } catch (err) {
    res.send('用户微信登录出错');
    global.logger.debug('用户微信登录出错', err ? (err.message || err) : undefined);
  }
};
