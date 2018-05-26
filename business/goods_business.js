const goodsDao = require('./goods_dao');
const cartBusiness = require('./cart_business');
const webConfige = require('../config/config_web.js');

async function getGoodsCategoryLogic(queryParams) {
  const result = await goodsDao.getGoodsCategorySqlData(queryParams);
  result.forEach((t) => {
    t.banner = t.banner ? `${webConfige.qiniu.qiniuDomain}${t.banner}` : '';
  });
  return result;
}

async function getGoodsItemListLogic(queryParams) {
  const result = await goodsDao.getGoodsItemListSqlData(queryParams);
  result.forEach((t) => {
    t.icon = t.icon ? `${webConfige.qiniu.qiniuDomain}${t.icon}` : '';
  });
  return result;
}

async function getGoodsListLogic(queryParams) {
  const goodsList = await goodsDao.getGoodsListSqlData(queryParams);
  const cartGoodsList = await cartBusiness.getCartGoodsListLogic(queryParams);
  goodsList.rows.forEach((g) => {
    const cartGoods = cartGoodsList.find(c => c.goodsID === g.goodsID && c.goodsClassID === g.goodsClassID);
    g.bookingNum = cartGoods ? cartGoods.bookingNum : 0;
  });
  if (queryParams.key) {
    Object.assign(goodsList, { key: queryParams.key });
  }

  return goodsList;
}


function getGoodsDetailLogic(queryParams) {
  return goodsDao.getGoodsDetailSqlData(queryParams);
}

function getGoodsClassListLogic(queryParams) {
  return goodsDao.getGoodsClassListSqlData(queryParams);
}


module.exports = {
  getGoodsCategoryLogic,
  getGoodsItemListLogic,
  getGoodsListLogic,
  getGoodsDetailLogic,
  getGoodsClassListLogic,
};
