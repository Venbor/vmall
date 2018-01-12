/**
 * Created by Administrator on 2016/3/3.
 */
const _ = require('lodash');
const i18n = require('../../config/i18n_cn');
const validator = require('../../lib/common/validator_extend');

function buildTreeData(originalData, parentNode) {
    const groupData = _.groupBy(originalData, g => g.parentID);
    for (const key of Object.keys(groupData)) {
        let childNode = parentNode;
        if (`${parentNode.id}` !== `${key}`) {
            childNode = originalData.find(p => `${p.id}` === `${key}`);
        }
        if (childNode) {
            childNode.children = groupData[key];
        }
    }
    return parentNode;
}

function getUserClientIP(req) {
    return req.headers['x-forwarded-for']
        || req.connection.remoteAddress
        || req.socket.remoteAddress;
}

// 检测数据准确性
function _ruleTranFunc(rule, model) {
    const cloneModel = JSON.parse(JSON.stringify(model));
    if (cloneModel.hasOwnProperty('rule')) {
        delete cloneModel.rule;
    }
    if (rule instanceof Array) {
        return rule.map(m => Object.assign((m || {}), cloneModel));
    }
    if (typeof rule === 'string') {
        return rule.split(',').map(m => (Object.assign({ name: m }, cloneModel)));
    }
    return [];
}

function checkRequestData(requestData, models) {
    try {

        models = models.filter(f => (`${(requestData.opt || 'i,u')},*`).indexOf(f.opt || '*') !== -1);

        const propertys = Object.getOwnPropertyNames(requestData);

        // 检测前端必传项
        const transList = models.filter(f => f.required && !propertys.includes(f.field));
        if (transList.length > 0) {
            return [`${transList[0].title}为${i18n.REQUEST_INPUT_FIELD_MUST}`];
        }

        const modelList = models.filter(f => propertys.includes(f.field));

        // 检测必填项
        const requireList = modelList.filter(f => f.required && validator.isNullOrEmpty(requestData[f.field]));
        if (requireList.length > 0) {
            return [`${requireList[0].title}${i18n.REQUEST_INPUT_DATA_EMPTY + (requireList[0].msg ? `，${requireList[0].msg}` : '')}`];
        }

        let accuracyList = modelList.filter(f => !validator.isNullOrEmpty(requestData[f.field]) && (f.rule || []).length > 0);
        accuracyList = accuracyList.map(m => ({
            rules: _ruleTranFunc(m.rule, m),
        }));

        if (accuracyList.every(f => f.rules.length === 0)) {
            return [`${i18n.MODELS_UNDEFIND_FIELD}`];
        }

        accuracyList = _.flattenDeep(accuracyList.map(m => m.rules));
        accuracyList = accuracyList.filter(f => !(f.opt
            ? validator[f.name](requestData[f.field], f.opt)
            : validator[f.name](requestData[f.field])));

        if (accuracyList.length > 0) {
            return [`${accuracyList[0].title}${i18n.REQUEST_INPUT_DATA_ERROR + (accuracyList[0].msg ? `，${accuracyList[0].msg}` : '')}`];
        }

    } catch (err) {
        return [err ? (err.message || err) : undefined];
    }
    return [undefined, requestData];
}

function checkRequestDataBool(requestData, models) {
    try {
        const propertys = Object.getOwnPropertyNames(requestData);

        // 检测前端必传项
        const transList = models.filter(f => f.required && !propertys.includes(f.field));
        if (transList.length > 0) {
            return false;
        }

        const modelList = models.filter(f => propertys.includes(f.field));

        // 检测必填项
        const requireList = modelList.filter(f => f.required && validator.isNullOrEmpty(requestData[f.field]));
        if (requireList.length > 0) {
            return false;
        }

        let accuracyList = modelList.filter(f => !validator.isNullOrEmpty(requestData[f.field]) && (f.rule || []).length > 0);
        accuracyList = accuracyList.map(m => ({
            rules: _ruleTranFunc(m.rule, m),
        }));

        if (accuracyList.every(f => f.rules.length === 0)) {
            return false;
        }

        accuracyList = _.flattenDeep(accuracyList.map(m => m.rules));
        accuracyList = accuracyList.filter(f => !(f.opt
            ? validator[f.name](requestData[f.field], f.opt)
            : validator[f.name](requestData[f.field])));

        if (accuracyList.length > 0) {
            return false;
        }
    } catch (err) {
        return false;
    }
    return true;
}


function isWechatBrowser(userAgent) {
    return (userAgent || '').toString().toLowerCase().indexOf('micromessenger') !== -1;
}

// 数组相加
function mathSum(arr) {
    return arr.reduce((prev, current) => prev + Number.parseFloat(current), 0);
}

function generateRandomAlphaNum(len) {
    let val = '';
    Array.from({ length: len }).forEach(() => {
        val += '0123456789'.charAt(Number.parseInt((Math.random() * 10).toString(), 10));
    });
    return val;
}


function getPromise(cb) {
    return new Promise(function (resolve, reject) {
        cb();
        resolve(123);
    });
}

function asyncFunc(cb) {
    async function () {
        try {

            // console.log('start');
            // await sleep(3000); // 这里得到了一个返回错误
            //
            // // 所以以下代码不会被执行了
            // console.log('end');
        } catch (err) {
            console.log(err); // 这里捕捉到错误 `error`
        }
    }
}


module.exports = {
    buildTreeData,
    getUserClientIP,
    checkRequestData,
    checkRequestDataBool,
    isWechatBrowser,
    mathSum,
    generateRandomAlphaNum,
};
