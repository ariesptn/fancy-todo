const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todo')
const { authentication, todoAuthorization, ownerAuthorization, memberAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', TodoController.find)
router.post('/', TodoController.create)
router.get('/project/:projectId', memberAuthorization, TodoController.findByProjectId)
router.post('/project/:projectId', memberAuthorization, TodoController.create)
router.get('/:todoId', todoAuthorization, TodoController.findOne)
router.put('/:todoId', todoAuthorization, TodoController.update)
router.delete('/:todoId', todoAuthorization, TodoController.delete)

module.exports = router
