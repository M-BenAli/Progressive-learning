const express = require('express');
const router = express.Router();
const LearningGoal = require('../models/Learning-goal');
const Task = require('../models/Task');
const db = require('../config/database');

router.get('/api/learning-goals', async function (req, res) {
    const learningGoals = await LearningGoal.findAll({
        include: {
            model: Task
        }
    });
    res.status(200).json(learningGoals);
});

router.get('/api/learning-goals/:id', async function (req, res) {
    const learningGoal = await LearningGoal.findByPk(req.params.id, {
        include: {
            model: Task
        }
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
        include: [Task]
    });

    let updatedTasks = req.body.tasks;
    updatedTasks.forEach(task => console.log(task));
    await updateTasks(updatedTasks, learningGoal);

    await learningGoal.reload();
    console.log(learningGoal.toJSON());
    if (!learningGoal || learningGoal.goal == null) {
        res.status(400).json({message: 'No learning goal found with that ID!'});
    } else {
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
    const learningGoal = LearningGoal.build({
        goal: req.body.goal,
        progress: req.body.progress,
        description: req.body.description,
        tasks: req.body.tasks
    }, {
        include: [Task]
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
    for(let task of tasks) {
        task = await Task.findByPk(tasks[i].id);
        task.destroy();
    }

    if (!learningGoal) {
        res.status(400).json({message: 'No learning goal found to delete'});
    } else
        learningGoal.destroy();
    res.json(learningGoal);
    res.status(200);
});


async function updateTasks(updatedTasks, learningGoal){
    for (let updatedTask of updatedTasks) {
        if(!updatedTask.id){
            const task = await Task.build({ name: updatedTask.name, completed: updatedTask.completed,
                learningGoalId: learningGoal.id } );
            console.log(task.toJSON());
            await task.save();
            console.log(task.toJSON());
        } else if(updatedTask.id){
            let task = await Task.findByPk(updatedTask.id);
            task.name = updatedTask.name;
            task.completed = updatedTask.completed;
            await task.save();
        }
    }
}

module.exports = router;