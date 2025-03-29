const express = require('express');
const voiceController = require('../controllers/voiceController');

const router = express.Router();

router.post('/voice', voiceController.sendVoiceCall);
router.get('/voice/twiml', voiceController.getVoiceTwiml);

module.exports = router;
