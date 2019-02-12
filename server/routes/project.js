const express = require('express')
const router = express.Router()
const ProjectController = require('../controllers/project')
const { authentication, todoAuthorization, ownerAuthorization, memberAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', ProjectController.find)
router.post('/', ProjectController.create)
router.get('/:projectId', memberAuthorization, ProjectController.findOne)
router.put('/:projectId', ownerAuthorization, ProjectController.update)
router.delete('/:projectId', ownerAuthorization, ProjectController.delete)

router.post('/member/:projectId/:email', memberAuthorization, ProjectController.addMember)
router.delete('/member/:projectId/:userId', memberAuthorization, ProjectController.removeMember)

module.exports = router
