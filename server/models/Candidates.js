const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')
const Employee = require('./Employee')
const JobOffer = require('./JobOffer')


const Candidates = sequelize.define('candidates', {
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
    jobOffer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: JobOffer,
            key: 'id',
        }
    }
})

module.exports = Candidates