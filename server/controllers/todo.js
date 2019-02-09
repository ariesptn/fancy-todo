const { Todo } = require('../models')

class TodoController {
    static async find(req, res) {
        try {
            let todoData = await Todo.find({ owner: req.auth._id })
                .populate(('owner')).lean()
            res.status(200).json(todoData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findOne(req, res) {
        try {
            let todoData = await Todo.findOne({ _id: req.params.id, owner: req.auth._id })
                .populate(('owner')).lean()
            res.status(200).json(todoData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        try {
            req.body.owner = req.auth._id
            let todoData = await Todo.create(req.body)
            res.status(201).json(todoData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async update(req, res) {
        try {
            req.body.owner = req.auth._id
            let todoData = await Todo.findOneAndUpdate(
                { _id: req.params.id, owner: req.auth._id },
                { $set: req.body })
            res.status(201).json(todoData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            let todoData = await Todo.deleteOne({ _id: req.params.id, owner: req.auth._id })
            res.status(200).json(todoData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = TodoController
