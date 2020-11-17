const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')
const Employee = require('./Employee')
const Employeer = require('./Employeer')


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
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    refresh_tokens: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isEmployeer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

User.Employee = User.hasOne(Employee, { foreignKey: 'userId', onDelete: 'cascade' })
User.Employeer = User.hasOne(Employeer, { foreignKey: 'userId', onDelete: 'cascade' })

module.exports = User