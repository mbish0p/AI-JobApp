const express = require('express')
const User = require('../models/User')
const Employee = require('../models/Employee')
const Employeer = require('../models/Employeer')
const bcrypt = require('bcrypt')

const { deleteFile } = require('../db/blob')

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
        res.send(error.toString())
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) throw new Error(`No user with id : ${req.params.id}`)

        res.send(user.toJSON())
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        const { email, password, surname, name } = req.body
        const salt = 10
        let hashedPassword

        if (!user) throw new Error(`No user with id : ${req.params.id}`)

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
        res.send(error.toString())
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!user) {
            throw new Error(`No user with id : ${req.params.id}`)
        }

        const employee = await Employee.findOne({
            where: {
                userId: req.params.id
            }
        })

        const employeer = await Employeer.findOne({
            where: {
                userId: req.params.id
            }
        })

        if (employee && (employee.dataValues.CV || employee.dataValues.doc1 || employee.dataValues.doc2)) {
            const urls = []
            urls.push(employee.dataValues.CV)
            urls.push(employee.dataValues.doc1)
            urls.push(employee.dataValues.doc2)

            for (let i = 0; i < urls.length; i++) {
                if (urls[i]) {
                    const deletedBlob = await deleteFile(urls[i])
                    if (!deletedBlob.success) {
                        throw new Error(`Blob do not exist in db`)
                    }
                }
            }
        }

        if (employeer && employeer.dataValues.company_logo) {
            const deleteOldBlob = await deleteFile(employeer.dataValues.company_logo)

            if (!deleteOldBlob.success) {
                throw new Error(`Blob do not exist in db`)
            }
        }

        await user.destroy()

        res.send(`User with id ${req.params.id} was deleted succesfully`)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router