let express = require('express')
let router = express.Router()
const LearningGoal = require('../models/LearningGoal')
const Task = require('../models/Task')
const db = require('../config/database')

router.get('/api/learning-goals', async function (req, res) {
    const learningGoals = await LearningGoal.findAll({
        include: {
            model: Task,
            required: true
        }
    })
    res.json(learningGoals)
})

router.get('/api/learning-goals/:id', async function (req, res) {
    const learningGoal = await LearningGoal.findByPk(req.params.id, {
        include: {
            model: Task,
            required: true
        }
    })

    if (!learningGoal) {
        res.status(400).json({msg: "No learning goal found with that ID"})
        res.end()
    } else
        console.log(learningGoal.toJSON())
    res.status(200).json(learningGoal)
});

router.put('/api/learning-goals/:id', async function (req, res) {
    let learningGoal = await LearningGoal.findByPk(req.params.id, {
        include: [Task]
    })

    let tasks = []
    let updatedTasks = req.body.tasks
    for (let i = 0; i < updatedTasks.length; i++) {
        let updatedTask = updatedTasks[i]
        if(!updatedTask.id){
            let task = await Task.create({ name: updatedTask.name, completed: updatedTask.completed,
            learningGoalId: learningGoal.id})
            tasks.push(task)
        } else {
            let task = await Task.findByPk(updatedTask.id)
            task.name = updatedTask.name
            task.completed = updatedTask.completed
            task.save()
            tasks.push(task)
        }
    }

    // tasks.forEach(task => console.log(task.toJSON()))
    if (!learningGoal || learningGoal.goal == null) {
        res.status(400).json({msg: "No learning goal found with that ID!"})
    } else {
        learningGoal.goal = req.body.goal
        learningGoal.progress = req.body.progress
        learningGoal.description = req.body.description
        learningGoal.tasks = tasks
        console.log(learningGoal.toJSON())
        await learningGoal.save()
        res.status(200).json(learningGoal)
    }
});

router.post('/api/learning-goals', async function (req, res) {
    console.log(req.body);
    const learningGoal = LearningGoal.build({
        goal: req.body.goal,
        progress: req.body.progress, description: req.body.description,
        tasks: req.body.tasks
    }, {
        include: [Task]
    });

    console.log(learningGoal.toJSON())
    if (!learningGoal.goal) {
        return res.status(400).json({msg: 'Please include a learning goal'})
    } else {
        await learningGoal.save()
        res.json(learningGoal.toJSON())
        res.status(200)
    }
});


router.delete('/api/learning-goals/:id', async function (req, res) {
    const learningGoal = await LearningGoal.findByPk(req.params.id, {
        include: [Task]
    })
    const tasks = learningGoal.tasks
    console.log(learningGoal.toJSON())
    for (let i = 0; i < tasks.length; i++) {
        let task = await Task.findByPk(tasks[i].id)
        task.destroy()
    }

    if (!learningGoal) {
        res.json({msg: "No learning goal found to delete"})
        res.status(400)
    } else
        learningGoal.destroy()
    res.json(learningGoal)
    res.status(200)
})

module.exports = router