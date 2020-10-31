const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')
const Employee = require('./Employee')
const JobOfferTechnologies = require('./JobOfferTechnologies')
const Candidates = require('./Candidates')

const JobOffer = sequelize.define('job_offer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    experience_lvl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    street: {
        type: DataTypes.STRING,
        allowNull: true
    },
    remote_work: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    contract_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    min_salary: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    max_salary: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    education: {
        type: DataTypes.STRING,
        allowNull: true
    },
    online_interview: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})
JobOffer.hasMany(JobOfferTechnologies, { foreignKey: 'jobOfferId', onDelete: 'cascade' })
JobOffer.hasMany(Candidates, { foreignKey: 'jobOfferId', onDelete: 'cascade' })


module.exports = JobOffer
