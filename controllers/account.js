// const validator = require('../common/validator_extend');
const ResJson = require('../config/ResJson');
const accountBusiness = require('../business/account_business');


/**
 * @api {GET} /api/getuserwechatdata 获取用户信息
 * @apiGroup Account
 * @apiParamExample  {Object} 请求示例:
    {
    }
 *
 * @apiSuccessExample {Object} 响应示例:
    {
      errcode: 0,
      errmsg: "操作成功"
    }
 */
exports.getUserWechatData = {
  method: 'get',
  middlewares: [],
  routeDesc: '获取用户信息',
  handle: async function (req, res) {
    const openID = req.session.currentUser.openID;
    const userDataResult = await accountBusiness.getUserWechatDataLogic({ openID: openID });
    res.send(new ResJson(userDataResult));
  },
};
