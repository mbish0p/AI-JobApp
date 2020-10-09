const express = require('express')
const User = require('../models/User')
const Employee = require('../models/Employee')
const bcrypt = require('bcrypt')
const Employeer = require('../models/Employeer')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { name, surname, password, email } = req.body
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            surname,
            password: hashedPassword,
            email
        })

        const employee = await Employee.create({
            userId: user.dataValues.id
        })
        console.log(employee)
        res.send(user)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router