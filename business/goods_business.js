const goodsDao = require('./goods_dao');
const cartBusiness = require('./cart_business');

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
  getGoodsListLogic,
  getGoodsDetailLogic,
  getGoodsClassListLogic,
};
