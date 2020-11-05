const express = require('express')

const EmployeerOffice = require('../models/EmployeerOffice')
const Employeer = require('../models/Employeer')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, async (req, res) => {
    try {
        const { office_name, city, street } = req.body

        const employeer = await Employeer.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employeer) throw new Error(`No employeer with this userId: ${req.user.id}`)

        const employeerOffice = await EmployeerOffice.create({
            employeerId: employeer.dataValues.id,
            office_name,
            city,
            street
        })

        const responseMessage = {
            message: 'Address of office was added',
            employeerOffice
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

        const offices = await EmployeerOffice.findAll({
            where: {
                employeerId: employeer.dataValues.id
            }
        })

        res.send(offices)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.patch('/:id', auth, async (req, res) => {
    try {
        const { office_name, city, street } = req.body
        const employeerOffice = await EmployeerOffice.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!employeerOffice) throw new Error(`No office with this id: ${req.params.id}`)

        await employeerOffice.update({
            office_name: office_name || employeerOffice.dataValues.office_name,
            city: city || employeerOffice.dataValues.city,
            street: street || employeerOffice.dataValues.employeerOffice
        })

        res.send(employeerOffice)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const employeerOffice = await EmployeerOffice.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!employeerOffice) throw new Error(`No office with this id: ${req.params.id}`)

        await employeerOffice.destroy()

        res.send(employeerOffice)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router