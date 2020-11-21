const express = require('express');
const router = express();
const routeProfile = require('./routeProfile');

router.use('/user-management', routeProfile);

router.use('*', (req, res) => res.sendStatus(404));

module.exports = router;