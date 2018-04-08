const utility = require('utility');

const accountDao = require('../dao/account_dao');

/**
 * 通过用户名获取用户信息
 * 请求参数:
 "userName": "用户名",
 "status": "状态"
 *
 */
function getUserLoginLogic(queryParams, callback) {
    co(function* () {
        const nameKeyConfig = yield cb1 => global.context.getPropertymapNameKey(['UCROLEID'], cb1);
        Object.assign(queryParams, { roleID: nameKeyConfig.UCROLEID.SALEMAN, systemName: staticConfig.wechatBaseConfig.systemName });
        const userResult = yield cb1 => accountDao.getUserDataByUserNameSql(queryParams, cb1);
        if (!userResult) {
            callback(new RetJson(i18n.SYS_ERROR_CODE, i18n.USER_LOGIN_INPUT_ERROR));
            return;
        }

        if (utility.md5(queryParams.password) !== userResult.password) {
            callback(new RetJson(i18n.SYS_ERROR_CODE, i18n.USER_LOGIN_INPUT_ERROR));
            return;
        }
        delete userResult.password;
        callback(undefined, userResult);
    }).catch(callback);
}





// function getUserWechatSqlData(queryParams, callback) {
//
//   const sql = `select wechatID,openID,isAutoLogin
//   from cm_member_wechats
//   where openID=:openID and systemName=:systemName`;
//
//     mysqlDB.queryObject(sql, queryParams, callback);
// }


/**
 * 通过openID获取用户微信信息
 * 请求参数:
 "openID": "openID"
 *
 */
function getUserWechatDataLogic(queryParams, callback) {
    accountDao.getUserWechatSqlData(queryParams, callback);
}

module.exports = {
    getUserWechatDataLogic,
};
