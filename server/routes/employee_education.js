const express = require('express')

const EmployeeEducation = require('../models/EmployeeEducation')
const Employee = require('../models/Employee')
const router = express.Router()

router.post('/:id', async (req, res) => {
    try {
        const { school_name, field_of_studies } = req.body
        const employee = await Employee.findOne({
            where: {
                userId: req.params.id
            }
        })

        if (!employee) throw new Error(`No employee with this id: ${req.params.id}`)

        const employeeEducation = await EmployeeEducation.create({
            employeeId: employee.dataValues.id,
            school_name,
            field_of_studies
        })

        const responseMessage = {
            message: 'Successful skill created',
            employeeEducation
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

        const educations = await EmployeeEducation.findAll({
            where: {
                employeeId: employee.dataValues.id
            }
        })

        res.send(educations)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const { school_name, field_of_studies } = req.body
        const employeeEducation = await EmployeeEducation.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!employeeEducation) throw new Error(`No education with this id: ${req.params.id}`)

        await employeeEducation.update({
            school_name: school_name || employeeEducation.dataValues.school_name,
            field_of_studies: field_of_studies || employeeEducation.dataValues.field_of_studies
        })

        res.send(employeeEducation)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const employeeEducation = await EmployeeEducation.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!employeeEducation) throw new Error(`No education with this id: ${req.params.id}`)

        await employeeEducation.destroy()

        res.send(employeeEducation)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router