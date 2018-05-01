// const validator = require('../common/validator_extend');
const ResJson = require('../config/ResJson');
const cartBusiness = require('../business/cart_business');

/**
 * @api {GET} /api/getcartgoodslist 获取购物车商品列表
 * @apiGroup Cart
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
const getCartGoodsList = {
  url: '/getcartgoodslist',
  method: 'GET',
  middlewares: [],
  routeDesc: '获取购物车商品列表',
  handle: async function (req, res) {
    // const operateUser = req.session.currentUser.userName || '';
    const operateUser = '15176745000';
    const queryParams = { operateUser };

    const cartGoodsList = await cartBusiness.getCartGoodsListLogic(queryParams);
    res.send(new ResJson(cartGoodsList));
  },
};
// 购物车页-单个商品加入购物车
// exports.addGoodsToCart = {
//   method: 'POST',
//   middlewares: ['kitchenRequired'],
//   handler(req, res) {
//     const kitchenID = req.session.currentUser.kitchenID || 0;
//     const operateUser = req.session.currentUser.userName || '';
//     const goodsData = req.body;
//     Object.assign(goodsData, { kitchenID, operateUser });
//     shopcartBusiness.addGoodsToCartLogic(goodsData, (err) => {
//       if (err) {
//         global.context.logger.error(
//           req.session.currentUser.userID,
//           'MYSQL',
//           'addGoodsToCart',
//           '单个商品加入购物车出错:',
//           err);
//         res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE));
//         return;
//       }
//       res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE));
//     });
//   },
// };
//
module.exports = [getCartGoodsList];
