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

/* 查询对象语句 sql,params,callback */
const queryObject = async function (...args) {
  const callback = args[args.length - 1];
  try {
    const conn = await getConnection();
    args[args.length - 1] = (err, results) => {
      conn.release();
      const error = err ? (err.message || err) : undefined;
      results = (results && results.length > 0) ? results[0] : undefined;
      callback(error, results);
    };
    conn.query(...args);
  } catch (err) {
    callback(err ? (err.message || err) : undefined);
  }
};
exports.queryObject = queryObject;

/* 查询列表语句 sql, params, callback */
const queryList = async function (...args) {
  const callback = args[args.length - 1];
  try {
    const conn = await getConnection();
    args[args.length - 1] = (err, results) => {
      conn.release();
      const error = err ? (err.message || err) : undefined;
      callback(error, results);
    };
    conn.query(...args);
  } catch (err) {
    callback(err ? (err.message || err) : undefined);
  }
};
exports.queryList = exports.execute = queryList;

/* 查询列表分页语句 sql, params, callback */
const queryListForPagination = async function (sql, params, callback) {
  try {
    const sqlCount = `select count(1) as count from (${sql}) sqltotal`;
    const sqlLimit = (params.hasOwnProperty('offset') && params.pageSize) ? ' limit :offset, :pageSize' : '';
    const [countResult, rowsResult] = await Promise.all([
      new Promise((resolve, reject) => {
        queryObject(sqlCount, params, (err, result) => { err ? reject(err) : resolve(result); });
      }),
      new Promise((resolve, reject) => {
        queryList((sql + sqlLimit), params, (err, result) => { err ? reject(err) : resolve(result); });
      }),
    ]);
    const total = countResult ? countResult.count : 0;
    const result = {
      total: total,
      rows: rowsResult || [],
    };
    callback(undefined, result);
  } catch (err) {
    callback(err ? (err.message || err) : undefined);
  }
};
exports.queryListForPagination = queryListForPagination;

/* mysql事物处理 [{sql:'',paras:'',field:''},...], callback */
const executeTransaction = async function (sqlTasks, callback) {
  try {
    const conn = await getConnection();
    await new Promise((resolve, reject) => { conn.beginTransaction((err) => { err ? reject(err) : resolve(); }) });
    const queryFunc = function (sqlTask) {
      return new Promise((resolve, reject) => {
        conn.query(sqlTask.sql, sqlTask.paras, (err, result) => {
          err ? reject(err) : resolve(result);
        });
      });
    };
    const taskResult = {};
    for (const [key, sqlTask] of sqlTasks.entries()) {
      let result = await queryFunc(sqlTask);
      result = (result && result.length > 0) ? result[0] : undefined;
      taskResult[sqlTask.field ? sqlTask.field : key] = result;
    }
    await new Promise((resolve, reject) => { conn.commit((err) => { err ? reject(err) : resolve(); }) });
    conn.release();
    callback(undefined, taskResult);
  } catch (err) {
    if (conn) {
      try {
        conn.rollback();
      } catch (error) {
        conn.release();
        console.error(error);
      }
    }
    callback(err ? (err.message || err) : undefined);
  }
};
exports.executeTransaction = executeTransaction;
