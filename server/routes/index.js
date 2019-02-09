const express = require('express')
const router = express.Router()
const GithubController = require('../controllers/github')
const GoogleController = require('../controllers/google')
const TodoController = require('../controllers/todo')
const ProjectController = require('../controllers/project')
const UserController = require('../controllers/user')
const { authentication, todoAuthorization, ownerAuthorization, memberAuthorization } = require('../helpers/auth')

router.get('/api/stars/:username', authentication, GithubController.searchStar)
router.get('/api/stars/:username/:repo', authentication, GithubController.searchStar)
router.post('/api/repos/create', authentication, GithubController.createRepo)
router.get('/api/repos/:username', authentication, GithubController.searchRepo)
router.get('/api/repos/:username/:repo', authentication, GithubController.searchRepo)
router.get('/api/readme/:username/:repo', authentication, GithubController.getReadme)
router.get('/api/orgs/members/:org', authentication, GithubController.getOrgMember)
router.put('/api/stars/:username/:repo', authentication, GithubController.star)
router.delete('/api/stars/:username/:repo', authentication, GithubController.unstar)

router.post('/api/users/register', UserController.register)
router.post('/api/users/login', UserController.login)
router.get('/api/googleloginverify', GoogleController.loginVerify)

router.get('/api/todos', authentication, TodoController.find)
router.post('/api/todos', authentication, TodoController.create)
router.post('/api/todos/project/:projectId', authentication, memberAuthorization, TodoController.create)
router.get('/api/todos/project/:projectId', authentication, memberAuthorization, TodoController.findByProjectId)
router.get('/api/todos/:userId', authentication, todoAuthorization, TodoController.findOne)
router.put('/api/todos/:userId', authentication, todoAuthorization, TodoController.update)
router.delete('/api/todos/:userId', authentication, todoAuthorization, TodoController.delete)

router.get('/api/projects', authentication, ProjectController.find)
router.post('/api/projects', authentication, ProjectController.create)
router.get('/api/projects/:projectId', authentication, memberAuthorization, ProjectController.findOne)
router.put('/api/projects/:projectId', authentication, ownerAuthorization, ProjectController.update)
router.delete('/api/projects/:projectId', authentication, ownerAuthorization, ProjectController.delete)

router.post('/api/projects/member/:projectId/:email', authentication, memberAuthorization, ProjectController.addMember)
router.delete('/api/projects/member/:projectId/:userId', authentication, memberAuthorization, ProjectController.removeMember)

router.get('/*', (req, res) => {
    res.status(404).json({ msg: 'page not found' })
})

module.exports = router
