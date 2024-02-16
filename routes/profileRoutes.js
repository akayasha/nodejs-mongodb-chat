const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/createProfile', profileController.createProfile);
router.get('/getProfile/:userId', profileController.getSelfProfile);
router.put('/updateProfile/:userId', profileController.updateProfile);

module.exports = router;
