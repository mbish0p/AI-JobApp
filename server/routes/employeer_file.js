const express = require('express')
const multer = require('multer')

const auth = require('../middleware/auth')
const { uploadFile, deleteFile } = require('../db/blob')
const EmployeerDocument = require('../models/EmployeerDocument')
const Employeer = require('../models/Employeer')

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
        const { name, description } = req.body

        const employeer = await Employeer.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!employeer) {
            throw new Error(`No employeer with this id: ${req.params.id}`)
        }

        const url = await uploadFile(file)
        const employeerFile = await EmployeerDocument.create({
            employeerId: employeer.dataValues.id,
            file: url,
            name,
            description
        })

        res.status(201).send(employeerFile)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const user = req.user

        const employeer = await Employeer.findOne({
            where: {
                userId: user.id
            }
        })
        if (!employeer) {
            throw new Error(`No employeer with this id: ${req.params.id}`)
        }

        const files = await EmployeerDocument.findAll({
            where: {
                employeerId: employeer.dataValues.id
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
        const { name, description } = req.body

        const searchFile = await EmployeerDocument.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!searchFile) {
            throw new Error(`No file with this id ${req.params.id}`)
        }

        const updatedFile = await searchFile.update({
            description: description || searchFile.dataValues.description
        })

        res.send(updatedFile)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const searchFile = await EmployeerDocument.findOne({
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

        await searchFile.destroy()

        res.send(searchFile)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router