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
    t.goodsPicUrl = t.goodsPicUrl ? `${webConfige.qiniu.qiniuDomain}${t.goodsPicUrl}` : '';
  });
  return result;
}

// 商品详情
async function getGoodsDetailLogic(queryParams) {
  const result = await goodsDao.getGoodsDetailSqlData(queryParams);
  if(result){
    result.bannerUrls = result.bannerUrls ? JSON.parse(result.bannerUrls).map(t => `${webConfige.qiniu.qiniuDomain}${t}`) : [];
  }
  return result;
}

// 商品评价
async function getGoodsCommentsLogic(queryParams) {
  const result = await goodsDao.getGoodsCommentsSqlData(queryParams);
  return result;
}

// 商品规格
async function getGoodsAttributesLogic(queryParams) {
  const result = await goodsDao.getGoodsAttributesSqlData(queryParams);
  return result;
}

module.exports = {
  getGoodsKindsListLogic,
  getGoodsCategoryLogic,
  getGoodsListLogic,
  getGoodsDetailLogic,
  getGoodsCommentsLogic,
  getGoodsAttributesLogic,
};
