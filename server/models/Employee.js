const User = require('./User');
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const Employee = sequelize.define('employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    CV: {
        type: DataTypes.STRING,
        allowNull: true
    },
    doc1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    doc2: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Employee