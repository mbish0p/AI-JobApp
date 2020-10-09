const User = require('./User');
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const JobOffer = require('./JobOffer')

const Employeer = sequelize.define('employeer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nip: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    company_logo: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

Employeer.belongsTo(User)
Employeer.hasMany(JobOffer)


module.exports = Employeer