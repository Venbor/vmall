const basicDao = require('./basic_dao');

function getAreaListLogic(queryParams) {
  return basicDao.getAreaListSqlData(queryParams);
}

module.exports = {
  getAreaListLogic,
};
