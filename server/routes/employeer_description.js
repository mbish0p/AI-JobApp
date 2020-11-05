const express = require('express')

const EmployeerDescription = require('../models/EmployeerDescription')
const Employeer = require('../models/Employeer')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, async (req, res) => {
    try {
        const { name, description } = req.body

        const employeer = await Employeer.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employeer) throw new Error(`No employeer with this userId: ${req.user.id}`)

        const employeerDescription = await EmployeerDescription.create({
            employeerId: employeer.dataValues.id,
            name,
            description
        })

        const responseMessage = {
            message: 'Description of office was added',
            employeerDescription
        }

        res.status(201).send(responseMessage)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const employeer = await Employeer.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employeer) throw new Error(`No employeer with this userId: ${req.user.id}`)

        const employeerDescriptions = await EmployeerDescription.findAll({
            where: {
                employeerId: employeer.dataValues.id
            }
        })

        res.send(employeerDescriptions)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.patch('/:id', auth, async (req, res) => {
    try {
        const { name, description } = req.body
        const employeerDescription = await EmployeerDescription.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!employeerDescription) throw new Error(`No description with this id: ${req.params.id}`)

        await employeerDescription.update({
            name: name || employeerDescription.dataValues.name,
            description: description || employeerDescription.dataValues.description
        })

        res.send(employeerDescription)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const employeerDescription = await EmployeerDescription.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!employeerDescription) throw new Error(`No description with this id: ${req.params.id}`)

        await employeerDescription.destroy()

        res.send(employeerDescription)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router