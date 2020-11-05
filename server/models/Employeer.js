const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const JobOffer = require('./JobOffer');
const EmployeerDescription = require('./EmployeerDescription')
const EmployeerDocument = require('./EmployeerDocument')
const EmployeerTechnologies = require('./EmployeerTechnologies')
const EmployeerOffice = require('./EmployeerOffice')

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
    },
    www: {
        type: DataTypes.STRING,
        allowNull: true
    },
    employee_number: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

})

Employeer.hasMany(JobOffer, { foreignKey: 'employeerId', onDelete: 'cascade' })
Employeer.hasMany(EmployeerDescription, { foreignKey: 'employeerId', onDelete: 'cascade' })
Employeer.hasMany(EmployeerDocument, { foreignKey: 'employeerId', onDelete: 'cascade' })
Employeer.hasMany(EmployeerOffice, { foreignKey: 'employeerId', onDelete: 'cascade' })
Employeer.hasMany(EmployeerTechnologies, { foreignKey: 'employeerId', onDelete: 'cascade' })

//Employeer.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' })

module.exports = Employeer