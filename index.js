require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require('cors')

const jobOfferStatusScanning = require('./server/db/backgroundJob')
jobOfferStatusScanning()


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
app.use(cookieParser())
app.use(cors({
    allowedHeaders: "Set-Cookie, Content-Type",
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use('/api/dialogflow', require('./server/routes/dialogflow'));
app.use('/users', require('./server/routes/user'))
app.use('/employee', require('./server/routes/employee'))
app.use('/employeer', require('./server/routes/employeer'))
app.use('/skills', require('./server/routes/employee_skills'))
app.use('/education', require('./server/routes/employee_education'))
app.use('/experience', require('./server/routes/employee_experience'))
app.use('/job-offer', require('./server/routes/job_offer'))
app.use('/technologies', require('./server/routes/job_offer_technology'))
app.use('/files', require('./server/routes/employee_file'))
app.use('/employeer-files', require('./server/routes/employeer_file'))
app.use('/employeer-technology', require('./server/routes/employeer_technology'))
app.use('/employeer-office', require('./server/routes/employeer_office'))
app.use('/employeer-description', require('./server/routes/employeer_description'))

const port = 5000;



app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});
