const express = require('express')

const JobOffer = require('../models/JobOffer')
const Employeer = require('../models/Employeer')
const auth = require('../middleware/auth')
const JobOfferTechnologies = require('../models/JobOfferTechnologies')
const Candidates = require('../models/Candidates')
const Employee = require('../models/Employee')

const router = express.Router()

router.post('/', auth, async (req, res) => {
    try {
        const user = req.user
        const { position_name,
            description,
            start_date,
            end_date,
            experience_lvl,
            city,
            street,
            remote_work,
            contract_type,
            min_salary,
            max_salary,
            experience,
            education,
            online_interview
        } = req.body

        const employeer = await Employeer.findOne({
            where: {
                userId: user.id
            }
        })
        if (!employeer) throw new Error('Only user with employeer profile can create job offers')

        const jobOffer = await JobOffer.create({
            employeerId: employeer.dataValues.id,
            position_name,
            start_date,
            description,
            end_date,
            experience_lvl,
            city,
            street,
            remote_work,
            contract_type,
            min_salary,
            max_salary,
            experience,
            education,
            online_interview
        })

        res.status(201).send(jobOffer)

    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/all', async (req, res) => {
    try {
        const offers = await JobOffer.findAll()

        const newJobOffersArray = []

        for (let i = 0; i < offers.length; i++) {
            const offer = offers[i].dataValues

            const technology = await JobOfferTechnologies.findAll({
                where: {
                    jobOfferId: offer.id
                }
            })
            newJobOffersArray.push({
                offer,
                technology
            })
        }

        res.send(newJobOffersArray)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const user = req.user
        const employeer = await Employeer.findOne({
            where: {
                userId: user.id
            }
        })

        if (!employeer) throw new Error('Only user with employeer profile can list job offers')

        const jobOffers = await JobOffer.findAll({
            where: {
                employeerId: employeer.dataValues.id
            }
        })

        const newJobOffersArray = []

        for (let i = 0; i < jobOffers.length; i++) {
            const offer = jobOffers[i].dataValues

            const technology = await JobOfferTechnologies.findAll({
                where: {
                    jobOfferId: offer.id
                }
            })
            newJobOffersArray.push({
                offer,
                technology
            })
        }

        res.send(newJobOffersArray)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/:id/candidates/employees', auth, async (req, res) => {
    try {
        const candidates = await Candidates.findAll({
            where: {
                jobOfferId: req.params.id
            }
        })

        if (!candidates) throw new Error(`No candidates for this job offer, with this id ${req.params.id}`)

        const employees = []
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i].dataValues

            const employee = await Employee.findOne({
                where: {
                    id: candidate.employeeId
                }
            })

            employees.push(employee)
        }

        res.send(employees)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.patch('/:id/change-offer-status', auth, async (req, res) => {
    try {
        const jobOffer = await JobOffer.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!jobOffer) throw new Error(`No offer with this id ${req.params.id}`)

        const updatedJobOffer = await jobOffer.update({
            active: !jobOffer.dataValues.active
        })

        res.send(updatedJobOffer)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.patch('/:id', auth, async (req, res) => {
    try {
        const { position_name,
            description,
            start_date,
            end_date,
            experience_lvl,
            city,
            street,
            remote_work,
            contract_type,
            min_salary,
            max_salary,
            experience,
            education,
            online_interview
        } = req.body

        const jobOffer = await JobOffer.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!jobOffer) throw new Error(`No offer with this id ${req.params.id}`)

        // Later change to detect status: active
        const d1 = new Date(jobOffer.dataValues.start_date)
        const d2 = new Date()

        console.log(d1, d2)

        if (d1 < d2) throw new Error("You can`t change offers already active")

        const newJobOfferData = {
            position_name: position_name || jobOffer.dataValues.position_name,
            description: description || jobOffer.dataValues.description,
            start_date: start_date || jobOffer.dataValues.start_date,
            end_date: end_date || jobOffer.dataValues.end_date,
            experience_lvl: experience_lvl || jobOffer.dataValues.experience_lvl,
            city: city || jobOffer.dataValues.city,
            street: street || jobOffer.dataValues.street,
            remote_work: remote_work || jobOffer.dataValues.remote_work,
            contract_type: contract_type || jobOffer.dataValues.contract_type,
            min_salary: min_salary || jobOffer.dataValues.min_salary,
            max_salary: max_salary || jobOffer.dataValues.max_salary,
            experience: experience || jobOffer.dataValues.experience,
            education: education || jobOffer.dataValues.education,
            online_interview: online_interview || jobOffer.dataValues.online_interview
        }

        const updatedOffer = await jobOffer.update(newJobOfferData)

        res.send({ message: "Successful update job offer", updatedOffer })
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const jobOffer = await JobOffer.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!jobOffer) throw new Error(`No offer with this id ${req.params.id}`)

        await jobOffer.destroy()

        res.send({ message: 'Succesful deleted job offer', jobOffer })
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router