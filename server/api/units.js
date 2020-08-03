let express = require('express');
let router = express.Router();
const Unit = require('../models/Unit');
const Resource = require('../models/Resource');
const LearningGoal = require('../models/Learning-goal');
const User = require('../models/User');
const helpers = require('../utils/helpers');

router.get('/api/units/:id', async function (req, res) {
    const unit = await Unit.findByPk(req.params.id, {
        include: [{model: LearningGoal, include: [User]}, Resource]
    });

    let authorized;
    if (!unit.learningGoal.userId) {
        authorized = true;
    } else authorized = helpers.isAuthorized(unit.learningGoal.userId, req.headers.authorization);


    if (!unit) {
        return res.status(404).json({
            message: 'No unit found with that given ID'
        });
    } else if (!authorized) {
        return res.status(401).json({
            message: 'You are not authorized to access this resource'
        });
    } else return res.status(200).json(unit);
});


router.put('/api/units/:id', async function (req, res) {
    const {name, completed, summary} = req.body;

    let unit = await Unit.findByPk(req.params.id, {
        include: {
            model: LearningGoal
        }
    });
    let learningGoal = await unit.getLearningGoal();

    if (unit) {
        unit.name = name;
        unit.completed = completed;
        unit.summary = summary;
        await unit.save();
        console.log(unit.toJSON());
        await learningGoal.updateProgress();
        return res.status(200).json(unit);
    } else {
        return res.status(404).json({message: 'Unit with given ID not found'});
    }

});

router.post('/api/units', async function (req, res) {
    const {name, completed, summary} = req.body;

    try {
        let unit = await Unit.create({
            name: name,
            completed: completed,
            summary: summary
        });
        return res.status(200).json(unit);
    } catch (e) {
        return res.status(400).json({
            message: `Error occurred when creating a unit: ${e}`
        });
    }

});

router.delete('/api/units/:id', async function (req, res) {
    const unit = await Unit.findByPk(req.params.id);

    if (!unit) {
        return res.status(404).json({
            message: 'No unit found with given id.'
        });
    } else {
        await unit.destroy();
        return res.status(204).json('Deleted unit');
    }

});

router.post('/api/units/:id/resources', async function (req, res) {
    const unitID = req.params.id;
    const {url, type} = req.body;

    if (!unitID) {
        return res.status(400).json({
            message: 'No unit ID has been included in the request'
        });
    } else if (!url || !type) {
        return res.status(400).json({
            message: 'No resource URL or type has been included in the request'
        });
    }

    const unit = await Unit.findByPk(unitID, {
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

    await unit.addResource(resource[0].id);
    await unit.reload({
        include: Resource
    });
    return res.status(200).json(unit.resources);
});

router.get('/api/units/:id/resources', async function (req, res) {
    const unitID = req.params.id;

    if (!unitID) {
        return res.status(400).json({
            message: 'No unit ID has been included in the request'
        });
    }

    const unit = await Unit.findByPk(unitID, {
        include: Resource
    });

    if (!unit) {
        return res.status(404).json({
            message: 'No unit found with given ID'
        });
    } else {
        return res.status(200).json(unit.resources);
    }

});

module.exports = router;




