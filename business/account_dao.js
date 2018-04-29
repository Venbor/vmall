const mysqlDB = require('../common/mysql_pool');


function insertUserWechatSql(insertData, callback) {
  const sql = `insert into member_wechats(unionID,openID,nickname,headImgUrl,createTime)
  values (:unionID,:openID,:nickname,:headImgUrl,now())
  on duplicate key update unionID=:unionID,nickname=:nickname,headImgUrl=:headImgUrl`;

  mysqlDB.execute(sql, insertData, callback);
}

function getUserWechatSqlData(queryParams) {

  const sql = `select wechatID,openID,headImgUrl,nickname
  from member_wechats
  where openID=:openID`;

  return mysqlDB.queryObject(sql, queryParams);
}

module.exports = {
  insertUserWechatSql,
  getUserWechatSqlData,
};
