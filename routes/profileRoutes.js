const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/createProfile', profileController.createProfile);
router.get('/getProfile/:userId', profileController.getProfile);
router.put('/updateProfile/:userId', profileController.updateProfile);

module.exports = router;
