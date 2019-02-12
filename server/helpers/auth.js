const jwt = require('jsonwebtoken')

async function getToken(obj) {
    let token = jwt.sign(obj, process.env.JWT_SECRET)
    return token
}

module.exports = { getToken }
