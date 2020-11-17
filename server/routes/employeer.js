const express = require('express')
const multer = require('multer')

const Employee = require('../models/Employee')
const Employeer = require('../models/Employeer')
const { uploadFile, deleteFile } = require('../db/blob')
const auth = require('../middleware/auth')
const EmployeerDescription = require('../models/EmployeerDescription')
const EmployeerDocument = require('../models/EmployeerDocument')
const EmployeerTechnologies = require('../models/EmployeerTechnologies')
const EmployeerOffice = require('../models/EmployeerOffice')

const router = express.Router()
const upload = multer({
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(JPG|PNG|JPEG|jpg|png|jpeg)$/)) {
            return cb(new Error('Please upload file with extension, jpg, pdf, doc or docx'))
        }
        cb(undefined, true)
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const { company_name, phone_number } = req.body

        const employee = await Employee.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (employee) {
            const employeer = await Employeer.create({
                company_name,
                phone_number,
                userId: req.user.id
            })

            if (employee.dataValues.CV || employee.dataValues.doc1 || employee.dataValues.doc2) {
                const urls = []
                urls.push(employee.dataValues.CV)
                urls.push(employee.dataValues.doc1)
                urls.push(employee.dataValues.doc2)

                for (let i = 0; i < urls.length; i++) {
                    if (urls[i]) {
                        const deletedBlob = await deleteFile(urls[i])
                        if (!deletedBlob.success) {
                            throw new Error(`Blob do not exist in db`)
                        }
                    }
                }
            }
            await employee.destroy()

            const user = req.user
            await user.update({
                isEmployeer: true
            })

            res.status(201).send(employeer)
        } else {
            throw new Error(`No employee with this userId: ${req.user.id}`)
        }
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.post('/company-logo', auth, upload.single('logo'), async (req, res) => {
    try {
        const logo = req.file

        const employeer = await Employeer.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employeer) {
            throw new Error(`No employeer with this userId: ${req.user.id}`)
        }

        let url = undefined
        if (employeer.dataValues.company_logo) {
            if (logo) {
                console.log(employeer.dataValues.company_logo)

                const deleteOldBlob = await deleteFile(employeer.dataValues.company_logo)

                console.log(deleteOldBlob)

                if (!deleteOldBlob.success) {
                    throw new Error(`Blob do not exist in db`)
                }

                url = await uploadFile(logo)
            }
        } else {
            url = await uploadFile(logo)
        }

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

router.patch('/', auth, async (req, res) => {
    try {
        const { company_name, phone_number, www, employee_number } = req.body

        const employeer = await Employeer.findOne({
            where: {
                userId: req.user.id
            }
        })
        if (!employeer) {
            throw new Error(`No employeer with this userId: ${req.user.id}`)
        }

        await employeer.update({
            company_name: company_name || employeer.dataValues.company_name,
            phone_number: phone_number || employeer.dataValues.phone_number,
            www: www || employeer.dataValues.www,
            employee_number: employee_number || employeer.dataValues.employee_number
        })

        res.send(employeer)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/:id', async (req, res) => {
    try {
        const employeer = await Employeer.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!employeer) {
            throw new Error(`No employeer with this userId: ${req.params.id}`)
        }

        const employeerDescription = await EmployeerDescription.findAll({
            where: {
                employeerId: employeer.dataValues.id
            }
        })

        const employeerDocument = await EmployeerDocument.findAll({
            where: {
                employeerId: employeer.dataValues.id
            }
        })

        const employeerTechnologies = await EmployeerTechnologies.findAll({
            where: {
                employeerId: employeer.dataValues.id
            }
        })

        const employeerOffice = await EmployeerOffice.findAll({
            where: {
                employeerId: employeer.dataValues.id
            }
        })

        const responseMessage = {
            employeer,
            employeerDescription,
            employeerDocument,
            employeerOffice,
            employeerTechnologies
        }

        res.send(responseMessage)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const employeer = await Employeer.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employeer) {
            throw new Error(`No employeer with this userId: ${req.user.id}`)
        }

        const employeerDescription = await EmployeerDescription.findAll({
            where: {
                employeerId: employeer.dataValues.id
            }
        })

        const employeerDocument = await EmployeerDocument.findAll({
            where: {
                employeerId: employeer.dataValues.id
            }
        })

        const employeerTechnologies = await EmployeerTechnologies.findAll({
            where: {
                employeerId: employeer.dataValues.id
            }
        })

        const employeerOffice = await EmployeerOffice.findAll({
            where: {
                employeerId: employeer.dataValues.id
            }
        })

        const responseMessage = {
            employeer,
            employeerDescription,
            employeerDocument,
            employeerOffice,
            employeerTechnologies
        }

        res.send(responseMessage)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        const employeer = await Employeer.findOne({
            where: {
                userId: req.user.id
            }
        })
        if (!employeer) {
            throw new Error(`No employeer with this userId: ${req.user.id}`)
        }

        if (employeer.dataValues.company_logo) {
            const deleteOldBlob = await deleteFile(employeer.dataValues.company_logo)

            if (!deleteOldBlob.success) {
                throw new Error(`Blob do not exist in db`)
            }
        }

        await employeer.destroy()

        res.send(employeer)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router