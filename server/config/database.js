const { Sequelize } = require('sequelize');

module.exports = new Sequelize('progressive_learning', 'mohamed', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
});

const LearningGoal = require('../models/Learning-goal');
const Task = require('../models/Task');
const Resource = require('../models/resource');

// Sequelize associations
LearningGoal.tasks = LearningGoal.hasMany(Task);
Task.learningGoal = Task.belongsTo(LearningGoal);
Task.resources = Task.belongsToMany(Resource, { through: 'TaskResources' });
Resource.belongsToMany(Task, { through: 'TaskResources' });

// const Summary = require('../models/Summary');
// Summary.task = Summary.belongsTo(Task);
