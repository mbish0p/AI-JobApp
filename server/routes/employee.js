const express = require('express')

const Employee = require('../models/Employee')
const EmployeeEducation = require('../models/EmployeeEducation')
const EmployeeExperience = require('../models/EmployeeExperience')
const EmployeeSkill = require('../models/EmployeeSkill')
const auth = require('../middleware/auth')
const JobOffer = require('../models/JobOffer')
const Candidates = require('../models/Candidates')
const EmployeeDocument = require('../models/EmployeeDocument')

const { downloadFile } = require('../db/blob')

const router = express.Router()

router.post('/', auth, async (req, res) => {
    try {
        const { phone_number,
            city,
            preffered_contract_type,
            preffered_position,
            experience_level,
            min_salary,
            preffered_salary,
            education,
            only_remote,
            contract_type
        } = req.body

        const employee = await Employee.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employee) {
            throw new Error(`No employee with this id: ${req.params.id}`)
        }

        console.log(employee)

        const newEmployee = await employee.update({
            phone_number: phone_number || employee.dataValues.phone_number,
            city: city || employee.dataValues.city,
            preffered_contract_type: preffered_contract_type || employee.dataValues.preffered_contract_type,
            preffered_position: preffered_position || employee.dataValues.preffered_position,
            experience_level: experience_level || employee.dataValues.experience_level,
            min_salary: min_salary || employee.dataValues.min_salary,
            preffered_salary: preffered_salary || employee.dataValues.preffered_salary,
            contract_type: contract_type || employee.dataValues.contract_type,
            education: education || employee.dataValues.education,
            only_remote: only_remote || employee.dataValues.only_remote
        })

        res.status(201).send(newEmployee)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.post('/apply/:id', auth, async (req, res) => {
    try {
        const user = req.user

        const employee = await Employee.findOne({
            where: {
                userId: user.id
            }
        })
        const jobOffer = await JobOffer.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!jobOffer) throw new Error(`No offer with this id ${req.params.id}`)
        if (!employee) {
            throw new Error(`No employee with this id: ${req.params.id}`)
        }

        const isAlreadyApplied = await Candidates.findOne({
            where: {
                employeeId: employee.dataValues.id,
                jobOfferId: jobOffer.dataValues.id
            }
        })

        if (isAlreadyApplied) throw new Error(`Employee with this id ${employee.dataValues.id},
            already applied for job offer with id ${jobOffer.dataValues.id}`)

        const candidates = await Candidates.create({
            employeeId: employee.dataValues.id,
            jobOfferId: jobOffer.dataValues.id
        })

        res.send(candidates)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/candidates/job-offers', auth, async (req, res) => {
    try {
        const user = req.user

        const employee = await Employee.findOne({
            where: {
                userId: user.id
            }
        })
        if (!employee) {
            throw new Error(`No employee with this id: ${req.params.id}`)
        }

        const candidates = await Candidates.findAll({
            where: {
                employeeId: employee.dataValues.id
            }
        })

        const offers = []

        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i].dataValues

            const jobOffer = await JobOffer.findOne({
                where: {
                    id: candidate.jobOfferId
                }
            })

            offers.push(jobOffer)
        }

        res.send(offers)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employee) {
            throw new Error(`No employee with this userId: ${req.user.id}`)
        }

        const skills = await EmployeeSkill.findAll({
            where: {
                employeeId: employee.dataValues.id
            }
        })

        const files = await EmployeeDocument.findAll({
            where: {
                employeeId: employee.dataValues.id
            }
        })

        const responseMessage = {
            employee,
            skills,
            files
        }

        res.send(responseMessage)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/image', auth, async (req, res) => {
    try {

        const employee = await Employee.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employee) {
            throw new Error(`No employee with this userId: ${req.user.id}`)
        }

        const file = await EmployeeDocument.findOne({
            where: {
                employeeId: employee.dataValues.id,
                name: 'employee image'
            }
        })
        if (!file) {
            throw new Error(`No employee image for this user: ${req.user.id}`)
        }

        res.send(file)
    } catch (error) {
        res.status(404).send({ message: 'No employee profile pic', error })
    }
})


router.delete('/', auth, async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                userId: req.user.id
            }
        })
        if (!employee) {
            throw new Error(`No employee with this userId: ${req.user.id}`)
        }

        const deletedEmployee = await employee.destroy()

        res.send(deletedEmployee)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})




module.exports = router
