const User = require('../models/User');

exports.createProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT token

    // Check if profile already exists
    let user = await User.findById(userId);
    if (user.profile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    // Create profile
    user.profile = req.body;
    await user.save();

    res.status(201).json({ message: 'Profile created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch user profile
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = user.profile;
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT token

    // Update profile
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profile = req.body;
    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
