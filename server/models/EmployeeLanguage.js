const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const EmployeeLanguage = sequelize.define('employee_language', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = EmployeeLanguage