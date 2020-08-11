const { DataTypes, Model } =  require('sequelize');
const sequelize = require('../config/database');

class Resource extends Model {}

module.exports = Resource.init({
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM,
        values: ['Github', 'Wikipedia', 'Youtube', 'Book', 'Scientific paper', 'Article', 'Image'],
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'resource'
});


