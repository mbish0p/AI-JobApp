const express = require('express')
const { uploadFile } = require('../db/blob')
const Employee = require('../models/Employee')
const multer = require('multer')

const upload = multer()

const router = express.Router()


router.post('/:id', upload.array('files', 3), async (req, res) => {
    try {
        const files = req.files
        const employee = await Employee.findOne({
            where: {
                userId: req.params.id
            }
        })

        const blobURLs = []
        for (const file of files) {
            const url = await uploadFile(file)
            blobURLs.push(url)
        }
        await employee.update({
            CV: blobURLs[0],
            doc1: blobURLs[1],
            doc2: blobURLs[2]
        })

        res.status(201).send('Docs added')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                userId: req.params.id
            }
        })
        const userDocs = {
            CV: employee.dataValues.CV,
            doc1: employee.dataValues.doc1,
            doc2: employee.dataValues.doc2
        }
        res.send(userDocs)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//TODO: add 1 update for multiple files, after chceking how to set describe in fronted request

router.patch('/:id/CV', upload.single('CV'), async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                userId: req.params.id
            }
        })
        const url = await uploadFile(req.file)
        const updateEmployee = await employee.update({
            CV: url
        })

        res.send(updateEmployee)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.patch('/:id/doc1', upload.single('doc1'), async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                userId: req.params.id
            }
        })
        const url = await uploadFile(req.file)
        const updateEmployee = await employee.update({
            doc1: url
        })

        res.send(updateEmployee)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.patch('/:id/doc2', upload.single('doc2'), async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                userId: req.params.id
            }
        })
        const url = await uploadFile(req.file)
        const updateEmployee = await employee.update({
            doc2: url
        })

        res.send(updateEmployee)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                userId: req.params.id
            }
        })
        const deletedEmployee = await employee.destroy()

        res.send(deletedEmployee)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})




module.exports = router
