const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('./server/db/sequelize')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


(async () => {
    await sequelize.sync({ force: true });
    console.log("The table for the User model was just (re)created!");
})()

app.use('/api/dialogflow', require('./server/routes/dialogflow'));

app.get('/', async (req, res) => {
    try {
        res.send({});
    } catch (error) {
        res.send('Unable to connect to the database:', error);
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
