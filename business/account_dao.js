const mysqlDB = require('../common/mysql_pool');


function insertUserWechatSql(insertData, callback) {
  const sql = `insert into member_wechats(unionID,openID,nickname,headImgUrl,createTime)
  values (:unionID,:openID,:nickname,:headImgUrl,now())
  on duplicate key update unionID=:unionID,nickname=:nickname,headImgUrl=:headImgUrl`;

  mysqlDB.execute(sql, insertData, callback);
}


module.exports = {
  insertUserWechatSql,
};
