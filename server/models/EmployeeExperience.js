const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')
const Employee = require('./Employee')

const EmployeeExperience = sequelize.define('employee_experience', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'id',
        }
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

module.exports = EmployeeExperience