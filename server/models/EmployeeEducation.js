const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')
const Employee = require('./Employee')

const EmployeeEducation = sequelize.define('employee_education', {
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
    school_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    field_of_studies: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = EmployeeEducation