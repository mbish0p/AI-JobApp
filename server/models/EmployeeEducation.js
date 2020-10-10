const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const EmployeeEducation = sequelize.define('employee_education', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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