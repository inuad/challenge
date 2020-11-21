const express = require('express');
const router = express.Router();
const controllerAuth = require('../controllers/controllerAuth');

router.post('/register',controllerAuth.register);
router.post('/login',controllerAuth.login);

router.use('*', (req, res) => res.sendStatus(404));

module.exports = router;