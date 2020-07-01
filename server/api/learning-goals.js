const express = require('express');
const router = express.Router();
const helpers = require('../utils/helpers');
const LearningGoal = require('../models/Learning-goal');
const Task = require('../models/Task');
const User = require('../models/User');
const db = require('../config/database');

// CRUD Learning-goal routes
router.get('/api/learning-goals', async function (req, res) {
    let learningGoals;
    if (req.query.createdby && req.query.createdby === 'Guest') {
        learningGoals = await LearningGoal.findAll({
            where: {
                userId: null
            },
            include: [Task]
        });
    } else {
        learningGoals = await LearningGoal.findAll({
            include: [Task]
        });
    }
    res.status(200).json(learningGoals);
});

router.get('/api/learning-goals/:id', async function (req, res) {
    const learningGoal = await LearningGoal.findByPk(req.params.id, {
        include: [Task, {
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
        console.log(learningGoal.toJSON());
        res.status(200).json(learningGoal);
});

router.put('/api/learning-goals/:id', async function (req, res) {
    let learningGoal = await LearningGoal.findByPk(req.params.id, {
        include: [Task, {
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
        await updateTasks(updatedTasks, learningGoal);
        console.log(learningGoal.toJSON());
        await learningGoal.reload();
        learningGoal.goal = req.body.goal;
        learningGoal.progress = req.body.progress;
        learningGoal.description = req.body.description;
        console.log(learningGoal.toJSON());
        await learningGoal.save();
        res.status(200).json(learningGoal);
    }
});

router.post('/api/learning-goals', async function (req, res) {
    console.log(req.body);
    const user = req.body.user;
    const learningGoal = await LearningGoal.build({
        goal: req.body.goal,
        progress: req.body.progress,
        description: req.body.description,
        tasks: req.body.tasks,
        userId: user ? user.id : null
    }, {
        include: [Task, User]
    });

    console.log(learningGoal.toJSON());
    if (!learningGoal.goal) {
        return res.status(400).json({message: 'No learning goal has been specified!'});
    } else {
        await learningGoal.save();
        res.json(learningGoal.toJSON());
        res.status(200);
    }
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
            message: 'Succesfully deleted learningGoal!'
        });
    } else {
        res.status(400).json({message: 'No learning goal found to delete'});
    }
});

// User-learning goal routes
router.get('/api/users/:id/learning-goals', helpers.isAuth, async function (req, res) {
    const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'email', 'admin', 'createdAt', 'updatedAt']
    });

    if (user) {
        const learningGoals = await user.getLearningGoals({
                include: Task
            });
        res.status(200).json(learningGoals);
    } else {
        res.status(404).json({
            status: 404,
            message: 'User not found!'
        });
    }
});


async function updateTasks(updatedTasks, learningGoal) {
    for (let updatedTask of updatedTasks) {
        if (!updatedTask.id) {
            const task = await Task.build({
                name: updatedTask.name, completed: updatedTask.completed,
                learningGoalId: learningGoal.id
            });
            console.log(task.toJSON());
            await task.save();
            console.log(task.toJSON());
        } else if (updatedTask.id) {
            let task = await Task.findByPk(updatedTask.id);
            task.name = updatedTask.name;
            task.completed = updatedTask.completed;
            await task.save();
        }
    }
}

module.exports = router;