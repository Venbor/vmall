const qiniu = require('qiniu');
const validator = require('../common/validator_extend');
const ResJson = require('../config/ResJson');
const basicBusiness = require('../business/basic_business');
const webConfige = require('../config/config_web.js');
const commonFunc = require('../common/comm_func.js');
/**
 * @api {POST} /api/qiniuuploadtoken 获取七牛上传token
 * @apiGroup Basic
 * @apiParamExample  {Object} 请求示例:
    {
    }
 *
 * @apiSuccessExample {Object} 响应示例:
    {
      "errcode": 0,
      "errmsg": "操作成功",
      "resobj": "lLwJd3cfmBNIScBgm0wW_4npKHiMw8MnCnuKeuh3:cL7AI3sYwkZ0RTnVn-LYunTcXxY=:eyJzY29wZSI6InZtYWxsIiwiZGVhZGxpbmUiOjE1MjU0NTQ2MjV9"
    }
 */
const qiniuUploadToken = {
  url: '/getqiniuuploadtoken',
  method: 'POST',
  middlewares: [],
  routeDesc: '获取七牛上传token',
  handle: async function (req, res) {
    const mac = new qiniu.auth.digest.Mac(webConfige.qiniu.accessKey, webConfige.qiniu.secretKey);
    const options = { scope: webConfige.qiniu.bucketName, expires: 3600 };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    res.send(new ResJson(uploadToken));
  },
};

/**
 * @api {POST} /api/getarealist 获取全国地址
 * @apiGroup Basic
 *
 * @apiParam  {Number} parentID  设置为0时获取全国省份列表
 *
 * @apiParamExample  {Object} 请求示例:
    {
      parentID: 0
    }
 *
 * @apiSuccessExample {Object} 响应示例:
    {
      errcode: 0,
      errmsg: "操作成功",
      resobj: [
       {id: "110000", parentID: 0, name: "北京市", shortName: "北京"}
       {id: "120000", parentID: 0, name: "天津市", shortName: "天津"}
       {id: "130000", parentID: 0, name: "河北省", shortName: "河北"}
      ]
    }
 */
const getAreaList = {
  url: '/getarealist',
  method: 'GET',
  middlewares: [],
  routeDesc: '获取全国地址',
  handle: async function (req, res) {
    const parentID = req.query.parentID;
    if (!validator.isIntFormat(parentID, { min: 0 })) {
      res.send(new ResJson(1, '请求参数有误'));
      return;
    }
    const status = validator.isInt01(req.query.status) ? req.query.status : -1;
    const queryParams = { parentID, status };
    const areaList = await basicBusiness.getAreaListLogic(queryParams);
    res.send(new ResJson(areaList));
  },
};

/**
 * @api {POST} /api/insertaddress 新增地址
 * @apiGroup Basic
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

const insertaddress = {
  url: '/insertaddress',
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
    await basicBusiness.insertAddressLogic(queryParams);
    res.send(new ResJson(''));
  },
};

/**
 * @api {GET} /api/getaddresslist 获取地址列表
 * @apiGroup Basic
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

const getaddresslist = {
  url: '/getaddresslist',
  method: 'GET',
  middlewares: [],
  routeDesc: '获取地址列表',
  handle: async function (req, res) {
    const queryParams = {};
    queryParams.wechatID = req.session.currentUser.wechatID;
    const addressList = await basicBusiness.getAddressListLogic(queryParams);
    res.send(new ResJson(addressList));
  },
};

module.exports = [qiniuUploadToken, getAreaList, insertaddress, getaddresslist];
