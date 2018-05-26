const basicDao = require('./basic_dao');
const webConfige = require('../config/config_web.js');

function getAreaListLogic(queryParams) {
  return basicDao.getAreaListSqlData(queryParams);
}

async function getAdDataLogic() {
  const result1 = await basicDao.getAdDataSqlData({ adType: 1 });
  const result2 = await basicDao.getAdDataSqlData({ adType: 2 });
  result1.forEach((t) => {
    t.adImage = `${webConfige.qiniu.qiniuDomain}${t.adImage}`;
  });
  result2.forEach((t) => {
    t.adImage = `${webConfige.qiniu.qiniuDomain}${t.adImage}`;
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
