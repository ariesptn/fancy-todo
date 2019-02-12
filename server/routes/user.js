const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/loginverify', UserController.loginVerify)

module.exports = router
