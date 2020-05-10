const { Sequelize } = require('sequelize');

module.exports = new Sequelize('progressive_learning', 'mohamed', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});

const LearningGoal = require('../models/LearningGoal')
const Task = require('../models/Task')

// Sequelize associations
LearningGoal.tasks = LearningGoal.hasMany(Task);
Task.learningGoal = Task.belongsTo(LearningGoal)
