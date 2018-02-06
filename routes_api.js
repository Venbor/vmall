const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth'); // 授权
// 控制层
const account = require('./mvc/controllers/account.js');

router.get('/', auth.userRequired, account.signIn);


module.exports = router;
