const express = require('express');
const router = express();
const routeProduct = require('./routeProduct');

router.use('/product-management', routeProduct);

router.use('*', (req, res) => res.sendStatus(404));

module.exports = router;