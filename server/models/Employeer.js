const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const JobOffer = require('./JobOffer');
const User = require('./User');

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
    phone_number: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    company_logo: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

Employeer.hasMany(JobOffer, { foreignKey: 'employeerId', onDelete: 'cascade' })
//Employeer.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' })

module.exports = Employeer