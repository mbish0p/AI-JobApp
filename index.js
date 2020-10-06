const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const JobOffer = require('./server/models/JobOffer')
JobOffer.sync().then(() => {
    console.log('Succesful synchronized JobOffer table')
}).catch((error) => {
    console.log('Something went wrong with synchronized JobOffer table', error)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/dialogflow', require('./server/routes/dialogflow'));

app.get('/', async (req, res) => {
    try {
        const jobOffer = await JobOffer.create({
            employeer_id: 1,
            position_name: 'Backend dev',
            description: "asdsadasdasd asdasdasdasdasd asdasdasd asdasdasdasd sadasdasdasdasd adsasdasdasdasdasdasd",
            start_date: "2008-10-29 14:56:59",
            end_date: '2011-10-29 14:56:59'
        })
        await jobOffer.save()
        res.send(jobOffer);
    } catch (error) {
        res.send('Unable to connect to the database:', error);
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
