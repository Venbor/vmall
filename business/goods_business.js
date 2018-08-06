const goodsDao = require('./goods_dao');
const webConfige = require('../config/config_web.js');

// 商品分类
async function getGoodsCategoryLogic(queryParams) {
  const result = await goodsDao.getGoodsCategorySqlData(queryParams);
  result.forEach((t) => {
    t.banner = t.banner ? `${webConfige.qiniu.qiniuDomain}${t.banner}` : '';
  });
  return result;
}

// 商品栏目
async function getGoodsItemListLogic(queryParams) {
  const result = await goodsDao.getGoodsItemListSqlData(queryParams);
  result.forEach((t) => {
    t.icon = t.icon ? `${webConfige.qiniu.qiniuDomain}${t.icon}` : '';
  });
  return result;
}

// 商品列表
async function getGoodsListLogic(queryParams) {
  const result = await goodsDao.getGoodsListSqlData(queryParams);
  result.rows.forEach((t) => {
    t.goodsImage = t.goodsImage ? `${webConfige.qiniu.qiniuDomain}${t.goodsImage}` : '';
  });
  return result;
}

// 商品详情
function getGoodsDetailLogic(queryParams) {
  return goodsDao.getGoodsDetailSqlData(queryParams);
}

module.exports = {
  getGoodsCategoryLogic,
  getGoodsItemListLogic,
  getGoodsListLogic,
  getGoodsDetailLogic,
};
