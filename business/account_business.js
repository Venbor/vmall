const accountDao = require('./account_dao');

// 插入/更新用户信息
async function insertUserWechatLogic(insertData, callback) {
  accountDao.insertUserWechatSql(insertData, callback);
}

// 获取用户信息
async function getUserWechatDataLogic(queryParams) {
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

// 更新默认地址
function updateAddressDefaultLogic(queryParams) {
  return accountDao.updateAddressDefaultSqlData(queryParams);
}

// 获取默认地址
function getDefaultAddressDataLogic(queryParams) {
  return accountDao.getDefaultAddressDataSqlData(queryParams);
}


module.exports = {
  insertUserWechatLogic,
  getUserWechatDataLogic,
  insertAddressLogic,
  getAddressListLogic,
  deleteAddressLogic,
  updateAddressLogic,
  getAddressDataLogic,
  updateAddressDefaultLogic,
  getDefaultAddressDataLogic,
};
