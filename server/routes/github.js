const express = require('express')
const router = express.Router()
const GithubController = require('../controllers/github')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.get('/stars/:username', GithubController.searchStar)
router.get('/stars/:username/:repo', GithubController.searchStar)
router.post('/repos/create', GithubController.createRepo)
router.get('/repos/:username', GithubController.searchRepo)
router.get('/repos/:username/:repo', GithubController.searchRepo)
router.get('/readme/:username/:repo', GithubController.getReadme)
router.get('/orgs/members/:org', GithubController.getOrgMember)
router.put('/stars/:username/:repo', GithubController.star)
router.delete('/stars/:username/:repo', GithubController.unstar)

module.exports = router
