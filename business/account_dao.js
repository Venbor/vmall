const mysqlDB = require('../common/mysql_pool');

// 插入或更新用户
function insertUserWechatSql(insertData, callback) {
  const sql = `insert into member_wechats(unionID,openID,nickname,headImgUrl,createTime)
  values (:unionID,:openID,:nickname,:headImgUrl,now())
  on duplicate key update unionID=:unionID,nickname=:nickname,headImgUrl=:headImgUrl`;

  mysqlDB.execute(sql, insertData, callback);
}

// 获取微信登录信息
function getUserWechatSqlData(queryParams) {
  const sql = `select wechatID,openID,headImgUrl,nickname,kuaiCoin,withdrawCoin
  from member_wechats
  where openID=:openID`;
  return mysqlDB.queryObject(sql, queryParams);
}

// 地址管理，增删改查
function insertAddressSqlData(queryParams) {
  const sql = `insert into member_address(wechatID,contactName,contactMobile,address,
  province,provinceName,city,cityName,district,districtName,createTime)
  values (:wechatID,:contactName,:contactMobile,:address,:province,:provinceName,:city,:cityName,:district,:districtName, now())`;
  return mysqlDB.execute(sql, queryParams);
}

function deleteAddressSqlData(queryParams) {
  const sql = `delete from member_address 
  where addressID=:addressID and wechatID=:wechatID`;
  return mysqlDB.execute(sql, queryParams);
}

function updateAddressSqlData(queryParams) {
  const sql = `update member_address
  set contactName=:contactName,contactMobile=:contactMobile,address=:address,province=:province,provinceName=:provinceName,
  city=:city,cityName=:cityName,district=:district,districtName=:districtName
  where addressID=:addressID and wechatID=:wechatID`;
  return mysqlDB.execute(sql, queryParams);
}

function getAddressDataSqlData(queryParams) {
  const sql = `select addressID,contactName,contactMobile,address,province,provinceName,city,cityName,district,districtName
  from member_address
  where addressID=:addressID and wechatID=:wechatID`;
  return mysqlDB.queryObject(sql, queryParams);
}

function getAddressListSqlData(queryParams) {
  const sql = `select addressID,contactName,contactMobile,address,province,provinceName,city,cityName,district,districtName
  from member_address
  where wechatID=:wechatID`;
  return mysqlDB.queryList(sql, queryParams);
}

module.exports = {
  insertUserWechatSql,
  getUserWechatSqlData,
  insertAddressSqlData,
  getAddressListSqlData,
  deleteAddressSqlData,
  updateAddressSqlData,
  getAddressDataSqlData,
};
