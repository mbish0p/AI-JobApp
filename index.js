const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const EmployeeSkill = require('./server/models/EmployeeSkill')
EmployeeSkill.sync().then(() => {
    console.log('Succesful synchronized EmployeeSkill table')
}).catch((error) => {
    console.log('Something went wrong with synchronized EmployeeSkill table', error)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/dialogflow', require('./server/routes/dialogflow'));

app.get('/', async (req, res) => {
    try {
        const employeeSkill = await EmployeeSkill.create({
            employee_id: 3,
            name: 'Java',
            experience: 12,
        })
        await employeeSkill.save()
        res.send(employeeSkill);
    } catch (error) {
        res.send('Unable to connect to the database:', error);
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
