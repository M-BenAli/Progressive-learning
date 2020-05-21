let express = require('express')
let router = express.Router()
const Task = require('../models/Task')

router.post('/tasks', async function(req, res){
    if(!req.body.name) {
        return res.status(400).json("No name included in the task object!")
    }

    let task = await Task.create({name: req.body.name,
    completed: req.body.completed});

    res.json(task)
    res.status(200)
})

module.exports = router




