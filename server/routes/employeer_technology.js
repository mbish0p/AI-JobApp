const express = require('express')

const EmployeerTechnologies = require('../models/EmployeerTechnologies')
const Employeer = require('../models/Employeer')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, async (req, res) => {
    try {
        const { name, main_technology } = req.body

        const employeer = await Employeer.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employeer) throw new Error(`No employeer with this id : ${req.user.id}`)

        const technology = await EmployeerTechnologies.create({
            employeerId: employeer.dataValues.id,
            name,
            main_technology
        })

        res.status(201).send(technology)
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

        if (!employeer) throw new Error(`No employeer with this id : ${req.user.id}`)

        const technologies = await EmployeerTechnologies.findAll({
            where: {
                employeerId: employeer.dataValues.id
            }
        })

        res.send(technologies)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.patch('/:id', auth, async (req, res) => {
    try {
        const { name, main_technology } = req.body

        const technology = await EmployeerTechnologies.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!technology) throw new Error(`No technology with this id : ${req.params.id}`)

        const newTechData = {
            name: name || technology.dataValues.name,
            main_technology: main_technology || technology.dataValues.main_technology
        }

        const updatedTechnology = await technology.update(newTechData)

        res.send({ message: "Successful updated technology", updatedTechnology })
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const technology = await EmployeerTechnologies.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!technology) throw new Error(`No technology with this id : ${req.params.id}`)

        await technology.destroy()

        res.send({ message: "Successful deleted technology", technology })
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})



module.exports = router