const express = require('express')
const User = require('../models/User')
const Employee = require('../models/Employee')
const bcrypt = require('bcrypt')

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
        res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (user) {
            res.send(user.toJSON())
        }
        else {
            throw new Error('No User with this id')
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        const { email, password, surname, name } = req.body
        const salt = 10
        let hashedPassword

        password ? hashedPassword = await bcrypt.hash(password, salt) : hashedPassword = undefined

        if (user) {
            const newUserData = {
                name: name || user.name,
                surname: surname || user.surname,
                password: hashedPassword || user.password,
                email: email || user.email
            }

            const newUser = await User.update(newUserData, {
                where: {
                    id: req.params.id
                }
            })
            res.status(201).send(newUser)
        }
        else {
            throw new Error('No User with this id')
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send(`User with id ${req.params.id} was deleted succesfully`)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


module.exports = router