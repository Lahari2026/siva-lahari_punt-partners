const express = require('express');
const router = express.Router();
const { translateText, detectLanguage } = require('../controllers/translateController');

router.post('/text', translateText);
router.post('/detect', detectLanguage);

module.exports = router;
