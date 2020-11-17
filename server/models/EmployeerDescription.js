const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const EmployeerDescription = sequelize.define('employeer_description', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

module.exports = EmployeerDescription