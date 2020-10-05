const { Sequelize } = require('sequelize')


const sequelize = new Sequelize('AI-JobApp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize