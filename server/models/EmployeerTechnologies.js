const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');


const EmployeerTechnologies = sequelize.define('employeer_technologies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    main_technology: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = EmployeerTechnologies