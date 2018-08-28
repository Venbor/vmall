const mysqlDB = require('../common/mysql_pool');


function getAreaListSqlData(queryParams) {
  const sql = `select id,parentID,name,shortName
  from ml_areas
  where parentID=:parentID and (:status=-1 or status=:status)`;
  return mysqlDB.queryList(sql, queryParams);
}

function getAdDataSqlData(queryParams) {
  const sql = `select title,imageUrl
  from ml_ad
  where type=:type and status=1
  order by sort`;
  return mysqlDB.queryList(sql, queryParams);
}


module.exports = {
  getAreaListSqlData,
  getAdDataSqlData,
};
