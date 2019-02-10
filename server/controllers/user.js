const models = require('../models')
const bcrypt = require('bcryptjs')
const { getToken } = require('../helpers/auth')

class UserController {
    static async register(req, res) {
        try {
            let userData = await models.User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            userData = await models.User.findById(userData._id).lean()
            let token = await getToken(userData)
            res.status(200).json({ userData, token })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
    static async login(req, res) {
        try {
            let userData = await models.User.findOne({
                email: req.body.email
            }).lean()
            if (!userData) {
                throw { message: 'user is not found' }
            }
            if (!await bcrypt.compare(req.body.password, userData.password)) {
                throw { message: 'wrong username or password' }
            }
            let token = await getToken(userData)
            res.status(200).json({ userData, token })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async loginVerify(req, res) {
        res.status(200).send(req.auth)
    }
}

module.exports = UserController
