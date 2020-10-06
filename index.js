const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const Employeer = require('./server/models/Employeer')
Employeer.sync().then(() => {
    console.log('Succesful synchronized Employeer table')
}).catch((error) => {
    console.log('Something went wrong with synchronized Employeer table', error)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/dialogflow', require('./server/routes/dialogflow'));

app.get('/', async (req, res) => {
    try {
        const employeer = await Employeer.create({
            user_id: 1,
            company_name: 'Panasonic Poland',
            nip: 124321321
        })
        await employeer.save()
        res.send(employeer);
    } catch (error) {
        res.send('Unable to connect to the database:', error);
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
