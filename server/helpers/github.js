const axios = require('axios')

function axiosInstance(config) {
    config = config || {}
    config.baseURL = `https://api.github.com`
    config.headers = config.headers || {}
    config.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    config.headers['Content-Type'] = 'application/json'
    return axios.create(config)
}

module.exports = { axiosInstance }
