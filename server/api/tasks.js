let express = require('express');
let router = express.Router();
const Task = require('../models/Task');
const Resource = require('../models/Resource');
const LearningGoal = require('../models/Learning-goal');

router.get('/api/tasks/:id', async function (req, res) {
    const task = await Task.findByPk(req.params.id);

    if (task) {
        return res.status(200).json(task);
    } else if (!task) {
        return res.status(404).json({
            message: 'No task found with that given ID'
        });
    }

});


router.put('/api/tasks/:id', async function (req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            message: 'No name included in the task object!'
        });
    }

    let task = await Task.findByPk(req.params.id, {
        include: {
            model: LearningGoal
        }
    });
    let learningGoal = await task.getLearningGoal();
    console.log(learningGoal);
    console.log(await learningGoal.getTasks({
        where: {
            learningGoalId: learningGoal.id
        }
    }));
    if (task) {
        task.name = req.body.name;
        task.completed = req.body.completed;
        task.summary = req.body.summary;
        await task.save();
        await learningGoal.updateProgress();
        return res.status(200).json(task);
    } else {
        return res.status(404).json({message: 'Task not found'});
    }

});

router.post('/api/tasks', async function (req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            message: 'No name included in the task object!'
        });
    }

    let task = await Task.create({
        name: req.body.name,
        completed: req.body.completed
    });

    res.json(task);
    res.status(200);
});

router.delete('/api/tasks/:id', async function (req, res) {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
        res.status(404).json({
            message: 'No task found with given id.'
        });
    } else {
        await task.destroy();
        res.status(204).json('Deleted task');
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
            }
        });

    await task.addResource(resource[0].id);
    await task.reload({
        include: Resource
    });
    res.status(200).json(task.resources);
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

    if(!task) {
        return res.status(404).json({
            message: 'No task found with given ID'
        });
    } else {
        return res.status(200).json(task.resources);
    }

});

module.exports = router;




