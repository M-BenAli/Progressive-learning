const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const LearningGoal = require('../models/Learning-goal');
const Task = require('../models/Task');
const User = require('../models/User');
const helpers = require('../utils/helpers');

router.post('/api/subjects', async function (req, res) {
    const {name, userId} = req.body;
    if (!name || !userId) {
        res.status(400).json({
            message: 'No name or userID included'
        });
    }

    const subject = await Subject.create({
        name: name,
        userId: userId
    });

    res.status(200).json(subject);

});

router.get('/api/subjects/:id', async function (req, res) {
    const subjectID = req.params.id;
    const subject = await Subject.findByPk(subjectID, {
        include: [
            { model: LearningGoal, include: [Task] }
            ]
    });

    if (!subject) res.status(400).json({
        message: 'No subject found with that given ID'
    });

    res.status(200).json(subject);
});

router.put('/api/subjects/:id', async function (req, res) {
    const subjectID = req.params.id;
    const name = req.name;
    const subject = await Subject.findByPk(subjectID, {});

    if (!subject) res.status(400).json({
        message: 'No subject found with that given ID'
    });
    try {
        subject.name = name;
      await subject.save();
    } catch (e) {
      res.status(500).json({
         message: `Unable to update subject due to error: ${e}`
      });
    }

    res.status(200).json(subject);
});

router.delete('/api/subjects/:id', async function (req, res) {
    const subjectID = req.params.id;
    const subject = await Subject.findByPk(subjectID, {});
    if(subject) {
        try {
            await subject.destroy();
            res.status(200).end();
        } catch (error) {
            res.status(400).json({
                message: 'Unable to delete subject'
            });
        }
    } else {
        res.status(400).json({
            message: 'No subject found with given ID'
        });
    }
});

//User-subjects routes
router.get('/api/users/:id/subjects', helpers.isAuth, async function (req, res) {
    const userID = req.params.id;
    const user = await User.findByPk(userID);

    if (!user) res.status(400).json({
        message: 'No user found with that given ID'
    });

    const subjects = await user.getSubjects({
        include: [LearningGoal]
    });
    res.status(200).json(subjects);

});

module.exports = router;

