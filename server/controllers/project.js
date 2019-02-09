const models = require('../models')

class ProjectController {
    static async find(req, res) {
        try {
            let projectData = await models.Project.find(
                { members: req.auth._id })
                .populate('owner').populate('members').lean()
            res.status(200).json(projectData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findOne(req, res) {
        try {
            let projectData = await models.Project.findOne(
                {
                    _id: req.params.projectId,
                })
                .populate('owner').populate('members').lean()
            res.status(200).json(projectData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        try {
            let projectData = await models.Project.create({
                name: req.body.name,
                description: req.body.description,
                owner: req.auth._id,
                members: [req.auth._id],
            })
            res.status(201).json(projectData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async update(req, res) {
        try {
            let projectData = await models.Project.findOneAndUpdate(
                {
                    _id: req.params.projectId,
                },
                {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                    }
                })
            res.status(201).json(projectData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            let projectData = await models.Project.findOneAndDelete(
                {
                    _id: req.params.projectId,
                })
            let todoData
            if (projectData) {
                todoData = await models.Todo.deleteMany({ project: projectData._id })
            }
            res.status(200).json(projectData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async addMember(req, res) {
        try {
            let userData = await models.User.findOne({ email: req.params.email })
            if (!userData) {
                throw { message: 'email is not found' }
            }
            let projectData = await models.Project.findById(req.params.projectId)
            if (!projectData) {
                throw { message: 'project is not found' }
            }
            let memberSet = new Set(projectData.members.map(e => e.toString()))
            memberSet.add(userData._id.toString())
            projectData.members = Array.from(memberSet)
            projectData = await projectData.save()
            res.status(201).json(projectData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async removeMember(req, res) {
        try {
            let projectData = await models.Project.findById(req.params.projectId)
            if (!projectData) {
                throw { message: 'project is not found' }
            } else if (projectData.owner.toString() == req.params.userId) {
                throw { message: 'cannot delete owner' }
            }
            let memberSet = new Set(projectData.members.map(e => e.toString()))
            memberSet.delete(req.params.userId)
            projectData.members = Array.from(memberSet)
            projectData = await projectData.save()
            res.status(200).json(projectData)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = ProjectController
