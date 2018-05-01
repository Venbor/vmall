const qiniu = require('qiniu');
const validator = require('../common/validator_extend');
const ResJson = require('../config/ResJson');
const basicBusiness = require('../business/basic_business');
const webConfige = require('../config/config_web.js');

/**
 * @api {POST} /api/qiniuuploadtoken 获取七牛上传token
 * @apiGroup Basic
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
    }
 *
 * @apiSuccessExample {Object} 响应示例:
    {
      errcode: 0,
      errmsg: "操作成功"
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

module.exports = [qiniuUploadToken, getAreaList];
