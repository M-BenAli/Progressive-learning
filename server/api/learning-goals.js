const express = require('express');
const router = express.Router();
const helpers = require('../utils/helpers');
const LearningGoal = require('../models/Learning-goal');
const Task = require('../models/Task');
const Subject = require('../models/Subject');
const User = require('../models/User');

// CRUD Learning-goal routes
router.get('/api/learning-goals', async function (req, res) {
    let learningGoals;
    if (req.query.createdby && req.query.createdby === 'Guest') {
        learningGoals = await LearningGoal.findAll({
            where: {
                userId: null
            },
            include: [Task, Subject]
        });
    } else {
        learningGoals = await LearningGoal.findAll({
            include: [Task, Subject]
        });
    }
    res.status(200).json(learningGoals);
});

router.get('/api/learning-goals/:id', async function (req, res) {
    const learningGoal = await LearningGoal.findByPk(req.params.id, {
        include: [Task, Subject, {
            model: User,
            attributes: {
                exclude: ['password', 'password_salt']
            }
        }]
    });

    if (!learningGoal) {
        res.status(400).json({message: 'No learning goal found with that ID'});
        res.end();
    } else
    res.status(200).json(learningGoal);
});

router.put('/api/learning-goals/:id', async function (req, res) {
    let learningGoal = await LearningGoal.findByPk(req.params.id, {
        include: [Task, Subject, {
            model: User,
            attributes: {
                exclude: ['password', 'password_salt']
            }
        }]
    });

    if (!learningGoal || learningGoal.goal == null) {
        res.status(400).json({message: 'No learning goal found with that ID!'});
    } else {
        let updatedTasks = req.body.tasks;
        updatedTasks.forEach(task => console.log(task));
        await learningGoal.updateTasks(updatedTasks);
        console.log(learningGoal.toJSON());
        await learningGoal.reload();
        learningGoal.goal = req.body.goal;
        learningGoal.progress = req.body.progress;
        learningGoal.description = req.body.description;
        await learningGoal.save();
        res.status(200).json(learningGoal);
    }
});

router.post('/api/learning-goals', async function (req, res) {
    const {goal, progress, description, tasks, subject, user} = req.body;
    console.log(req.body);

    if (!goal) {
        return res.status(400).json({message: 'No learning goal has been specified!'});
    }

    let learningGoal = await LearningGoal.create({
        goal: goal,
        progress: progress,
        description: description,
        tasks: tasks,
        subjectId: subject ? subject.id : null,
        userId: user ? user.id : null
    }, {
        include: [Task]
    });

    learningGoal = await LearningGoal.findByPk(learningGoal.id, {
        include: [ Task, Subject, User]
    });

    console.log(learningGoal.toJSON(), await learningGoal.getSubject());
    res.json(learningGoal);
    res.status(200).end();
});


router.delete('/api/learning-goals/:id', async function (req, res) {
    const learningGoal = await LearningGoal.findByPk(req.params.id, {
        include: [Task]
    });
    const tasks = learningGoal.tasks;
    console.log(learningGoal.toJSON());
    for (let task of tasks) {
        task = await Task.findByPk(task.id);
        task.destroy();
    }
    await learningGoal.reload();
    await learningGoal.updateProgress();

    if (learningGoal) {
        await learningGoal.destroy();
        res.status(204).json({
            message: 'Successfully deleted learningGoal'
        });
    } else {
        res.status(400).json({message: 'No learning goal found to delete'});
    }
});

// User-learning goal routes
router.get('/api/users/:userId/learning-goals', helpers.isAuth, async function (req, res) {
    const user = await User.findByPk(req.params.userId, {
        attributes: ['id', 'email', 'admin', 'createdAt', 'updatedAt']
    });

    if (user) {
        const learningGoals = await user.getLearningGoals({
            include: [Task, Subject]
        });
        res.status(200).json(learningGoals);
    } else {
        res.status(404).json({
            status: 404,
            message: 'User not found!'
        });
    }
});


module.exports = router;
