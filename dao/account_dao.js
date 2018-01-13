const mysqlDB = require('../common/mysql_pool');


// function getUserWechatSqlData(queryParams, callback) {
//     const sql = `select customerName,customerID,customerFullName,saleman
//     from cm_collection_customers`;
//     mysqlDB.queryListForPagination(sql, queryParams, callback);
// }
function getUserWechatSqlData(queryParams, callback) {
    // const sql = 'select customerName,customerID,customerFullName,saleman from cm_collection_customers where customerID=:customerID';

    const sqlTasks = [];
    const orderSql = `update cm_collection_customers set customerName=:customerName where customerID=:customerID`;
    const orderStatusRecordSql = `delete from cm_collection_customers where customerID=110`;

    sqlTasks.push({ sql: orderSql, paras: {customerName: '110事物并且删除110', customerID: 100} });
    sqlTasks.push({ sql: orderStatusRecordSql, paras: {} });

    mysqlDB.executeTransaction(sqlTasks,callback);
}



module.exports = {
    getUserWechatSqlData,
};
