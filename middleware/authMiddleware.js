const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    // Get Token from header req
    const token = req.header('Authorization');

    // check token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, config.secret);

        // Add user from token to request
        req.user = decoded.user;

        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
