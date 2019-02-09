const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    name: String,
    description: String,
    status: String,
    dueDate: Date,
    type: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
})

const Todo = mongoose.model('todos', todoSchema)

module.exports = Todo
