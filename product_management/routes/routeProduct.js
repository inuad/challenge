const express = require('express');
const router = express.Router();
const controllerProduct = require('../controllers/controllerProduct');

router.get('/product/list',controllerProduct.getList);
router.get('/product/detail/:id',controllerProduct.getDetail);

router.use('*', (req, res) => res.sendStatus(404));

module.exports = router;