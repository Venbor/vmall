const qiniu = require('qiniu');
// const validator = require('../common/validator_extend');
const ResJson = require('../config/ResJson');
// const accountBusiness = require('../business/account_business');
const config = require('../config/config_web.js');

// exports.getAreaList = {
//   method: 'GET',
//   // middlewares: ['userRequired'],
//   middlewares: [],
//   handler(req, res) {

//     const parentID = req.query.parentID;
//     if (!validator.isIntFormat(parentID, { min: 0 })) {
//       res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.REQUEST_INPUT_DATA_ERROR, []));
//       return;
//     }
//     const status = validator.isInt01(req.query.status) ? req.query.status : -1;
//     const queryParams = { parentID, status };

//     basicBusiness.getAreaListLogic(queryParams, (err, areaList) => {
//       if (err) {
//         global.context.logger.error(
//           req.session.currentUser.userName,
//           'MYSQL',
//           'getAreaList',
//           '获取区域列表出错:',
//           err);
//         res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
//         return;
//       }
//       res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, areaList));
//     });
//   },
// };

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
  handle: async (req, res) => {
    const mac = new qiniu.auth.digest.Mac(config.qiniu.accessKey, config.qiniu.secretKey);
    const options = { scope: config.qiniu.bucketName, expires: 43200 };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    res.send(new ResJson(uploadToken));
    // res.header('Cache-Control', 'max-age=0, private, must-revalidate');
    // res.header('Pragma', 'no-cache');
    // res.json({ uptoken: uploadToken });
  },
};

module.exports = [qiniuUploadToken];
