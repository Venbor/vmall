const i18n = require('../config/i18n_cn');
const RetJson = require('../config/retjson');


function userRequired(req, res, next) {
    if (!req.session || !req.session.currentUser) {
        res.status(403).send(new RetJson(i18n.SYS_LOGIN_AUTH_CODE, i18n.SYS_LOGIN_AUTH_ERROR));
        return;
    }
    res.locals.currentUser = req.session.currentUser;
    next();
}
exports.userRequired = userRequired;

