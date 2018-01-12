const express = require('express');
const router = express.Router();
const account = require('./controllers/account.js');

router.get('/', account.signIn);

module.exports = router;
