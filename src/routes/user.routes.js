const express = require('express');
const { register, signIn } = require('../controllers/user.controllers');

const routes = express.Router();
routes.post('/register', register);
routes.post('/sign_in', signIn);

module.exports = routes;