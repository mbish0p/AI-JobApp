const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')


const Candidates = sequelize.define('candidates', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = Candidates