const mysqlDB = require('../common/mysql_pool');


function getAreaListSqlData(queryParams) {
  const sql = `select id,parentID,name,shortName
  from sys_areas
  where parentID=:parentID and (:status=-1 or status=:status)`;
  return mysqlDB.queryList(sql, queryParams);
}

function insertAddressSqlData(queryParams) {
  const sql = `insert into member_address(wechatID,contactName,contactMobile,address,
  province,provinceName,city,cityName,district,districtName,createTime)
  values (:wechatID,:contactName,:contactMobile,:address,:province,:provinceName,:city,:cityName,:district,:districtName, now())`;
  return mysqlDB.execute(sql, queryParams);
}

function getAddressListSqlData(queryParams) {
  const sql = `select addressID,contactName,contactMobile,address,province,provinceName,city,cityName,district,districtName
  from member_address
  where wechatID=:wechatID`;
  return mysqlDB.queryList(sql, queryParams);
}

function deleteAddressSqlData(queryParams) {
  const sql = `delete from member_address 
  where addressID=:addressID and wechatID=:wechatID`;
  return mysqlDB.execute(sql, queryParams);
}

function updateAddressLogic(queryParams) {
  const sql = `update from member_address
  set contactName=:contactName,contactMobile=:contactMobile,address=:address,province=:province,provinceName=:provinceName,
  city=:city,cityName=:cityName,district=:district,districtName=:districtName
  where addressID=:addressID and wechatID=:wechatID`;
  return mysqlDB.execute(sql, queryParams);
}

function getAddressDataLogic(queryParams) {
  const sql = `select addressID,contactName,contactMobile,address,province,provinceName,city,cityName,district,districtName
  from member_address
  where addressID=:addressID and wechatID=:wechatID`;
  return mysqlDB.queryObject(sql, queryParams);
}


module.exports = {
  getAreaListSqlData,
  insertAddressSqlData,
  getAddressListSqlData,
  deleteAddressSqlData,
  updateAddressLogic,
  getAddressDataLogic,
};
