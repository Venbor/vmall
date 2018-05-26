const mysqlDB = require('../common/mysql_pool');


function getAreaListSqlData(queryParams) {
  const sql = `select id,parentID,name,shortName
  from sys_areas
  where parentID=:parentID and (:status=-1 or status=:status)`;
  return mysqlDB.queryList(sql, queryParams);
}

function getAdDataSqlData(queryParams) {
  const sql = `select id,adTitle,adImage
  from sys_ad
  where adType=:adType and status=1`;
  return mysqlDB.queryList(sql, queryParams);
}


module.exports = {
  getAreaListSqlData,
  getAdDataSqlData,
};
