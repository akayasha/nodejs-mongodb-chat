const express = require('express');
const router = express.Router();
const interestController = require('../controllers/interestController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Add interests to a user
router.post('/interests', async (req, res) => {
    const { interests } = req.body;
    const userId = req.user.id;

    try {
        const message = await interestController.addInterests(userId, interests);
        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Get interests of a user
router.get('/interests', async (req, res) => {
    const userId = req.user.id;

    try {
        const interests = await interestController.getInterests(userId);
        res.status(200).json({ interests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Update interests of a user
router.put('/interests', async (req, res) => {
    const { interests } = req.body;
    const userId = req.user.id;

    try {
        const message = await interestController.updateInterests(userId, interests);
        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Delete interests of a user
router.delete('/interests', async (req, res) => {
    const userId = req.user.id;

    try {
        const message = await interestController.deleteInterests(userId);
        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Delete Interest By Index
router.delete('/interests/:index', async (req, res) => {
    const userId = req.user.id;
    const { index } = req.params;

    try {
        const message = await interestController.deleteInterestByIndex(userId, index);
        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
