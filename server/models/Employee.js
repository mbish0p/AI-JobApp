const JobOffer = require('./JobOffer');
const EmployeeEducation = require('./EmployeeEducation');
const EmployeeExperience = require('./EmployeeExperience');
const EmployeeLanguage = require('./EmployeeLanguage');
const EmployeeSkill = require('./EmployeeSkill');
const Candidates = require('./Candidates')
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const Employee = sequelize.define('employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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


Employee.hasMany(Candidates, { foreignKey: 'employeeId', onDelete: 'cascade' })


Employee.hasMany(EmployeeEducation, { foreignKey: 'employeeId', onDelete: 'cascade' })
Employee.hasMany(EmployeeExperience, { foreignKey: 'employeeId', onDelete: 'cascade' })
Employee.hasMany(EmployeeSkill, { foreignKey: 'employeeId', onDelete: 'cascade' })
Employee.hasMany(EmployeeLanguage, { foreignKey: 'employeeId', onDelete: 'cascade' })

module.exports = Employee