const qiniu = require('qiniu');
const validator = require('../common/validator_extend');
const ResJson = require('../config/ResJson');
const basicBusiness = require('../business/basic_business');
const webConfige = require('../config/config_web.js');


/**
 * @api {POST} /qiniuuploadtoken 获取七牛上传token
 * @apiName qiniuuploadtoken
 * @apiGroup Basic
 * @apiVersion  1.0.0
 *
 * @apiParamExample  {Object} 请求示例:
    {
    }
 *
 * @apiSuccessExample {Object} 响应示例:
    HTTP/1.1 200 OK
    {
    }
 *
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

// 获取全国地址
const getAreaList = {
  url: '/getarealist',
  method: 'GET',
  middlewares: [],
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
