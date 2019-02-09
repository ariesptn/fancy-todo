const axios = require('axios')
const { axiosInstance } = require('../helpers/github')

class GithubController {
    static async searchStar(req, res) {
        try {
            let repo = req.params.repo || ''
            let response = await axiosInstance()
                .get(`/users/${req.params.username}/starred`)
            let filtered = response.data.filter(e => e.full_name.includes(repo))
            res.status(200).json(filtered)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }

    static async createRepo(req, res) {
        try {
            let response = await axiosInstance()
                .post(`/user/repos`, req.body)
            res.status(201).json(response.data)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }

    static async searchRepo(req, res) {
        try {
            let repo = req.params.repo || ''
            let response = await axiosInstance()
                .get(`/users/${req.params.username}/repos`)
            let filtered = response.data.filter(e => e.full_name.includes(repo))
            res.status(200).json(filtered)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }

    static async getOrgMember(req, res) {
        try {
            let repo = req.params.repo || ''
            let response = await axiosInstance()
                .get(`/orgs/${req.params.org}/members`)
            res.status(200).json(response.data)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }

    static async getReadme(req, res) {
        try {
            let response = await axiosInstance({
                headers: { 'Accept': 'application/vnd.github.VERSION.html' }
            })
                .get(`/repos/${req.params.username}/${req.params.repo}/readme`)
            res.status(200).json(response.data)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }

    static async star(req, res) {
        try {
            let response = await axiosInstance()
                .put(`/user/starred/${req.params.username}/${req.params.repo}`)
            res.status(200).json(response.data)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }

    static async unstar(req, res) {
        try {
            let response = await axiosInstance()
                .delete(`/user/starred/${req.params.username}/${req.params.repo}`)
            res.status(200).json(response.data)
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }
}

module.exports = GithubController
