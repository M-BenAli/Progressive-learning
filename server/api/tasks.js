let express = require('express');
let router = express.Router();
const Task = require('../models/Task');
const Resource = require('../models/Resource');
const LearningGoal = require('../models/Learning-goal');
const User = require('../models/User');
const helpers = require('../utils/helpers');

router.get('/api/tasks/:id', async function (req, res) {
    const task = await Task.findByPk(req.params.id, {
        include: [{model: LearningGoal, include: [User]}, Resource]
    });

    let authorized;
    if (!task.learningGoal.userId) {
        authorized = true;
    } else authorized = helpers.isAuthorized(task.learningGoal.userId, req.headers.authorization);


    if (!task) {
        return res.status(404).json({
            message: 'No task found with that given ID'
        });
    } else if (!authorized) {
        return res.status(401).json({
            message: 'You are not authorized to access this resource'
        });
    } else return res.status(200).json(task);
});


router.put('/api/tasks/:id', async function (req, res) {
    const {name, completed, summary} = req.body;

    let task = await Task.findByPk(req.params.id, {
        include: {
            model: LearningGoal
        }
    });
    let learningGoal = await task.getLearningGoal();

    if (task) {
        task.name = name;
        task.completed = completed;
        task.summary = summary;
        await task.save();
        console.log(task.toJSON());
        await learningGoal.updateProgress();
        return res.status(200).json(task);
    } else {
        return res.status(404).json({message: 'Task with given ID not found'});
    }

});

router.post('/api/tasks', async function (req, res) {
    const {name, completed, summary} = req.body;

    try {
        let task = await Task.create({
            name: name,
            completed: completed,
            summary: summary
        });
        return res.status(200).json(task);
    } catch (e) {
        return res.status(400).json({
            message: `Error occurred when creating a task: ${e}`
        });
    }

});

router.delete('/api/tasks/:id', async function (req, res) {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: 'No task found with given id.'
        });
    } else {
        await task.destroy();
        return res.status(204).json('Deleted task');
    }

});

router.post('/api/tasks/:id/resources', async function (req, res) {
    const taskID = req.params.id;
    const {url, type} = req.body;

    if (!taskID) {
        return res.status(400).json({
            message: 'No task ID has been included in the request'
        });
    } else if (!url || !type) {
        return res.status(400).json({
            message: 'No resource URL or type has been included in the request'
        });
    }

    const task = await Task.findByPk(taskID, {
        include: Resource
    });
    const resource = await Resource.findOrCreate(
        {
            where: {
                url: url,
                type: type
            },
            defaults: {
                url: url,
                type: type
            }
        });

    await task.addResource(resource[0].id);
    await task.reload({
        include: Resource
    });
    return res.status(200).json(task.resources);
});

router.get('/api/tasks/:id/resources', async function (req, res) {
    const taskID = req.params.id;

    if (!taskID) {
        return res.status(400).json({
            message: 'No task ID has been included in the request'
        });
    }

    const task = await Task.findByPk(taskID, {
        include: Resource
    });

    if (!task) {
        return res.status(404).json({
            message: 'No task found with given ID'
        });
    } else {
        return res.status(200).json(task.resources);
    }

});

module.exports = router;




