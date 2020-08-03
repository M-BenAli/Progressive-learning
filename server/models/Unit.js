const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/database');

class Unit extends Model {
}

module.exports = Unit.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
    },
    summary: {
        type: DataTypes.TEXT({length: 'long'})
    }
}, {
    sequelize,
    modelName: 'unit'
});
