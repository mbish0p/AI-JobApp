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
        if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
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


module.exports = router