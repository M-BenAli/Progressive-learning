const { Sequelize } = require('sequelize');

//Mysql database
module.exports = new Sequelize('progressive_learning', process.env.DB_USER,
    process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
});

// Sqlite database
// module.exports = new Sequelize({
//     dialect: 'sqlite',
//     logging: true
// });

const LearningGoal = require('../models/Learning-goal');
const Task = require('../models/Task');
const Resource = require('../models/Resource');
const User = require('../models/User');
const Subject = require('../models/Subject');

// Sequelize associations
User.learningGoals = User.hasMany(LearningGoal);
User.subjects = User.hasMany(Subject);
LearningGoal.tasks = LearningGoal.hasMany(Task);
LearningGoal.user = LearningGoal.belongsTo(User);
LearningGoal.subject = LearningGoal.belongsTo(Subject, {
    allowNull: true
});
Task.learningGoal = Task.belongsTo(LearningGoal);
Task.resources = Task.belongsToMany(Resource, { through: 'TaskResources' });
Resource.belongsToMany(Task, { through: 'TaskResources' });
Subject.learningGoals = Subject.hasMany(LearningGoal);
Subject.user = Subject.belongsTo(User);
