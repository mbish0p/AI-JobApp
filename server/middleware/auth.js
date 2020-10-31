const jwt = require('jsonwebtoken')

const keys = require('../config/dev')
const User = require('../models/User')

const auth = async (req, res, next) => {
    const accessToken = req.cookies.jwt_accessToken

    if (!accessToken) {
        res.status(403).send({ error: 'Request is unauthorized ' })
        return
    }

    try {
        const decode = jwt.verify(accessToken.accessToken, keys.ACCESS_TOKEN_SECRET)
        const user = await User.findOne({
            where: {
                email: decode.email
            }
        })

        if (!user.refresh_tokens) {
            res.status(403).send({ error: 'Request is unauthorized ' })
            return
        }

        req.user = user

        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({ message: 'Please authenticate ', error })
    }
}

module.exports = auth