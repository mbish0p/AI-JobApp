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

Employee.hasMany(JobOffer, {
    through: Candidates
})

Employee.hasMany(EmployeeEducation)
Employee.hasMany(EmployeeExperience)
Employee.hasMany(EmployeeSkill)
Employee.hasMany(EmployeeLanguage)

module.exports = Employee