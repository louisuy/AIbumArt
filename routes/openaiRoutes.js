const express = require('express');
const {generateImage} = require('../controllers/openaiController')
const router = express.Router();

router.post('/generateimage', generateImage);
// router.post('/text', generateText);

module.exports = router;