const ResJson = require('./ResJson');
const wechatApi = require('../common/wechat_api.js');
const accountBusiness = require('../business/account_business');
const common = require('../common/comm_func.js');

// 1.直接跳过(路由挂载无中间件用)
exports.routeNext = function (req, res, next) {
  next();
};

// 2.验证登录API
exports.userAuth = async function (req, res, next) {
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3ZWNoYXRJRCI6Mjg3MiwiaWF0IjoxNTI2MTM1MDQ3LCJleHAiOjE1MjY3Mzk4NDd9.r5eGFP8987iN9geqFSWF_aiOATLNFJzEot4cd7y1QOw';
  const token = req.headers['Authorization'] || req.body.token || req.query.token;
  if (!token) {
    res.status(403).send(new ResJson(1, '您还未登录系统，请先登录'));
    return;
  }
  const decoded = await common.verifyToken(token).catch((err) => {
    if (err.name === 'TokenExpiredError') {
      res.status(403).send(new ResJson(1, '登录已过期，请重新登录'));
    } else {
      res.status(403).send(new ResJson(1, '无效token'));
    }
  });
  req.currentUser = decoded;
  next();
};

// 3.微信登录WEB
exports.userWechatLogin = async function (req, res, next) {
  // 已经登录
  const token = req.cookies['Authorization'] || req.headers['Authorization'];
  const decoded = token && await common.verifyToken(token).catch((err) => {});
  if (decoded) {
    req.currentUser = decoded;
    next();
  }
  // 权限后字段
  const code = req.query.code;
  const state = req.query.state;
  // 未授权,跳转授权页面
  if (!code || state !== 'base5') {
    wechatApi.getUserCode(req, res, 'base5');
    return;
  }
  try {
    // 获取网页授权token
    const accessToken = await wechatApi.getAccessToken(code);
    if (!accessToken || accessToken.errcode || !accessToken.hasOwnProperty('openid')) {
      res.send(new ResJson(1, '获取网页授权token失败'));
      global.logger.debug('获取网页授权token失败', `errmsg: ${JSON.stringify(accessToken)}`);
      return;
    }
    // 获取用户微信信息
    const useInfo = await wechatApi.getUserInfo(accessToken.access_token, accessToken.openid);
    if (!useInfo || useInfo.errcode || !useInfo.hasOwnProperty('openid')) {
      res.send(new ResJson(1, '获取用户信息失败'));
      global.logger.debug('获取用户信息失败', `errmsg: ${JSON.stringify(useInfo)}`);
      return;
    }
    // 插入或更新用户微信信息
    const queryParams = {
      unionID: useInfo.unionid,
      openID: useInfo.openid,
      nickname: useInfo.nickname,
      headImgUrl: useInfo.headimgurl,
    };
    await accountBusiness.insertUserWechatLogic(queryParams);
    const userDataResult = await accountBusiness.getUserWechatDataLogic({ openID: queryParams.openID });
    // 成功后登录
    res.cookie("Authorization", common.signToken({ openID: userDataResult.openid, wechatID: userDataResult.wechatID }), { maxAge: 3600000 * 24 * 3 });
    req.currentUser = { openID: userDataResult.openid, wechatID: userDataResult.wechatID };
    next();
  } catch (err) {
    next(err);
  }
};
