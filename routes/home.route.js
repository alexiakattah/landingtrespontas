const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/home.controller');

router.get('/', homeControllers.home);
router.post('/site/cookie-consent', homeControllers.cookieConsent);

module.exports = router;