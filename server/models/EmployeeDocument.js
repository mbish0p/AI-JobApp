const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const EmployeeDocument = sequelize.define('employee_documents', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = EmployeeDocument