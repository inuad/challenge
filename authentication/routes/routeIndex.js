const express = require('express');
const router = express();
const routeAuth = require('./routeAuth');

router.use('/auth', routeAuth);

router.use('*', (req, res) => res.sendStatus(404));

module.exports = router;