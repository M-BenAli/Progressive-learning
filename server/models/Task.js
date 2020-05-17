const { DataTypes, Model } =  require('sequelize')
const sequelize = require('../config/database')

class Task extends Model {}

module.exports = Task.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
    }
    }, {
    sequelize,
    modelName: 'task'
})


