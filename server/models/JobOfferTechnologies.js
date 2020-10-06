const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')
const JobOffer = require('./JobOffer')

const JobOfferTechnologies = sequelize.define('job_offer_technologies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jobOffer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: JobOffer,
            key: 'id',
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    main_technology: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = JobOfferTechnologies