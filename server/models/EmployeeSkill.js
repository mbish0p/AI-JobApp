const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const EmployeeSkill = sequelize.define('employee_skill', {
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

module.exports = EmployeeSkill