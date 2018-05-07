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

function deleteAddressLogic(queryParams) {
  return basicDao.deleteAddressSqlData(queryParams);
}

function updateAddressLogic(queryParams) {
  return basicDao.updateAddressSqlData(queryParams);
}

function getAddressDataLogic(queryParams) {
  return basicDao.getAddressDataLogic(queryParams);
}


module.exports = {
  getAreaListLogic,
  insertAddressLogic,
  getAddressListLogic,
  deleteAddressLogic,
  updateAddressLogic,
  getAddressDataLogic,
};
