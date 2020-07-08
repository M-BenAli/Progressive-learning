const { DataTypes, Model } =  require('sequelize');
const sequelize = require('../config/database');

class Subject extends Model {}

module.exports = Subject.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'subject'
});


