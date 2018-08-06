const mysqlDB = require('../common/mysql_pool');

// 商品分类
function getGoodsCategorySqlData(queryParams) {
  const sql = `select id,name,banner
  from sys_goodscategory cate
  where status=1`;
  return mysqlDB.queryList(sql, queryParams);
}

// 商品栏目
function getGoodsItemListSqlData(queryParams) {
  const sql = `select id,name,cateID,icon
  from sys_goodsitem
  where cateID=:cateID`;
  return mysqlDB.queryList(sql, queryParams);
}

// 商品列表
function getGoodsListSqlData(queryParams) {
  const sql = `select goodsID,goodsName,gs.goodsImage,guidePrice,salePrice,unit
  from sys_goods gs
  where gs.status=1 and(:searchKey='' or gs.goodsName like concat('%',:searchKey,'%'))`;
  return mysqlDB.queryListForPagination(sql, queryParams);
}

module.exports = {
  getGoodsCategorySqlData,
  getGoodsItemListSqlData,
  getGoodsListSqlData,
};
