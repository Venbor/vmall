const accountBusiness = require('../business/account_business');

/**
 *
 * @api {POST} /signin 登录
 * @apiName signin
 *
 */
function signIn(req, res) {
    global.logger.info('USER', 'signIn', '用户登录');
    accountBusiness.getUserWechatDataLogic({ customerID: 103 }, (err, result) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(result);
    });
}

module.exports = {
    signIn,
};
