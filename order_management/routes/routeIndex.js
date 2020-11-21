const express = require('express');
const router = express();
const routeOrder = require('./routeOrder');

router.use('/order-management', routeOrder);

router.use('*', (req, res) => res.sendStatus(404));

module.exports = router;