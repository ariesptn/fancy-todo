const { User } = require('../models')
const jwt = require('jsonwebtoken')

async function authentication(req, res, next) {
    try {
        let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        if (decoded) {
            let userData = await User.findOne({ email: decoded.email })
            if (userData) {
                req.auth = decoded
                next()
            } else {
                throw { message: 'unauthorized user' }
            }
        } else {
            throw { message: 'authentication error' }
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

function userAuthorization(req, res, next) {
    try {

    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

async function getToken(obj) {
    let token = jwt.sign(obj, process.env.JWT_SECRET)
    return token
}

module.exports = { authentication, userAuthorization, getToken }
