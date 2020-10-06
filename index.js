const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const JobOfferTechnologies = require('./server/models/JobOfferTechnologies')
JobOfferTechnologies.sync({ force: true }).then(() => {
    console.log('Succesful synchronized JobOfferTechnologies table')
}).catch((error) => {
    console.log('Something went wrong with synchronized JobOfferTechnologies table', error)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/dialogflow', require('./server/routes/dialogflow'));

app.get('/', async (req, res) => {
    try {
        const jobOfferTechnologies = await JobOfferTechnologies.create({
            jobOffer_id: 2,
            name: 'Java',
            experience: 12,
            main_technology: true
        })
        await jobOfferTechnologies.save()
        res.send(jobOfferTechnologies);
    } catch (error) {
        res.send('Unable to connect to the database:', error);
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
