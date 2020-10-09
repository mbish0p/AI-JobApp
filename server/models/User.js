const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')
const Employee = require('./Employee')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

User.hasOne(Employee, {
    foreignKey: {
        allowNull: false
    }
})

module.exports = User