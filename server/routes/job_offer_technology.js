const express = require('express')

const JobOfferTechnologies = require('../models/JobOfferTechnologies')
const JobOffer = require('../models/JobOffer')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/:id', auth, async (req, res) => {
    try {
        const { name, experience, main_technology } = req.body

        const jobOffer = await JobOffer.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!jobOffer) throw new Error(`No job offer with this id : ${req.params.id}`)

        const technology = await JobOfferTechnologies.create({
            jobOfferId: jobOffer.dataValues.id,
            name,
            experience,
            main_technology
        })

        res.status(201).send(technology)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const jobOffer = await JobOffer.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!jobOffer) throw new Error(`No job offer with this id : ${req.params.id}`)

        const technologies = await JobOfferTechnologies.findAll({
            where: {
                jobOfferId: jobOffer.dataValues.id
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
        const { name, experience, main_technology } = req.body

        const technology = await JobOfferTechnologies.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!technology) throw new Error(`No technology with this id : ${req.params.id}`)

        const newTechData = {
            name: name || technologies.dataValues.name,
            experience: experience || technologies.dataValues.experience,
            main_technology: main_technology || technologies.dataValues.main_technology
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
        const technology = await JobOfferTechnologies.findOne({
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


