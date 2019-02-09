const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        validate: [
            {
                validator: function (value) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
                },
                message: 'invalid email'
            }, {
                validator: function (value) {
                    return new Promise(async (resolve, reject) => {
                        try {
                            let member = await User.findOne({ email: value })
                            if (member) {
                                resolve(false)
                            } else {
                                resolve(true)
                            }
                        } catch (err) {
                            reject(err)
                        }
                    })
                },
                message: 'duplicate email'
            }
        ]
    },
    password: String,
    googleClientId: String,
})

userSchema.pre('save', async function (next) {
    let password = await bcrypt.hash(this.password, 1)
    this.password = password
    next()
})
userSchema.post('findOneAndUpdate', async function (value, next) {
    let password = await bcrypt.hash(value.password, 1)
    value.password = password
    value.save()
    next()
})

const User = mongoose.model('users', userSchema)

module.exports = User
