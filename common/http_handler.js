/**
 * Created by Administrator on 2017/3/17.
 */

const moment = require('moment');
const utility = require('utility');
const urlencode = require('urlencode');
const qs = require('querystring');
const RetJson = require('../../proxy/retjson');
const HttpSuperagent = require('../../proxy/supperagent');
const validator = require('../../lib/common/validator_extend');

function getHttpApiUrl(apiParams, reqPath, reqParams) {

  reqParams[apiParams.apikey.key] = apiParams.apikey.val;
  reqParams[apiParams.timestamp.key] = moment().format(apiParams.timestamp.val);
  reqParams[apiParams.sign.key] = '';

  let gather = '';
  let keysTemp = Object.keys(reqParams);
  keysTemp = keysTemp.filter(k => k !== apiParams.sign.key);
  keysTemp.sort();

  for (const key of keysTemp) {
    gather += `${key}${apiParams.gatherSign}${reqParams[key]}`;
  }

  if (apiParams.gatherMethod === 'both') {
    gather = apiParams.secretkey.val + gather + apiParams.secretkey.val;
  }

  if (apiParams.gatherMethod === 'right') {
    gather += apiParams.secretkey.val;
  }

  gather = apiParams.urlencode ? urlencode(gather) : gather;
  reqParams[apiParams.sign.key] = utility.md5(gather).toUpperCase();

  return `${apiParams.reqBaseUrl}${reqPath}?${qs.stringify(reqParams)}`;
}

function httpApiGetInvoke(apiParams, reqPath, reqParams, callback) {
  const reqUrl = getHttpApiUrl(apiParams, reqPath, reqParams);
  HttpSuperagent.baseHttpGetCall(reqUrl, (err, httpResult) => {
    if (err) {
      callback(err);
      return;
    }
    if (typeof httpResult === 'string' && validator.isJSON(httpResult)) {
      httpResult = JSON.parse(httpResult);
    }

    const returnData = new RetJson(
      httpResult[apiParams.returnFormat.errcode],
      httpResult[apiParams.returnFormat.errmsg],
      httpResult[apiParams.returnFormat.retobj]);
    callback(undefined, returnData);
  });
}

function httpApiPostInvoke(apiParams, reqPath, reqParams, postParams, callback) {
  const reqUrl = getHttpApiUrl(apiParams, reqPath, reqParams);
  HttpSuperagent.baseHttpPostCall(reqUrl, postParams, (err, httpResult) => {
    if (err) {
      callback(err);
      return;
    }
    if (typeof httpResult === 'string' && validator.isJSON(httpResult)) {
      httpResult = JSON.parse(httpResult);
    }

    const returnData = new RetJson(
      httpResult[apiParams.returnFormat.errcode],
      httpResult[apiParams.returnFormat.errmsg],
      httpResult[apiParams.returnFormat.retobj]);
    callback(undefined, returnData);
  });
}

module.exports = {
  httpApiGetInvoke,
  httpApiPostInvoke,
};
