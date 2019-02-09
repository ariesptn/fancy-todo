const express = require('express')
const router = express.Router()
const GithubController = require('../controllers/github')
const GoogleController = require('../controllers/google')
const TodoController = require('../controllers/todo')
const { authentication } = require('../helpers/auth')

router.get('/api/googleloginverify', GoogleController.loginVerify)

router.get('/api/stars/:username', authentication, GithubController.searchStar)
router.get('/api/stars/:username/:repo', authentication, GithubController.searchStar)
router.post('/api/repos/create', authentication, GithubController.createRepo)
router.get('/api/repos/:username', authentication, GithubController.searchRepo)
router.get('/api/repos/:username/:repo', authentication, GithubController.searchRepo)
router.get('/api/readme/:username/:repo', authentication, GithubController.getReadme)
router.get('/api/orgs/members/:org', authentication, GithubController.getOrgMember)
router.put('/api/stars/:username/:repo', authentication, GithubController.star)
router.delete('/api/stars/:username/:repo', authentication, GithubController.unstar)

router.get('/api/todos', authentication, TodoController.find)
router.get('/api/todos/:id', authentication, TodoController.findOne)
router.post('/api/todos', authentication, TodoController.create)
router.put('/api/todos/:id', authentication, TodoController.update)
router.delete('/api/todos/:id', authentication, TodoController.delete)

router.get('/', (req, res) => {
    res.status(404).json({ msg: 'page not found' })
})

module.exports = router
