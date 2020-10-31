const express = require('express')
const multer = require('multer')

const auth = require('../middleware/auth')
const { uploadFile, deleteFile } = require('../db/blob')
const EmployeeDocument = require('../models/EmployeeDocument')
const Employee = require('../models/Employee')

const upload = multer({
    limits: {
        fileSize: 4000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx|pdf|JPG|PNG|JPEG|jpg|png|jpeg)$/)) {
            return cb(new Error('Please upload file with extension pdf, doc or docx'))
        }
        cb(undefined, true)
    }
})
const router = express.Router()


router.post("/", auth, upload.single('file'), async (req, res) => {
    try {
        const file = req.file
        const { name } = req.body

        const employee = await Employee.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employee) {
            throw new Error(`No employee with this id: ${req.params.id}`)
        }

        const existingFile = await EmployeeDocument.findOne({
            where: {
                name,
                employeeId: employee.dataValues.id
            }
        })

        console.log(existingFile)

        if (existingFile) {
            const fileUrl = existingFile.dataValues.file

            const deleteOldBlob = await deleteFile(fileUrl)

            if (!deleteOldBlob.success) {
                throw new Error(`Blob do not exist in db`)
            }
            console.log(existingFile)

            await existingFile.destroy()
        }

        const url = await uploadFile(file)
        const employeeFile = await EmployeeDocument.create({
            employeeId: employee.dataValues.id,
            file: url,
            name
        })

        res.status(201).send(employeeFile)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/', auth, async (req, res) => {
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

        const files = await EmployeeDocument.findAll({
            where: {
                employeeId: employee.dataValues.id
            }
        })

        res.send(files)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


router.patch('/:id', upload.single('file'), auth, async (req, res) => {
    try {
        const file = req.file
        const { name } = req.body

        const searchFile = await EmployeeDocument.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!searchFile) {
            throw new Error(`No file with this id ${req.params.id}`)
        }

        const deleteOldBlob = await deleteFile(searchFile.dataValues.file)

        if (!deleteOldBlob.success) {
            throw new Error(`Blob do not exist in db`)
        }

        const url = await uploadFile(file)

        console.log(url)

        const updatedFile = await searchFile.update({
            name: name || searchFile.dataValues.name,
            file: url || searchFile.dataValues.file
        })


        res.send(updatedFile)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const searchFile = await EmployeeDocument.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!searchFile) {
            throw new Error(`No file with this id ${req.params.id}`)
        }
        const deleteOldBlob = await deleteFile(searchFile.dataValues.file)

        if (!deleteOldBlob.success) {
            throw new Error(`Blob do not exist in db`)
        }

        res.send(searchFile)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router