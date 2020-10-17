const express = require('express')
const multer = require('multer')

const Employee = require('../models/Employee')
const Employeer = require('../models/Employeer')
const { uploadFile, deleteFile } = require('../db/blob')

const router = express.Router()
const upload = multer({
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(JPG|PNG|JPEG|jpg|png|jpeg)$/)) {
            return cb(new Error('Please upload file with extension pdf, doc or docx'))
        }
        cb(undefined, true)
    }
})

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
            res.send(employeer)
        } else {
            throw new Error(`No employee with this id: ${req.params.id}`)
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

router.patch('/:id', upload.single('logo'), async (req, res) => {
    try {
        const { company_name, phone_number } = req.body
        const logo = req.file

        const employeer = await Employeer.findOne({
            where: {
                userId: req.params.id
            }
        })
        if (!employeer) {
            throw new Error(`No employeer with this id: ${req.params.id}`)
        }

        let url = undefined
        if (employeer.dataValues.company_logo) {
            if (logo) {
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
            company_name: company_name || employeer.dataValues.company_name,
            phone_number: phone_number || employeer.dataValues.phone_number,
            company_logo: url || employeer.dataValues.company_logo
        })

        res.send({})
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

        await deleteFile(employeer.dataValues.company_logo)

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

        if (employeer.dataValues.company_logo) {
            const deleteOldBlob = await deleteFile(employeer.dataValues.company_logo)

            if (!deleteOldBlob.success) {
                throw new Error(`Blob do not exist in db`)
            }
        }

        res.send(employeer)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router