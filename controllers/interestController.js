const User = require('../models/User');

// Function to add interests to a user
exports.addInterests = async (userId, interests) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.interests = interests;
        await user.save();

        return 'Interests updated successfully';
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
};

// Function to get interests of a user
exports.getInterests = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return user.interests;
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
};

// Function to update interests of a user
exports.updateInterests = async (userId, interests) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.interests = interests;
        await user.save();

        return 'Interests updated successfully';
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
};

// Function to delete interests of a user
exports.deleteInterests = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.interests = [];
        await user.save();

        return 'Interests deleted successfully';
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
};
