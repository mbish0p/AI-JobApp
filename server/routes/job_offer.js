const express = require('express')

const JobOffer = require('../models/JobOffer')
const Employeer = require('../models/Employeer')
const auth = require('../middleware/auth')

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
        res.send(offers)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


router.get('/', async (req, res) => {
    res.send('hi there')
})


module.exports = router