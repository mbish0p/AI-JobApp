const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const EmployeerDocument = sequelize.define('employeer_documents', {
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
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

module.exports = EmployeerDocument