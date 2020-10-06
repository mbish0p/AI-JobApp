const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const Candidates = require('./server/models/Candidates')
Candidates.sync().then(() => {
    console.log('Succesful synchronized Candidates table')
}).catch((error) => {
    console.log('Something went wrong with synchronized Candidates table', error)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/dialogflow', require('./server/routes/dialogflow'));

app.get('/', async (req, res) => {
    try {
        const candidates = await Candidates.create({
            employee_id: 3,
            jobOffer_id: 2
        })
        await candidates.save()
        res.send(candidates);
    } catch (error) {
        res.send('Unable to connect to the database:', error);
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
