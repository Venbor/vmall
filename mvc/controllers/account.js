const validator = require('../../common/validator_extend');
const RetJson = require('../../config/RetJson');
const i18n = require('../../config/i18n_cn');
// 逻辑层
const accountBusiness = require('../business/account_business');
/**
 *
 * @api {POST} /signin 登录
 * @apiParam  {String} userName 登录账号或工号
 * @apiParam  {String} password 密码
 * @apiParamExample  {Object} 请求示例:
 {
   userName : 15176700000,
   password : 12345
 }
 *
 * */

function signIn(req, res) {
    const queryParams = req.body;
    if (!(validator.isLength(`${queryParams.userName}`, {min:2,max:20}) && validator.isLength(`${queryParams.password}`, {min:2,max:20}))) {
        res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.USER_LOGIN_INPUT_ERROR, null));
        return;
    }
    queryParams.openID = req.session && req.session.currentUser ? req.session.currentUser.openID : '';
    queryParams.openID = queryParams.openID || req.session.openID;
    queryParams.status = 1;

    accountBusiness.getUserLoginLogic(queryParams, (err, userResult) => {
        if (err) {
            if (!err.hasOwnProperty('errcode')) {
                global.context.logger.error(
                    queryParams.userName,
                    'MYSQL',
                    'signIn',
                    '用户登录错误：',
                    err);
                res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE));
                return;
            }
            global.context.logger.warn(
                queryParams.userName,
                'USER',
                'signIn',
                '用户登录失败：',
                `ERROR_CODE: ${err.errcode}，ERROR_MESSAGE: ${err.errmsg}`);
            res.send(err);
            return;
        }

        global.context.logger.info(
            queryParams.userName,
            'USER',
            'signIn',
            '用户登录成功:',
            userResult);

        delete req.session.openID;
        res.locals.currentUser = req.session.currentUser = userResult;
        res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE));
    });
}

module.exports = {
    signIn,
};
