const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    googleClientId: String,
})

const User = mongoose.model('users', userSchema)

module.exports = User
