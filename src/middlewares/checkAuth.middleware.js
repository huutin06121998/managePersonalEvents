require("dotenv").config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_INVALID = 'Invalid Token';
const UNAUTHORIZED = 401;

// Verify token
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
            jwt.verify(token, JWT_SECRET, function (err, decoded) {
                if (err) req.user = undefined;
                req.user = decoded;
            })
        }
        next();
    } catch (error) {
        next();
    }
}

// Check users
const checkUser = async (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        return res.status(UNAUTHORIZED).json({ message: TOKEN_INVALID });
    }
}

module.exports = { verifyToken, checkUser };