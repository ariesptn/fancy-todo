const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    name: String,
    description: String,
    status: String,
    dueDate: Date,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
})

const Todo = mongoose.model('todos', todoSchema)

module.exports = Todo
