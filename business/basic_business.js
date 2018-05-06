const basicDao = require('./basic_dao');

function getAreaListLogic(queryParams) {
  return basicDao.getAreaListSqlData(queryParams);
}

function insertAddressLogic(queryParams) {
  return basicDao.insertAddressSqlData(queryParams);
}

function getAddressListLogic(queryParams) {
  return basicDao.getAddressListSqlData(queryParams);
}

module.exports = {
  getAreaListLogic,
  insertAddressLogic,
  getAddressListLogic,
};
