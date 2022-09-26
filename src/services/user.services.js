require("dotenv").config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/user');

const UNAUTHORIZED = 401;
const HASH = 10;
const BAD_REQUEST = 400;

const JWT_SECRET = process.env.JWT_SECRET;
const AUTHENTICATION_FAILD = 'Authentication failed. Invalid user or password.';
const USER_NOT_FOUND = 'User not found';
const TOKEN_EXPIRED = '30m';

const register = async (req, res) => {
    const { username, password } = req.body;
    let newUser = await new Users({
        _id: mongoose.Types.ObjectId(),
        username: username,
        password: password
    });

    newUser.password = await bcrypt.hash(req.body.password, HASH);

    await newUser.save(function (err, user) {
        if (err) {
            return res.status(BAD_REQUEST)
                .send({
                    message: err
                })
        }

        user.password = undefined;
        return res.send(user);
    })
}

// Sign in
const signIn = async (req, res) => {
    const users = await Users.findOne({
        username: req.body.username
    });

    if (!users) {
        return res.status(BAD_REQUEST)
            .send({
                message: USER_NOT_FOUND,
            })
    }

    if (!users.comparePassword(req.body.password)) {
        return res.status(UNAUTHORIZED).json({ message: AUTHENTICATION_FAILD });
    }

    return res.json({ token: jwt.sign({ _id: users._id, username: users.username, }, JWT_SECRET, { expiresIn: TOKEN_EXPIRED }) });
}

module.exports = { register, signIn }