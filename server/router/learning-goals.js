let express = require('express')
let router = express.Router()
const staticLearningGoals = require('../static-repository/Learning-goals');


router.get('/api/learning-goals', function (req, res) {
    res.json(staticLearningGoals)
});

router.get('/api/learning-goals/:id', function(req, res) {
    const learningGoal = staticLearningGoals.find(lg => lg.id == req.params.id);
    console.log(learningGoal);

    if(!learningGoal) {
        res.status(400).json({msg: "No learning goal found with that ID" });
        res.end();
    } else
        res.json(learningGoal);
    res.status(200)
});

router.put('/api/learning-goals/:id', function(req, res) {
    let learningGoal = staticLearningGoals.find(lg => lg.id == req.params.id);
    let index = staticLearningGoals.indexOf(learningGoal)
    learningGoal = {
        id: learningGoal.id,
        goal: req.body.goal,
        progress: req.body.progress,
        tasks: req.body.tasks,
        description: req.body.description,
    };

    if(!learningGoal || !learningGoal.goal){
        res.status(400);
        res.end();
    } else
        staticLearningGoals[index] = learningGoal;
    res.json(learningGoal)
    res.status(200)
});

router.post('/api/learning-goals', function (req, res) {
    console.log(req.body);
    const newLearningGoal = {
        id: req.body.id,
        goal: req.body.goal,
        tasks: req.body.tasks,
        progress: req.body.progress,
        description: req.body.description
    };

    if (!newLearningGoal.goal) {
        return res.status(400).json({msg: 'Please include a learning goal'})
    } else {
        staticLearningGoals.push(newLearningGoal);
        res.json(staticLearningGoals);
        res.status(200);
    }
});


router.delete('/api/learning-goals/:id', function(req, res) {
    const learningGoal = staticLearningGoals.find(lg => lg.id == req.params.id);
    let lgArray = staticLearningGoals.filter(lg => lg.id != req.params.id);

    if(!learningGoal) {
        res.json({msg: "No learning goal found to delete"});
        res.status(400)
    } else
        res.json(lgArray);
    res.status(200)
});

module.exports = router;