const models = require('../models')

class TodoController {
    static async find(req, res) {
        try {
            let todoData = await models.Todo.find({ user: req.auth._id })
                .populate('user').lean()
            res.status(200).json(todoData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findByProjectId(req, res) {
        try {
            let todoData = await models.Todo.find({ project: req.params.projectId })
                .populate('user').lean()
            res.status(200).json(todoData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findOne(req, res) {
        try {
            let todoData = await models.Todo.findOne({ _id: req.params.todoId })
                .populate('user').lean()
            res.status(200).json(todoData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        try {
            let type = 'personal'
            let project = undefined
            let user = req.auth._id
            if (req.params.projectId) {
                type = 'project'
                project = req.params.projectId
                user = undefined
            }
            let todoData = await models.Todo.create({
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                dueDate: req.body.dueDate,
                user,
                type,
                project,
            })
            res.status(201).json(todoData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async update(req, res) {
        try {
            let todoData = await models.Todo.findOneAndUpdate(
                { _id: req.params.todoId },
                {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                        status: req.body.status,
                        dueDate: req.body.dueDate,
                    }
                })
            res.status(201).json(todoData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            let todoData = await models.Todo.findOneAndDelete({ _id: req.params.todoId })
            res.status(200).json(todoData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = TodoController
