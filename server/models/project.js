const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    name: String,
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
})

const Project = mongoose.model('projects', projectSchema)

module.exports = Project
