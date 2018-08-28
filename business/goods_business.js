const goodsDao = require('./goods_dao');
const webConfige = require('../config/config_web.js');

// 商品一级分类
async function getGoodsKindsListLogic() {
  const result = await goodsDao.getGoodsKindsListSqlData();
  result.forEach((t) => {
    t.imageUrl = t.imageUrl ? `${webConfige.qiniu.qiniuDomain}${t.imageUrl}` : '';
  });
  return result;
}

// 商品二级分类
async function getGoodsCategoryLogic(queryParams) {
  const result = await goodsDao.getGoodsCategorySqlData(queryParams);
  result.forEach((t) => {
    t.imageUrl = t.imageUrl ? `${webConfige.qiniu.qiniuDomain}${t.imageUrl}` : '';
  });
  return result;
}

// 商品列表
async function getGoodsListLogic(queryParams) {
  const result = await goodsDao.getGoodsListSqlData(queryParams);
  result.rows.forEach((t) => {
    t.goodsIconUrl = t.goodsIconUrl ? `${webConfige.qiniu.qiniuDomain}${t.goodsIconUrl}` : '';
  });
  return result;
}

// 商品详情
async function getGoodsDetailLogic(queryParams) {
  const result = await goodsDao.getGoodsDetailSqlData(queryParams);
  if(result){
    result.goodsPicUrls = result.goodsPicUrls ? JSON.parse(result.goodsPicUrls).map(t => `${webConfige.qiniu.qiniuDomain}${t}`) : [];
  }
  return result;
}

module.exports = {
  getGoodsKindsListLogic,
  getGoodsCategoryLogic,
  getGoodsListLogic,
  getGoodsDetailLogic,
};
