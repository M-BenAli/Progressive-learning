const express = require('express');
const router = express.Router();
const User = require('../models/User');
const helpers = require('../utils/helpers');

router.post('/api/authentication/login', async function (req, res) {
    const {username, password} = req.body;
    let passwordCorrect;
    let user = await User.findOne({
        where: {
            username: username,
        }
    });

    passwordCorrect = user ? helpers.isPasswordCorrect(password, user.password, user.password_salt) : false;

    if (!user || !passwordCorrect) {
        res.status(400).json({
            message: 'Invalid credentials or create an account.'
        });
    } else {
        const token = user.generateJWToken();
        res.set({
            'Authorization': `Bearer ${token}`
        });
        res.setHeader('Access-Control-Expose-Headers', 'Authorization');
        res.status(200).json({
            id: user.id,
            username: user.username,
            admin: user.admin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }
});


router.post('/api/authentication/sign-up', async function (req, res) {
    res.status(400).json({
        message: 'In development'
    });
});


module.exports = router;