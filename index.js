const express = require("express");
const bodyParser = require("body-parser");

// const sequalize = require('./server/db/sequelize');

// (async () => {
//     try {
//         await sequalize.sync({ force: true });
//         console.log("The table for the User model was just (re)created!");
//     } catch (error) {
//         console.log(error)
//     }
// })()


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/dialogflow', require('./server/routes/dialogflow'));
app.use('/users', require('./server/routes/user'))
app.use('/employee', require('./server/routes/employee'))
app.use('/employeer', require('./server/routes/employeer'))
app.use('/skills', require('./server/routes/employee_skills'))
app.use('/education', require('./server/routes/employee_education'))
app.use('/experience', require('./server/routes/employee_experience'))


const port = process.env.PORT || 5000;



app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
