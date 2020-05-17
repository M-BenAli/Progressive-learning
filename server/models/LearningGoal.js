const { DataTypes, Model } =  require('sequelize')
const sequelize = require('../config/database')

class LearningGoal extends Model {}

module.exports = LearningGoal.init({
    goal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    progress: {
        type: DataTypes.DECIMAL(5, 2)
    }
}, {
    sequelize,
    modelName: 'learning-goal'
})




