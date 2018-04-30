const cartDao = require('./cart_dao');

async function getCartGoodsListLogic(queryParams) {
  return cartDao.getCartGoodsListSqlData(queryParams);
}

module.exports = {
  getCartGoodsListLogic,
};
