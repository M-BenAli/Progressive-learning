const { Sequelize } = require('sequelize');

// Mysql database
// module.exports = new Sequelize('progressive_learning', process.env.DB_USER,
//     process.env.DB_PASS, {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: console.log
// });

// Sqlite database
module.exports = new Sequelize({
    dialect: 'sqlite',
    logging: console.log
});


const LearningGoal = require('../models/Learning-goal');
const Unit = require('../models/Unit');
const Resource = require('../models/Resource');
const User = require('../models/User');
const Subject = require('../models/Subject');

// Sequelize associations
User.learningGoals = User.hasMany(LearningGoal);
User.subjects = User.hasMany(Subject);
LearningGoal.units = LearningGoal.hasMany(Unit);
LearningGoal.user = LearningGoal.belongsTo(User);
LearningGoal.subject = LearningGoal.belongsTo(Subject, {
    allowNull: true
});
Unit.learningGoal = Unit.belongsTo(LearningGoal);
Unit.resources = Unit.belongsToMany(Resource, { through: 'UnitResources' });
Resource.belongsToMany(Unit, { through: 'UnitResources' });
Subject.learningGoals = Subject.hasMany(LearningGoal);
Subject.user = Subject.belongsTo(User);
