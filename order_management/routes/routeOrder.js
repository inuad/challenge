const express = require('express');
const router = express.Router();
const controllerOrder = require('../controllers/controllerOrder');

router.post('/order/checkout',controllerOrder.orderCheckout);
router.post('/order/cancel',controllerOrder.orderCancel);
router.get('/order/detail/:id',controllerOrder.orderDetail);

router.use('*', (req, res) => res.sendStatus(404));

module.exports = router;