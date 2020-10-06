const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const EmployeeLanguage = require('./server/models/EmployeeLanguage')
EmployeeLanguage.sync().then(() => {
    console.log('Succesful synchronized EmployeeLanguage table')
}).catch((error) => {
    console.log('Something went wrong with synchronized EmployeeLanguage table', error)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/dialogflow', require('./server/routes/dialogflow'));

app.get('/', async (req, res) => {
    try {
        const employeeLanguage = await EmployeeLanguage.create({
            employee_id: 3,
            name: 'French',
            experience: 12,
        })
        await employeeLanguage.save()
        res.send(employeeLanguage);
    } catch (error) {
        res.send('Unable to connect to the database:', error);
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
