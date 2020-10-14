const express = require('express')
const { uploadFile } = require('../db/blob')
const Employee = require('../models/Employee')
const multer = require('multer')

const upload = multer()

const router = express.Router()


router.post('/:id', upload.array('files', 3), async (req, res) => {
    try {
        const files = req.files
        const employee = await Employee.findByPk(req.params.id)

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
    }
})

router.get('/', (req, res) => {
    res.send('hi there')
})



module.exports = router
