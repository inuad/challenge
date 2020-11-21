const express = require('express');
const router = express.Router();
const controllerProfile = require('../controllers/controllerProfile');

router.get('/profile/detail', controllerProfile.getUserProfile);
router.get('/order/list', controllerProfile.getUserOrderList);

router.use('*', (req, res) => res.sendStatus(404));

module.exports = router;