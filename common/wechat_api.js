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
  getAccessToken: async function (code) {
    const accessUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token';
    const result = await common.requestGET(accessUrl, {
      appid: wechatcfg.appID,
      secret: wechatcfg.appSecret,
      code: code,
      grant_type: 'authorization_code',
    });
    return result;
  },
  // 获取用户信息
  getUserInfo: async function (accessToken, openid) {
    const userInfoUrl = 'https://api.weixin.qq.com/sns/userinfo';
    const result = await common.requestGET(userInfoUrl, {
      openid: openid,
      access_token: accessToken,
      lang: 'zh_CN',
    });
    return result;
  },
};
