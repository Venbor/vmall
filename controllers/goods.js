const validator = require('../common/validator_extend');
const ResJson = require('../config/ResJson');
const goodsBusiness = require('../business/goods_business');


/**
 * @api {GET} /api/getgoodslist 获取商品列表
 * @apiGroup Goods
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
const getGoodsList = {
  url: '/getgoodslist',
  method: 'GET',
  middlewares: [],
  routeDesc: '获取商品列表',
  handle: async function (req, res) {
    // const operateUser = req.session.currentUser.userName || '';
    const operateUser = '15176745000';
    const queryParams = req.query;
    queryParams.searchKey = queryParams.searchKey || '';
    queryParams.goodsClass = validator.isIntFormat(queryParams.goodsClass, { min: 1 }) ? Number.parseInt(queryParams.goodsClass, 10) : -1;
    queryParams.pageSize = validator.isIntFormat(queryParams.pageSize, { min: 1 }) ? Number.parseInt(queryParams.pageSize, 10) : 20;
    queryParams.currentPage = validator.isIntFormat(queryParams.currentPage, { min: 1 }) ? Number.parseInt(queryParams.currentPage, 10) : 0;
    queryParams.offset = queryParams.currentPage ? (queryParams.currentPage - 1) * queryParams.pageSize : 0;
    Object.assign(queryParams, { operateUser });
    const goodsResult = await goodsBusiness.getGoodsListLogic(queryParams);
    res.send(new ResJson(goodsResult));
  },
};
/**
 * @api {GET} /api/getgoodsdetail 获取商品详情
 * @apiName getgoodsdetail
 * @apiGroup Goods
 * @apiDescription 商品
 *
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
const getGoodsDetail = {
  url: '/getgoodsdetail',
  method: 'GET',
  middlewares: [],
  routeDesc: '获取商品详情',
  handle: async function (req, res) {
    const queryParams = req.query;
    if (!validator.isIntFormat(queryParams.goodsID, { min: 1 })) {
      res.send(new ResJson(1, '请求参数有误'));
      return;
    }
    const detailData = await goodsBusiness.getGoodsDetailLogic(queryParams);
    res.send(new ResJson(detailData));
  },
};
/**
 * @api {GET} /api/getgoodsclasslist 获取商品类别
 * @apiName getgoodsclasslist
 * @apiGroup Goods
 * @apiDescription 商品
 *
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
const getGoodsClassList = {
  url: '/getgoodsclasslist',
  method: 'GET',
  middlewares: [],
  routeDesc: '获取商品类别',
  handle: async function (req, res) {
    const goodsClassResult = await goodsBusiness.getGoodsClassListLogic();
    res.send(new ResJson(goodsClassResult));
  },
};
module.exports = [getGoodsList, getGoodsDetail, getGoodsClassList];
