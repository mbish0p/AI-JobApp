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

router.patch('/:id', async (req, res) => {
    try {
        const { name, experience } = req.body

        const skill = await EmployeeSkill.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!skill) throw new Error(`No skill with this id: ${req.params.id}`)

        await skill.update({
            name: name || skill.dataValues.name,
            experience: experience || skill.dataValues.experience
        })

        res.send(skill)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const skill = await EmployeeSkill.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!skill) throw new Error(`No skill with this id: ${req.params.id}`)

        await skill.destroy({
            where: {
                id: req.params.id
            }
        })

        res.send(skill)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router