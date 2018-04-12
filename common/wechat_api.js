const url = require('url');
const common = require('./comm_func.js');
const wechatcfg = require('../config/config_web.js').wechatConfig;


module.exports = {
  // 用户获取权限
  getUserCode: function (req, res, state) {
    const redirectUrl = url.format({ protocol: req.protocol, host: req.headers.host }) + req.originalUrl; // 授权后需要跳转地址
    const baseUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechatcfg.appID}`;
    const oauthUrl = `${baseUrl}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
    res.redirect(oauthUrl); // 跳转到授权页
  },
  // 获取用户accessToken
  getAccessToken: function (code, cb) {
    const accessUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token';
    common.requestGET(accessUrl, {
      appid: wechatcfg.appID,
      secret: wechatcfg.appSecret,
      code: code,
      grant_type: 'authorization_code',
    }, (data) => {
      cb(data);
    });
  },
  // 验证用户accessToken是否有效
  checkAccessToken: function (accessToken, openid, cb) {
    const checkUrl = 'https://api.weixin.qq.com/sns/auth';
    common.requestGET(checkUrl, {
      openid: openid,
      access_token: accessToken,
    }, (data) => {
      cb(data);
    });
  },
  // 刷新用户accessToken
  refreshToken: function (refToken, cb) {
    const refreshUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token';
    common.requestGET(refreshUrl, {
      appid: wechatcfg.appID,
      refresh_token: refToken,
      grant_type: 'refresh_token',
    }, (data) => {
      cb(data);
    });
  },
  // 获取用户信息
  getUserInfo: function (accessToken, openid, cb) {
    const userInfoUrl = 'https://api.weixin.qq.com/sns/userinfo';
    common.requestGET(userInfoUrl, {
      openid: openid,
      access_token: accessToken,
      lang: 'zh_CN',
    }, (data) => {
      cb(data);
    });
  },
};
