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
        req.session.token = token;
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
        res.end(req.session.token + ' token');
    }
});

router.post('/api/authentication/logout', function (req, res) {
    req.session = null;
    res.status(200).end();
});

//todo create sign-up
router.post('/api/authentication/sign-up', async function (req, res) {
    res.status(400).json({
        message: 'In development'
    });
});

router.get('/api/authentication/session-token', async function (req, res) {
    const token = req.session.token;
    if (token) {
        res.set({
            'Authorization': `Bearer ${token}`
        });
        res.setHeader('Access-Control-Expose-Headers', 'Authorization');
        const payload = helpers.decodeJWToken(token);
        let user = { id: payload.id, username: payload.username, admin: payload.admin };
        user = await User.findByPk(user.id, {
            attributes: {
                exclude: ['password', 'password_salt']
            }
        });
        res.status(200).json({ user: user });
    } else if (!token || req.session.token === null) {
        res.json(null);
    }
});


module.exports = router;