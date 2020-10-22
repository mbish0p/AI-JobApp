const EmployeeEducation = require('./EmployeeEducation');
const EmployeeExperience = require('./EmployeeExperience');
const EmployeeSkill = require('./EmployeeSkill');
const Candidates = require('./Candidates')
const EmployeeDocument = require('./EmployeeDocument')
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Employee = sequelize.define('employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phone_number: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    preffered_contract_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    preffered_position: {
        type: DataTypes.STRING,
        allowNull: true
    },
    experience_lvl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    min_salary: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    preffered_salary: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})


Employee.hasMany(Candidates, { foreignKey: 'employeeId', onDelete: 'cascade' })


Employee.hasMany(EmployeeDocument, { foreignKey: 'employeeId', onDelete: 'cascade' })
Employee.hasMany(EmployeeEducation, { foreignKey: 'employeeId', onDelete: 'cascade' })
Employee.hasMany(EmployeeExperience, { foreignKey: 'employeeId', onDelete: 'cascade' })
Employee.hasMany(EmployeeSkill, { foreignKey: 'employeeId', onDelete: 'cascade' })

module.exports = Employee