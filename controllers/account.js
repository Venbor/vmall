// const validator = require('../common/validator_extend');
const ResJson = require('../config/ResJson');
const accountBusiness = require('../business/account_business');

// 获取用户登录信息
const getuserinfo = {
  url: '/getuserwechatdata',
  method: 'get',
  middlewares: [],
  routeDesc: '获取用户信息',
  handle: async (req, res) => {
    const openID = req.session.currentUser.openID;
    const userDataResult = await accountBusiness.getUserWechatDataLogic({ openID: openID });
    res.send(new ResJson(userDataResult));
  },
};


module.exports = [getuserinfo];
