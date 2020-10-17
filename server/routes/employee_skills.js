const express = require('express')

const Employee = require('../models/Employee')
const EmployeeSkill = require('../models/EmployeeSkill')

const router = express.Router()

router.post('/:id', async (req, res) => {
    try {
        const { name, experience } = req.body
        const employee = await Employee.findOne({
            where: {
                userId: req.params.id
            }
        })

        if (!employee) throw new Error(`No employee with this id: ${req.params.id}`)

        const skill = await EmployeeSkill.create({
            employeeId: employee.dataValues.id,
            name,
            experience
        })

        const responseMessage = {
            message: 'Successful skill created',
            skill
        }
        res.status(201).send(responseMessage)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                userId: req.params.id
            }
        })

        if (!employee) throw new Error(`No employee with this id: ${req.params.id}`)

        const skills = await EmployeeSkill.findAll({
            where: {
                employeeId: employee.dataValues.id
            }
        })

        res.send(skills)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router