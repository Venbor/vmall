const mysqlDB = require('../../common/mysql_pool');


function insertUserWechatSql(insertData, callback) {
  const sql = `insert into cm_member_wechats(unionID,originalID,openID,nickname,headImgUrl,systemName,isAutoLogin,createTime)
  select :unionID,:originalID,:openID,:nickname,:headImgUrl,:systemName,0,now()
  on duplicate key update unionID=:unionID,nickname=:nickname,headImgUrl=:headImgUrl,systemName=:systemName`;

  mysqlDB.execute(sql, insertData, callback);
}


module.exports = {
  insertUserWechatSql,
};
