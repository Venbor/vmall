const mysqlDB = require('../common/mysql_pool');


function getGoodsListSqlData(queryParams) {
  const sql = `select gs.goodsID,gs.goodsClass,gs.goodsName,gs.goodsIconUrl,gs.guidePrice, gs.salePrice,gs.unit
  from goods gs
  where gs.status=1 and(:searchKey='' or gs.goodsName like concat('%',:searchKey,'%'))`;
  return mysqlDB.queryListForPagination(sql, queryParams);
}
module.exports = {
  getGoodsListSqlData,
};
