const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require('./server/db/sequelize')

const User = require('./server/models/User')
User.sync().then(() => {
    console.log('Succesful synchronized user table')
}).catch((error) => {
    console.log('Something went wrong with synchronized user table', error)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/dialogflow', require('./server/routes/dialogflow'));

app.get('/', async (req, res) => {
    try {
        const user = await User.create({
            name: "Dawid",
            surname: "Duda",
            password: 'haslo',
            email: 'dupa@dupa.dupa',
        })
        await user.save()
        res.send(user);
    } catch (error) {
        res.send('Unable to connect to the database:', error);
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
