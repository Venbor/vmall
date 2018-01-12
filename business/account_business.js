const accountDao = require('../dao/account_dao');

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
