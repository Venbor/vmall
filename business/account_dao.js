const mysqlDB = require('../common/mysql_pool');

// 插入或更新用户
function insertUserWechatSql(insertData, callback) {
  const sql = `insert into ml_user_wechat(unionID,openID,nickname,headImgUrl,createTime)
  values (:unionID,:openID,:nickname,:headImgUrl,now())
  on duplicate key update unionID=:unionID,nickname=:nickname,headImgUrl=:headImgUrl`;

  mysqlDB.execute(sql, insertData, callback);
}

// 获取用户信息
function getUserWechatSqlData(queryParams) {
  const sql = `select uw.userID,uw.unionID,uw.openID,uw.nickname,uw.headImgUrl,uw.realname,uw.mobile,
  ua.balance,ua.integral,ua.earnings,ua.totalEarnings
  from ml_user_wechat uw left join ml_user_account ua on uw.userID = ua.userID
  where openID=:openID`;
  return mysqlDB.queryObject(sql, queryParams);
}

// 地址管理，增删改查
function insertAddressSqlData(queryParams) {
  const sql = `insert into ml_user_address(userID,contactName,contactMobile,address,
  province,provinceName,city,cityName,district,districtName,createTime)
  values (:userID,:contactName,:contactMobile,:address,:province,:provinceName,:city,:cityName,:district,:districtName, now())`;
  return mysqlDB.execute(sql, queryParams);
}

function deleteAddressSqlData(queryParams) {
  const sql = `delete from ml_user_address 
  where addressID=:addressID and userID=:userID`;
  return mysqlDB.execute(sql, queryParams);
}

function updateAddressSqlData(queryParams) {
  const sql = `update ml_user_address
  set contactName=:contactName,contactMobile=:contactMobile,address=:address,province=:province,provinceName=:provinceName,
  city=:city,cityName=:cityName,district=:district,districtName=:districtName
  where addressID=:addressID and userID=:userID`;
  return mysqlDB.execute(sql, queryParams);
}

function getAddressDataSqlData(queryParams) {
  const sql = `select addressID,contactName,contactMobile,address,province,provinceName,city,cityName,district,districtName
  from ml_user_address
  where addressID=:addressID and userID=:userID`;
  return mysqlDB.queryObject(sql, queryParams);
}

function getAddressListSqlData(queryParams) {
  const sql = `select addressID,isDefault,contactName,contactMobile,address,province,provinceName,city,cityName,district,districtName
  from ml_user_address
  where userID=:userID`;
  return mysqlDB.queryList(sql, queryParams);
}

// 更新默认地址
function updateAddressDefaultSqlData(queryParams) {
  const sqlTasks = [];
  const updateNoDefaultSql = 'update ml_user_address set isDefault=0 where userID=:userID';
  const updateSetDefaultSql = 'update ml_user_address set isDefault=1 where userID=:userID and addressID=:addressID';
  sqlTasks.push({ field: 'noDefault', sql: updateNoDefaultSql, paras: queryParams });
  sqlTasks.push({ field: 'setDefault', sql: updateSetDefaultSql, paras: queryParams });
  return mysqlDB.executeTransaction(sqlTasks);
}

// 获取默认地址
function getDefaultAddressDataSqlData(queryParams) {
  const sql = `select addressID,contactName,contactMobile,address,province,provinceName,city,cityName,district,districtName
  from ml_user_address
  where userID=:userID and isDefault=1`;
  return mysqlDB.queryObject(sql, queryParams);
}

module.exports = {
  insertUserWechatSql,
  getUserWechatSqlData,
  insertAddressSqlData,
  getAddressListSqlData,
  deleteAddressSqlData,
  updateAddressSqlData,
  getAddressDataSqlData,
  updateAddressDefaultSqlData,
  getDefaultAddressDataSqlData,
};
