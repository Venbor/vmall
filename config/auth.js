const RetJson = require('./RetJson');

//验证登录
function userRequired(req, res, next) {
    if (!req.session || !req.session.currentUser) {
        res.status(403).send(new RetJson(0, '您还未登录系统，请先登录'));
        return;
    }
    res.locals.currentUser = req.session.currentUser;
    next();
}
exports.userRequired = userRequired;
// 跳过验证
function routeNext(req, res, next) {
    next();
}
exports.routeNext = routeNext;