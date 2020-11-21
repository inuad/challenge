// Pass mongodb object instance to req.db
const express = require('express');
const router = express.Router();

const mongoInstance = require('../modules/mongoInstance');
router.use(mongoInstance(process.env.MONGODB_ECOMMERCE_DB,'ecDB'));

module.exports = router;