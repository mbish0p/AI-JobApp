const express = require('express')
const User = require('../models/User')
const Employee = require('../models/Employee')
const Employeer = require('../models/Employeer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const auth = require('../middleware/auth')
const { deleteFile } = require('../db/blob')
const keys = require('../config/dev')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { name, surname, password, email } = req.body
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            surname,
            password: hashedPassword,
            email
        })
        const employee = await Employee.create({
            userId: user.dataValues.id
        })
        res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.send({
            error: true,
            message: error
        })
    }
})

router.post('/refresh', async (req, res) => {
    try {
        const oldRefreshToken = req.cookies.jwt_refreshToken
        if (!oldRefreshToken) {
            throw new Error('Refresh token wasn`t sended')
        }

        console.log(oldRefreshToken)
        const decode = jwt.verify(oldRefreshToken.refreshToken, keys.REFRESH_TOKEN_SECRET)

        const user = await User.findOne({
            where: {
                email: decode.email
            }
        })

        if (oldRefreshToken.refreshToken !== user.dataValues.refresh_tokens) {
            console.log('Refresh token from cookie ', oldRefreshToken.refreshToken)
            console.log('Refresh token from db ', user.dataValues.refresh_tokens)
            throw new Error('Refresh tokens are different, check something goes wrong')

        }
        const accessTokenPayload = {
            email: user.dataValues.email,
            role: 'ACCESS_TOKEN'
        }
        const accessToken = jwt.sign(accessTokenPayload, keys.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: `${keys.ACCESS_TOKEN_LIFE}s`
        })
        const refreshTokenPayload = {
            email: user.dataValues.email,
            role: 'REFRESH_TOKEN'
        }
        const refreshToken = jwt.sign(refreshTokenPayload, keys.REFRESH_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: `${keys.REFRESH_TOKEN_LIFE}s`
        })

        await user.update({
            refresh_tokens: refreshToken
        })
        //res.set('Access-Control-Allow-Origin', 'http://localhost:3000/*')
        //res.set('Access-Control-Allow-Credentials', 'true')

        res.cookie('jwt_accessToken', {
            accessToken
        })
        res.cookie('jwt_refreshToken', {
            refreshToken
        })
        res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: error.toString() })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(401).send({ message: 'No crudentials' })
        }

        const user = await User.findOne({
            where: {
                email
            }
        })
        // const salt = 10
        // const hashedPassword = await bcrypt.hash(password, salt)
        //console.log(user.dataValues.password, '   ', hashedPassword)
        if (!user || !await bcrypt.compare(password, user.dataValues.password)) {
            res.status(404).send({ message: 'No user with this crudentials' })
        }

        const accessTokenPayload = {
            email: user.dataValues.email,
            role: 'ACCESS_TOKEN'
        }
        const accessToken = jwt.sign(accessTokenPayload, keys.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: `${keys.ACCESS_TOKEN_LIFE}s`
        })
        const refreshTokenPayload = {
            email: user.dataValues.email,
            role: 'REFRESH_TOKEN'
        }
        const refreshToken = jwt.sign(refreshTokenPayload, keys.REFRESH_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: `${keys.REFRESH_TOKEN_LIFE}s`
        })

        await user.update({
            refresh_tokens: refreshToken
        })
        res.cookie('jwt_accessToken', {
            accessToken
        })
        res.cookie('jwt_refreshToken', {
            refreshToken
        })
        res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        const user = req.user

        await User.update({
            refresh_tokens: ""
        }, {
            where: {
                id: user.id
            }
        })

        res.send({ message: `Successfull logout ${user.name}` })
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const user = req.user
        if (!user) throw new Error(`No user`)

        res.send(user.toJSON())
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.patch('/', auth, async (req, res) => {
    try {
        const user = req.user
        const { email, password, surname, name } = req.body
        const salt = 10
        let hashedPassword

        console.log(user.id)

        if (!user) throw new Error(`No user`)

        password ? hashedPassword = await bcrypt.hash(password, salt) : hashedPassword = undefined

        if (user) {
            const newUserData = {
                name: name || user.name,
                surname: surname || user.surname,
                password: hashedPassword || user.password,
                email: email || user.email
            }

            const updatedUser = await User.update(newUserData, {
                where: {
                    id: user.id
                }
            })

            res.status(201).send(updatedUser)
        }
        else {
            throw new Error('No user')
        }
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        const user = req.user

        console.log(user)

        const employee = await Employee.findOne({
            where: {
                userId: user.id
            }
        })

        const employeer = await Employeer.findOne({
            where: {
                userId: user.id
            }
        })

        if (employee && (employee.dataValues.CV || employee.dataValues.doc1 || employee.dataValues.doc2)) {
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

        console.log(employeer)

        if (employeer && employeer.dataValues.company_logo) {
            const deleteOldBlob = await deleteFile(employeer.dataValues.company_logo)

            if (!deleteOldBlob.success) {
                throw new Error(`Blob do not exist in db`)
            }
        }

        await user.destroy()

        res.send(`User with id ${user.id} was deleted succesfully`)
    } catch (error) {
        console.log(error)
        res.send(error.toString())
    }
})


module.exports = router