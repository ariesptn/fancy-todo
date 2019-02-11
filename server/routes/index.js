const express = require('express')
const router = express.Router()
const GoogleController = require('../controllers/google')
const todoRoutes = require('./todo')
const projectRoutes = require('./project')
const userRoutes = require('./user')

router.use('/api/todos', todoRoutes)
router.use('/api/projects', projectRoutes)
router.use('/api/users', userRoutes)
router.get('/api/googleloginverify', GoogleController.loginVerify)

router.get('/*', (req, res) => {
    res.status(404).json({ msg: 'page not found' })
})

module.exports = router
