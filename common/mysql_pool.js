const mysql = require('mysql');
const config = require('../config/config_web');

const mysqlPool = mysql.createPool(config.mysqlConfig);

// 查询转义格式函数
function queryFormat(query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, ((txt, key) => {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }));
}

// 获取连接池连接
function getConnection() {
  return new Promise((resolve, reject) => {
    mysqlPool.getConnection((err, conn) => {
      if (err) return reject(err);
      conn.config.queryFormat = queryFormat;
      resolve(conn);
    });
  });
}

// 快速转换promise对象
function queryPromisify(fn, conn, reserve) {
  return (...args) => new Promise((resolve, reject) => {
    fn.apply(conn, [...args, (err, res) => {
      if (!reserve) { conn.release(); }
      if (err) {
        reject(err);
        return;
      };
      resolve(res);
    }]);
  });
};

/* 查询对象语句 sql,params */
const queryObject = async function (...args) {
  const conn = await getConnection();
  const results = await queryPromisify(conn.query, conn)(...args);
  return (results && results.length > 0) ? results[0] : undefined;
}
exports.queryObject = queryObject;

/* 查询列表语句 sql, params */
const queryList = async function (...args) {
    const conn = await getConnection();
    const results = await queryPromisify(conn.query, conn)(...args);
    return results;
}
exports.queryList = exports.execute = queryList;

/* 查询列表分页语句 sql, params */
const queryListForPagination = async function (sql, params) {
  const sqlCount = `select count(1) as count from (${sql}) sqltotal`;
  const sqlLimit = (params.hasOwnProperty('offset') && params.pageSize) ? ' limit :offset, :pageSize' : '';
  const [countResult, rowsResult] = await Promise.all([
    queryObject(sqlCount, params),
    queryList((sql + sqlLimit), params)
  ]);
  const total = countResult ? countResult.count : 0;
  return { total: total, rows: rowsResult || [] };
}
exports.queryListForPagination = queryListForPagination;

/* mysql事物处理 [{sql:'',paras:'',field:''},...] */
const executeTransaction = async function (sqlTasks) {
  try {
    const conn = await getConnection();
    await queryPromisify(conn.beginTransaction, conn, true)();
    const taskResult = {};
    for (const [key, sqlTask] of sqlTasks.entries()) {
      let result = await queryPromisify(conn.query, conn, true)(sqlTask.sql, sqlTask.paras);
      result = (result && result.length > 0) ? result[0] : undefined;
      taskResult[sqlTask.field ? sqlTask.field : key] = result;
    }
    await queryPromisify(conn.commit, conn)();
    return taskResult;
  } catch (err) {
    console.log(err);
    try {
      conn.rollback();
    } catch (error) {
      conn.release();
      global.logger.debug(`事物回滚出错:${error}`); // 记录错误日志
    }
    throw new Error(err)
  }
}
exports.executeTransaction = executeTransaction;
