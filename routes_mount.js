const glob = require('glob');
const auth = require('./config/auth.js'); // 授权中间间
const filesList = glob.sync('./controllers/*.js'); //获取文件列表

function mountRoute(router, options) {
    if (!Array.isArray(filesList)) {
        console.log(`glob读取路由文件失败,返回结果:${filesList}`)
        return router;
    };
    // 验证中间件规格
    function compose(middlewares, url) {
        if (middlewares.filter(f => !Object.keys(auth).includes(f)).length) {
        	console.log(`无效的中间件，路由:'${url}',参数:${JSON.stringify(middlewares)}`);
        	return auth.routeNext;
        }
        if (middlewares.length < 1) {
            return auth.routeNext;
        }
        return middlewares.map(m => auth[m]);
    };
    // 操作文件
    filesList.forEach((filePath) => {
        // 循环引入文件
        const controller = require(filePath);
        if (!Array.isArray(controller)) {
            console.log(`控制器页面导出类型必须为数组，出错路径:${JSON.stringify(controller)}`);
            return router;
        }
        // 循环挂载文件内方法
        controller.forEach((item) => {
            const model = { url: '', method: 'get', middlewares: [], routeDesc: '', handle: '' };
            // 模型赋值
            model.url = item.url || '';
            model.method = (item.method || 'get').toLowerCase();
            model.middlewares = item.middlewares || [];
            model.routeDesc = item.routeDesc || '';
            model.handle = item.handle || function () {};
            router[model.method](model.url, compose(model.middlewares, model.url), model.handle);
        });
    });
    return router;
};

module.exports = mountRoute;