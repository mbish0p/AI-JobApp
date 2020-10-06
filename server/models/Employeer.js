const User = require('./User');
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const Employeer = sequelize.define('employeer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
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

module.exports = Employeer