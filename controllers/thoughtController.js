const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            res.status(200).json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // get one thought
    async getThought(req, res) {
        try {
            const thoughtData = await Thought.findById(req.params.id);
            res.status(200).json(thoughtData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // create new thought
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            res.status(200).json(thoughtData);
        }
        catch (err) {
            res.status(400).json(err);
        }
    },
    // update thought
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json(thoughtData);
        }
        catch (err) {
            res.status(400).json(err);
        }
    },
    // delete thought
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json(thoughtData);
        }
        catch (err) {
            res.status(400).json(err);
        }
    },
    // add reaction
    async addReaction(req, res) {
        try {
            const thoughtData = await Thought.update(
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            res.status(200).json(thoughtData);
        }
        catch (err) {
            res.status(400).json(err);
        }
    },
    // delete reaction
    async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.update(
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            res.status(200).json(thoughtData);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
};