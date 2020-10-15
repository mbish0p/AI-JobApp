const express = require('express')
const multer = require('multer')

const Employee = require('../models/Employee')
const Employeer = require('../models/Employeer')
const { uploadFile } = require('../db/blob')

const router = express.Router()
const upload = multer()

router.post('/:id', async (req, res) => {
    try {
        const { company_name, phone_number } = req.body

        const employee = await Employee.findOne({
            where: {
                userId: req.params.id
            }
        })

        if (employee) {
            const employeer = await Employeer.create({
                company_name,
                phone_number,
                userId: req.params.id
            })

            await employee.destroy()
            res.send(employeer)
        } else {
            throw new Error(`No employeer with this id: ${req.params.id}`)
        }

    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.post('/:id/company-logo', upload.single('logo'), async (req, res) => {
    try {
        const logo = req.file

        const employeer = await Employeer.findOne({
            where: {
                userId: req.params.id
            }
        })

        if (!employeer) {
            throw new Error(`No employeer with this id: ${req.params.id}`)
        }

        const url = await uploadFile(logo)

        await employeer.update({
            company_logo: url
        })
        const responseMessage = {
            message: 'Logo was added',
            url
        }
        res.status(201).send(responseMessage)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/:id', async (req, res) => {
    try {
        const employeer = await Employeer.findOne({
            where: {
                userId: req.params.id
            }
        })

        if (!employeer) {
            throw new Error(`No employeer with this id: ${req.params.id}`)
        }

        res.send(employeer)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.delete('/:id', async (req, res) => {
    try {
        console.log(typeof parseInt(req.params.id))
        const employeer = await Employeer.findOne({
            where: {
                userId: req.params.id
            }
        })
        if (!employeer) {
            throw new Error(`No employeer with this id: ${req.params.id}`)
        }
        res.send(employeer)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router