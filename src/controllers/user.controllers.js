// Call service
const userService = require('../services/user.services');

// Register
const register = async (req, res) => {
    return await userService.register(req, res);
}

// Sign in
const signIn = async (req, res) => {
    return await userService.signIn(req, res);
}

module.exports = { register, signIn };