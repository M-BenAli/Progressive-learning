let express = require('express')
let router = express.Router()
const Task = require('../models/Task')

router.post('/tasks', async function(req, res){
    let task = await Task.create({name: req.body.name,
    completed: req.body.completed});

    res.json(task)
    res.status(200)
})

module.exports = router




