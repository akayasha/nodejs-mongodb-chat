const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/viewMessages', chatController.viewMessages);
router.post('/sendMessage', chatController.sendMessage);

module.exports = router;
