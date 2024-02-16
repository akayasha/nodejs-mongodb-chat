const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/viewMessages/:userId', chatController.viewMessages);
router.post('/sendMessage', chatController.sendMessage);

module.exports = router;
