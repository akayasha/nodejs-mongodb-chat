const express = require('express');
const router = express.Router();
const interestController = require('../controllers/interestController');

// Add interests to a user
router.post('/:userId/interests', async (req, res) => {
    const { userId } = req.params;
    const { interests } = req.body;

    try {
        const message = await interestController.addInterests(userId, interests);
        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Get interests of a user
router.get('/:userId/interests', async (req, res) => {
    const { userId } = req.params;

    try {
        const interests = await interestController.getInterests(userId);
        res.status(200).json({ interests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Update interests of a user
router.put('/:userId/interests', async (req, res) => {
    const { userId } = req.params;
    const { interests } = req.body;

    try {
        const message = await interestController.updateInterests(userId, interests);
        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Delete interests of a user
router.delete('/:userId/interests', async (req, res) => {
    const { userId } = req.params;

    try {
        const message = await interestController.deleteInterests(userId);
        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
