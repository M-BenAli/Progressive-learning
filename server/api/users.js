const express = require('express');
const router = express.Router();
const User = require('../models/User');
const helpers = require('../utils/helpers');

router.get('/api/users', helpers.isAuth, async function (req, res) {
    const users = User.findAll();
    res.status(200).json(users);
});

router.get('/api/users/:id', helpers.isAuth, async function (req, res) {
    const id = req.params.id;
    const user = await User.findByPk(id, {
        attributes: {
            exclude: ['password', 'password_salt']
        }
    });

    if (!user) {
        res.status(404).json({
            status: 404,
            message: 'User not found'
        });
    } else {
        res.status(200).json(user);
    }

});

router.put('/api/users/:id', helpers.isAuth, async function (req, res) {
    const {email, admin} = req.body;
    let user = await User.findByPk(req.params.id);
    if (user) {
        user.admin = admin;
        user.email = email;
        await user.save().then((r) => {
            console.log(r);
            res.status(200).json(user);
        }).catch((e) => {
            console.log(e);
            res.status(400).json({
                status: 400,
                name: `${e.name}`,
                message: `${e.errors[0].message}`
            });
        });
    } else {
        res.status(400).json({
            message: 'No user found with given ID'
        });
    }
});

router.post('/api/users', async function (req, res) {
    const {username, password, admin} = req.body;
    const passwordHash = User.hashPassword(password);
    const newUser = await User.create({
        username: username,
        password: passwordHash.hash.toString('hex'),
        password_salt: passwordHash.salt,
        admin: admin
    });

    if (newUser) {
        res.status(201).json(newUser);
    } else res.status(400).json({
        message: 'No user created'
    });
});

module.exports = router;