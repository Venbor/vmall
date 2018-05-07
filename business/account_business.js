const accountDao = require('./account_dao');

// 用户管理

function insertUserWechatLogic(insertData, callback) {
  accountDao.insertUserWechatSql(insertData, callback);
}

function getUserWechatDataLogic(queryParams) {
  return accountDao.getUserWechatSqlData(queryParams);
}

// 地址管理，增删改查

function insertAddressLogic(queryParams) {
  return accountDao.insertAddressSqlData(queryParams);
}

function deleteAddressLogic(queryParams) {
  return accountDao.deleteAddressSqlData(queryParams);
}

function updateAddressLogic(queryParams) {
  return accountDao.updateAddressSqlData(queryParams);
}

function getAddressDataLogic(queryParams) {
  return accountDao.getAddressDataSqlData(queryParams);
}

function getAddressListLogic(queryParams) {
  return accountDao.getAddressListSqlData(queryParams);
}


module.exports = {
  insertUserWechatLogic,
  getUserWechatDataLogic,
  insertAddressLogic,
  getAddressListLogic,
  deleteAddressLogic,
  updateAddressLogic,
  getAddressDataLogic,
};
