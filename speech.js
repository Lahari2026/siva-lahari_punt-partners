const express = require('express');
const router = express.Router();
const { speechToText, convertTextToSpeech } = require('../controllers/speechController'); // Updated import

router.post('/recognize', speechToText);
router.post('/synthesize', convertTextToSpeech); // Use the correct function name

module.exports = router;
