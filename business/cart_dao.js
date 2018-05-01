const mysqlDB = require('../common/mysql_pool');


function getCartGoodsListSqlData(queryParams) {
  const sql = `select gsc.goodsClass,gsc.goodsID,gsc.bookingNum,gs.goodsName,gs.goodsIconUrl,gs.guidePrice,gs.salePrice,gs.unit
  from member_carts gsc
  join sys_goods gs on gsc.goodsID=gs.goodsID and gs.status=1
  where gsc.operateUser=:operateUser`;

  return mysqlDB.queryList(sql, queryParams);
}

module.exports = {
  getCartGoodsListSqlData,
};
