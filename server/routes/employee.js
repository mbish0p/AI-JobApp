const express = require('express')
const multer = require('multer')

const { uploadFile, deleteFile } = require('../db/blob')
const Employee = require('../models/Employee')
const EmployeeEducation = require('../models/EmployeeEducation')
const EmployeeExperience = require('../models/EmployeeExperience')
const EmployeeSkill = require('../models/EmployeeSkill')
const auth = require('../middleware/auth')

const upload = multer({
    limits: {
        fileSize: 4000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
            return cb(new Error('Please upload file with extension pdf, doc or docx'))
        }
        cb(undefined, true)
    }
})

const router = express.Router()

router.post('/', auth, upload.array('files', 3), async (req, res) => {
    try {
        const files = req.files
        const { phone_number,
            city,
            preffered_contract_type,
            preffered_position,
            experience_lvl,
            min_salary,
            preffered_salary
        } = req.body
        const employee = await Employee.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employee) {
            throw new Error(`No employee with this id: ${req.params.id}`)
        }

        const blobURLs = []
        for (const file of files) {
            const url = await uploadFile(file)
            blobURLs.push(url)
        }
        await employee.update({
            phone_number,
            city,
            preffered_contract_type,
            preffered_position,
            experience_lvl,
            min_salary,
            preffered_salary,
            CV: blobURLs[0],
            doc1: blobURLs[1],
            doc2: blobURLs[2]
        })

        res.status(201).send(employee)
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

        const education = await EmployeeEducation.findAll({
            where: {
                employeeId: employee.dataValues.id
            }
        })

        const experience = await EmployeeExperience.findAll({
            where: {
                employeeId: employee.dataValues.id
            }
        })

        const responseMessage = {
            employee,
            skills,
            education,
            experience
        }

        res.send(responseMessage)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

//TODO: add 1 update for multiple files, after chceking how to set describe in fronted request

router.patch('/CV', auth, upload.single('CV'), async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                userId: req.user.id
            }
        })
        if (!employee) {
            throw new Error(`No employee with this userId: ${req.user.id}`)
        }

        if (employee.dataValues.CV) {

            const deleteOldBlob = await deleteFile(employee.dataValues.CV)

            if (!deleteOldBlob.success) {
                throw new Error(`Blob do not exist in db`)
            }
        }

        const url = await uploadFile(req.file)
        const updateEmployee = await employee.update({
            CV: url
        })

        res.send(updateEmployee)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.patch('/doc1', auth, upload.single('doc1'), async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employee) {
            throw new Error(`No employee with this userId: ${req.user.id}`)
        }

        if (employee.dataValues.doc1) {
            const deleteOldBlob = await deleteFile(employee.dataValues.doc1)

            if (!deleteOldBlob.success) {
                throw new Error(`Blob do not exist in db`)
            }
        }

        const url = await uploadFile(req.file)
        const updateEmployee = await employee.update({
            doc1: url
        })

        res.send(updateEmployee)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.patch('/doc2', auth, upload.single('doc2'), async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                userId: req.user.id
            }
        })
        if (!employee) {
            throw new Error(`No employee with this userId: ${req.user.id}`)
        }

        if (employee.dataValues.doc2) {
            const deleteOldBlob = await deleteFile(employee.dataValues.doc2)

            if (!deleteOldBlob.success) {
                throw new Error(`Blob do not exist in db`)
            }
        }

        const url = await uploadFile(req.file)
        const updateEmployee = await employee.update({
            doc2: url
        })

        res.send(updateEmployee)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
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

        const urls = []
        urls.push(employee.dataValues.CV)
        urls.push(employee.dataValues.doc1)
        urls.push(employee.dataValues.doc2)

        for (let i = 0; i < urls.length; i++) {
            const deletedBlob = await deleteFile(urls[i])
            if (!deletedBlob.success) {
                throw new Error(`Blob do not exist in db`)
            }
        }

        const deletedEmployee = await employee.destroy()

        res.send(deletedEmployee)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})




module.exports = router
