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


module.exports = router