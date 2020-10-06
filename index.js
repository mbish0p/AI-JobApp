const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const Employee = require('./server/models/Employee')
Employee.sync().then(() => {
    console.log('Succesful synchronized Employee table')
}).catch((error) => {
    console.log('Something went wrong with synchronized Employee table', error)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/dialogflow', require('./server/routes/dialogflow'));

app.get('/', async (req, res) => {
    try {
        const employee = await Employee.create({
            user_id: 1,
        })
        await employee.save()
        res.send(employee);
    } catch (error) {
        res.send('Unable to connect to the database:', error);
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
