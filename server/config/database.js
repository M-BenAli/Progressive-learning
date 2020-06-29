const { Sequelize } = require('sequelize');

module.exports = new Sequelize('progressive_learning', process.env.DB_USER,
    process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
});

const LearningGoal = require('../models/Learning-goal');
const Task = require('../models/Task');
const Resource = require('../models/resource');
const User = require('../models/User');

// Sequelize associations
LearningGoal.tasks = LearningGoal.hasMany(Task);
Task.learningGoal = Task.belongsTo(LearningGoal);
Task.resources = Task.belongsToMany(Resource, { through: 'TaskResources' });
Resource.belongsToMany(Task, { through: 'TaskResources' });
User.learningGoals = User.hasMany(LearningGoal);
LearningGoal.user = LearningGoal.belongsTo(User);
