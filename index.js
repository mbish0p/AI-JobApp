const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const EmployeeEducation = require('./server/models/EmployeeEducation')
EmployeeEducation.sync().then(() => {
    console.log('Succesful synchronized EmployeeEducation table')
}).catch((error) => {
    console.log('Something went wrong with synchronized EmployeeEducation table', error)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/dialogflow', require('./server/routes/dialogflow'));

app.get('/', async (req, res) => {
    try {
        const employeeEducation = await EmployeeEducation.create({
            employee_id: 3,
            school_name: 'Akademia Górniczo Hutnicza',
            field_of_studies: 'IS',
        })
        await employeeEducation.save()
        res.send(employeeEducation);
    } catch (error) {
        res.send('Unable to connect to the database:', error);
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
