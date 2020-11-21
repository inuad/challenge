const express = require('express');
const router = express.Router();

const middlewareAuth = require(`${__dirname}/middlewareAuth`);
const middlewareHelmet = require(`${__dirname}/middlewareHelmet`);
const middlewareMongodb = require(`${__dirname}/middlewareMongodb`);
const middlewareBodyParser = require(`${__dirname}/middlewareBodyParser`);

router.use('/', middlewareAuth);
router.use('/', middlewareHelmet);
router.use('/', middlewareMongodb);
router.use('/', middlewareBodyParser);

module.exports = router;