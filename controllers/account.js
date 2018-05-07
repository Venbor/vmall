// const validator = require('../common/validator_extend');
const ResJson = require('../config/ResJson');
const accountBusiness = require('../business/account_business');
const commonFunc = require('../common/comm_func.js');

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

/**
 * @api {POST} /api/insertaddress 新增收货地址
 * @apiGroup Account
 *
 * @apiParam  {String} contactName  联系人姓名
 * @apiParam  {Number} contactMobile  电话号码
 * @apiParam  {Number} fullAddress  详细地址
 * @apiParam  {Number} provinceName  省份名称
 * @apiParam  {Number} province  省份id
 * @apiParam  {Number} cityName  城市名称
 * @apiParam  {Number} city  城市id
 * @apiParam  {Number} districtName  区域名称
 * @apiParam  {Number} district 区域id
 *
 * @apiParamExample  {Object} 请求示例:
    {
    "contactName":"小林子",
    "contactMobile":"18990119010",
    "province":"110000",
    "provinceName":"北京市",
    "city":"110100",
    "cityName":"北京市",
    "district":"110101",
    "districtName":"东城区",
    "address":"宝龙小区11号"
    }
 *
 * @apiSuccessExample {Object} 响应示例:
    {
      errcode: 0,
      errmsg: "操作成功",
      resobj: '',
    }
 */

exports.insertAddress = {
  method: 'POST',
  middlewares: [],
  routeDesc: '新增地址',
  handle: async function (req, res) {
    const queryParams = req.body;
    queryParams.wechatID = req.session.currentUser.wechatID;
    const ruleResult = commonFunc.checkData(queryParams, {
      wechatID: { title: '登录ID', required: true },
      contactName: { title: '联系人姓名', required: true },
      contactMobile: { title: '电话号码', required: true },
      address: { title: '详细地址', required: true },
      provinceName: { title: '省份名称', required: true },
      province: { title: '省份id', required: true },
      cityName: { title: '城市名称', required: true },
      city: { title: '城市id', required: true },
      districtName: { title: '区域名称', required: true },
      district: { title: '区域id', required: true },
    });
    if (ruleResult.length > 0) {
      res.send(new ResJson(1, ruleResult[0].errmsg));
      return;
    }
    await accountBusiness.insertAddressLogic(queryParams);
    res.send(new ResJson(''));
  },
};

/**
 * @api {GET} /api/getaddresslist 收货地址列表
 * @apiGroup Account
 *
 * @apiParamExample  {Object} 请求示例:
    {
    }
 *
 * @apiSuccessExample {Object} 响应示例:
    {
      errcode: 0,
      errmsg: "操作成功",
      resobj: [],
    }
 */

exports.getAddressList = {
  method: 'GET',
  middlewares: [],
  routeDesc: '收货地址列表',
  handle: async function (req, res) {
    const queryParams = {};
    queryParams.wechatID = req.session.currentUser.wechatID;
    const addressList = await accountBusiness.getAddressListLogic(queryParams);
    res.send(new ResJson(addressList));
  },
};

/**
 * @api {POST} /api/deleteaddress 删除收货地址
 * @apiGroup Account
 *
 * @apiParam  {Number} addressID  地址ID
 *
 * @apiParamExample  {Object} 请求示例:
    {
      addressID: 10
    }
 *
 * @apiSuccessExample {Object} 响应示例:
    {
      errcode: 0,
      errmsg: "操作成功",
      resobj: '',
    }
 */

exports.deleteAddress = {
  method: 'POST',
  middlewares: [],
  routeDesc: '删除收货地址',
  handle: async function (req, res) {
    const queryParams = {
      addressID: req.body.addressID || '',
      wechatID: req.session.currentUser.wechatID,
    };
    await accountBusiness.deleteAddressLogic(queryParams);
    res.send(new ResJson(''));
  },
};

/**
 * @api {POST} /api/updataaddress 更新收货地址
 * @apiGroup Account
 *
 * @apiParam  {Number} addressID  地址ID
 * @apiParam  {String} contactName  联系人姓名
 * @apiParam  {Number} contactMobile  电话号码
 * @apiParam  {Number} fullAddress  详细地址
 * @apiParam  {Number} provinceName  省份名称
 * @apiParam  {Number} province  省份id
 * @apiParam  {Number} cityName  城市名称
 * @apiParam  {Number} city  城市id
 * @apiParam  {Number} districtName  区域名称
 * @apiParam  {Number} district 区域id
 *
 * @apiParamExample  {Object} 请求示例:
    {
    "addressID": 110,
    "contactName":"小林子",
    "contactMobile":"18990119010",
    "province":"110000",
    "provinceName":"北京市",
    "city":"110100",
    "cityName":"北京市",
    "district":"110101",
    "districtName":"东城区",
    "address":"宝龙小区11号"
    }
 *
 * @apiSuccessExample {Object} 响应示例:
    {
      errcode: 0,
      errmsg: "操作成功",
      resobj: '',
    }
 */

exports.updateAddress = {
  method: 'POST',
  middlewares: [],
  routeDesc: '更新地址信息',
  handle: async function (req, res) {

    const queryParams = req.body;
    queryParams.wechatID = req.session.currentUser.wechatID;
    const ruleResult = commonFunc.checkData(queryParams, {
      addressID: { title: '地址ID', required: true },
      wechatID: { title: '登录ID', required: true },
      contactName: { title: '联系人姓名', required: true },
      contactMobile: { title: '电话号码', required: true },
      address: { title: '详细地址', required: true },
      provinceName: { title: '省份名称', required: true },
      province: { title: '省份id', required: true },
      cityName: { title: '城市名称', required: true },
      city: { title: '城市id', required: true },
      districtName: { title: '区域名称', required: true },
      district: { title: '区域id', required: true },
    });
    if (ruleResult.length > 0) {
      res.send(new ResJson(1, ruleResult[0].errmsg));
      return;
    }
    await accountBusiness.updateAddressLogic(queryParams);
    res.send(new ResJson(''));
  },
};

/**
 * @api {GET} /api/getaddressdata 获取地址信息
 * @apiGroup Account
 *
 * @apiParam  {Number} addressID  地址ID
 *
 * @apiParamExample  {Object} 请求示例:
    {
      addressID: 10
    }
 *
 *
 * @apiSuccessExample {Object} 响应示例:
    {
      errcode: 0,
      errmsg: "操作成功",
      resobj: {},
    }
 */

exports.getAddressData = {
  method: 'GET',
  middlewares: [],
  routeDesc: '获取收货地址信息',
  handle: async function (req, res) {
    const queryParams = {
      addressID: req.query.addressID || '',
      wechatID: req.session.currentUser.wechatID,
    };
    const addressData = await accountBusiness.getAddressDataLogic(queryParams);
    res.send(new ResJson(addressData));
  },
};
