const mysqlDB = require('../common/mysql_pool');


// 商品一级分类
function getGoodsKindsListSqlData(queryParams) {
  const sql = `select id,name,imageUrl
  from ml_goods_kinds
  where status=1
  order by sort`;
  return mysqlDB.queryList(sql, queryParams);
}

// 商品二级分类
function getGoodsCategorySqlData(queryParams) {
  const sql = `select cateID,kindsID,name,imageUrl
  from ml_goods_category cate
  where cate.status=1 and cate.kindsID=:kindsID
  order by sort`;
  return mysqlDB.queryList(sql, queryParams);
}

// 商品列表
function getGoodsListSqlData(queryParams) {
  const sql = `select ifnull(gs.goodsIconUrl,'') goodsIconUrl,goodsID,goodsName,guidePrice,salePrice,unit
  from ml_goods gs
  where gs.status=1 and(:searchKey='' or gs.goodsName like concat('%',:searchKey,'%'))
  order by sort`;
  return mysqlDB.queryListForPagination(sql, queryParams);
}

// 商品详情
function getGoodsDetailSqlData(queryParams) {
  const sql = `select ifnull(gs.goodsDesc,'') goodsDesc,ifnull(gs.goodsSpec,'') goodsSpec,ifnull(gs.goodsPicUrls,'') goodsPicUrls,
  goodsID,goodsName,salesCount,guidePrice,salePrice,unit,stock
  from ml_goods gs
  where gs.goodsID=:goodsID`;
  return mysqlDB.queryObject(sql, queryParams);
}

module.exports = {
  getGoodsCategorySqlData,
  getGoodsKindsListSqlData,
  getGoodsListSqlData,
  getGoodsDetailSqlData,
};
