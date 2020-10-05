const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const { Sequelize } = require('sequelize')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/dialogflow', require('./server/routes/dialogflow'));

const sequelize = new Sequelize('AI-JobApp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

app.get('/', async (req, res) => {

    try {
        await sequelize.authenticate();
        res.send('Connection has been established successfully.');
    } catch (error) {
        res.send('Unable to connect to the database:', error);
    }


})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
