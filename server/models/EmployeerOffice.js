const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');


const EmployeerOffice = sequelize.define('employeer_offices', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    office_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = EmployeerOffice