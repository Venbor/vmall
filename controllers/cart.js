// const validator = require('../common/validator_extend');
// const SuccessJson = require('../config/ResJson').SuccessJson;
// const FailJson = require('../config/ResJson').FailJson;
// const accountBusiness = require('../business/account_business');

/**
 * @api {GET} /shopcart/getcartgoodslist 购物车页-获取购物车商品列表
 * @apiName getcartgoodslist
 * @apiGroup Shopcart
 * @apiVersion  1.0.0
 *
 * @apiParam  {Number} serviceClass 服务类别
 *
 * @apiSuccess (Success 200) {Number} errcode 错误代码：0：成功，1：失败
 * @apiSuccess (Success 200) {String} errmsg 错误消息
 * @apiSuccess (Success 200) {Array} retobj 返回数组
 *
 * @apiParamExample  {Object} 请求示例:
 {
    "serviceClass": "服务类别"
 }
 *
 * @apiSuccessExample {Object} 响应示例:
 HTTP/1.1 200 OK
 {
   errcode: 0,
   errmsg: '操作成功',
   retobj:
   [{
      "goodsID": "商品ID",
      "goodsCode": "商品编码",
      "goodsName": "商品名",
      "goodsSpecName": "商品规格名",
      "bookingMode": "商品购买方式",
      "goodsClass": "商品类别",
      "serviceClass": "服务类别",
      "serviceClassName": "服务类别名",
      "kitchenEquipID": "厨房设备ID",
      "kitchenFloorName": "厨房设备楼层名",
      "kitchenAreaBName": "厨房设备二级区域名",
      "equipQRCode": "厨房设备二维码",
      "equipCustomCode": "厨房设备代号",
      "bookingNum": "订购数",
      "salePrice": "售卖价",
      "saleAmount": "售卖总价",
      "itemNames": [
        "选中类目名集合"
      ]
    }]
 }
 *
 */
// exports.getCartGoodsList = {
//   method: 'GET',
//   middlewares: ['kitchenRequired'],
//   handler(req, res) {

//     const kitchenID = req.session.currentUser.kitchenID || 0;
//     const operateUser = req.session.currentUser.userName || '';
//     const queryParams = { kitchenID, operateUser, serviceClass: req.query.serviceClass };

//     shopcartBusiness.getCartGoodsListLogic(queryParams, (err, cartGoodsList) => {
//       if (err) {
//         global.context.logger.error(
//           req.session.currentUser.userID,
//           'MYSQL',
//           'getCartGoodsList',
//           '获取购物车商品列表出错:',
//           err);
//         res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
//         return;
//       }

//       res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, cartGoodsList));
//     });
//   },
// };


/**
 * @api {POST} /shopcart/addgoodstocart 购物车页-单个商品加入购物车
 * @apiName addgoodstocart
 * @apiGroup Shopcart
 * @apiVersion  1.0.0
 *
 * @apiParam  {Number} goodsID 商品ID 必须值
 * @apiParam  {Number} kitchenEquipID 厨房设备ID
 * @apiParam  {Number} bookingNum 订购数量（可为1位小数）必须值
 * @apiParam  {Array} itemList 必须值 格式：[{ itemID: 类目ID, bookingNum: 订购数量 }] 可为空数组
 * @apiParam  {String} userRemark 用户备注
 * @apiParam  {Array} userWarnPicUrls 用户报修图片地址列表
 *
 * @apiSuccess (Success 200) {Number} errcode 错误代码：0：成功，1：失败
 * @apiSuccess (Success 200) {String} errmsg 错误消息
 * @apiSuccess (Success 200) {Array} retobj 返回数组
 *
 * @apiParamExample  {Object} 请求示例:
 {
    "goodsID": "商品ID",
    "kitchenEquipID": "厨房设备ID",
    "bookingNum": "订购数量",
    "itemList": [{
      "itemID": "类目ID",
      "bookingNum": "订购数"
    }],
    "userRemark": "用户备注",
    "userWarnPicUrls": "用户报修图片地址列表"
 }
 *
 * @apiSuccessExample {Object} 响应示例:
 HTTP/1.1 200 OK
 {
   errcode: 0,
   errmsg: '操作成功'
 }
 *
 */
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
module.exports = [];
