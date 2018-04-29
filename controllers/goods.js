// const validator = require('../common/validator_extend');
// const SuccessJson = require('../config/ResJson').SuccessJson;
// const FailJson = require('../config/ResJson').FailJson;
// const accountBusiness = require('../business/account_business');


/**
 * @api {GET} /goods/getservicegoodslist 商品-获取商品列表
 * @apiName getservicegoodslist
 * @apiGroup Goods
 * @apiVersion  1.0.0
 *
 * @apiParam  {String} key 前端传入标识码
 * @apiParam  {String} searchKey 模糊搜索关键字
 * @apiParam  {Number} kitchenFloorID 厨房楼层
 * @apiParam  {Number} kitchenAreaB 厨房区域
 * @apiParam  {Number} serviceClass 服务类别
 * @apiParam  {Number} goodsClass 商品类别
 * @apiParam  {Number} pageSize=20 行数
 * @apiParam  {Number} currentPage=1 页码
 *
 * @apiParamExample  {Object} 请求示例:
   {
    "key": "",
    "searchKey": "",
    "kitchenFloorID": 0,
    "kitchenAreaB": 0,
    "serviceClass": -1,
    "goodsClass": -1,
    "pageSize": 20,
    "currentPage": 1
   }
 *
 * @apiSuccessExample {Object} 响应示例:
   HTTP/1.1 200 OK
   {
     errcode: 0,
     errmsg: '操作成功',
     retobj:
     {
       "goodsList": {
          "key": "",
          "total": 16,
          "rows": [{
            "goodsID": "商品ID",
            "goodsCode": "商品编码",
            "goodsName": "商品名",
            "goodsSpecName": "商品规格名",
            "iconUrl": "商品小图片",
            "serviceClass": "服务类别",
            "goodsClass": "商品类别",
            "goodsClassName": "商品类别名",
            "bookingMode": "购买方式",
            "guidePrice": "指导价",
            "salePrice": "售卖价",
            "unit": "单位",
            "descript": "描述",
            "bookingNum": "用户订购数",
            "saleAmount": "售卖总价",
            "kitchenFloorName": "厨房楼层名",
            "kitchenAreaBName": "厨房区域名",
            "kitchenEquipID": "厨房设备ID",
            "equipQRCode": "厨房设备二维码",
            "equipCustomCode": "厨房设备代号",
            "equipCount": "厨房设备数量基数",
            "basicCount": "设备基准数",
            "itemNames": [
              "选中类目名集合"
            ]
          }]
        },
        "shopcartData": {
          "count": "购物车数量",
          "amount": "购物车总价"
        }
     }
   }
 *
 */
// exports.getServiceGoodsList = {
//   method: 'GET',
//   middlewares: ['kitchenRequired'],
//   handler(req, res) {
//     const kitchenID = req.session.currentUser.kitchenID || 0;
//     const operateUser = req.session.currentUser.userName || '';

//     const queryParams = req.query;
//     queryParams.searchKey = queryParams.searchKey || '';
//     queryParams.classVisible = 1;
//     queryParams.serviceClass = validator.isIntFormat(queryParams.serviceClass, { min: 1 }) ? Number.parseInt(queryParams.serviceClass, 10) : -1;
//     queryParams.kitchenFloorID = validator.isIntFormat(queryParams.kitchenFloorID, { min: 0 }) ? Number.parseInt(queryParams.kitchenFloorID, 10) : 0;
//     queryParams.kitchenAreaB = validator.isIntFormat(queryParams.kitchenAreaB, { min: 0 }) ? Number.parseInt(queryParams.kitchenAreaB, 10) : 0;
//     queryParams.goodsClass = validator.isIntFormat(queryParams.goodsClass, { min: 1 }) ? Number.parseInt(queryParams.goodsClass, 10) : -1;
//     queryParams.pageSize = validator.isIntFormat(queryParams.pageSize, { min: 1 }) ? Number.parseInt(queryParams.pageSize, 10) : 20;
//     queryParams.currentPage = validator.isIntFormat(queryParams.currentPage, { min: 1 }) ? Number.parseInt(queryParams.currentPage, 10) : 0;
//     queryParams.offset = queryParams.currentPage ? (queryParams.currentPage - 1) * queryParams.pageSize : 0;
//     Object.assign(queryParams, { kitchenID, operateUser });

//     goodsBusiness.getServiceGoodsListLogic(queryParams, (err, goodsResult) => {
//       if (err) {
//         global.context.logger.error(
//           req.session.currentUser.userID,
//           'MYSQL',
//           'getServiceGoodsList',
//           '获取商品列表出错:',
//           err);
//         goodsResult = { goodsList: { total: 0, rows: [] }, shopcartData: { count: 0, amount: 0 } };
//         res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, goodsResult));
//         return;
//       }
//       res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, goodsResult));
//     });
//   },
// };

/**
 * @api {GET} /goods/getservicegoodsdetail 商品-获取商品详情
 * @apiName getservicegoodsdetail
 * @apiGroup Goods
 * @apiVersion  1.0.0
 *
 * @apiParam  {Number} goodsID 商品ID
 *
 * @apiSuccess (Success 200) {Number} errcode 错误代码：0：成功，1：失败
 * @apiSuccess (Success 200) {String} errmsg 错误消息
 * @apiSuccess (Success 200) {Array} retobj 返回对象
 *
 * @apiParamExample  {Object} 请求示例:
   {
     goodsID: 12542514564325515
   }
 *
 * @apiSuccessExample {Object} 响应示例:
   HTTP/1.1 200 OK
   {
     errcode: 0,
     errmsg: '操作成功',
     retobj:
     {
       descript:'商品描述',
       serviceBanner:'详情页banner',
       serviceIntro:'服务介绍',
       serviceScope:'服务范围',
       serviceDuration:'服务时长 清洗类',
       maintenanceTool:'清洗保养工具 清洗类',
       serviceProcess:'服务流程',
       videoUrl:'视频地址'
     }
   }
 *
 */
// exports.getServiceGoodsDetail = {
//   method: 'GET',
//   middlewares: ['kitchenRequired'],
//   handler(req, res) {
//     const queryParams = req.query;
//     if (!validator.isIntFormat(queryParams.goodsID, { min: 1 })) {
//       res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE));
//       return;
//     }

//     goodsBusiness.getServiceGoodsDetailLogic(queryParams, (err, detailData) => {
//       if (err) {
//         global.context.logger.error(
//           req.session.currentUser.userID,
//           'MYSQL',
//           'getServiceGoodsDetail',
//           '获取商品详情出错:',
//           err);
//         res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE));
//         return;
//       }
//       res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, detailData));
//     });
//   },
// };

/**
 * @api {GET} /goods/getserviceitemlist 商品-获取类目列表
 * @apiName getserviceitemlist
 * @apiGroup Goods
 * @apiVersion  1.0.0
 *
 * @apiParam  {Number} goodsID 商品ID
 * @apiParam  {Number} kitchenEquipID 厨房设备ID
 *
 * @apiSuccess (Success 200) {Number} errcode 错误代码：0：成功，1：失败
 * @apiSuccess (Success 200) {String} errmsg 错误消息
 * @apiSuccess (Success 200) {Array} retobj 返回数组
 *
 * @apiParamExample  {Object} 请求示例:
   {
     goodsID: 112842512512515,
     kitchenEquipID: 0
   }
 *
 * @apiSuccessExample {Object} 响应示例:
   HTTP/1.1 200 OK
   {
     errcode: 0,
     errmsg: '操作成功',
     retobj:
     [{
        "itemID": "类目ID",
        "itemCode": "类目编码",
        "itemName": "类目名",
        "serviceClass": "服务类别",
        "goodsID": "商品ID",
        "unit": "单位",
        "descript": "描述",
        "bookingNum": "订购数"
      }]
   }
 *
 */
// exports.getServiceItemList = {
//   method: 'GET',
//   middlewares: ['kitchenRequired'],
//   handler(req, res) {
//     const kitchenID = req.session.currentUser.kitchenID || 0;
//     const operateUser = req.session.currentUser.userName || '';
//     const queryParams = req.query;
//     Object.assign(queryParams, { kitchenID, operateUser });

//     if (!validator.isIntFormat(`${queryParams.goodsID}`, { min: 1 })) {
//       res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
//       return;
//     }

//     if (!validator.isIntFormat(`${queryParams.kitchenEquipID}`, { min: 0 })) {
//       res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
//       return;
//     }

//     goodsBusiness.getServiceItemListLogic(queryParams, (err, itemList) => {
//       if (err) {
//         global.context.logger.error(
//           req.session.currentUser.userID,
//           'MYSQL',
//           'getServiceItemList',
//           '获取商品类目列表出错:',
//           err);
//         res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
//         return;
//       }
//       res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, itemList));
//     });
//   },
// }
module.exports = [];
