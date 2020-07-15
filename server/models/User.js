const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/database');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class User extends Model {
    generateJWToken() {
        const expirationTime = process.env.JWT_EXPIRATION;
        return jwt.sign({
            id: this.id,
            username: this.username,
            admin: this.admin
        }, process.env.JWT_SECRET, {expiresIn: expirationTime});
    }

    static hashPassword(password) {
        const salt = crypto.randomBytes(128).toString('base64');
        const iterations = 10000;
        const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');
        return {
            salt: salt,
            hash: hash
        };
    }
}

module.exports = User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            min: 6
        }
    },
    password_salt: {
        type: DataTypes.STRING,
        unique: true
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    sequelize,
    modelName: 'user'
});
