const validator = require('../common/validator_extend');
const ResJson = require('../config/ResJson');
const goodsBusiness = require('../business/goods_business');

/**
 * @api {GET} /api/getgoodskindsList 获取商品一级分类
 * @apiName getgoodskindslist
 * @apiGroup Goods
 * @apiDescription 商品一级类别
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
exports.getGoodsKindsList = {
  method: 'GET',
  middlewares: [],
  routeDesc: '获取商品一级类别',
  handle: async function (req, res) {
    const result = await goodsBusiness.getGoodsKindsListLogic();
    res.send(new ResJson(result));
  },
};

/**
 * @api {GET} /api/getgoodscategorylist 获取商品二级分类
 * @apiName getgoodscategorylist
 * @apiGroup Goods
 * @apiDescription 商品二级类别
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
exports.getGoodsCategoryList = {
  method: 'GET',
  middlewares: [],
  routeDesc: '获取商品二级类别',
  handle: async function (req, res) {
    const queryParams = req.query;
    queryParams.kindsID = queryParams.kindsID || 0;
    const result = await goodsBusiness.getGoodsCategoryLogic(queryParams);
    res.send(new ResJson(result));
  },
};

/**
 * @api {GET} /api/getgoodslist 获取商品列表
 * @apiGroup Goods
 *
 * @apiParam  {String} key 前端传入标识码 原样返回
 * @apiParam  {String} searchKey 模糊搜索关键字
 * @apiParam  {Number} kindsID 商品一级分类ID 可选值
 * @apiParam  {Number} cateID 商品二级分类ID 可选值
 * @apiParam  {Number} pageSize=20 行数 可选值
 * @apiParam  {Number} currentPage=0 页码 可选值
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
exports.getGoodsList = {
  method: 'GET',
  middlewares: [],
  routeDesc: '获取商品列表',
  handle: async function (req, res) {
    const queryParams = {
      searchKey: req.query.searchKey || '',
      pageSize: validator.isIntFormat(req.query.pageSize, { min: 1 }) ? Number.parseInt(req.query.pageSize, 10) : 20,
      currentPage: validator.isIntFormat(req.query.currentPage, { min: 1 }) ? Number.parseInt(req.query.currentPage, 10) : 0,
    };
    queryParams.offset = queryParams.currentPage ? (queryParams.currentPage - 1) * queryParams.pageSize : 0;
    Object.assign(queryParams, req.currentUser || {});
    const goodsResult = await goodsBusiness.getGoodsListLogic(queryParams);
    res.send(new ResJson(goodsResult));
  },
};
/**
 * @api {GET} /api/getgoodsdetail 获取商品详情
 * @apiName getgoodsdetail
 * @apiGroup Goods
 * @apiDescription 商品详情
 *
 * @apiParam  {String} goodsID 商品ID
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
exports.getGoodsDetail = {
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
    res.send(new ResJson(detailData || {}));
  },
};

