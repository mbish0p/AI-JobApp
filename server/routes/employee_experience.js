const express = require('express')
const auth = require('../middleware/auth')

const Employee = require('../models/Employee')
const EmployeeExperience = require('../models/EmployeeExperience')

const router = express.Router()

router.post('/', auth, async (req, res) => {
    try {
        const { name, experience } = req.body
        const employee = await Employee.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employee) throw new Error(`No employee with this userId: ${req.user.id}`)

        const employeeExperience = await EmployeeExperience.create({
            employeeId: employee.dataValues.id,
            name,
            experience
        })

        const responseMessage = {
            message: 'Successful experience created',
            employeeExperience
        }
        res.status(201).send(responseMessage)
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

        if (!employee) throw new Error(`No employee with this userId: ${req.user.id}`)

        const employeeExperience = await EmployeeExperience.findAll({
            where: {
                employeeId: employee.dataValues.id
            }
        })

        res.send(employeeExperience)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


router.patch('/:id', auth, async (req, res) => {
    try {
        const { name, experience } = req.body

        const employeeExperience = await EmployeeExperience.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!employeeExperience) throw new Error(`No experience with this id: ${req.params.id}`)

        await employeeExperience.update({
            name: name || employeeExperience.dataValues.name,
            experience: experience || employeeExperience.dataValues.experience
        })

        res.send(employeeExperience)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {

        console.log('asdasdasdad')
        const employeeExperience = await EmployeeExperience.findOne({
            where: {
                id: req.params.id
            }
        })

        console.log("dadasdasda", employeeExperience)

        if (!employeeExperience) throw new Error(`No experience with this id: ${req.params.id}`)

        await employeeExperience.destroy({
            where: {
                id: req.params.id
            }
        })

        res.send(employeeExperience)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})



module.exports = router