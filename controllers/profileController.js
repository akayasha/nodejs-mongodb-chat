const { response } = require('express');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.createProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from JWT token

        // Find User By ID
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Cek exis profile
        if (user.displayName) {
            return res.status(400).json({ message: 'Profile already exists' });
        }
        if (user.gender) {
            return res.status(400).json({ message: 'Profile already exists' });
        }
        if (user.dateOfBirth) {
            return res.status(400).json({ message: 'Profile already exists' });
        }
        if (user.weight) {
            return res.status(400).json({ message: 'Profile already exists' });
        }
        if (user.height) {
            return res.status(400).json({ message: 'Profile already exists' });
        }
        
    
        // set profile
        user.displayName = req.body.displayName;
        user.gender = req.body.gender;
        user.dateOfBirth = req.body.dateOfBirth;
        user.weight = req.body.weight;
        user.height = req.body.height;

        await user.save();

        res.status(201).json({ message: 'Profile created successfully', profile: user.profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.getSelfProfile = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // cek apakah userId valid
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }
  
      // Fetch user profile
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const profile = user;
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      
      const response = {
        displayName: profile.displayName,
        dateOfBirth: profile.dateOfBirth,
        horoscope: profile.horoscope,
        zodiac: profile.zodiac,
        weight: profile.weight,
        height: profile.height
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };


exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 

    
    // cek is userId valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }

    // Update profile
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.displayName = req.body.displayName;
    user.gender = req.body.gender;
    user.dateOfBirth = req.body.dateOfBirth;
    user.weight = req.body.weight;
    user.height = req.body.height;

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
