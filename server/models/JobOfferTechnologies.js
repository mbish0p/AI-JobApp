const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')


const JobOfferTechnologies = sequelize.define('job_offer_technologies', {
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
    },
    main_technology: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = JobOfferTechnologies