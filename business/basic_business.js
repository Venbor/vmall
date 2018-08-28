const basicDao = require('./basic_dao');
const webConfige = require('../config/config_web.js');

function getAreaListLogic(queryParams) {
  return basicDao.getAreaListSqlData(queryParams);
}

async function getAdDataLogic() {
  const result1 = await basicDao.getAdDataSqlData({ type: 1 });
  const result2 = await basicDao.getAdDataSqlData({ type: 2 });
  result1.forEach((t) => {
    t.imageUrl = `${webConfige.qiniu.qiniuDomain}${t.imageUrl}`;
  });
  result2.forEach((t) => {
    t.imageUrl = `${webConfige.qiniu.qiniuDomain}${t.imageUrl}`;
  });
  const result = {
    bannerList: result1,
    activeList: result2,
  };
  return result;
}

module.exports = {
  getAreaListLogic,
  getAdDataLogic,
};
