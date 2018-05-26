const mysqlDB = require('../common/mysql_pool');

function getGoodsCategorySqlData(queryParams) {
  const sql = `select id,name,banner
  from sys_goodscategory cate
  where status=1`;
  return mysqlDB.queryList(sql, queryParams);
}

function getGoodsItemListSqlData(queryParams) {
  const sql = `select id,name,cateID,icon
  from sys_goodsitem
  where cateID=:cateID`;
  return mysqlDB.queryList(sql, queryParams);
}

function getGoodsListSqlData(queryParams) {
  const sql = `select gs.goodsID,gs.goodsClass,gs.goodsName,gs.goodsIconUrl,gs.guidePrice, gs.salePrice,gs.unit
  from sys_goods gs
  where gs.status=1 and(:searchKey='' or gs.goodsName like concat('%',:searchKey,'%'))`;
  return mysqlDB.queryListForPagination(sql, queryParams);
}

module.exports = {
  getGoodsCategorySqlData,
  getGoodsItemListSqlData,
  getGoodsListSqlData,
};
